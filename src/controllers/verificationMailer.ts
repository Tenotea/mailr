import { createTransport } from 'nodemailer'
import { UserInterface } from './interface'

const messageTemplate = (username:string, verificationLink:string) => {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Email Verification - Mailr</title><style>*{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif;text-decoration:none}main{max-width:600px;margin:0 auto}.btn-link{padding:7px 30px;background:#0065a8;border-radius:4px;color:#fff;display:block;margin-top:5px;margin-bottom:20px;width:fit-content;box-shadow:0 5px 6px -3px #00000060}h1{font-size:40px;margin:20px 0;color:#000618}.footer{text-align:center}span{color:#f05;font-size:20px}p{line-height:2em}</style></head><body><main><h1>Welcome to MailR!</h1><p>Hey ${username}!<br>To continue using this service, follow the link below to verify your email account. We can't wait for you to join the moving train!</p><a href="${verificationLink}" class="btn-link">Verify Account</a><p>We've got 5000+ satisfied customers. To view testimonies of our client, check it out here.</p><a href="http://localhost:3000/" class="btn-link">Testimonies</a><div class="footer">Made with <span>&hearts;</span> and NodeMailer</div></main></body></html>`
}

const sendVerificationMail = async (user:UserInterface, verificationLink:string) => {
  const transporter = createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  })

  const message = await transporter.sendMail({
    from: 'MailR <info@pepisandbox.com>',
    to: user.email,
    subject: `Hey ${user.username}, Confirm your regisration with MailR`,
    html: messageTemplate(user.username, verificationLink)
  })

  return message
}

export default sendVerificationMail
