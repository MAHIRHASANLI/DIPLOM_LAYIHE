import * as Yup from "yup";

export const UsersValidation= Yup.object().shape({
    username: Yup.string().min(5, 'Too Short!').trim('The contact username cannot include leading and trailing spaces').strict(true)
    .required('username required'),
     password: Yup.string().min(5, 'Too Short!').trim('The contact password cannot include leading and trailing spaces').strict(true)
     .max(20, 'Too Long!')
     .required('password required'),
     confirmpassword: Yup.string().min(5, 'Too Short!').trim('The contact confirmpassword cannot include leading and trailing spaces').strict(true)
     .max(20, 'Too Long!')
     .required('confirmpassword required') 
})