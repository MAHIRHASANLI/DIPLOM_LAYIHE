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
import { TableHead } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/More";
import CreateIcon from "@mui/icons-material/Create";
import { GetAllChoose } from '../../../../../api/choose.requests';
import { useGlobalChoose } from "../../../../../global";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect } from "react";

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

const ChooseAdmin = () => {
  const navigate = useNavigate();
      const  [globalChoose, setGlobalChoose]=useGlobalChoose()
      useEffect(() => {
        if (!localStorage.getItem("admintoken")) navigate("/login");
      }, [navigate]);
      function handleChange(e){
        GetAllChoose(e.target.value).then((res)=>{
          setGlobalChoose(res)
        })
    }
    function sortedChange(){
      setGlobalChoose([...globalChoose.sort((a,b)=> a.name.localeCompare(b.name))])
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - globalChoose.length) : 0;
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  return (
    <div className={style.Table}>
    {/* table uzeri companentler */}
    <div className={style.Table_companent}>
       <div className={style.companent_left}>
        <button onClick={sortedChange} className={style.companent_left__item}>
        <FilterListIcon style={{color:"blue"}}/>
        </button>
       <Link to="/admin/adchoose">
          <div className={style.companent_left__item}>
           {/* New */}
           <strong style={{color:"blue"}}>count: [ {globalChoose.length} ] +</strong>
          </div>
      </Link>
       </div>
      <h2 className={style.namePage}>Choose Data</h2>    

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
            <TableCell className={style.container}>Title</TableCell>
            <TableCell>Detail<CreateIcon style={{fontSize:"20px",marginBottom:"6px"}}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? globalChoose.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : globalChoose
          ).map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <i className={row.url} style={{fontSize:"30px",textAlign:"right"}} ></i>
              </TableCell>
              <TableCell><span style={{ fontSize: "14px" }}>{row.name}</span></TableCell>
              <TableCell
                className={style.container}
                style={{ fontSize: "14px",textAlign:"start" }}
              >
                <div className={style.ellipsis}><span style={{ fontSize: "14px" }}>{row.title}</span></div>
              </TableCell>
              <TableCell style={{ fontSize: "14px",textAlign:"start" }} >
                <Link to={`/admin/detailchoose/${row._id}`}>regaet
                  <MoreIcon style={{ color: "blueviolet" }} />
                </Link>
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
              count={globalChoose.length}
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
  )
}

export default ChooseAdmin