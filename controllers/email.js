const nodemailer = require("nodemailer");
exports.index=(req, res)=>{
   let testAccount = await nodemailer.createTestAccount();

   let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: false, // true for 465, false for other ports
      auth: {
         user: testAccount.user, // generated ethereal user
         pass: testAccount.pass, // generated ethereal password
      },
   });

   let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
   });

   console.log("Message sent: %s", info.messageId);

   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}