const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Contacts.html directly
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Contacts.html'));
});

// Handle POST form submission
app.post('/send', (req, res) => {
  const { first, last, email, message } = req.body;
  const fullName = `${first} ${last}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'singhjaspinder528@gmail.com',
      pass: 'fuse zvur wpae fkpz'
    }
  });

  const mailOptions = {
    from: email,
    to: 'singhjaspinder528@gmail.com',
    subject: `Message from ${fullName}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
