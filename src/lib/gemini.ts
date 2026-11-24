import { GoogleGenerativeAI } from "@google/generative-ai";
import { AITemplate } from "@/types";
import { DEFAULT_AI_TEMPLATE } from "./data-store";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

interface GenerateLeadReplyParams {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  service?: string;
  formName?: string;
  template?: AITemplate;
  language?: "tr" | "en";
}

export async function generateLeadReply({
  name,
  email,
  phone,
  message,
  service,
  formName,
  template = DEFAULT_AI_TEMPLATE,
  language = "tr",
}: GenerateLeadReplyParams): Promise<{ reply: string; model: string }> {
  const modelName = "gemini-1.5-flash";

  // Gerçek Gemini API Anahtarı Varsa Canlı LLM Kullan
  if (genAI && apiKey) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = language === "en" ? `
You are a top-tier B2B SaaS sales development representative. A new potential client (lead) just submitted a form on our website via "${formName || "Contact Form"}".
Write a warm, consultative, human-like, and high-converting initial email reply.

COMPANY DETAILS:
- Company Name: ${template.company_name}
- Industry / Services: ${template.company_description}
- Meeting / Booking Link (CTA): ${template.cta_text}

TONE & GUIDELINES:
- Tone: ${template.tone}
- Directives: ${template.custom_instructions}

CUSTOMER DETAILS:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Service / Topic of Interest: ${service || "General Inquiry"}
- Message: "${message || "Interested in learning more."}"

RULES:
1. Address the customer politely by their first name (e.g., "Hi ${name.split(" ")[0]},").
2. Explicitly reference their specific message/problem. Do not sound generic or robotic.
3. Be solution-oriented and build trust.
4. Conclude with a clear, low-friction Call to Action (CTA) linking to the demo booking link.
5. Do NOT include a subject line; output only the email body (from greeting to sign-off) in fluent English.
` : `
Sen bir B2B SaaS ve satış uzmanısın. Web sitemizdeki "${formName || "İletişim Formu"}" üzerinden yeni bir potansiyel müşteri (lead) formu doldurdu.
Bu müşteriye sıcak, ikna edici, insansı ve anında dönüş yapan bir ilk e-posta yanıtı yazman gerekiyor.

ŞİRKET BİLGİLERİ:
- Şirket Adı: ${template.company_name}
- Faaliyet Alanı: ${template.company_description}
- Randevu / Demo Linki (CTA): ${template.cta_text}

İLETİŞİM TONU:
- Ton: ${template.tone}
- Özel Talimatlar: ${template.custom_instructions}

MÜŞTERİ BİLGİLERİ:
- Adı Soyadı: ${name}
- E-posta: ${email}
- Telefon: ${phone || "Belirtilmemiş"}
- İlgilendiği Konu / Hizmet: ${service || "Genel Bilgi Talebi"}
- Müşterinin Mesajı: "${message || "Detaylı bilgi almak istiyorum."}"

KURALLAR:
1. Müşteriye nazikçe ismiyle hitap et (Örn: "Merhaba ${name.split(" ")[0]} Bey/Hanım,").
2. Müşterinin mesajında belirttiği spesifik konuya doğrudan değin, robotik veya kalıp cümlelerden kaçın.
3. Çözüm odaklı ve güven verici ol.
4. E-postanın sonunda mutlaka yukarıda verilen demo/randevu linkine yönlendiren net bir aksiyon çağrısı (CTA) yap.
5. Konu satırı ekleme, doğrudan e-posta gövdesini (selamlamadan vedaya kadar) Türkçe olarak yaz.
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return { reply: text.trim(), model: modelName };
    } catch (error) {
      console.warn("Gemini API call failed, falling back to smart template:", error);
    }
  }

  // Fallback Şablonları (TR ve EN)
  const firstName = name.split(" ")[0] || (language === "en" ? "there" : "Değerli Müşterimiz");

  if (language === "en") {
    const customService = service ? `regarding "${service}"` : "your recent inquiry";
    const fallbackEn = `Hi ${firstName},\n\nThank you for reaching out to ${template.company_name} ${customService}!\n\n${
      message ? `We carefully reviewed the details you shared ("${message.slice(0, 80)}..."). ` : ""
    }Our team is well-equipped to help streamline this and deliver tangible results.\n\nTo move quickly and review a tailored roadmap together, feel free to pick a 15-minute slot on our calendar:\n${template.cta_text}\n\nLooking forward to speaking soon,\n${template.company_name} Sales & Success Team`;

    return {
      reply: fallbackEn,
      model: "gemini-1.5-flash (smart template mode - EN)",
    };
  }

  const customService = service ? `"${service}" konulu talebiniz` : "talebiniz";
  const fallbackTr = `Merhaba ${firstName},\n\n${template.company_name} olarak sitemiz üzerinden ilettiğiniz ${customService} için çok teşekkür ederiz.\n\n${
    message ? `Mesajınızda belirttiğiniz detayları ("${message.slice(0, 80)}...") inceledik. ` : ""
  }Ekibimiz ihtiyacınıza en uygun çözümü sunmak için hazır.\n\nSüreci hızlandırmak ve size özel yol haritasını değerlendirmek adına aşağıdaki bağlantıdan 15 dakikalık hızlı bir tanışma randevusu oluşturabilirsiniz:\n${template.cta_text}\n\nEn kısa sürede görüşmek dileğiyle,\n${template.company_name} Satış ve Başarı Ekibi`;

  return {
    reply: fallbackTr,
    model: "gemini-1.5-flash (akıllı şablon modu - TR)",
  };
}
