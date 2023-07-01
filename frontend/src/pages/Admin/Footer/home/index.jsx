import * as React from "react";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead, TextField } from "@mui/material";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
///MODAL//
import Modal from "@mui/material/Modal";
import { validationFooter } from "../footer.validation";
import axios from "axios";
import {
  GetAllLogoFooter,
  PutLogoFooter,
} from "../../../../api/logo.footer.requests";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function FooterAdmin() {
  const navigate = useNavigate();
  const [footer, setFooter] = useState([]);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);
  
  useEffect(() => {
    GetAllLogoFooter().then((res) => {
      setFooter(res);
    });
  }, [load]);
  ///MODAL///
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);
  ////CLOUDINARY///
  const urlUpload = async (values) => {
    const formData = new FormData();
    try {
      formData.append("file", values.url);
      formData.append("upload_preset", "givlaamt");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
        formData);
      const newObj = {
        url: res.data.secure_url,
        urlblack: values.urlblack,
        count: values.count,
      };
      PutLogoFooter(detail.id, newObj);
      setFooter([...footer, newObj]);
      // setUrl(res.data.secure_url);
    } catch (error) {
      console.log(`url: ${error}`);
    }
  };

  const urlblackUpload = async (values) => {
    const formData = new FormData();
    try {
      formData.append("file", values.urlblack);
      formData.append("upload_preset", "givlaamt");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
        formData
      );
      const newObj = {
        url: values.url,
        urlblack: res.data.secure_url,
        count: values.count,
      };
      PutLogoFooter(detail.id, newObj);
      setFooter([...footer, newObj]);
    } catch (error) {
      console.log(`urlBlack: ${error}`);
    }
  };
  ///formik//
  const formik = useFormik({
    initialValues: {
      url: "",
      urlblack: "",
      count: "",
    },
    validationSchema: validationFooter,
    onSubmit: async (values) => {
      setLoad(true);
      if (detail.url === values.url && detail.urlblack === values.urlblack) {
        await PutLogoFooter(detail.id, values);
        setFooter([...footer, values]);
      } else if (detail.url === values.url) {
        await urlblackUpload(values);
      } else if (detail.urlblack === values.urlblack) {
        await urlUpload(values);
      } else {
        await urlUpload(values);
        await urlblackUpload(values);
      }
      handleconnected();
      setLoad(false);
    },
  });
  return (
    <>
      <div className={style.Table}>
        <div className={style.Table_companent}>
          <h2 className={style.namePage}>Footer Data</h2>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Top-logo</TableCell>
                <TableCell>Bottom-logo</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {footer &&
                footer.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img style={{background:"black"}} className={style.image} src={row.url} alt="" />
                    </TableCell>
                    <TableCell>
                      <img style={{background:"white"}} className={style.image} src={row.urlblack} alt="" />
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: "14px" }}>{row.count}</span>
                    </TableCell>
                    <TableCell style={{ fontSize: "14px" }}>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          formik.values.count = row.count;
                          formik.values.url = row.url;
                          formik.values.urlblack = row.urlblack;
                          setDetail({
                            id: row._id,
                            count: row.count,
                            url: row.url,
                            urlblack: row.urlblack,
                          });
                          setLoading(false);
                          handleOpen();
                        }}
                      >
                        <CreateIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylemodal}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form className="Form__item" onSubmit={formik.handleSubmit}>
              <TextField
                type="text"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "white",
                  borderRadius: "5px",
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.count}
                error={
                  formik.errors.count && formik.touched.count ? true : false
                }
                name="count"
                id="outlined-basic"
                label={
                  formik.errors.count && formik.touched.count ? (
                    <span style={{ color: "red" }}>{formik.errors.count}</span>
                  ) : (
                    "  edit count"
                  )
                }
                variant="outlined"
              />

              <TextField
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "white",
                  borderRadius: "5px",
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.url}
                error={formik.errors.url && formik.touched.url ? true : false}
                name="url"
                id="outlined-basic"
                variant="outlined"
                label={
                  formik.errors.url && formik.touched.url ? (
                    <span style={{ color: "red" }}>{formik.errors.url}</span>
                  ) : (
                    "  edit url"
                  )
                }
              />
              <TextField
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "white",
                  borderRadius: "5px",
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.urlblack}
                error={
                  formik.errors.urlblack && formik.touched.urlblack
                    ? true
                    : false
                }
                name="urlblack"
                id="outlined-basic"
                variant="outlined"
                label={
                  formik.errors.urlblack && formik.touched.urlblack ? (
                    <span style={{ color: "red" }}>
                      {formik.errors.urlblack}
                    </span>
                  ) : (
                    "  edit urlblack"
                  )
                }
              />

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
                  formik.errors.urlblack && formik.touched.urlblack
                    ? "error"
                    : "success"
                }
              >
                {load ? "Loading..." : "Edit Footer"}
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
          )}
        </Box>
      </Modal>
    </>
  );
}