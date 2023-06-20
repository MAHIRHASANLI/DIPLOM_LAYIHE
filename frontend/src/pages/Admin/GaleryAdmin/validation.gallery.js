import * as Yup from "yup";
export const validationGallery = Yup.object().shape({
   url: Yup.string().required('img required'),
   category: Yup.string().min(2, 'Too Short!')
   .max(30, 'Too Long!')
   .required('name required'),
})