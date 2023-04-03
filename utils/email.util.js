const nodemailer=require("nodemailer")
require('dotenv').config();  


exports.sendMail=async(reciever,subject,text,html)=>{
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8410693bcbb538",
      pass: "8b00833a77f9fe"
    }
  });
   let info=await transporter.sendMail({
     from:"Node mailer <foo@example.com>",
     to:reciever,
     subject,
     text,
     html
   })
   console.log("Message sent: %s",info.messageId)
}