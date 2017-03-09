var nodemailer = require('nodemailer');

// Transport object
var transporter = nodemailer.createTransport({
  service: 'SendPulse',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW
  }
});

// Verify connection configuration
// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });

var newGoalEmail = function(user, backerName, backerEmail, goalTitle) {
  // Setup email data
  var mailOptions = {
    from: 'Accomplish.io ' + process.env.EMAIL_USER, // sender address
    to: backerName + ' ' + backerEmail, // list of receivers
    subject: 'A friend of yours started a new goal!', // Subject line
    text: 'Hi ' + backerName + ',\n' + user + ' is trying to ' + goalTitle + ' and has selected you to be a backer. We\'ll let you know how ' + user + ' is doing. Just be sure to send lots of encouragement. \n Best, \n The Accomplish.Life team', // plain text body
    // html: '<b>Help your friends!</b>' // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

var goalCompleteEmail = function(user, backerName, backerEmail, goalTitle) {
  // Setup email data
  var mailOptions = {
    from: 'Accomplish.io ' + process.env.EMAIL_USER, // sender address
    to: backerName + ' ' + backerEmail, // list of receivers
    subject: 'A friend of yours has completed a goal!', // Subject line
    text: 'Hi ' + backerName + ',\n' + user + ' has just finished their goal to ' + goalTitle + '. You should congratulate them! \n Best, \n The Accomplish.Life Team', // plain text body
    // html: '<b>Help your friends!</b>' // html body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
};

module.exports = {
  newGoalEmail: newGoalEmail,
  goalCompleteEmail: goalCompleteEmail
};
