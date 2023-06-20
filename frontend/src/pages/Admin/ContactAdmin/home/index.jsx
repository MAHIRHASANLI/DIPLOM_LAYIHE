import * as React from "react";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead, TextField } from "@mui/material";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
///MODAL//
import Modal from "@mui/material/Modal";
import { GetAllContact, PutContact } from "../../../../api/contact.requests";
import { validationContact } from "../validation.contact";


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

export default function ContactAdmin() {
  const [loading, setLoading] = React.useState(false);
  const [contact, setContact] = React.useState([]);
  React.useEffect(() => {
    GetAllContact().then((res) => {
      setContact(res);
    });
  }, []);

  
  ///MODAL///
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);

  ///formik//
  function handleSubmit(values, actions) {
        setLoading(true)
        // PutContact(values._id, values)
        setContact( values);
        setLoading(false);
         handleconnected()
        actions.resetForm();
     
  }
  const formik = useFormik({
    initialValues: {
      address: "",
      mobile: "",
      email: "",
    },
    validationSchema: validationContact,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
          <div className={style.companent_left}>
            <div className={style.companent_left__item}>
              <strong className={style.count}>
                count: [ {contact.length} ]
              </strong>
            </div>
          </div>
          <h2 className={style.namePage}>Contact Data</h2>
        </div>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Mobile</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>
                  Update
                  <CreateIcon
                    style={{ fontSize: "20px", marginBottom: "6px" }}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contact &&
                contact.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <iframe
                      className={style.image}
                        src={row.address}
                        aria-hidden="false"
                        tabIndex="0"
                      ></iframe>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: "14px" }}>{row.mobile}</span>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: "14px" }}>{row.email}</span>
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
            {/* setSelectImage(e.target.files[0]); */}
            <TextField
              type="text"
              margin="dense"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error={
                formik.errors.address && formik.touched.address ? true : false
              }
              name="address"
              label={
                formik.errors.address && formik.touched.address ? (
                  <span style={{ color: "red" }}>{formik.errors.address}</span>
                ) : (
                  "  edit address"
                )
              }
            />

            <TextField
              type="text"
              margin="dense"
              hiddenLabel
              id="filled-hidden-label-small"
              variant="outlined"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile}
              error={
                formik.errors.mobile && formik.touched.mobile ? true : false
              }
              name="mobile"
              label={
                formik.errors.mobile && formik.touched.mobile ? (
                  <span style={{ color: "red" }}>{formik.errors.mobile}</span>
                ) : (
                  "  edit mobile"
                )
              }
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
              {loading ? "Loading..." : "Edit Contact"}
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
