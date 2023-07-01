import * as Yup from "yup";
export const validationFooter = Yup.object().shape({
   url: Yup.string().url().required('logo required').trim('The contact name cannot include leading and trailing spaces').strict(true),
   urlblack: Yup.string().url().required('logo required').trim('The contact name cannot include leading and trailing spaces').strict(true),
   count: Yup.string().min(2, 'Too Short!')
   .max(120, 'Too Long!').trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('name required'),
})

///
// import * as Yup from "yup";
// export const validationFooter = Yup.object().shape({
//   url:  Yup.mixed()
//   .required("required!")
//   .test(
//     "FILE_SIZE",
//     "Too big!",
//     (value) => value && value.size < 1024 * 1024
//   ).test(
//     "FILE_TYPE",
//     "url Invalid!",
//     (value) => value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
//   ),   urlblack:  Yup.mixed()
//    .required("required!")
//    .test(
//      "FILE_SIZE",
//      "Too big!",
//      (value) => value && value.size < 1024 * 1024
//    ).test(
//      "FILE_TYPE",
//      "urlblack Invalid!",
//      (value) => value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
//    ),   count: Yup.string().min(2, 'Too Short!')
//    .max(120, 'Too Long!').trim('The contact name cannot include leading and trailing spaces').strict(true)
//    .required('name required'),
// })