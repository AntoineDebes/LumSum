import * as Yup from 'yup';
const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export default Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string()  .matches(rePhoneNumber, 'Phone number is not valid')
    .required('Required'),
    subject: Yup.string().required('Required'),
    message: Yup.string().required('Required')
});