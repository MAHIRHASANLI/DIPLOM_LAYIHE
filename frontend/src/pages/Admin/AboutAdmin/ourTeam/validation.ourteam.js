import * as Yup from "yup"

export const validationourTeam = Yup.object().shape({
    name: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
   title: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5,'Too Short!')
    .required('title required'),
    url:  Yup.mixed()
   .required("required!")
   .test(
     "FILE_SIZE",
     "Too big!",
     (value) => value && value.size < 1024 * 1024
   ).test(
     "FILE_TYPE",
     "Invalid!",
     (value) => value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
   ),
   linkedn: Yup.string()
   .url().trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('linkedn required'),
   twitter: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('twitter required'),
   pinterest: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('pintereas required'),
   facebook: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('facebook required'),
})