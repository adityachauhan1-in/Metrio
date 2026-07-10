import nodemailer from "nodemailer";
 // For clear understanding look at the Explanation file 
export const sendEmail = async (userEmail, ticketData) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASSWORD;
  if (!emailUser || !emailPass) {
    console.error(
      "[sendEmail] EMAIL_USER and EMAIL_PASSWORD must be set in backend .env (use a Gmail App Password if 2FA is on)"
    );
    return;
  } 
console.log("I am at email service")
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass.replace(/\s/g, ""),
      },
    });

    const mailOption = {
      from: emailUser,
      to: userEmail,
      subject: "Your Metro Ticket",
      html: `
        <h1>Ticket Confirmation</h1>
        <h2><strong>From:</strong> ${ticketData.from}</h2>
        <h2><strong>To:</strong> ${ticketData.to}</h2>
        <h2><strong>Fare:</strong> ₹${ticketData.fare}</h2>
        <h2><strong>TicketId:</strong> ${ticketData.ticketId}</h2>
        <h2><strong>Date:</strong> ${new Date().toLocaleString()}</h2>
        <h4><strong>Valid only till : </strong> ${ticketData.expiresAt}</h4>
        <br/>
        <h1>Thank you for booking with MetroFlow 🚇</h1>
      `,
    };

    const info = await transporter.sendMail(mailOption);
    console.log("[sendEmail] sent:", info.messageId);
  } catch (error) {
    console.error("[sendEmail] EMAIL ERROR:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });
    throw error;
  }
};