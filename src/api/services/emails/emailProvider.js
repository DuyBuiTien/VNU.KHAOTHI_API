const nodemailer = require('nodemailer');
const Email = require('email-templates');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailConfig } = require('../../../config/vars');
// SMTP is the main transport in Nodemailer for delivering messages.
// SMTP is also the protocol used between almost all email hosts, so its truly universal.
// if you dont want to use SMTP you can create your own transport here
// such as an email service API or nodemailer-sendgrid-transport

// const transporter = nodemailer.createTransport({
//   port: emailConfig.port,
//   host: emailConfig.host,
//   auth: {
//     user: emailConfig.username,
//     pass: emailConfig.password,
//   },
//   secure: false, // upgrades later with STARTTLS -- change this based on the PORT
// });

exports.sendEmail = async (email, content, subject) => {
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password,
    },
    secure: false,
  });
  const options = {
    from: emailConfig.username,
    to: email,
    subject: subject,
    html: content,
  };
  return transporter.sendMail(options);
};

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: 'gmail',
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password,
    },
    secure: false, // upgrades later with STARTTLS -- change this based on the PORT
  }),
);

// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection');
    console.log(error);
  }
});

exports.sendPasswordReset = async (passwordResetObject) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'noreply.tandanjsc@gmail.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordReset',
      message: {
        to: passwordResetObject.userEmail,
      },
      locals: {
        productName: 'Awesome Chat',
        // passwordResetUrl should be a URL to your app that displays a view where they
        // can enter a new password along with passing the resetToken in the params
        passwordResetUrl: `http://domain.com/new-password?resetToken=${passwordResetObject.resetToken}&email=${passwordResetObject.userEmail}`,
      },
    })
    .catch((error) => {
      console.log('error sending password reset email');
      console.log(error);
    });
};

exports.sendPasswordChangeEmail = async (user) => {
  const email = new Email({
    views: { root: __dirname },
    message: {
      from: 'noreply.tandanjsc@gmail.com',
    },
    // uncomment below to send emails in development/test env:
    send: true,
    transport: transporter,
  });

  email
    .send({
      template: 'passwordChange',
      message: {
        to: user.email,
      },
      locals: {
        productName: 'Awesome Chat',
        name: user.name,
      },
    })
    .catch((error) => {
      console.log('error sending change password email');
      console.log(error);
    });
};
exports.sendMail = async (emails, titleEmail, contentEmail) => {
  // Kh???i t???o m???t th???ng transporter object s??? d???ng chu???n giao th???c truy???n t???i SMTP v???i c??c th??ng tin c???u h??nh ??? tr??n.
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    //service: 'gmail',
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password,
    },
    secure: false, // upgrades later with STARTTLS -- change this based on the PORT
  });
  const options = {
    from: emailConfig.username, // ?????a ch??? admin email b???n d??ng ????? g???i
    to: emails, // ?????a ch??? g???i ?????n
    subject: titleEmail, // Ti??u ????? c???a mail
    html: contentEmail, // Ph???n n???i dung mail m??nh s??? d??ng html thay v?? thu???n v??n b???n th??ng th?????ng.
  };
  // h??m transporter.sendMail() n??y s??? tr??? v??? cho ch??ng ta m???t Promise
  return transporter.sendMail(options);
};
