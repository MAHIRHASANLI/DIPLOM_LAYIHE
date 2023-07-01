import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, Fab, MenuItem, Select } from "@mui/material";
import { PostGallery } from "../../../../api/gallery.requests";
import { validationGallery } from "../validation.gallery";
import { useEffect } from "react";

const AdGallery = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      url: "",
      category: "",
    },
    validationSchema: validationGallery,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "ohj21ecl");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          url: res.data.secure_url,
          category: values.category,
        };
        PostGallery(newObj);
        navigate("/admin/galery");
        setLoading(false);
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
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
          {formik.errors.category && formik.touched.category ? (
            <span style={{ color: "red" }}>{formik.errors.category}</span>
          ) : (
            <span>add category:</span>
          )}
          <Select
            margin="normal"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            style={{ width: "100%" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            error={
              formik.errors.category && formik.touched.category ? true : false
            }
            label={
              formik.errors.category && formik.touched.category ? (
                <span style={{ color: "red" }}>{formik.errors.category}</span>
              ) : (
                <span style={{ color: "blue" }}>update category</span>
              )
            }
            name="category"
          >
            <MenuItem value="human">Human</MenuItem>
            <MenuItem value="nature">Nature</MenuItem>
            <MenuItem value="country">Country</MenuItem>
            <MenuItem value="video">Video</MenuItem>
          </Select>


          <label className="file_img" htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="url"
              type="file"
              onChange={(e) => formik.setFieldValue("url", e.target.files[0])}
              onBlur={formik.handleBlur}
              error={formik.errors.url && formik.touched.url ? true : false}
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
