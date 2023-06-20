import * as Yup from "yup"
export const validationourBlog = Yup.object().shape({
    type: Yup.string().min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
    time: Yup.string().min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
    comment: Yup.string().min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
   title: Yup.string().min(5,'Too Short!')
    .required('title required'),
   url: Yup.string().required('img required'),
})