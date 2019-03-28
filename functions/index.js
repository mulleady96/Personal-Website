const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const gmailEmail = 'mulleady96@gmail.com';
const gmailPass = 'LiosMor108';
const APP_NAME = 'Gravita Web Tech';

const mailTransport = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  port : '587',
  secure : false,
  auth: {
    user: gmailEmail,
    pass: gmailPass
  },
  tls : {
        rejectUnauthorized: false
  }
});


// firebase deploy --only functions to deploy functions.


// 1. Function: To send welcome email to new users => Start on trigger when DB entry.
exports.sendWelcomeEmail = functions.database.ref(`/enquiry/{enquiryId}`)
  .onWrite((change, context) => {
    //const email = event.data.key;
    const emailVal = change.after.val();
    const displayName = change.after.val();

    return sendWelcomeEmail(emailVal, displayName);
  });


function sendWelcomeEmail(email, displayName){
  const mailOptions = {
    from: `mulleady96@gmail.com`,
    to: 'andrewmulleady@live.ie',
  };

  mailOptions.subject = `Welcome to Gravita Web Tech`;
  mailOptions.text = `Hey Andrew! Welcome to Gravita Web Tech.
  Thank you for your enquiry, I will be in touch in the coming days to talk through some of the ideas
  you have for your Web app.

  Thank you,
  Andrew Mulleady.`;

  return mailTransport.sendMail(mailOptions).then(() => {
    return console.log('New Welcome email sent to : Andrew Mulleady')
  });

}








// 2. Function: To send an email to myself, notifying me of the DB entry and it's contents.
