const { Resend } = require("resend");

// =====================================================
// RESEND
// =====================================================

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log("📧 Sending email using Resend...");

    // =================================================
    // SEND EMAIL
    // =================================================

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO],

      replyTo: email,

      subject: `Portfolio Contact Message from ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          max-width: 650px;
          margin: auto;
          padding: 25px;
          background: #f8fafc;
        ">

          <div style="
            background: white;
            padding: 25px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
          ">

            <h2 style="color: #2563eb; margin-top: 0;">
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
              background: #f1f5f9;
              padding: 15px;
              border-radius: 8px;
              white-space: pre-wrap;
            ">
              ${message}
            </div>

            <hr />

            <p style="color: #64748b;">
              You can reply directly to this email to contact ${name}.
            </p>

          </div>

        </div>
      `,

      text: `
New Portfolio Contact Message

Name: ${name}
Email: ${email}

Message:
${message}

You can reply directly to this email to contact ${name}.
      `,
    });

    // =================================================
    // HANDLE RESEND ERROR
    // =================================================

    if (error) {
      console.error("====================================");
      console.error("❌ RESEND ERROR:");
      console.error(error);
      console.error("====================================");

      return res.status(500).json({
        success: false,
        message: "Failed to send email",
      });
    }

    // =================================================
    // SUCCESS
    // =================================================

    console.log("====================================");
    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Resend ID:", data?.id);
    console.log("====================================");

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {

    console.error("====================================");
    console.error("❌ CONTACT EMAIL ERROR:");
    console.error(error);
    console.error("====================================");

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};