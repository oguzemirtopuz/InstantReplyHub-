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
}

export async function generateLeadReply({
  name,
  email,
  phone,
  message,
  service,
  formName,
  template = DEFAULT_AI_TEMPLATE,
}: GenerateLeadReplyParams): Promise<{ reply: string; model: string }> {
  const modelName = "gemini-1.5-flash";

  // Gerçek Gemini API Anahtarı Varsa Canlı LLM Kullan
  if (genAI && apiKey) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
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
      console.warn("Gemini API çağrısı başarısız oldu, akıllı şablona geçiliyor:", error);
    }
  }

  // API Anahtarı Yoksa veya Çağrı Başarısız Olursa Akıllı Fallback Şablonu
  const firstName = name.split(" ")[0] || "Değerli Müşterimiz";
  const customService = service ? `"${service}" konulu talebiniz` : "talebiniz";
  const fallbackReply = `Merhaba ${firstName},\n\n${template.company_name} olarak sitemiz üzerinden ilettiğiniz ${customService} için çok teşekkür ederiz.\n\n${
    message ? `Mesajınızda belirttiğiniz detayları ("${message.slice(0, 80)}...") inceledik. ` : ""
  }Ekibimiz ihtiyacınıza en uygun çözümü sunmak için hazır.\n\nSüreci hızlandırmak ve size özel yol haritasını değerlendirmek adına aşağıdaki bağlantıdan 15 dakikalık hızlı bir tanışma randevusu oluşturabilirsiniz:\n${template.cta_text}\n\nEn kısa sürede görüşmek dileğiyle,\n${template.company_name} Satış ve Başarı Ekibi`;

  return {
    reply: fallbackReply,
    model: "gemini-1.5-flash (akıllı şablon modu)",
  };
}
