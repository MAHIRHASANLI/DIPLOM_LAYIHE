import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
//grid
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import required modules
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import {
  DeleteBlog,
  GetByIdBlog,
  PutBlog,
} from "../../../../api/blog.requests";
import { useGlobalBlog } from "../../../../global";
import axios from "axios";
import { validationourBlog } from "./blog.update.validation";

const DetailBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [globalBlog, setGlobalBlog, load, setLoad] = useGlobalBlog();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  
  function handleDelete(_id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (detail._id) {
          DeleteBlog(detail._id);
          navigate("/admin/blog");
          setGlobalBlog(globalBlog.filter((m) => m._id !== detail._id));
        }
        setGlobalBlog(globalBlog.filter((m) => m._id !== detail._id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  const slider = document.getElementById("slider");
  const form = document.getElementById("form");
  ///Formik
  const formik = useFormik({
    initialValues: {
      type: "",
      comment: "",
      time: "",
      title: "",
      url: "",
    },
    validationSchema: validationourBlog,
    onSubmit: async (values) => {
      setLoad(true);
      if (values.url === detail.url) {
      await  PutBlog(id, values);
      setDetail(values)
        setGlobalBlog([...globalBlog, values]);
        console.log("Cloudinary update olunmadi");
      } else {
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
            url: res.data.secure_url,
            time: values.time,
            comment: values.comment,
          };
          await PutBlog(id, newObj);
          setDetail(newObj)
          setGlobalBlog([...globalBlog, newObj]);
          console.log("Cloudinary update olundu!");
        } catch (error) {
          console.log(`Blog update error: ${error}`);
        }
      }
      setLoad(false);

      slider.setAttribute("style", "display:block");
      form.setAttribute("style", "display:none");
    },
  });
  //Get ByID
  useEffect(() => {
    GetByIdBlog(id).then((res) => {
      setDetail(res);
      formik.values.type = res.type;
      formik.values.comment = res.comment;
      formik.values.time = res.time;
      formik.values.title = res.title;
      formik.values.url = res.url;
      setLoading(false);
    });
  }, [id,formik]);

  ///Kecidler
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
          navigate("/admin/blog");
        }}
        className={style.X_goback}
        title="blog"
      >
        X
      </button>
      <div style={{ width: "85%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4} lg={4}>
              <div className={style.Detail_leftitem}>
                <img
                  style={{ width: "90%", height: "100%", borderRadius: "7px" }}
                  src={detail.url}
                  alt=""
                />
                <div>
                  <div onClick={nextClick} className={style.btn_top}>
                    {load ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <CreateIcon /> <strong>Edit Slider</strong>
                      </>
                    )}
                  </div>
                  <div
                    onClick={(_id) => handleDelete(_id)}
                    className={style.btn_bottom}
                  >
                    <DeleteIcon/><strong>Delete Slider</strong>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={8}>
              <div className={style.Detail_rightitem}>
                <div id="slider">
                  <p className={style.detail_count}>
                    <strong>
                      <PermIdentityIcon />
                      &nbsp; Category:
                    </strong>
                    &nbsp;&nbsp;
                    <span>{detail.type}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Time:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.time}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Title:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.title}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Comment:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.comment}</span>
                  </p>
                </div>

                {/* ///Formik-Form */}
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
                          width: "100%",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.type}
                        error={
                          formik.errors.type && formik.touched.type
                            ? true
                            : false
                        }
                        name="type"
                        label={
                          formik.errors.type && formik.touched.type ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.type}
                            </span>
                          ) : (
                            "add category"
                          )
                        }
                      />

                      <TextField
                        type="text"
                        style={{
                          width: "100%",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
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
                            "add title"
                          )
                        }
                      />
                      <TextField
                        type="date"
                        style={{
                          width: "100%",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        error={
                          formik.errors.time && formik.touched.time
                            ? true
                            : false
                        }
                        name="time"
                        label={
                          formik.errors.time && formik.touched.time ? (
                            <span style={{ color: "red", marginLeft: "80px" }}>
                              {" "}
                              {formik.errors.time}
                            </span>
                          ) : (
                            <span
                              style={{ color: "black", marginLeft: "70px" }}
                            >
                              ad date
                            </span>
                          )
                        }
                      />

                      <TextField
                        type="text"
                        style={{
                          width: "100%",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment}
                        error={
                          formik.errors.comment && formik.touched.comment
                            ? true
                            : false
                        }
                        name="comment"
                        label={
                          formik.errors.comment && formik.touched.comment ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.comment}
                            </span>
                          ) : (
                            "add comment"
                          )
                        }
                      />
                      <TextField
                        type="text"
                        style={{
                          width: "90%",
                        }}
                        margin="dense"
                        id="filled-hidden-label-small"
                        variant="outlined"
                        size="small"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.url}
                        error={
                          formik.errors.url && formik.touched.url ? true : false
                        }
                        name="url"
                        label={
                          formik.errors.url && formik.touched.url ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.url}
                            </span>
                          ) : (
                            "   update image"
                          )
                        }
                      />

                      <Button
                        variant="outlined"
                        style={{ margin: "20px 0 0 40px" }}
                        type="submit"
                        color={
                          formik.errors && formik.touched
                            ? "success"
                            : "success"
                        }
                      >
                        &nbsp;&nbsp;
                        {load ? (
                          <>Loading...</>
                        ) : (
                          <>
                            <AddShoppingCartIcon /> Update{" "}
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={backClick}
                        variant="outlined"
                        style={{ margin: "20px 0 0 40px" }}
                        color="error"
                      >
                        X
                      </Button>
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

export default DetailBlog;
