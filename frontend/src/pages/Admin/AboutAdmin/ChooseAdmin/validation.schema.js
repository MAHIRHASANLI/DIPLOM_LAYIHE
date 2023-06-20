import * as Yup from "yup"
export const validationChoose = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!')
     .max(20, 'Too Long!')
     .required('name required'),
    title: Yup.string().min(5,'Too Short!').max(150, 'Too Long!')
     .required('title required'),
    url: Yup.string().required('img required'),
})