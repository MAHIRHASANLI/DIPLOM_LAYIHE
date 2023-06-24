import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Fab, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { PostBlog } from "../../../../api/blog.requests";
import { validationourBlog } from "../validation.blog";
import { useGlobalBlog } from "../../../../global";


import DatePicker from 'react-date-picker';
const AddBlog = () => {
  const navigate = useNavigate();
  const [globalBlog, setGlobalBlog] = useGlobalBlog();
  // const [image,setImage] = useState([])
  const [loading, setLoading] = useState(false);
 
  const formik = useFormik({
    initialValues: {
      type: "",
      title: "",
      time: "",
      comment: "",
      url: "",
    },
    validationSchema: validationourBlog,
    onSubmit:  async (values, actions) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "bneya0lk");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          type: values.type,
          title: values.title,
          time: values.time,
          comment: values.comment,
          url: res.data.secure_url,
        };
        PostBlog(newObj);
        setGlobalBlog([...globalBlog, newObj]);
        navigate("/admin/blog");
        setLoading(false);
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
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
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
            error={formik.errors.type && formik.touched.type ? true : false}
            name="type"
            label={
              formik.errors.type && formik.touched.type ? (
                <span style={{ color: "red" }}>{formik.errors.type}</span>
              ) : (
                "add category"
              )
            }
          />

          <TextField
            type="text"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
            error={formik.errors.title && formik.touched.title ? true : false}
            name="title"
            label={
              formik.errors.title && formik.touched.title ? (
                <span style={{ color: "red" }}>{formik.errors.title}</span>
              ) : (
                "add title"
              )
            }
          />
          <TextField
            type="date"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.time}
            error={formik.errors.time && formik.touched.time ? true : false}
            name="time"
            label={
              formik.errors.time && formik.touched.time ? (
                <span style={{ color: "red",marginLeft:"80px"}}>                                       {formik.errors.time}</span>
              ) : (
                <span style={{ color: "black",marginLeft:"70px"}}>ad date</span>
              )
            }
          />
 
          <TextField
             type="text"
             style={{
               width: "100%",
               borderRadius: "5px",
             }}
             margin="dense"
             id="filled-hidden-label-small"
             variant="outlined"
             size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
            error={
              formik.errors.comment && formik.touched.comment ? true : false
            }
            name="comment"
            label={
              formik.errors.comment && formik.touched.comment ? (
                <span style={{ color: "red" }}>{formik.errors.comment}</span>
              ) : (
                "add comment"
              )
            }
          />

          <label className="file_img" htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="url"
              type="file"
              onChange={(e) => formik.setFieldValue("url", e.target.files[0])}
            />

            <Fab
              color="info"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              style={{ marginTop: "10px" }}
            >
              {formik.errors.url && formik.touched.url ? (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.url}
                </span>
              ) : (
                <span style={{ color: "white", fontSize: "14px" }}>
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
