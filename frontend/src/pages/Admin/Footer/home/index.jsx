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
import FilterListIcon from "@mui/icons-material/FilterList";

///MODAL//
import Modal from "@mui/material/Modal";
import { validationFooter } from "../footer.validation";
import axios from "axios";
import { GetAllLogoFooter } from "../../../../api/logo.footer.requests";

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
  const [loading, setLoading] = React.useState(false);
  const [footer, setFooter] = React.useState([]);
  React.useEffect(() => {
    GetAllLogoFooter().then((res) => {
      setFooter(res);
    });
  }, []);

  function sortedChange() {
    setFooter(footer.sort((a, b) => a._id > b._id));
  }

  ///MODAL///
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);

  ///formik//
  function handleSubmit(values, actions) {
    setLoading(true);
    const formData = new FormData();
    formData.appendc("file", values.url, values.urlblack);
    formData.append("upload_preset", "w2bgln2g");
    axios
      .post("https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload", formData)
      .then((res) => {
        const newObj = {
          url: res.data.secure_url,
          urlblack: res.secure_url,
          count: values.count,
        };
        console.log(newObj);
        // PutHomeAbout(values._id,newObj);
        setFooter([...footer, values]);
        setLoading(false);
        handleconnected();
        actions.resetForm();
      });
  }
  const formik = useFormik({
    initialValues: {
      url: "",
      urlblack: "",
      count: "",
    },
    validationSchema: validationFooter,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
          <div className={style.companent_left}>
            <button
              onClick={sortedChange}
              className={style.companent_left__item}
            >
              <FilterListIcon style={{ color: "blue" }} />
            </button>
          </div>
          <h2 className={style.namePage}>Footer Data</h2>
        </div>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Logo</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {footer &&
                footer.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img className={style.image} src={row.url} alt="" />
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: "14px" }}>{row.count}</span>
                    </TableCell>
                    <TableCell style={{ fontSize: "14px" }}>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={handleOpen}
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

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylemodal}>
          <form className="Form__item" onSubmit={formik.handleSubmit}>
            {/* setSelectImage(e.target.files[0]); */}
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
              error={formik.errors.count && formik.touched.count ? true : false}
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
              value={formik.values.urlblack}
              error={
                formik.errors.urlblack && formik.touched.urlblack ? true : false
              }
              name="urlblack"
              id="outlined-basic"
              variant="outlined"
              label={
                formik.errors.urlblack && formik.touched.urlblack ? (
                  <span style={{ color: "red" }}>{formik.errors.urlblack}</span>
                ) : (
                  "  edit logo"
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
              value={formik.values.url}
              error={formik.errors.url && formik.touched.url ? true : false}
              name="url"
              id="outlined-basic"
              variant="outlined"
              label={
                formik.errors.url && formik.touched.url ? (
                  <span style={{ color: "red" }}>{formik.errors.url}</span>
                ) : (
                  "  edit logo"
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
                formik.errors.url && formik.touched.url ? "error" : "success"
              }
            >
              {/* &nbsp;&nbsp;&nbsp; */}
              {loading ? "Loading..." : "Edit Footer"}
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
}
