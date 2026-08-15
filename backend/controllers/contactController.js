const nodemailer = require("nodemailer");

// =====================================================
// EMAIL TRANSPORTER
// =====================================================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// =====================================================
// SEND CONTACT MESSAGE
// =====================================================

exports.sendMessage = async (req, res) => {
  try {
    console.log("====================================");
    console.log("📩 CONTACT REQUEST RECEIVED");
    console.log("Request body:", req.body);
    console.log("====================================");

    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("====================================");
    console.log("📧 Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", process.env.EMAIL_USER);
    console.log("====================================");

    // Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject: `Portfolio Contact Message from ${name}`,

      text: `
You received a new message from your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}

You can reply directly to this email to contact ${name}.
      `,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 600px;
          margin: auto;
          padding: 20px;
        ">

          <h2 style="color: #2563eb;">
            📩 New Portfolio Contact Message
          </h2>

          <hr />

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Message:</strong>
          </p>

          <div style="
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
          ">
            ${message}
          </div>

          <hr />

          <p>
            You can reply directly to this email to contact
            <strong>${name}</strong>.
          </p>

        </div>
      `,
    });

    console.log("====================================");
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {

    console.log("====================================");
    console.error("❌ EMAIL ERROR:");
    console.error(error);
    console.log("====================================");

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};