import * as Yup from "yup"

export const editvalidationourTeam = Yup.object().shape({
    name: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
   title: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5,'Too Short!')
    .required('title required'),
    url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('url required'),
    linkedn: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('linkedn required'),
   twitter: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('twitter required'),
   pinterest: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('pintereas required'),
   facebook: Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('facebook required'),

})