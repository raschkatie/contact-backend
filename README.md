# Contact Form Backend – Node.js + Express

This backend service handles contact form submissions from my portfolio site (https://katierasch.com).

- Built with **Node.js** and **Express**
- Sends emails using **SendGrid**
- Deployed on **Render**
- Accepts `POST /contact` requests with JSON body

## 🔐 Environment Variables

This service uses the following environment variables:

- `SENDGRID_API_KEY`: Your SendGrid API key
- `TO_EMAIL`: Where contact messages are delivered
- `FROM_EMAIL`: Verified sender address (must match SendGrid)

## 🌐 Live Endpoint

`POST https://contact-backend-q41u.onrender.com/contact`

Expected JSON body:

```
json
{
	"name": "Your Name",
	"email": "your@email.com",
	"subject": "Optional Subject",
	"message": "Your message here"
}
```

## 📄 License

Open source under the [MIT License](LICENSE).
