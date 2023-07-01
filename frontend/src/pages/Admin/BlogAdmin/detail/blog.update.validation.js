import * as Yup from "yup"
export const validationourBlog = Yup.object().shape({
    type: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('category required'),
    time: Yup.date().max(new Date())
    .required('time required'),
    comment: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('comment required'),
   title: Yup.string().min(5,'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
    .required('title required'),
    url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('url required'),
  
})