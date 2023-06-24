import * as Yup from "yup";
export const validationFooter = Yup.object().shape({
   url: Yup.string().required('logo required').trim('The contact name cannot include leading and trailing spaces').strict(true),
   urlblack: Yup.string().required('logo required').trim('The contact name cannot include leading and trailing spaces').strict(true),
   count: Yup.string().min(2, 'Too Short!')
   .max(120, 'Too Long!').trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('name required'),
})