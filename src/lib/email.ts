import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
}

export async function sendLeadReplyEmail({
  to,
  subject,
  body,
}: SendEmailParams): Promise<{ success: boolean; messageId?: string; simulated?: boolean }> {
  if (resend && resendApiKey) {
    try {
      const data = await resend.emails.send({
        from: `InstantReplyHub <${fromEmail}>`,
        to: [to],
        subject: subject,
        text: body,
      });

      if (data.error) {
        console.error("Resend e-posta gönderim hatası:", data.error);
        return { success: false };
      }

      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error("E-posta servisi istisnası:", error);
      return { success: false };
    }
  }

  // API Anahtarı girilmemişse konsola yaz ve simüle et
  console.log(`[E-Posta Simülasyonu] Kime: ${to} | Konu: ${subject}\nİçerik:\n${body}\n---`);
  return { success: true, simulated: true };
}
