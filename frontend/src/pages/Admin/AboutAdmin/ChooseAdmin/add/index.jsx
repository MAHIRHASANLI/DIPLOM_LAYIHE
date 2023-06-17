import React, { useState } from "react";
import { useFormik } from "formik";
import style from "./index.module.css";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validationChoose } from "../validation.schema";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { PostChoose } from "../../../../../api/choose.requests";
import { useGlobalChoose } from "../../../../../global";

const AddChoose = () => {
  const navigate = useNavigate();
  const [globalChoose, setGlobalChoose] = useGlobalChoose();
  // const [image,setImage] = useState([])
  const [loading, setLoading] = useState(false);
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
        };
        PostChoose(newObj);
        setGlobalChoose([...globalChoose, values]);
        navigate("/admin/choose");
        setLoading(false);
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
    },
    validationSchema: validationChoose,
    onSubmit: handleSubmit,
  });
  function handleClick() {
    navigate("/admin/choose");
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
            className={style.input}
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

          <Button
            variant="outlined"
            style={{
              display: "block",
              margin: "20px auto",
              background: "white",
              borderRadius: "5px",
            }}
            type="submit"
            color={
              formik.errors.url && formik.touched.url ? "error" : "success"
            }
          >
            <AddShoppingCartIcon />
            &nbsp;&nbsp;&nbsp; Add Choose
          </Button>
          <Button
            onClick={handleClick}
            variant="outlined"
            style={{
              display: "block",
              margin: "10px auto",
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

export default AddChoose;
