const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public")); 
// The beauty of this is that this tells express, "use this as the root setup to run static stuff"
//Meaning you DON'T need to public/image/xxx.jpg or public/style/desktop.css etc

// Request form POST route
app.post("/send", (req, res) => {
  const { first, last, email, message } = req.body;
  const fullName = `${first} ${last}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "singhjaspinder528@gmail.com",
      pass: "SurajSingh14"
      //My Gmail...
    }
  });

  const mailOptions = {
    from: email,
    to: "singhjaspinder528@gmail.com",
    subject: `Message from ${fullName}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
