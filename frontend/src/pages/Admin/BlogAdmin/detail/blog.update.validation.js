import * as Yup from "yup"
export const validationourBlog = Yup.object().shape({
    type: Yup.string().min(2, 'Too Short!').trim('The contact type cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('type required'),
    time: Yup.date().max(new Date())
    .required('time required'),
    comment: Yup.string().min(2, 'Too Short!').trim('The contact comment cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('comment required'),
   title: Yup.string().min(5,'Too Short!').trim('The contact title cannot include leading and trailing spaces').strict(true)
    .required('title required'),
    url:Yup.string().url().trim('The contact url cannot include leading and trailing spaces').strict(true).required('url required'),
})