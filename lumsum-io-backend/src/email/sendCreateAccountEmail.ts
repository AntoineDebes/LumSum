import registerTemplate from './templates/register';

const mailchimp = require('@mailchimp/mailchimp_transactional')('433ec4e0982d316ec9aa37be567d8aab-us5');

const sendCreateAccountEmail = async (to: string, locals: any) => {
    console.log(to);
    const emailTemplate: string = registerTemplate(locals);
    return mailchimp.messages.send({
        message: {
            from_email: 'info@lumsum.io',
            from_name: 'Lumsum',
            subject: 'Welcome to Lumsum',
            html: emailTemplate,
            to: [
                {
                    email: 'awais00772@gmail.com',
                    name: locals.name,
                    type: 'to',
                },
            ],
        },
    });
}

export default sendCreateAccountEmail;