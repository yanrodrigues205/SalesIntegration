import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
});

export default transport;