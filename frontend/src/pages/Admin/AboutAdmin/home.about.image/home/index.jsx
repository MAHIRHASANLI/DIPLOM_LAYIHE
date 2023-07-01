import * as React from "react";
import { useEffect, useState } from "react";
import {
  GetAllHomeAbout,
  GetByIDHomeAbout,
  PutHomeAbout,
} from "../../../../../api/home.about.requests";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Fab, TableHead, TextField } from "@mui/material";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
///MODAL//
import Modal from "@mui/material/Modal";
import { validationHomeAboutIMG } from "../validation.home.about";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

///modall.Style//
const stylemodal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const AboutAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [globalImage, setGlobalImage] = useState([]);
  const [id, setId] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);
  //GET ALL///
  useEffect(() => {
    GetAllHomeAbout().then((res) => {
      setGlobalImage(res);
    });
  }, [loading]);
  ///MODAL///
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);
  ///formik//
  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: validationHomeAboutIMG,
    onSubmit: async (values) => {
      setLoading(true);
      const formData = new FormData();
      try {
        formData.append("file", values.url);
        formData.append("upload_preset", "givlaamt");
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
          formData
        );
        const newObj = {
          url: res.data.secure_url,
        };
       await PutHomeAbout(id, newObj);
        setGlobalImage([...globalImage,newObj]);
        setLoading(false);
        handleconnected();
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
          <div className={style.companent_left}>
            <div className={style.companent_left__item}>
              <strong className={style.count}>
                count: [ {globalImage.length} ]
              </strong>
            </div>
          </div>
          <h2 className={style.namePage}>GlobalImage Data</h2>
        </div>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>
                  Update
                  <CreateIcon
                    style={{ fontSize: "20px", marginBottom: "6px" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {globalImage &&
                globalImage.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img src={row.url} className={style.image} alt="#" />
                    </TableCell>

                    <TableCell style={{ fontSize: "30px" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setId(row._id);
                          handleOpen();
                        }}
                      >
                        <CreateIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow></TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylemodal}>
          <form className="Form__item" onSubmit={formik.handleSubmit}>
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
                style={{ margin: "10px auto" }}
              >
                {formik.errors.url && formik.touched.url ? (
                  <span style={{ color: "red", fontSize: "14px" }}>
                    {formik.errors.url}
                  </span>
                ) : (
                  <span style={{ color: "white", fontSize: "14px" }}>
                    + Update photo
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
              type="Submit"
              color={
                formik.errors.url && formik.touched.url ? "error" : "success"
              }
            >
              {loading ? "Loading..." : "Edit Image"}
            </Button>
            <Button
              onClick={handleconnected}
              variant="outlined"
              style={{
                display: "block",
                margin: "15px auto",
                background: "white",
                borderRadius: "5px",
              }}
              color="error"
            >
              X
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AboutAdmin;
