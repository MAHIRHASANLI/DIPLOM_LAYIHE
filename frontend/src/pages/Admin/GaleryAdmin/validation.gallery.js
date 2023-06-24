import * as Yup from "yup";
export const validationGallery = Yup.object().shape({
   url:  Yup.mixed()
   .required("required!")
   .test(
     "FILE_SIZE",
     "Too big!",
     (value) => value && value.size < 1024 * 1024
   ).test(
     "FILE_TYPE",
     "Invalid!",
     (value) => value && ["image/png", "image/jpeg"].includes(value.type)
   ),
   category: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
   .max(30, 'Too Long!')
   .required('name required'),
})