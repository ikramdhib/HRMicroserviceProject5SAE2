const transporter = require("../config/nodemailer");


const verifyEmail = async (email,username,link)=>{
    return await  transporter.sendMail({
        from: '"HR Agent" dhibikram50@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Confirm your account", // Subject line
        text: "Hello world?", // plain text body
        html: `
            <div>
                <p>Dear ${username},</p>,
                <p>Thank you for signing up for an account ... </p>

                <p>To complete your registration , please click <a href="${link}"> here</a> </p>
            </div>
        `, // html body
      });
    
}


module.exports = {verifyEmail};