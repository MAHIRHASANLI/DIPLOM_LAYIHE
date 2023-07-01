import * as Yup from "yup"
export const validationSlider = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces')
    .strict(true)
     .max(20, 'Too Long!')
     .required('name required'),
    title: Yup.string().min(5,'Too Short!').max(200, 'Too Long!').trim('The contact name cannot include leading and trailing spaces')
    .strict(true)
     .required('title required'),
     url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('url required'),
    email: Yup.string().email('Invalid email').trim('The contact name cannot include leading and trailing spaces')
    .strict(true)
     .required('email required')
})