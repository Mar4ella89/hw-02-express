// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const { META_PASSWORD, EMAIL_FROM } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 465, 2525
//   secure: true,
//   auth: {
//     user: EMAIL_FROM,
//     pass: META_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//   const email = { ...data, from: EMAIL_FROM };
//   await transport.sendMail(email);
//   return true;
// };

// module.exports = sendEmail;

// ============ code for sengrid ==================

const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY, EMAIL_FROM } = process.env;

sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "3371335@gmail.com" };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
