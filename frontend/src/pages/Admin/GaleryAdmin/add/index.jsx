import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { PostGallery } from "../../../../api/gallery.requests";
import { validationGallery } from "../validation.gallery";

const AdGallery = () => {
  const navigate = useNavigate();
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
          url: res.data.secure_url,
          category: values.category,
        };
        PostGallery(newObj);
        navigate("/admin/galery");
        setLoading(false);
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      url: "",
      category: "",
    },
    validationSchema: validationGallery,
    onSubmit: handleSubmit,
  });
  function handleClick() {
    navigate("/admin/galery");
  }
  return (
    <div className="Form">
      {loading ? (
        <div style={{ paddingBottom: "30px" }}>Loading...</div>
      ) : (
        <form className="Form__item" onSubmit={formik.handleSubmit}>
          {/* setSelectImage(e.target.files[0]); */}
          {formik.errors.category && formik.touched.category ? (
            <span style={{ color: "red" }}>{formik.errors.category}</span>
          ) : (
            <span>add category:</span>
          )}
          <Select
            margin="normal"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            //    label="Age"
            labelId="demo-simple-select-label"
            // id="demo-simple-select"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            error={
              formik.errors.category && formik.touched.category ? true : false
            }
            name="category"
          >
            <MenuItem value="human">Human</MenuItem>
            <MenuItem value="nature">Nature</MenuItem>
            <MenuItem value="country">Country</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>

          {formik.errors.url && formik.touched.url ? (
            <span style={{ color: "red" }}>{formik.errors.url}</span>
          ) : (
            <span>add image</span>
          )}
          <TextField
            margin="dense"
            hiddenLabel
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.url}
            error={formik.errors.url && formik.touched.url ? true : false}
            name="url"
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
            &nbsp;&nbsp;&nbsp; Add Gallery
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

export default AdGallery;
