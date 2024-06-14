const nodemailer = require('nodemailer');

// Helper function to send email notifications
const sendEmail = (managerEmail, user, eventName, eventDescription, eventDate) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 587, // gmail SMTP port is 587
      secure: false,
      auth: {
          user: 'serenitysanctuary001@gmail.com',
          pass: 'xodb mvbl jxfh ixyb'
      }
  });

  // Define the email options
  const mailOptions = {
      from: `"Serenity Sanctuary Branch Manager" <${managerEmail}>`,
      to: user.email,
      replyTo: managerEmail,
      subject: `New Event: ${eventName}`,
      text: `Hi ${user.name},\n\nThere is a new event: ${eventName}.\n\nDescription: ${eventDescription}\nDate: ${eventDate}\n\nBest regards,\nBranch Manager`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error); // Log error if email fails to send
      }
      console.log(`Email sent to ${user.email}: ${info.response}`); // Log success message
  });
};

// Test the sendEmail function
const user = {
  email: 'sharzilhasnine847@gmail.com', // Replace with your email
  name: 'Test User'
};

sendEmail('sharzil6911@gmail.com', user, 'Test Event', 'This is a test event', '2024-06-14', 1);