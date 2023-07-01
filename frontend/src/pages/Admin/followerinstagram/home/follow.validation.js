import * as Yup from "yup";
export const validationFollower = Yup.object().shape({
   url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('url required'),
   count: Yup.string().min(2, 'Too Short!').trim('The contact name cannot include leading and trailing spaces').strict(true)
   .max(30, 'Too Long!')
   .required('count required'),
})