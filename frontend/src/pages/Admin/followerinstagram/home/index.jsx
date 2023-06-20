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
import Swal from "sweetalert2";
import DeleteIcon from '@mui/icons-material/Delete';

///MODAL//
import Modal from "@mui/material/Modal";
import { DeleteFollowInstagram, GetAllFollowInstagram } from "../../../../api/followinginstagram.requests";
import { validationFollower } from "../followinstagram.validation";
import { Link } from "react-router-dom";


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

export default function FolloInstagramAdmin() {
  const [loading, setLoading] = React.useState(false);
  const [follower, setFollower] = React.useState([]);
  React.useEffect(() => {
    GetAllFollowInstagram().then((res) => {
        setFollower(res);
    });
  }, []);

  
  ///MODAL///
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);

  ///formik//
  function handleSubmit(values, actions) {
    console.log(values);
        setLoading(true)
        // PutContact(values._id, values)
        // setFollower( values);
        setLoading(false);
         handleconnected()
        actions.resetForm();
     
  }
  const formik = useFormik({
    initialValues: {
      url: "",
      count: "",
    },
    validationSchema: validationFollower,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
          <div className={style.companent_left}>
            <div className={style.companent_left__item}>
            <Link to="/admin/adfollower">
              <strong className={style.count}>count: [ {follower.length} ] +</strong>
          </Link>
            </div>
          </div>
          <h2 className={style.namePage}>Follower Data</h2>
        </div>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>
                  Update
                  <CreateIcon
                    style={{ fontSize: "20px", marginBottom: "6px" }}
                  />
                </TableCell>
                   <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {follower &&
                follower.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                    <img className={style.image} src={row.url} alt={row.url} />
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

                    <TableCell style={{ fontSize: "14px" }}><Button
                  variant="outlined"
                  color="error"
                  onClick={(_id)=>{
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
                            if(row){
                              DeleteFollowInstagram(row._id)
                              setFollower(follower.filter((m)=>m._id !== row._id))
                            }
                            setFollower(follower.filter((m)=>m._id !== row._id))
                          Swal.fire(
                            'Deleted!',
                              'Your file has been deleted.',
                              'success'
                            )
                          }
                        })
                  }}><DeleteIcon/></Button></TableCell>
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
            <TextField
              type="text"
              margin="dense"
              hiddenLabel
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
                  <span style={{ color: "red" }}>{formik.errors.url}</span>
                ) : (
                  "  edit image"
                )
              }
            />
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
              value={formik.values.count}
              error={
                formik.errors.count && formik.touched.count ? true : false
              }
              name="count"
              label={
                formik.errors.count && formik.touched.count ? (
                  <span style={{ color: "red" }}>{formik.errors.count}</span>
                ) : (
                  "  edit count"
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
              {loading ? "Loading..." : "Edit Follower"}
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
