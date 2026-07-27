import nodemailer from "nodemailer";

import dns from 'dns'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  lookup(hostname, options, callback) {
    return dns.lookup(hostname, { family: 4 }, callback);
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Mail server is ready");
  }
});

export default transporter;
