import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
    host: 'lumsum.io',
    port: 465,
    auth: {
        user: 'info@lumsum.io',
        pass: '?2m.AN%mml@H'
    },
    tls: {
        rejectUnauthorized: false
    }
});