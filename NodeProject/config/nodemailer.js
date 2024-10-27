const nodemailer= require("nodemailer")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "dhibikram50@gmail.com",
      pass: "hvqy pwku rjui jjrx",
    },
  });

module.exports= transporter;