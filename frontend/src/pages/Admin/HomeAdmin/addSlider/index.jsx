import React from 'react'
import { useFormik } from "formik";
import { validationSlider } from '../validation.slider';
import { PostSlider } from '../../../../api/slider.requests';
import style from "./index.module.css"
import axios from 'axios';
import Swal from "sweetalert2"
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const AddSlider = () => {
    const navigate = useNavigate()
    function handleSubmitt(values,actions){
        const formData = new FormData()
        formData.append("file", values.url);
        formData.append("upload_preset", "vuqjjql1")
        axios.post("https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload", formData).then((res)=>{
          const newObj ={
            name: values.name,
            title: values.title,
            url: res.data.secure_url,
            email: values.email,
          }
          PostSlider(newObj);
          navigate("/admin")
          let timerInterval
Swal.fire({
  title: 'Auto close alert!',
  html: 'I will close in <b></b> milliseconds.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
          actions.resetForm();
         })
      }
      const formik = useFormik({
        initialValues: {
          name: "",
          title: "",
          url: "",
          email: ""
        },
        validationSchema: validationSlider,
        onSubmit: handleSubmitt,
      });
  return (
    <div className={style.Form}>
     <form className={style.Form__item} onSubmit={formik.handleSubmit}>
     <TextField type='text'  style={{width:"100%",marginTop:"10px"}}   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} error={formik.errors.name && formik.touched.name ?true : false} name='name' id="outlined-basic" label="Name" variant="outlined" />
     {formik.errors.name && formik.touched.name && (
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        )}
     <TextField type='text'  style={{width:"100%",marginTop:"10px"}}   className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} error={formik.errors.title && formik.touched.title ?true : false} name='title' id="outlined-basic" label="Title" variant="outlined" />
     {formik.errors.title && formik.touched.title && (
          <p style={{ color: "red" }}>{formik.errors.title}</p>
        )}
     <TextField   style={{width:"100%",marginTop:"10px"}}  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' id="outlined-basic"  variant="outlined" label="Image" />
     {formik.errors.url && formik.touched.url && (
          <p style={{ color: "red" }}>{formik.errors.url}</p>
        )}<TextField type='email' style={{width:"100%",marginTop:"10px"}}  className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} error={formik.errors.email && formik.touched.email ?true : false} name='email' id="outlined-basic" label="Email" variant="outlined" />
      {formik.errors.email && formik.touched.email && (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        )}
    <Button variant='contained' style={{display:"block", margin:"20px auto"}} type='submit'>add</Button>
     </form></div>
  )
}

export default AddSlider