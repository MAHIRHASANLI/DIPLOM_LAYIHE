import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { PostBlog } from "../../../../api/blog.requests";
import { validationourBlog } from "../validation.blog";
import { useGlobalBlog } from "../../../../global";

const AddBlog = () => {
  const navigate = useNavigate();
  const [globalBlog, setGlobalBlog] = useGlobalBlog();
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
          type: values.type,
          title: values.title,
          time: values.time,
          comment: values.comment,
          url: res.data.secure_url,
        };
        PostBlog(newObj);
        setGlobalBlog([...globalBlog, values]);
        navigate("/admin/blog");
        setLoading(false);
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      type: "",
      title: "",
      time: "",
      comment: "",
      url: "",
    },
    validationSchema: validationourBlog,
    onSubmit: handleSubmit,
  });
  function handleClick() {
    navigate("/admin/team");
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
            value={formik.values.type}
            error={formik.errors.type && formik.touched.type ? true : false}
            name="type"
            id="outlined-basic"
            label={
              formik.errors.type && formik.touched.type ? (
                <span style={{ color: "red" }}>{formik.errors.type}</span>
              ) : (
                "add category"
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
                <span style={{ color: "red" }}>{formik.errors.title}</span>
              ) : (
                "add title"
              )
            }
            variant="outlined"
          />
          {/* setSelectImage(e.target.files[0]); */}
          <TextField
            type="date"
            style={{
              width: "100%",
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            error={formik.errors.time && formik.touched.time ? true : false}
            name="time"
            id="outlined-basic"
            label={
              formik.errors.time && formik.touched.time ? (
                <span style={{ color: "red" }}>{formik.errors.time}</span>
              ) : (
                "add time"
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
            value={formik.values.comment}
            error={
              formik.errors.comment && formik.touched.comment ? true : false
            }
            name="comment"
            id="outlined-basic"
            label={
              formik.errors.comment && formik.touched.comment ? (
                <span style={{ color: "red" }}>{formik.errors.comment}</span>
              ) : (
                "add comment"
              )
            }
            variant="outlined"
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
            value={formik.values.url}
            error={formik.errors.url && formik.touched.url ? true : false}
            name="url"
            id="outlined-basic"
            variant="outlined"
            label={
              formik.errors.url && formik.touched.url ? (
                <span style={{ color: "red" }}>{formik.errors.url}</span>
              ) : (
                "add image"
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
            &nbsp;&nbsp;&nbsp; Add Team
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

export default AddBlog;
