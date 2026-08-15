const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendMessage = async (req, res) => {
  try {
    console.log("====================================");
    console.log("📩 CONTACT REQUEST RECEIVED");
    console.log("Request body:", req.body);
    console.log("====================================");

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log("📧 Sending email...");
    console.log("From:", process.env.EMAIL_USER);
    console.log("To:", process.env.EMAIL_USER);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,

      subject: `Portfolio Contact Message from ${name}`,

      text: `
You received a new message from your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">

          <h2>📩 New Portfolio Contact Message</h2>

          <p>
            <strong>Name:</strong> ${name}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <hr />

          <p>
            <strong>Message:</strong>
          </p>

          <p>
            ${message}
          </p>

          <hr />

          <p>
            You can reply directly to this email to contact ${name}.
          </p>

        </div>
      `,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {

    console.error("❌ EMAIL ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};