import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../../../global";
import { validationSlider } from "../validation.slider";
import { useFormik } from "formik";
import { PostSlider } from "../../../../api/slider.requests";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, TextField } from "@mui/material";
import Fab from "@mui/material/Fab";
import { useEffect } from "react";

const AdSlider = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [globalSlider, setGlobalSlider] = useGlobalData();

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  //Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      email: "",
    },
    validationSchema: validationSlider,
    onSubmit: async (values, actions) => {
      setLoading(true);
     const uniqueemail = globalSlider.find((m)=>m.email === values.email)
    if(uniqueemail){
      window.alert("Enter another email!!!")
    }else{
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "flrfgfh2");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          name: values.name,
          title: values.title,
          url: res.data.secure_url,
          email: values.email,
        };
       await PostSlider(newObj);
        setGlobalSlider([...globalSlider, newObj]);
        navigate("/admin/home");
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    }
  });
  function handleClick() {
    navigate("/admin/home");
  }
  return (
    <div className="Form">
      {loading ? (
        <div style={{ paddingBottom: "30px" }}>Loading...</div>
      ) : (
        <form className="Form__item" onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            style={{
              width: "100%",
              background: "white",
              borderRadius: "5px",
            }}
            margin="dense"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name && formik.touched.name ? true : false}
            name="name"
            label={
              formik.errors.name && formik.touched.name ? (
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              ) : (
                "Add Name"
              )
            }
          />

          <TextField
            type="text"
            style={{
              width: "100%",
              background: "white",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            label={
              formik.errors.title && formik.touched.title ? (
                <span style={{ color: "red" }}>{formik.errors.title}</span>
              ) : (
                "  edit title"
              )
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.errors.title && formik.touched.title ? true : false}
            name="title"
          />

          <TextField
            type="email"
            style={{
              width: "100%",
              background: "white",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email && formik.touched.email ? true : false}
            name="email"
            label={
              formik.errors.email && formik.touched.email ? (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              ) : (
                "Add Email"
              )
            }
          />
          <label className="file_img" htmlFor="upload-photo">
            <TextField
              style={{ display: "none" }}
              id="upload-photo"
              type="file"
              name="url"
              error={formik.errors.url && formik.touched.url ? true : false}
              onBlur={formik.handleBlur}
              onChange={(e) => formik.setFieldValue("url", e.target.files[0])}
            />

            <Fab
              component="span"
              aria-label="add"
              margin="dense"
              id="filled-hidden-label-small"
              variant="outlined"
              size="small"
              style={{
                width: "100%",
                background: "white",
                borderRadius: "5px",
              }}
            >
              {formik.errors.url && formik.touched.url ? (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.url}
                </span>
              ) : (
                <span style={{ color: "black", fontSize: "14px" }}>
                  {" "}
                  + Upload photo
                </span>
              )}
            </Fab>
          </label>

          <Button
            variant="outlined"
            style={{
              display: "block",
              margin: "15px auto",
              background: "white",
              borderRadius: "5px",
            }}
            type="submit"
            color={
              formik.errors.email && formik.touched.email ? "error" : "success"
            }
          >
            <AddShoppingCartIcon />
            &nbsp;&nbsp;&nbsp; Add Slider
          </Button>
          <Button
            onClick={handleClick}
            variant="outlined"
            style={{
              display: "block",
              margin: "15px auto",
              background: "white",
              borderRadius: "5px",
            }}
            color="error"
          >
            Go back
          </Button>
        </form>
      )}
    </div>
  );
};

export default AdSlider;
