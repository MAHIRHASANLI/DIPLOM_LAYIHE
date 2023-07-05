import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Iframe from "react-iframe";
// import required modules
import { Button, Fab, TextField } from "@mui/material";
import { validationPassion } from "../validation.passion";
import {
  GetByIdPosion,
  PutPassion,
} from "../../../../../api/position.requests";
import { useGlobalPassion } from "../../../../../global";
import axios from "axios";
///grid//
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const DetailPassion = () => {
  const [globalPassion, setGlobalPassion, load, setLoad] = useGlobalPassion();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (globalPassion === null) {
      navigate("/admin/passion");
    }
  }, [globalPassion, navigate]);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  const slider = document.getElementById("slider");
  const form = document.getElementById("form");

  const urlUpload = async (values) => {
    const formData = new FormData();
    try {
      formData.append("file", values.url);
      formData.append("upload_preset", "dtygdj5f");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbb6ug7f5/upload",
        formData
      );
      const newObj = {
        url: res.data.secure_url,
        img: values.img,
        about: values.about,
        title: values.title,
      };
      await PutPassion(id, newObj);
      setDetail(newObj);
      setGlobalPassion([...globalPassion, newObj]);
    } catch (error) {
      console.log(`url: ${error}`);
    }
  };

  const imgUpload = async (values) => {
    const formData = new FormData();
    try {
      formData.append("file", values.img);
      formData.append("upload_preset", "dtygdj5f");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
        formData
      );
      const newObj = {
        url: values.url,
        img: res.data.secure_url,
        about: values.about,
        title: values.title,
      };
      PutPassion(id, newObj);
      setDetail(newObj);
      setGlobalPassion([...globalPassion, newObj]);
    } catch (error) {
      console.log(`urlBlack: ${error}`);
    }
  };

  const formik = useFormik({
    initialValues: {
      about: "",
      title: "",
      url: "",
      img: "",
    },
    validationSchema: validationPassion,
    onSubmit: async (values) => {
      setLoad(true);
      if (detail.url === values.url && detail.img === values.img) {
        await PutPassion(id, values);
        setDetail(values);
        setGlobalPassion([...globalPassion, values]);
      } else if (detail.url === values.url) {
        await imgUpload(values);
      } else if (detail.img === values.img) {
        await urlUpload(values);
      } else {
        await urlUpload(values);
        await imgUpload(values);
      }
      setLoad(false);

      slider.setAttribute("style", "display:block");
      form.setAttribute("style", "display:none");
    },
  });
  //useEffect//
  useEffect(() => {
    GetByIdPosion(id).then((res) => {
      setDetail(res);
      formik.values.about = res.about;
      formik.values.title = res.title;
      formik.values.url = res.url;
      formik.values.img = res.img;
      setLoading(false);
    });
  }, [id]);
  //////Kecidler/////
  function nextClick() {
    const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:none");
    form.setAttribute("style", "display:block");
  }
  function backClick() {
    const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:block");
    form.setAttribute("style", "display:none");
  }
  return (
    <div className={style.Detail}>
      <button
        onClick={() => {
          navigate("/admin/passion");
        }}
        className={style.X_goback}
      >
        X
      </button>
      <div style={{ width: "85%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <div className={style.Detail_leftitem}>
                <Iframe
                  url={detail.url}
                  width="90%"
                  id=""
                  className=""
                  display="block"
                  position="relative"
                />

                <div
                  onClick={() => {
                    if (load) {
                      window.alert("Loading...");
                    } else {
                      nextClick();
                    }
                  }}
                  className={style.btn_top}
                >
                  {load ? (
                    <strong>loading...</strong>
                  ) : (
                    <div>
                      <CreateIcon /> <strong>Edit Team</strong>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              {/* ////Right item/// */}
              <div className={style.Detail_rightitem}>
                {load ? (
                  <div
                    style={{
                      fontSize: "40px",
                      margin: "100px 100px",
                      color: "blue",
                    }}
                  >
                    Loading...
                  </div>
                ) : (
                  <div id="slider">
                    <p className={style.detail_count}>
                      <strong>
                        <ListAltIcon />
                        &nbsp; About:
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{detail.about}</span>
                    </p>

                    <p className={style.detail_count}>
                      <strong>
                        <ListAltIcon />
                        &nbsp; Title:
                      </strong>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span>{detail.title}</span>
                    </p>
                  </div>
                )}

                {/* Form-Update */}
                <div className="sss" id="form">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <form
                      className={style.Form__item}
                      onSubmit={formik.handleSubmit}
                    >
                      <TextField
                        type="text"
                        style={{
                          width: "90%",
                          borderRadius: "5px",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.about}
                        error={
                          formik.errors.about && formik.touched.about
                            ? true
                            : false
                        }
                        name="about"
                        label={
                          formik.errors.about && formik.touched.about ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.about}
                            </span>
                          ) : (
                            "  update about"
                          )
                        }
                      />

                      <TextField
                        type="text"
                        style={{
                          width: "90%",
                          borderRadius: "5px",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        className={style.input}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        error={
                          formik.errors.title && formik.touched.title
                            ? true
                            : false
                        }
                        name="title"
                        label={
                          formik.errors.title && formik.touched.title ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.title}
                            </span>
                          ) : (
                            "  update title"
                          )
                        }
                      />

                      <TextField
                        type="text"
                        style={{
                          width: "90%",
                          borderRadius: "5px",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        value={formik.values.img}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.errors.img && formik.touched.img ? true : false
                        }
                        name="img"
                        label={
                          formik.errors.img && formik.touched.img ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.img}
                            </span>
                          ) : (
                            "   update image"
                          )
                        }
                      />

                      <label className="file_img" htmlFor="upload-photo">
                        <input
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="url"
                          type="file"
                          onChange={(e) =>
                            formik.setFieldValue("url", e.target.files[0])
                          }
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
                              + Upload video
                            </span>
                          )}
                        </Fab>
                      </label>

                      <div style={{ margin: "20px auto" }}>
                        <Button
                          variant="outlined"
                          style={{
                            margin: "20px 0 0 40px",
                            borderRadius: "5px",
                          }}
                          type="submit"
                          color={
                            formik.errors && formik.touched
                              ? "success"
                              : "success"
                          }
                        >
                          {load ? (
                            <>loading...</>
                          ) : (
                            <>
                              <AddShoppingCartIcon /> Update
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={backClick}
                          variant="outlined"
                          style={{
                            margin: "20px 0 0 50px",
                            borderRadius: "5px",
                          }}
                          color="error"
                        >
                          X
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default DetailPassion;
