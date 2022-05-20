import { readFileSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';
import transport from '../config/transport';

// Open template file
const source = readFileSync(join(__dirname, 'templates', 'contact-us.hbs'), 'utf8');
// Create email generator
const template = Handlebars.compile(source);

const sendCreateAccountEmail = async (to: string, locals: any) => {
    const options = {
        from: 'info@lumsum.io',
        to: to,
        subject: "Contact Us",
        html: template(locals)
    }
    return await transport.sendMail(options);
}

export default sendCreateAccountEmail;