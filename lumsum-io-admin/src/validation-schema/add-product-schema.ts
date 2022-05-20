import * as Yup from 'yup';
import { ID_MATCH_REGEX } from './regex';

export default Yup.object().shape({
    id: Yup.string()
        .required('Id is required!')
        .matches(ID_MATCH_REGEX, "Invalid key"),
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    categoryId: Yup.string()
        .required('Required'),
    desc: Yup.string()
        .required('Required'),
    icon: Yup.mixed().required('Image File is required!'),
    metaTitle: Yup.string()
        .required('Required'),
    metaDesc: Yup.string()
        .required('Required')
});