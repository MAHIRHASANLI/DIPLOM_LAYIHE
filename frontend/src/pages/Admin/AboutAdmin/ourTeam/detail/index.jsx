import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import required modules
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useGlobalTeam } from "../../../../../global";
import {
  DeleteTeam,
  GetByIdTeam,
  PutTeam,
} from "../../../../../api/ourteam.requests";
import axios from "axios";
import { editvalidationourTeam } from "./edit.validation";

const DetailOurTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [globalTeam, setGlobalTeam, load, setLoad] = useGlobalTeam();
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);
  
  useEffect(() => {
    if (globalTeam === null) {
      navigate("/admin/team");
    }
  }, [globalTeam, navigate]);

  function deletClick(_id) {
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
          DeleteTeam(detail._id);
          navigate("/admin/team");
          setGlobalTeam(globalTeam.filter((m) => m._id !== detail._id));
        }
        setGlobalTeam(globalTeam.filter((m) => m._id !== detail._id));
        Swal.fire(
          `${detail.name}"Deleted!", "Your file has been deleted.", "success"`
        );
      }
    });
  }

  const slider = document.getElementById("slider");
  const form = document.getElementById("form");

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
    validationSchema: editvalidationourTeam,
    onSubmit: async (values) => {
      setLoad(true);
      if (values.url == detail.url) {
        await PutTeam(id, values);
        setDetail(values);
        setGlobalTeam([...globalTeam, values]);
        console.log("Cloudinary update olunmadi");
      } else {
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
          await PutTeam(id, newObj);
          setDetail(newObj);
          setGlobalTeam([...globalTeam, newObj]);
          console.log("Cloudinary update olundu!");
        } catch (error) {
          console.log(`ourTeam update error: ${error}`);
        }
      }
      setLoad(false);

      slider.setAttribute("style", "display:block");
      form.setAttribute("style", "display:none");
    },
  });
  ////useEffect///
  useEffect(() => {
    GetByIdTeam(id).then((res) => {
      setDetail(res);
      formik.values.name = res.name;
      formik.values.title = res.title;
      formik.values.url = res.url;
      formik.values.pinterest = res.pinterest;
      formik.values.twitter = res.twitter;
      formik.values.linkedn = res.linkedn;
      formik.values.facebook = res.facebook;
      setLoading(false);
    });
  }, [id]);
  /////Kecidler///
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
          navigate("/admin/team");
        }}
        className={style.X_goback}
        title="our team"
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
                <div onClick={nextClick} className={style.btn_top}>
                  {load ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <CreateIcon /> <strong>Edit Team</strong>
                    </>
                  )}
                </div>
                <div
                  onClick={(_id) => deletClick(_id)}
                  className={style.btn_bottom}
                >
                  <DeleteIcon /> <strong>Delete Team</strong>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} sm={8} md={8} lg={8}>
              <div className={style.Detail_rightitem}>
                <div className={style.detail_data} id="slider">
                  <p className={style.detail_count}>
                    <strong>
                      <PermIdentityIcon />
                      &nbsp; Name:
                    </strong>
                    &nbsp;&nbsp;
                    <span>{detail.name}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Position:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.title}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <PermIdentityIcon />
                      &nbsp; Facebook:
                    </strong>
                    &nbsp;&nbsp;
                    <span>{detail.facebook}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Linkedn:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.linkedn}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <PermIdentityIcon />
                      &nbsp; Twitter:
                    </strong>
                    &nbsp;&nbsp;
                    <span>{detail.twitter}</span>
                  </p>

                  <p className={style.detail_count}>
                    <strong>
                      <ListAltIcon />
                      &nbsp; Pinterest:
                    </strong>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{detail.pinterest}</span>
                  </p>
                </div>

                {/* Form-Update */}
                <div className="sss" id="form">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <form
                      className={style.detail_form}
                      onSubmit={formik.handleSubmit}
                    >
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
                        value={formik.values.name}
                        error={
                          formik.errors.name && formik.touched.name
                            ? true
                            : false
                        }
                        name="name"
                        label={
                          formik.errors.name && formik.touched.name ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.name}
                            </span>
                          ) : (
                            "   update name"
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
                            "   update position"
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
                        value={formik.values.pinterest}
                        error={
                          formik.errors.pinterest && formik.touched.pinterest
                            ? true
                            : false
                        }
                        name="pinterest"
                        label={
                          formik.errors.pinterest &&
                          formik.touched.pinterest ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.pinterest}
                            </span>
                          ) : (
                            "   update pinterest"
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
                        className={style.input}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.twitter}
                        error={
                          formik.errors.twitter && formik.touched.twitter
                            ? true
                            : false
                        }
                        name="twitter"
                        label={
                          formik.errors.twitter && formik.touched.twitter ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.twitter}
                            </span>
                          ) : (
                            "   update twitter"
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
                        value={formik.values.facebook}
                        error={
                          formik.errors.facebook && formik.touched.facebook
                            ? true
                            : false
                        }
                        name="facebook"
                        label={
                          formik.errors.facebook && formik.touched.facebook ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.facebook}
                            </span>
                          ) : (
                            "   update facebook"
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
                        value={formik.values.linkedn}
                        error={
                          formik.errors.linkedn && formik.touched.linkedn
                            ? true
                            : false
                        }
                        name="linkedn"
                        label={
                          formik.errors.linkedn && formik.touched.linkedn ? (
                            <span style={{ color: "red" }}>
                              {formik.errors.linkedn}
                            </span>
                          ) : (
                            "   update linkedn"
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
                        style={{
                          margin: "5px 0 0 20px",
                          borderRadius: "5px",
                        }}
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
                            {" "}
                            <AddShoppingCartIcon /> Update
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={backClick}
                        variant="outlined"
                        style={{
                          margin: "5px 0 0 50px",
                          borderRadius: "5px",
                        }}
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

export default DetailOurTeam;
