import ContactUs from '../entity/ContactUs';
// import sendEmail from '../../../helpers/send-mail';
import sendContactUsEmail from '../../../email/sendContactUsEmail';

interface IContactUs {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// https://github.com/typeorm/typeorm/blob/master/docs/entities.md
export default {
    Mutation: {
        contactUs: async (_: any, args: IContactUs) => {
            const newContactUs = new ContactUs();
            newContactUs.name = args.name;
            newContactUs.email = args.email;
            newContactUs.phone = args.phone;
            newContactUs.subject = args.subject;
            newContactUs.message = args.message;
            try {
                await newContactUs.save();
                // const message = {
                //     from: 'info@lumsum.io', // Sender address
                //     to: 'info@lumsum.io',         // List of recipients
                //     subject: args.subject, // Subject line
                //     text: args.message // Plain text body
                // };
                // await sendEmail(message);
                await sendContactUsEmail('info@lumsum.io', args);
                return true;
            } catch (error) {
                throw error;
            }
        }
    }
}