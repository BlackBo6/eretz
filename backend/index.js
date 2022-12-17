const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();


app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  secure: true,
});

app.get("/hello", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.post("/api/email/send", async (req, res) => {
  const { recipient, subject, body } = req.body;
  if (!recipient || !subject || !body)
    return res
      .status(404)
      .json({ code: "INVALID_PARAMS", message: "Missing parameters" });
  try {
    await transporter.sendMail({
      from: "test@gmail.com",
      to: recipient,
      subject: subject,
      text: body,
    });
    return res
      .status(201)
      .json({ code: "EMAIL_SENT", message: "Email sent Successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

app.listen(4000, () => {
  console.info("Server running on Port 4000, link => http://localhost:4000");
});
