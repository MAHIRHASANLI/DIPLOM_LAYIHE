import * as React from "react";
import style from "./index.module.css";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Button, TableHead, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { DeleteFooter, GetAllFooter } from "../../../../api/footer.requests";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from '@mui/icons-material/Delete';
///MODAL//
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { validationFooter } from "../footer.validation";



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
///modall.Style//
const stylemodal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FooterAdmin() {
    const [footer, setFooter] = React.useState([])
  React.useEffect(()=>{
    GetAllFooter().then((res)=>{
      setFooter(res)
    })
  },[])
  function handleChange(e){
    GetAllFooter(e.target.value).then((res)=>{
      setFooter(res)
    })
}
  function sortedChange(){
    setFooter(footer.sort((a,b)=>a.id > b.id))
  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - footer.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  ///MODAL///
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleconnected = () => setOpen(false);
  const handleClose = () => setOpen(false);

///formik//
function handleSubmit(values,actions){
  console.log(values);
}
  const formik = useFormik({
    initialValues: {
      url: "",
      name:""
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
            <button onClick={sortedChange} className={style.companent_left__item}>
              Sorted id
            </button>
           <Link to="/admin/adfooter">
              <div className={style.companent_left__item}>
              <strong  className={style.count}>count: [ {footer.length} ] +</strong>
              </div>
          </Link>
           </div>
          <h2 className={style.namePage}>Footer Data</h2>   

          <input
          type="text"
          className={style.inputsearch}
          onChange={(e)=>handleChange(e)}
          name="name"
          placeholder="   search "
          variant="outlined"
          form="outlined-basic"
        />
        </div>

        {/* table */}
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? footer.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : footer
              ).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>
                    <img className={style.image} src={row.url} alt="" />
                  </TableCell>
                  <TableCell style={{ fontSize: "14px" }}>{row.name}</TableCell>
                  <TableCell style={{ fontSize: "14px" }}><Button 
                  variant="outlined"
                  color="success"
                  onClick={handleOpen}><CreateIcon/></Button></TableCell>
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
                              DeleteFooter(row._id)
                              setFooter(footer.filter((m)=>m._id !== row._id))
                            }
                            setFooter(footer.filter((m)=>m._id !== row._id))
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
                  count={footer.length}
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
            value={formik.values.name}
            error={formik.errors.name && formik.touched.name ? true : false}
            name="name"
            id="outlined-basic"
            label={
              formik.errors.name && formik.touched.name ? (
                <p style={{ color: "red" }}>{formik.errors.name}</p>
              ) : (
                "  edit name"
              )
            }
            variant="outlined"
          />
     <TextField style={{width:"100%",marginTop:"10px",background:"white",borderRadius:"5px"}}  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.url} error={formik.errors.url && formik.touched.url ?true : false} name='url' id="outlined-basic"  variant="outlined" label={formik.errors.url && formik.touched.url ? (
          <p style={{ color: "red" }}>{formik.errors.url}</p>
        ) : "  edit image"} />
     

    <Button  variant="outlined"  style={{display:"block", margin:"20px auto",background:"white",borderRadius:"5px"}} type='submit' color={formik.errors.url && formik.touched.url ? (
         "error" 
        ) :"success" }>
      {/* &nbsp;&nbsp;&nbsp; */}
      Edit Footer
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
