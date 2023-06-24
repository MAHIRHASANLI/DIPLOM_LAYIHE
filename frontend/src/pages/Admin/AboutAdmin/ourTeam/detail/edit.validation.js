import * as Yup from "yup"
const regMatchFirst = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

export const editvalidationourTeam = Yup.object().shape({
    name: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('name required'),
   title: Yup.string().trim('The contact name cannot include leading and trailing spaces').strict(true).min(5,'Too Short!')
    .required('title required'),
    url:Yup.string().url().trim('The contact name cannot include leading and trailing spaces').strict(true).required('url required'),
    linkedn: Yup.string()
   .matches(regMatch,regMatchFirst, "Website should be a valid URL").trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('linkedn required'),
   twitter: Yup.string().matches(regMatch,regMatchFirst, "Website should be a valid URL").trim('The contact name cannot include leading and trailing spaces').strict(true).required('twitter required'),
   pinterest: Yup.string().matches(regMatch,regMatchFirst, "Website should be a valid URL").trim('The contact name cannot include leading and trailing spaces').strict(true)
   .required('pintereas required'),
   facebook: Yup.string().matches(regMatchFirst,regMatch,'Enter correct url!').trim('The contact name cannot include leading and trailing spaces').strict(true).required('facebook required'),

})