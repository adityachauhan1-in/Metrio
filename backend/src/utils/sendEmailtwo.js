import { Resend } from "resend";


export const sendEmailtwo = async (userEmail, ticketData) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "MetroFlow <onboarding@resend.dev>",
      to: userEmail,
      subject: "Your Metro Ticket",

      html: `
      <h1>Ticket Confirmation</h1>

      <p><strong>From:</strong> ${ticketData.from}</p>

      <p><strong>To:</strong> ${ticketData.to}</p>

      <p><strong>Fare:</strong> ₹${ticketData.fare}</p>

      <p><strong>Ticket ID:</strong> ${ticketData.ticketId}</p>

      <p><strong>Valid Till:</strong> ${ticketData.expiresAt}</p>

      <h2>Thank you for booking MetroFlow 🚇</h2>
      `,
    });

    if (error) {
      console.error(error);
      return; 
    } 

    console.log("Email sent", data);
  } catch (err) {
    console.error(err);
  }
};