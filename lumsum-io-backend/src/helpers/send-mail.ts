import transport from '../config/transport';

const sendEmail = (message:any) => {
    return new Promise((resolve, reject) => {
        transport.sendMail(message, function (err, info) {
            if (err) {
                reject(err);
            } else {
                console.log('Mail sent!');
                resolve(info);
            }
        });
    })
}

export default sendEmail;
