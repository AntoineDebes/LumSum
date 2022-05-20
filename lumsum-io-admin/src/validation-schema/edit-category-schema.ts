import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  description: Yup.string().required("Required"),
  icon: Yup.mixed()
      .required("Image File is required!")
      .test('fileSize', "File Size is too large", value => (value && value.size <= 90000000) || value && value.size == null)
      .test('fileType', "Unsupported File Format", value => ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value && value.type) || value && value.type == null || value == null),
  banner: Yup.mixed()
      .notRequired()
      .test('fileSize', "File Size is too large", value => (value && value.size <= 90000000) || value && value.size == null || value == null)
      .test('fileType', "Unsupported File Format", value => ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value && value.type) || value && value.type == null || value == null),
  bannerMobile: Yup.mixed()
      .notRequired()
      .test('fileSize', "File Size is too large", value => (value && value.size <= 90000000) || value && value.size == null || value == null)
      .test('fileType', "Unsupported File Format", value => ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(value && value.type) || value && value.type == null || value == null),
  bannerUrl: Yup.mixed().notRequired(),
  bannerActive: Yup.boolean().required("Required"),
  metaTitle: Yup.string().required("Required"),
  metaDesc: Yup.string().required("Required"),
});
