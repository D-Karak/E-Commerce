require("dotenv").config();
const nodemailer =require("nodemailer")


const sendEmail=async({to, subject, text})=>{
    try{
        // Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});
//send email
const info= await transport.sendMail({
    from: "Ecommerce <no-reply@ecommerce.com>",
    to,
    subject,
    text
})
    console.log("Email sent successfully:",info.messageId);
    return info;
    }
    catch(error){
        console.error("Error sending email:", error);
    }
}
module.exports=sendEmail;