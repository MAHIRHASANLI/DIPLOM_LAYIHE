import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./index.module.css";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Iframe from 'react-iframe'
// import required modules
import { Button, Fab, TextField} from "@mui/material";
import { validationPassion } from "../validation.passion";
import { GetByIdPosion, PutPassion } from "../../../../../api/position.requests";
import { useGlobalPassion } from "../../../../../global";
import axios from "axios";

const DetailPassion = () => {
  const [globalPassion,setGlobalPassion] = useGlobalPassion()
  const [image, setImage] = useState("")
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams();
  const [detail, setDetail] = useState("");

  const formik = useFormik({
    initialValues: {
      about: "",
      title: "",
      url: "",
      // img:""
    },
    validationSchema: validationPassion,
    onSubmit: async (values, actions) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "dtygdj5f");
        const res = await axios.post(
          "https://res.cloudinary.com/dbb6ug7f5/video/upload/f_auto,q_auto/dog.mp4",
          formData
        );
        const newObj = {
          about: values.about,
          title: values.title,
          url: res.data.secure_url,
          img: image
        };
        console.log(newObj);
        // PutPassion(newObj);
        // setGlobalPassion([...globalPassion, newObj]);
        // setLoading(false);
        // navigate("/admin/team");
        // actions.resetForm();
      } catch (error) {
        console.log(error);
      }
      const slider = document.getElementById("slider");
    const form = document.getElementById("form");
    slider.setAttribute("style", "display:block");
    form.setAttribute("style", "display:none");
    },
  });
  //useEffect//
  useEffect(() => {
    GetByIdPosion(id).then((res) => {
      setDetail(res);
    });
  }, [id]);
//////Kecidler/////
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
      <Iframe url={detail.url}
        width="90%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"/>
       
        <div onClick={()=>{
          if(loading){
            window.alert("Loading...")
          }else{
            nextClick()
          }
        }}  className={style.btn_top}>
         {
          loading ? (<strong >loading...</strong>) : ( <div><CreateIcon /> <strong>Edit Team</strong></div>)
         }
        </div>
      </div>
      <div>
      </div>

      
      <div className={style.Detail_rightitem}>
        
        <div className="sss" id="form" >
      <form className={style.Form__item} onSubmit={formik.handleSubmit}>
     <TextField
            type="text"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"   onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.about} error={formik.errors.about && formik.touched.about ?true : false} name='about'  label={formik.errors.about && formik.touched.about ?  (
          <span style={{ color: "red" }}>{formik.errors.about}</span>
        ): "  update about"}  />
    
     <TextField  type="text"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"    className={style.input} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title} error={formik.errors.title && formik.touched.title ?true : false} name='title' label={formik.errors.title && formik.touched.title ? (
          <span style={{ color: "red" }}>{formik.errors.title}</span>
        ): "  update title"}/>
   
     <TextField  type="text"
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
            margin="dense"
            id="filled-hidden-label-small"
            variant="outlined"
            size="small"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' label={formik.errors.url && formik.touched.url ? (
          <span style={{ color: "red" }}>{formik.errors.url}</span>
        ) : "  update url"} />
     
     {/* <label className="file_img" htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              // name="img"
              type="file"
              onChange={async(e) =>{
                setImage(e.target.files[0]);
                  const formData = new FormData();
                  try {
                    formData.append("file",e.target.files[0] );
                    formData.append("upload_preset", "dtygdj5f");
                    const res = await axios.post(
                      "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
                      formData
                    );
                    setImage(res.data.secure_url)
                  } catch (error) {
                    console.log(error);
                  }
              }}
            />
  
            <Fab
              color="info"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
              style={{ marginTop: "10px" }}
            >
              {formik.errors.img && formik.touched.img ? (
                <span style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.img}
                </span>
              ) : (
                <span style={{ color: "white", fontSize: "14px" }}>
                  {" "}
                  + Edit photo
                </span>
              )}
            </Fab>
          </label> */}

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
                        onChange={async(e) =>{
                          setImage(e.target.files[0]);
                            const formData = new FormData();
                            try {
                              formData.append("file",e.target.files[0] );
                              formData.append("upload_preset", "dtygdj5f");
                              const res = await axios.post(
                                "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
                                formData
                              );
                              setImage(res.data.secure_url)
                              console.log("img update success!");
                            } catch (error) {
                              console.log(`forPassion: ${error}`);
                            }
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.img}
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
{/* <input type="file" onChange={(e)=>{
  setImage("e.target.files[0]");
}}/> */}
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

         {
          loading ? (<div style={{fontSize:"40px",margin:"100px 100px",color:"blue"}}>Loading...</div>) : (
            <div id="slider" >
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
          )
         }
      </div>
      
    </div>
  );
};

export default DetailPassion;
