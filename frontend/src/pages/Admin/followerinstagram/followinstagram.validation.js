import * as Yup from "yup";
export const validationFollower = Yup.object().shape({
   url: Yup.string().required('img required'),
   count: Yup.string().min(2, 'Too Short!')
   .max(30, 'Too Long!')
   .required('count required'),
})