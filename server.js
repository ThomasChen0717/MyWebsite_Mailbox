const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formData = require('form-data');
const Mailgun = require('mailgun.js');

const API_KEY = "b08df20bdf9e14af920819dd6c602824-408f32f3-b8e7881e";
const app = express();
const port = 3000;
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: API_KEY});
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { Name, EmailAddress, Message } = req.body;
    mg.messages.create('sandbox2f10007b0d644325ba334db08bee4436.mailgun.org', {
        from: "mailer <mailgun@sandbox2f10007b0d644325ba334db08bee4436.mailgun.org>",
        to: "thomaschenperiod3@gmail.com",
        subject: "New contact form submission",
        text: `From ${Name}:\n\n${Message}\n\nContact: ${EmailAddress}`,
    })
    .then(msg => {
        console.log(msg); // logs response data
        res.send('Email sent successfully');
    })
    .catch(err => {
        console.log(err); // logs any error
        res.status(500).send('Failed to send email');
    });
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});