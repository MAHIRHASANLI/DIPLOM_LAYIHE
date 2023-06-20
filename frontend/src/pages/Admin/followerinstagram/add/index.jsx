import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { validationFollower } from "../followinstagram.validation";
import { GetAllFollowInstagram, PostFollowInstagram } from "../../../../api/followinginstagram.requests";

const AddFollower = () => {
  const navigate = useNavigate();
  const [follower, setFollower] = React.useState([]);
  React.useEffect(() => {
    GetAllFollowInstagram().then((res) => {
        setFollower(res);
    });
  }, []);  // const [image,setImage] = useState([])
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
          count: values.count,
          url: res.data.secure_url,
        };
        PostFollowInstagram(newObj);
        setFollower([...follower, values]);
        navigate("/admin/follower");
        setLoading(false);
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      count: "",
      url: "",
    },
    validationSchema: validationFollower,
    onSubmit: handleSubmit,
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
              marginTop: "10px",
              background: "white",
              borderRadius: "5px",
            }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.count}
            error={formik.errors.count && formik.touched.count ? true : false}
            name="count"
            id="outlined-basic"
            label={
              formik.errors.count && formik.touched.count ? (
                <span style={{ color: "red" }}>{formik.errors.count}</span>
              ) : (
                "add count"
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
