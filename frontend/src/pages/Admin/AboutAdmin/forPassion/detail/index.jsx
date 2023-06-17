import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// import required modules
import { Button} from "@mui/material";
import { validationPassion } from "../validation.passion";
import { GetByIdPosion } from "../../../../../api/position.requests";

const DetailPassion = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [detail, setDetail] = useState("e");
  useEffect(() => {
    GetByIdPosion(id).then((res) => {
      setDetail(res);
    });
  }, [id]);
 console.log(detail);
  function handleSubmit(){
    const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:block");
    form.setAttribute("style", "display:none");
  }
  const formik = useFormik({
    initialValues: {
      about: "",
      title: "",
      url: "",
    },
    validationSchema: validationPassion,
    onSubmit: handleSubmit,
  });
  function nextClick(){
   const slider = document.getElementById("slider");
   const form = document.getElementById("form");
   slider.setAttribute("style", "display:none");
   form.setAttribute("style", "display:block");
   }
   function backClick(){
    const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:block");
    form.setAttribute("style", "display:none");
   }
  return (
    <div className={style.Detail}>
        <button onClick={()=>{
          navigate("/admin/passion")
        }} className={style.X_goback}>X</button>
      <div className={style.Detail_leftitem}>
        {/* <img
          style={{ width: "90%", height: "100%", borderRadius: "7px" }}
          src={detail.url}
          alt=""
        /> */}
        <div onClick={nextClick}  className={style.btn_top}>
          <CreateIcon /> <strong>Edit Team</strong>
        </div>
      </div>
      <div>
      </div>

      
      <div className={style.Detail_rightitem}>
        
        <div className="sss" id="form" >
      <form className={style.Form__item} onSubmit={formik.handleSubmit}>
     <input type='text'  style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.about} error={formik.errors.about && formik.touched.about ?true : false} name='name' id="outlined-basic" placeholder={formik.errors.about && formik.touched.about ?  (
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        ): "Update About"} variant="outlined" />
    
     <input type='text'  style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}   className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} error={formik.errors.title && formik.touched.title ?true : false} name='title' id="outlined-basic" placeholder={formik.errors.title && formik.touched.title ? (
          <p style={{ color: "red" }}>{formik.errors.title}</p>
        ): "Update Title"}  variant="outlined" />
   
     <input style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' id="outlined-basic"  variant="outlined" placeholder={formik.errors.url && formik.touched.url ? (
          <p style={{ color: "red" }}>{formik.errors.url}</p>
        ) : "Update Url"} />
     

    <Button  variant="outlined"  style={{  margin:"20px 0 0 40px",background:"white",borderRadius:"5px"}} type='submit' color={formik.errors && formik.touched ? (
         "success" 
        ) :"success" }>
    &nbsp;&nbsp;
     <AddShoppingCartIcon/> Update 
    </Button> 
    <Button onClick={backClick} variant="outlined"  style={{ margin:"20px 0 0 50px",background:"white",borderRadius:"5px"}}  color="error">
      X
    </Button> 
    </form>
      </div>

          <div id="slider" >
          {/* <p className={style.detail_count}>
          <strong>
            <PermIdentityIcon />
            &nbsp; Name:
          </strong>
          &nbsp;&nbsp;
          <span>{detail.name}</span>
        </p> */}

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
            &nbsp; About:
          </strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>{detail.about}</span>
        </p>
          </div>
      </div>
      
    </div>
  );
};

export default DetailPassion;
