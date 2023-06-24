import * as Yup from "yup";
export const validationPassion = Yup.object().shape({
    about: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
    .max(30, 'Too Long!')
    .required('name required'),
   title: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5,'Too Short!').max(200, 'Too Long!')
    .required('title required'),
    url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('vieo uri required'),
    img:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('img required'),
//    img:  Yup.mixed()
//    .required("required!")
//    .test(
//      "FILE_SIZE",
//      "Too big!",
//      (value) => value && value.size < 1024 * 1024
//    ).test(
//      "FILE_TYPE",
//      "Invalid!",
//      (value) => value && ["image/png", "image/jpeg"].includes(value.type)
//    ),
})