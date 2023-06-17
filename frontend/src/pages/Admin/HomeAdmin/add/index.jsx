import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../../../global";
import { validationSlider } from "../validation.slider";
import { useFormik } from "formik";
import { PostSlider } from "../../../../api/slider.requests";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, TextField } from "@mui/material";
const AdSlider = () => {
  const navigate = useNavigate();
  // const [image,setImage] = useState([])
  const [loading, setLoading] = useState(false);
  const [globalSlider, setGlobalSlider] = useGlobalData();
  function handleSubmit(values, actions) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", values.url);
    formData.append("upload_preset", "w2bgln2g");
    axios
      .post("https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload", formData)
      .then((res) => {
        const newObj = {
          name: values.name,
          title: values.title,
          url: res.data.secure_url,
          email: values.email,
        };
        PostSlider(newObj);
        setGlobalSlider([...globalSlider, values]);

        navigate("/admin/home");
        setLoading(false);
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      email: "",
    },
    validationSchema: validationSlider,
    onSubmit: handleSubmit,
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
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.errors.name && formik.touched.name ? true : false}
            name="name"
            id="outlined-basic"
            label={
              formik.errors.name && formik.touched.name ? (
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              ) : (
                "Add Name"
              )
            }
            variant="outlined"
          />

          <TextField
            type="text"
            style={{
              width: "100%",
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.errors.title && formik.touched.title ? true : false}
            name="title"
            id="outlined-basic"
            label={
              formik.errors.title && formik.touched.title ? (
                <p style={{ color: "red" }}>{formik.errors.title}</p>
              ) : (
                "Add Title"
              )
            }
            variant="outlined"
          />
          {/* setSelectImage(e.target.files[0]); */}

          <TextField
            style={{
              width: "100%",
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.url}
            error={formik.errors.url && formik.touched.url ? true : false}
            name="url"
            id="outlined-basic"
            variant="outlined"
            label={
              formik.errors.url && formik.touched.url ? (
                <p style={{ color: "red" }}>{formik.errors.url}</p>
              ) : (
                "Add Image"
              )
            }
          />

          <TextField
            style={{
              width: "100%",
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.errors.email && formik.touched.email ? true : false}
            name="email"
            id="outlined-basic"
            variant="outlined"
            label={
              formik.errors.email && formik.touched.email ? (
                <p style={{ color: "red" }}>{formik.errors.email}</p>
              ) : (
                "Add Email"
              )
            }
          />

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
