import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config({ config: 'env' });
// import nodemailer from 'nodemailer';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, message, html }) => {
  try {
    const option = {
      to,
      from: process.env.MAIL_FROM,
      subject,
      // text: message,
      html,
    };

    await sgMail.send(option);
  } catch (err) {
    console.log(err);
  }
};

// const sendMail = async ({ to, subject, message }) => {
//   try {
//     const transport = nodemailer.createTransport({
//       host: 'smtp.sendgrid.net',
//       port: 25,
//       auth: {
//         user: 'apikey',
//         pass: process.env.SENDGRID_API_KEY,
//       },
//     });

//     const option = {
//       to,
//       from: process.env.MAIL_FROM,
//       subject,
//       text: message,
//       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };

//     await transport.sendMail(option);
//   } catch (err) {
//     console.log(err);
//   }
// };

export default sendMail;
