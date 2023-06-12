import * as Yup from "yup"
export const validationSlider = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!')
     .max(20, 'Too Long!')
     .required('Required'),
    title: Yup.string().min(5,'Too Short!')
     .required('Required'),
    url: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email')
     .required('Required')
})