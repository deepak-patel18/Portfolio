const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    githubLink: String,
    liveLink: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);