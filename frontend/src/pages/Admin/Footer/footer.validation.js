import * as Yup from "yup";
export const validationFooter = Yup.object().shape({
   url: Yup.string().required('img required'),
   name: Yup.string().min(2, 'Too Short!')
   .max(30, 'Too Long!')
   .required('name required'),
})