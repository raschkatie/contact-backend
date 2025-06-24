require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('express').json;
const sgMail = require('@sendgrid/mail');

const app = express();
const PORT = process.env.PORT || 3001;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://www.katierasch.com'],
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
  credentials: false
}));
app.use(bodyParser());

app.options('/contact', cors());

// Routes
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const msg = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL,
        subject: `New Portfolio Message from ${name}: ${subject || 'No Subject'}`,
        text: `
            You received a new message from your portfolio site!

            Name: ${name}
            Email: ${email}
            Subject: ${subject || 'No Subject'}
            Message:
            ${message}
        `,
        replyTo: email
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent!');
            res.status(200).json({ message: 'Form received and email sent successfully!' });
        })
        .catch(error => {
            console.error('Email failed to send: ', error);
            res.status(500).json({ message: 'Form received, but email failed to send.' });
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});