import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { DeleteSlider, GetByIdSlider } from "../../../../api/slider.requests";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button, TextField } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import required modules
import { validationSlider } from "../validation.slider";
import Swal from "sweetalert2";
import { useGlobalData } from "../../../../global";
const DetailTeam = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [globalSlider, setGlobalSlider] = useGlobalData();
  const [detail, setDetail] = useState("");
  useEffect(() => {
    GetByIdSlider(id).then((res) => {
      setDetail(res);
    });
  }, [id]);
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
  function handleSubmit() {
    const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:block");
    form.setAttribute("style", "display:none");
  }
  const formik = useFormik({
    initialValues: {
      name: "",
      title: "",
      url: "",
      email: "",
    },
    validationSchema: validationSlider,
    onSubmit: handleSubmit,
  });
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
      <button onClick={() => {
            navigate("/admin/home");
          }} className={style.X_goback}>X</button>
      
      <div className={style.Detail_leftitem}>
        <img
          style={{ width: "90%", height: "100%", borderRadius: "7px" }}
          src={detail.url}
          alt=""
        />
        <div onClick={nextClick} className={style.btn_top}>
          <CreateIcon /> <strong>Edit Slider</strong>
        </div>
        <div onClick={(_id) => deletClick(_id)} className={style.btn_bottom}>
          <DeleteIcon /> <strong>Delete Slider</strong>
        </div>
      </div>
      

      <div className={style.Detail_rightitem}>
  
        <div className="sss" id="form">
          <form className={style.Form__item} onSubmit={formik.handleSubmit}>
            <TextField
            margin="dense"
              hiddenLabel
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
            margin="dense"
              hiddenLabel
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
              error={formik.errors.title && formik.touched.title ? true : false}
              name="title"
                  
                  />

            <TextField
            margin="dense"
              hiddenLabel
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

            <TextField
            type="email"
            margin="dense"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email && formik.touched.email ? true : false}
              name="email"
              label={
                formik.errors.email && formik.touched.email ? (
                  <span style={{ color: "red" }}>{formik.errors.email}</span>
                ) : (
                  "  edit email"
                )
              }
            />

            <Button
              variant="outlined"
              style={{
                margin: "5px 0 0 10px",
                background: "white",
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
                background: "white",
                borderRadius: "5px",
              }}
              color="error"
            >
              X
            </Button>
          </form>
        </div>
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
              {" "}
              <MailOutlineIcon />
              &nbsp; Email:
            </strong>
            &nbsp;&nbsp;
            <span>{detail.email}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTeam;
