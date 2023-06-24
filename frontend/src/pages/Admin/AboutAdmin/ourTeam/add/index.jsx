import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Fab, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useGlobalTeam } from "../../../../../global";
import { PostTeam } from "../../../../../api/ourteam.requests";
import { validationourTeam } from "../validation.ourteam";

const AddTeam = () => {
  const navigate = useNavigate();
  const [globalTeam, setGlobalTeam] = useGlobalTeam();
  // const [image,setImage] = useState([])
  const [loading, setLoading] = useState(false);
 
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      pinterest: "",
      twitter: "",
      linkedn: "",
      facebook: "",
    },
    validationSchema: validationourTeam,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "cwgresvq");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          name: values.name,
          title: values.title,
          url: res.data.secure_url,
          pinterest: values.pinterest,
          twitter: values.twitter,
          linkedn: values.linkedn,
          facebook: values.facebook,
        };
        PostTeam(newObj);
        setGlobalTeam([...globalTeam, newObj]);
        setLoading(false);
        navigate("/admin/team");
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
            value={formik.values.name}
            error={formik.errors.name && formik.touched.name ? true : false}
            name="name"
            label={
              formik.errors.name && formik.touched.name ? (
                <span style={{ color: "red" }}>{formik.errors.name}</span>
              ) : (
                "add name"
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
            value={formik.values.linkedn}
            error={
              formik.errors.linkedn && formik.touched.linkedn ? true : false
            }
            name="linkedn"
            label={
              formik.errors.linkedn && formik.touched.linkedn ? (
                <span style={{ color: "red" }}>{formik.errors.linkedn}</span>
              ) : (
                "add linkedn"
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
            value={formik.values.facebook}
            error={
              formik.errors.facebook && formik.touched.facebook ? true : false
            }
            name="facebook"
            label={
              formik.errors.facebook && formik.touched.facebook ? (
                <span style={{ color: "red" }}>{formik.errors.facebook}</span>
              ) : (
                "add facebook"
              )
            }
          />
          {/* setSelectImage(e.target.files[0]); */}

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
            value={formik.values.twitter}
            error={
              formik.errors.twitter && formik.touched.twitter ? true : false
            }
            name="twitter"
            label={
              formik.errors.twitter && formik.touched.twitter ? (
                <span style={{ color: "red" }}>{formik.errors.twitter}</span>
              ) : (
                "add twitter"
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
            value={formik.values.pinterest}
            error={
              formik.errors.pinterest && formik.touched.pinterest ? true : false
            }
            name="pinterest"
            label={
              formik.errors.pinterest && formik.touched.pinterest ? (
                <span style={{ color: "red" }}>{formik.errors.pinterest}</span>
              ) : (
                "add pinterest"
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

export default AddTeam;
