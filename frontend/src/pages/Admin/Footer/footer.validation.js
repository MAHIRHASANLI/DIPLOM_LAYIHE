import * as Yup from "yup";
export const validationFooter = Yup.object().shape({
   url: Yup.string().required('logo required'),
   urlblack: Yup.string().required('logo required'),
   count: Yup.string().min(2, 'Too Short!')
   .max(120, 'Too Long!')
   .required('name required'),
})