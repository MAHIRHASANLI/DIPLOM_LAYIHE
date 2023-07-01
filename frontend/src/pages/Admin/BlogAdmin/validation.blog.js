import * as Yup from "yup"
export const validationourBlog = Yup.object().shape({
    type: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('type required'),
    time: Yup.date()
    .min(new Date())
    .required(),
    comment: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('comment required'),
   title: Yup.string().min(5,'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .required('title required'),
    url: Yup.mixed()
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
})