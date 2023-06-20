import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// import required modules
import { Button} from "@mui/material";
import Swal from "sweetalert2";
import { DeleteChoose, GetByIdChoose } from "../../../../../api/choose.requests";
import { validationChoose } from "../validation.schema";
import { useGlobalChoose } from "../../../../../global";
const DetailChoose = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const  [globalChoose, setGlobalChoose]=useGlobalChoose()
  const [detail, setDetail] = useState("");
  useEffect(() => {
    GetByIdChoose(id).then((res) => {
      setDetail(res);
    });
  }, [id]);
  function handleDelete(_id){
    Swal.fire({
                
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          if(detail.url){
            DeleteChoose(detail._id)
            navigate('/admin/choose')
            setGlobalChoose(globalChoose.filter((m)=>m._id !== detail._id))
          }
          setGlobalChoose(globalChoose.filter((m)=>m._id !== detail._id))
        Swal.fire(
          'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
  }
  function handleSubmit(){
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
    },
    validationSchema: validationChoose,
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
          navigate("/admin/choose")
        }} className={style.X_goback}>X</button>
      <div className={style.Detail_leftitem}>
        <i
          style={{ fontSize:"60px",marginTop:"40px" }}
          className={detail.url}
        ></i>
       <div>
       <div onClick={nextClick}  className={style.btn_top}>
          <CreateIcon /> <strong >Edit Slider</strong>
        </div>
        <div onClick={(_id)=>handleDelete(_id)} className={style.btn_bottom}>
          <DeleteIcon /> <strong>Delete Slider</strong>
        </div>
       </div>
      </div>
      <div>
      </div>

      
      <div className={style.Detail_rightitem}>
      <div className="sss" id="form" >
      <form className={style.Form__item} onSubmit={formik.handleSubmit}>
     <input type='text'  style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} error={formik.errors.name && formik.touched.name ?true : false} name='name' id="outlined-basic" placeholder={formik.errors.name && formik.touched.name ?  (
          <span style={{ color: "red" }}>{formik.errors.name}</span>
        ): "   update name"} variant="outlined" />
    
     <input type='text'  style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}   className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} error={formik.errors.title && formik.touched.title ?true : false} name='title' id="outlined-basic" placeholder={formik.errors.title && formik.touched.title ? (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        ): "   update title"}  variant="outlined" />
   
     <input style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px",height:"35px"}}  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' id="outlined-basic"  variant="outlined" placeholder={formik.errors.url && formik.touched.url ? (
          <span style={{ color: "red" }}>{formik.errors.url}</span>
        ) : "   update image"} />
     

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
          </div>
      </div>
      
    </div>
  );
};

export default DetailChoose;
