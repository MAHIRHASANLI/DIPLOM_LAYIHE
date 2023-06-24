import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Fab, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { validationFollower } from "../followinstagram.validation";
import {
  GetAllFollowInstagram,
  PostFollowInstagram,
} from "../../../../api/followinginstagram.requests";

const AddFollower = () => {
  const navigate = useNavigate();
  const [follower, setFollower] = React.useState([]);
  React.useEffect(() => {
    GetAllFollowInstagram().then((res) => {
      setFollower(res);
    });
  }, []); // const [image,setImage] = useState([])
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      count: "",
      url: "",
    },
    validationSchema: validationFollower,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "eltc4qvh");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          url: res.data.secure_url,
          count: values.count,
        };
        PostFollowInstagram(newObj);
        setFollower([...follower, newObj]);
        navigate("/admin/follower");
        setLoading(false);
        actions.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  function handleClick() {
    navigate("/admin/follower");
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
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.count}
            error={formik.errors.count && formik.touched.count ? true : false}
            name="count"
            label={
              formik.errors.count && formik.touched.count ? (
                <span style={{ color: "red" }}>{formik.errors.count}</span>
              ) : (
                "add count"
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
            &nbsp;&nbsp;&nbsp; Add Follower
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

export default AddFollower;
