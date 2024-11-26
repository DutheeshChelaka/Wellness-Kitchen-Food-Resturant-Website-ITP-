const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "it22215710@my.sliit.lk",
    pass: "sxzo aife bpnd clgw",
  },
});

const sendOrderShippedEmail = async (userEmail, orderId) => {
  try {
    // Check if userEmail is properly defined and not empty
    if (!userEmail || typeof userEmail !== "string" || !userEmail.trim()) {
      console.error("Invalid recipient email address.");
      return;
    }

    console.log("Going to send to user " + userEmail.trim());
    const mailOptions = {
      from: "it22215710@my.sliit.lk",
      to: userEmail.trim(), // Ensure the email is trimmed
      subject: "Your Order is On the Way!!",
      text: `Hello! Your order with ID: ${orderId} has been shipped. Thank you for ordering with us!`,
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f7f7f7; padding: 20px; border-radius: 10px;">
          <h1 style="color: #ff8c00;">Your Order is On the Way!</h1>
          <img src="https://cdn-icons-png.flaticon.com/512/3076/3076487.png" style="width: 150px; margin-bottom: 20px;">
          <p>Hello! Your order with <strong>ID: ${orderId}</strong> has been shipped.</p>
          <p>Thank you for ordering with us!</p>
          <a href="http://localhost:3000/order-history" style="display: inline-block; padding: 10px 20px; background-color: #ff8c00; color: white; text-decoration: none; border-radius: 5px;">Track Your Order</a>
          <p style="margin-top: 20px;">For any inquiries, please contact our support at <a href="mailto:support@yourwebsite.com">support@wellnesskitchen.com</a>.</p>
          <p>Thank you!</p>
          <small style="color: #999;">&copy; 2024 Wellness Kitchen. All Rights Reserved.</small>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", userEmail);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

module.exports = { sendOrderShippedEmail };
