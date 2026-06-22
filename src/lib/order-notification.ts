export async function sendOrderNotification(subject: string, text: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL || process.env.ORDER_TO_EMAIL;
  if (!apiKey || !recipient) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "DL Gadgets Orders <orders@resend.dev>",
      to: [recipient],
      subject,
      text,
    }),
  });
  return response.ok;
}
