import * as Yup from "yup"
export const validationChoose = Yup.object().shape({
    name: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
     .max(20, 'Too Long!')
     .required('name required'),
    title: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5,'Too Short!').max(150, 'Too Long!')
     .required('title required'),
    url: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).required('img required'),
})