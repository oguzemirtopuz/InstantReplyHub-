import { NextRequest, NextResponse } from "next/server";
import { generateLeadReply } from "@/lib/gemini";
import { sendLeadReplyEmail } from "@/lib/email";
import { supabaseAdmin, isServerSupabaseConfigured } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  return NextResponse.json({
    status: "active",
    message: "InstantReplyHub Webhook Endpoint is Live and Listening.",
    token: params.token,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const startTime = Date.now();
  const token = params.token;

  try {
    let payload: any = {};
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        payload[key] = value.toString();
      });
    } else {
      payload = await req.json();
    }

    // 1. Payload Normalizasyonu (Farklı form platformlarını tek tipe dönüştür)
    const normalized = extractLeadData(payload);

    if (!normalized.email) {
      return NextResponse.json(
        { error: "Gelen form verisinde geçerli bir e-posta adresi bulunamadı." },
        { status: 400 }
      );
    }

    // Dil Tespiti (payload.lang veya mesaj analizi)
    const language: "tr" | "en" = 
      payload.lang === "en" || payload.language === "en" || isMostlyEnglish(normalized.message) 
        ? "en" 
        : "tr";

    // 2. Gemini AI ile Anında Yanıt Üret
    const { reply, model } = await generateLeadReply({
      name: normalized.name || (language === "en" ? "Valued Client" : "Değerli Müşterimiz"),
      email: normalized.email,
      phone: normalized.phone,
      message: normalized.message,
      service: normalized.service,
      formName: normalized.formName || `Form (${token.slice(0, 8)})`,
      language,
    });

    const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTime) / 1000));

    // 3. E-posta Gönderimi (Resend)
    const subject = language === "en" 
      ? "Thank you for reaching out! - How can we help?" 
      : "Talebiniz Alındı! - Size Nasıl Yardımcı Olabiliriz?";

    const emailResult = await sendLeadReplyEmail({
      to: normalized.email,
      subject,
      body: reply,
    });

    // 4. Supabase Varsa Veritabanına Kaydet
    let leadId = `lead-${Date.now()}`;
    if (isServerSupabaseConfigured && supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin
          .from("leads")
          .insert({
            form_name: normalized.formName || `Webhook Formu`,
            name: normalized.name || "Unknown Lead",
            email: normalized.email,
            phone: normalized.phone || null,
            message: normalized.message || null,
            custom_fields: payload,
            status: "responded",
            ai_response: reply,
            ai_model: model,
            response_time_seconds: elapsedSeconds,
            responded_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (data && !error) leadId = data.id;
      } catch (dbError) {
        console.warn("Supabase veritabanı kaydı atlandı (opsiyonel mod):", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead processed successfully and instant AI reply delivered.",
      lead: {
        id: leadId,
        name: normalized.name,
        email: normalized.email,
        status: "responded",
        response_time_seconds: elapsedSeconds,
        ai_model: model,
        language,
        email_sent: emailResult.success,
      },
    });
  } catch (error: any) {
    console.error("Webhook işleme hatası:", error);
    return NextResponse.json(
      { error: error.message || "Unexpected webhook processing error." },
      { status: 500 }
    );
  }
}

function isMostlyEnglish(text?: string): boolean {
  if (!text) return false;
  const englishWords = ["the", "and", "is", "for", "with", "we", "need", "looking", "interested", "price", "demo"];
  const lower = text.toLowerCase();
  const matchCount = englishWords.filter(w => lower.includes(w)).length;
  return matchCount >= 2;
}

// Yardımcı: Typeform, Tally, Webflow ve Standart JSON payloadlarını ayrıştırır
function extractLeadData(payload: any) {
  let name = "";
  let email = "";
  let phone = "";
  let message = "";
  let service = "";
  let formName = "Web Form";

  // Standart düz JSON
  if (payload.name || payload.ad || payload.fullName) {
    name = payload.name || payload.ad || payload.fullName;
  }
  if (payload.email || payload.eposta || payload.mail) {
    email = payload.email || payload.eposta || payload.mail;
  }
  if (payload.phone || payload.tel || payload.telefon) {
    phone = payload.phone || payload.tel || payload.telefon;
  }
  if (payload.message || payload.mesaj || payload.talep || payload.description) {
    message = payload.message || payload.mesaj || payload.talep || payload.description;
  }
  if (payload.service || payload.hizmet || payload.konu) {
    service = payload.service || payload.hizmet || payload.konu;
  }

  // Tally Webhook Formatı
  if (payload.data && Array.isArray(payload.data.fields)) {
    formName = payload.data.formName || "Tally Form";
    for (const field of payload.data.fields) {
      const label = (field.label || "").toLowerCase();
      const val = field.value;
      if (!val) continue;

      if (label.includes("name") || label.includes("ad") || label.includes("isim")) {
        name = String(val);
      } else if (label.includes("email") || label.includes("e-posta") || field.type === "INPUT_EMAIL") {
        email = String(val);
      } else if (label.includes("phone") || label.includes("tel") || field.type === "INPUT_PHONE_NUMBER") {
        phone = String(val);
      } else if (label.includes("mesaj") || label.includes("message") || label.includes("açıklama")) {
        message = String(val);
      }
    }
  }

  // Typeform Webhook Formatı
  if (payload.form_response) {
    formName = payload.form_response.definition?.title || "Typeform";
    const answers = payload.form_response.answers || [];
    for (const ans of answers) {
      if (ans.type === "email") email = ans.email;
      if (ans.type === "text") {
        if (!name) name = ans.text;
        else if (!message) message = ans.text;
      }
      if (ans.type === "phone_number") phone = ans.phone_number;
    }
  }

  return { name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim(), service: service.trim(), formName };
}
