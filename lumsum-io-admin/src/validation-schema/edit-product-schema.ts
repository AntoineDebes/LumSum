import * as Yup from 'yup';

export default Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    categoryId: Yup.string()
        .required('Required'),
    description: Yup.string(),
    icon: Yup.mixed().required('Image File is required!'),
    metaTitle: Yup.string()
        .required('Required'),
    metaDesc: Yup.string()
        .required('Required')
});