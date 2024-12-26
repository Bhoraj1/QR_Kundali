import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "bhorajmalla8@gmail.com",
    pass: "tigy nloo hcsn lyom",
  },
});
export const sendResetPasswordEmail = async (email, resetLink) => {
  const mailOptions = {
    from: '"QR KUNDALI 👻" <bhorajmalla8@gmail.com>',
    to: email,
    subject: "Password Reset Request from SastoBazaar",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
          .container { max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); padding: 20px; }
          .header { text-align: center; padding: 10px 0; border-bottom: 2px solid #FF5733; }
          .header h1 { color: #FF5733; }
          .content { margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; font-size: 0.8em; color: #777; }
          .button { display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: #FF5733; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>We received a request to reset your password for your SastoBazaar account.</p>
            <p>If you made this request, please click the button below to reset your password:</p>
            <p><a href="${resetLink}" class="button">Reset Password</a></p>
            <p>This link will expire in 10 minutes. If you did not request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>Thank you for using SastoBazaar!</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};