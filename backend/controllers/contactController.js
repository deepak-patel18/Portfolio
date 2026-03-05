exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};