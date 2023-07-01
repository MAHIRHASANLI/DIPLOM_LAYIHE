import * as Yup from "yup";

export const UsersValidation= Yup.object().shape({
    username: Yup.string().min(5, 'Too Short!').trim('The contact username cannot include leading and trailing spaces').strict(true)
    .max(20, 'Too Long!')
    .required('username required'),
    email: Yup.string().email('Invalid email').trim('The contact required cannot include leading and trailing spaces')
    .strict(true)
     .required('email required'),
     password: Yup.string().min(5, 'Too Short!').trim('The contact password cannot include leading and trailing spaces').strict(true)
     .max(20, 'Too Long!')
     .required('password required'),
     checkbox: Yup.bool().oneOf([true], 'You must accept the terms!'),
})