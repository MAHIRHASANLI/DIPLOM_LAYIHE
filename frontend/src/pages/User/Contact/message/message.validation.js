import * as Yup from "yup";

export const MessageValidation = Yup.object().shape({
    name: Yup.string().min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
    surname: Yup.string().min(5, 'Too Short!')
    .max(20, 'Too Long!')
    .required('surname required'),
    email: Yup.string().email('Invalid email')
     .required('email required'),
     comment:Yup.string().min(10, 'Too Short!')
     .max(200, 'Too Long!')
     .required('comment required'),
})