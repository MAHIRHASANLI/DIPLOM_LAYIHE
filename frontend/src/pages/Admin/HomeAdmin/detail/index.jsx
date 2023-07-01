import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import {
  DeleteSlider,
  GetByIdSlider,
  PutSlider,
} from "../../../../api/slider.requests";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, TextField } from "@mui/material";
// Grid
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import required modules
import Swal from "sweetalert2";
import { useGlobalData } from "../../../../global";
import { validationSlider } from "./slider.detail.validation";
import axios from "axios";
const DetailTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [globalSlider, setGlobalSlider,load, setLoad] = useGlobalData();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (globalSlider === null) {
      navigate("/admin/slider");
    }
  }, [globalSlider, navigate]);

  ////Delete
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
          DeleteSlider(detail._id);
          navigate("/admin/home");
          setGlobalSlider(globalSlider.filter((m) => m._id !== detail._id));
        }
        setGlobalSlider(globalSlider.filter((m) => m._id !== detail._id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  ///Formik
  const slider = document.getElementById("slider");
      const form = document.getElementById("form");
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      email: "",
    },
    validationSchema: validationSlider,
    onSubmit: async (values) => {
      setLoad(true)
      if (detail.url == values.url) {
       await PutSlider(id, values);
        setDetail(values)
        setGlobalSlider([...globalSlider, values]);
        console.log("Cloudinary update olunmadi!");
      } else {
        const formData = new FormData();
        try {
          formData.append("file", values.url);
          formData.append("upload_preset", "flrfgfh2");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
            formData
          );
          console.log(values.name);
          const newObj = {
            url: res.data.secure_url,
            name: values.name,
            title: values.title,
            email: values.email,
          };
          await PutSlider(id, newObj);
          setDetail(newObj)
          setGlobalSlider([...globalSlider, newObj]);
          console.log("Cloudinary update olundu!");
        } catch (error) {
          console.log(`Sliders update error: ${error}`);
        }
      }
      setLoad(false);
      
      slider.setAttribute("style", "display:block");
      form.setAttribute("style", "display:none");
    },
  });
  ///useEffectID
  useEffect(() => {
    GetByIdSlider(id).then((res) => {
      setDetail(res);
      formik.values.name = res.name;
      formik.values.title = res.title;
      formik.values.url = res.url;
      formik.values.email = res.email;
      setLoading(false);
    });
  }, [id]);

  ////Kecidler
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
          navigate("/admin/home");
        }}
        className={style.X_goback}
      >
        X
      </button>
  <div style={{width:"85%"}}>
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
              <CreateIcon /> <strong>Edit Slider</strong>
            </>
          )}
        </div>
        <div onClick={(_id) => deletClick(_id)} className={style.btn_bottom}>
          <DeleteIcon /> <strong>Delete Slider</strong>
        </div>
      </div>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
        <div className={style.Detail_rightitem}>
        {load ? (
          <div>Loading...</div>
        ) : (
          <div id="slider">
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
                &nbsp; Title:
              </strong>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span>{detail.title}</span>
            </p>

            <p className={style.detail_count}>
              <strong>
                <MailOutlineIcon />
                &nbsp; Email:
              </strong>
              &nbsp;&nbsp;
              <span>{detail.email}</span>
            </p>
          </div>
        )}

        {/* ///Formik_Form */}
        <div className="sss" id="form">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form className={style.Form__item} onSubmit={formik.handleSubmit}>
              <TextField
              style={{width:"90%"}}
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
                    "  edit name"
                  )
                }
              />

              <TextField
              style={{width:"90%"}}
                margin="dense"
                id="filled-hidden-label-small"
                variant="outlined"
                size="small"
                label={
                  formik.errors.title && formik.touched.title ? (
                    <span style={{ color: "red" }}>{formik.errors.title}</span>
                  ) : (
                    "  edit title"
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                error={
                  formik.errors.title && formik.touched.title ? true : false
                }
                name="title"
              />

              <TextField
                type="email"
                style={{width:"90%"}}
                margin="dense"
                id="filled-hidden-label-small"
                variant="outlined"
                size="small"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={
                  formik.errors.email && formik.touched.email ? true : false
                }
                name="email"
                label={
                  formik.errors.email && formik.touched.email ? (
                    <span style={{ color: "red" }}>{formik.errors.email}</span>
                  ) : (
                    "  edit email"
                  )
                }
              />

              <TextField
              style={{width:"90%"}}
                margin="dense"
                id="filled-hidden-label-small"
                variant="outlined"
                size="small"
                label={
                  formik.errors.url && formik.touched.url ? (
                    <span style={{ color: "red" }}>{formik.errors.url}</span>
                  ) : (
                    "  edit image"
                  )
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                error={formik.errors.url && formik.touched.url ? true : false}
                name="url"
              />

             <div style={{margin:"20px auto"}}>
             <Button
                variant="outlined"
                style={{
                  margin: "5px 0 0 10px",
                  borderRadius: "5px",
                }}
                type="submit"
                color={formik.errors && formik.touched ? "success" : "success"}
              >
                &nbsp;&nbsp;
                <AddShoppingCartIcon /> Add
              </Button>
              <Button
                onClick={backClick}
                variant="outlined"
                style={{
                  margin: "5px 0 0 30px",
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

export default DetailTeam;
