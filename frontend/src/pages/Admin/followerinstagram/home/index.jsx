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
import DeleteIcon from "@mui/icons-material/Delete";
///
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
///
///MODAL//
import Modal from "@mui/material/Modal";
import {
  DeleteFollowInstagram,
  GetAllFollowInstagram,
  PutFollowInstagram,
} from "../../../../api/followinginstagram.requests";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { validationFollower } from "./follow.validation";

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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function FolloInstagramAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [follower, setFollower] = useState([]);
  const [detail, setDetail] = useState({});
  const [load, setLoad] = useState(true)
  ///MODAL///
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);

  ///Get All
  useEffect(() => {
    GetAllFollowInstagram().then((res) => {
      setFollower(res);
    });
  }, [loading]);

  ///formik//
  const formik = useFormik({
    initialValues: {
      url: "",
      count: "",
    },
    validationSchema: validationFollower,
    onSubmit: async (values) => {
      setLoading(true);
      if (values.url == detail.url) {
      await  PutFollowInstagram(detail.id, values);
        setFollower([...follower, values]);
        console.log("Cloudinary update olunmadi!");
      } else {
        const formData = new FormData();
        try {
          formData.append("file", values.url);
          formData.append("upload_preset", "eltc4qvh");
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dbb6ug7f5/image/upload",
            formData
          );
          const newObj = {
            url: res.data.secure_url,
            count: values.count,
          };
         await PutFollowInstagram(detail.id, newObj);
          setFollower([...follower, newObj]);
          console.log("Cloudinary update olundu!");
        } catch (error) {
          console.log(`Followers: ${error}`);
        }
      }
      setLoading(false);
      handleconnected();
    },
  });
///
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - follower.length) : 0;

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};
  return (
    <>
      <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
          <div className={style.companent_left}>
            <div className={style.companent_left__item}>
              <Link to="/admin/adfollower">
                <strong className={style.count}>
                  count: [ {follower.length} ] +
                </strong>
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
              {(rowsPerPage > 0
              ? follower.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : follower
            ).map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>
                      <img
                        className={style.image}
                        src={row.url}
                        alt={row.url}
                      />
                    </TableCell>

                    <TableCell>
                      <span style={{ fontSize: "14px" }}>{row.count}</span>
                    </TableCell>

                    <TableCell style={{ fontSize: "14px" }}>
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          formik.values.url = row.url;
                          formik.values.count = row.count;
                          setDetail({
                            id: row._id,
                            url: row.url,
                          });
                          setLoad(false)
                          handleOpen();
                        }}
                      >
                        <CreateIcon />
                      </Button>
                    </TableCell>

                    <TableCell style={{ fontSize: "14px" }}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(_id) => {
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
                              if (row) {
                                DeleteFollowInstagram(row._id);
                                setFollower(
                                  follower.filter((m) => m._id !== row._id)
                                );
                              }
                              setFollower(
                                follower.filter((m) => m._id !== row._id)
                              );
                              Swal.fire(
                                "Deleted!",
                                "Your file has been deleted.",
                                "success"
                              );
                            }
                          });
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
           {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
       
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={follower.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
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
        {load?(<div>Loading</div>):(  <form className="Form__item" onSubmit={formik.handleSubmit}>
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
              error={formik.errors.url && formik.touched.url ? true : false}
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
              error={formik.errors.count && formik.touched.count ? true : false}
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
          </form>)}
        </Box>
      </Modal>
    </>
  );
}
