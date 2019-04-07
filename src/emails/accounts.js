const sgmail = require('@sendgrid/mail')

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'dylan.ward@iinet.net.au',
        subject: 'Thanks for signing up!',
        text: `Welcome to the app, ${name}. Let me know how you like the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'dylan.ward@iinet.net.au',
        subject: 'You account has been deleted',
        text:  `${name} your account has been deleted.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}