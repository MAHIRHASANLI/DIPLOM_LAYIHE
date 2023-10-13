import * as Yup from "yup"
export const validationHomeAboutIMG = Yup.object().shape({
  url: Yup.mixed()
    .required("required!")
    .test(
      "FILE_SIZE",
      "Too big!",
      (value) => value && value.size < 1024 * 1024
    ).test(
      "FILE_TYPE",
      "Invalid!",
      (value) => value && ["image/png", "image/jpeg", "image/webp"].includes(value.type)
    ),
})