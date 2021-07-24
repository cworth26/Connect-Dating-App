const nodemailer = require("nodemailer");
const config = require("./auth.config");

const user = config.user;
const pass = config.password;

//creating transporter object by calling nodemailer createtransport function
const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

//creating email that user will receive once they signup
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  console.log(user, pass);
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account!",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8081/confirm/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err) => {
      console.log("nodemailer error");
      console.log(err);
    });
};
