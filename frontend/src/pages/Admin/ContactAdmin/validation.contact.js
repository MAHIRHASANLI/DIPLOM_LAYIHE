import * as Yup from "yup"
export const validationContact = Yup.object().shape({
    address: Yup.string().min(2, 'Too Short!')
     .max(200, 'Too Long!')
     .required('address required'),
    mobile: Yup.number().min(5,'Too Short!')
     .required('mobile required'),
    email: Yup.string().email('Invalid email')
     .required('email required')
})