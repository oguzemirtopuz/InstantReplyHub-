import { NextRequest, NextResponse } from "next/server";
import { generateLeadReply } from "@/lib/gemini";
import { DEFAULT_AI_TEMPLATE } from "@/lib/data-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, message, service, formName, template, language } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Müşteri adı ve e-posta zorunludur." },
        { status: 400 }
      );
    }

    const { reply, model } = await generateLeadReply({
      name,
      email,
      phone,
      message,
      service,
      formName,
      template: template || DEFAULT_AI_TEMPLATE,
      language: language === "en" ? "en" : "tr",
    });

    return NextResponse.json({
      success: true,
      reply,
      model,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Generate reply API hatası:", error);
    return NextResponse.json(
      { error: error.message || "Yanıt oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
