import * as Yup from "yup";
export const validationPassion = Yup.object().shape({
    about: Yup.string().min(2, 'Too Short!')
    .max(200, 'Too Long!')
    .required('name required'),
   title: Yup.string().min(5,'Too Short!').max(200, 'Too Long!')
    .required('title required'),
   url: Yup.string().required('img required'),
})