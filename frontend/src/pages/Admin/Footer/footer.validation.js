import * as Yup from "yup";
export const validationFooter = Yup.object().shape({
   url: Yup.string().url().required('logo required').trim('The contact url cannot include leading and trailing spaces').strict(true),
   urlblack: Yup.string().url().required('logo required').trim('The contact urlblack cannot include leading and trailing spaces').strict(true),
   count: Yup.string().min(2, 'Too Short!')
   .max(120, 'Too Long!').trim('The contact count cannot include leading and trailing spaces').strict(true)
   .required('count required'),
})