import * as Yup from "yup"
export const validationHomeAboutIMG = Yup.object().shape({
    url: Yup.string().required('img required'),
})