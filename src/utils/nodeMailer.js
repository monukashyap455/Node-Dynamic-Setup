import nodemailer from "nodemailer";
import twilio from 'twilio';


// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// create resusable sendSms to mobile number 
export const sendSms = async (sentTo, messageBody, otp) => {
  // Create Twilio client
  const client = twilio(process.env.SMS_ACCOUNT_SID, process.env.SMS_AUTH_TOKEN);
  // Send SMS message
  client.messages
    .create({
      body: messageBody,
      from: process.env.SMS_FROM,
      to: sentTo,
    })
    .then(message => console.log('Message sent:', message.sid))
    .catch(err => console.error('Error:', err));
}


