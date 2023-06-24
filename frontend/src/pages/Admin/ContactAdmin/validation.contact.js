import * as Yup from "yup"
export const validationContact = Yup.object().shape({
    address: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
     .max(200, 'Too Long!')
     .required('address required'),
    mobile: Yup.number().min(5,'Too Short!')
     .required('mobile required'),
    email: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).email('Invalid email')
     .required('email required')
})