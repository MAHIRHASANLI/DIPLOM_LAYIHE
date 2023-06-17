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
import { Link } from "react-router-dom";
import MoreIcon from "@mui/icons-material/More";
import CreateIcon from "@mui/icons-material/Create";
import { useGlobalTeam } from "../../../../../global";
import { GetAllTeam } from "../../../../../api/ourteam.requests";


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

const OurTeamAdmin = () => {
      const  [globalTeam, setGlobalTeam]=useGlobalTeam()
      function handleChange(e){
        GetAllTeam(e.target.value).then((res)=>{
          setGlobalTeam(res)
        })
    }
    function sortedChange(){
      console.log("salam");
      
    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - globalTeam.length) : 0;
  
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
        <button onClick={()=>{
          const sorteddata = globalTeam.filter((a, b)=>a.name- b.name)
          setGlobalTeam(sorteddata)
        }} className={style.companent_left__item}>
          Sorted name
        </button>
       <Link to="/admin/adteam">
          <div className={style.companent_left__item}>
            <strong className={style.count}>count: [ {globalTeam.length} ] +</strong>
          </div>
      </Link>
       </div>
      <h2 className={style.namePage}>our_team Data</h2>    

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
            <TableCell>Title</TableCell>
            <TableCell>Detail<CreateIcon style={{fontSize:"20px",marginBottom:"6px"}}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? globalTeam.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : globalTeam
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <img className={style.image} src={row.url} alt="" />
              </TableCell>
              <TableCell style={{ fontSize: "14px" }}>{row.name}</TableCell>
              <TableCell
                className={style.container}
                style={{ fontSize: "14px",textAlign:"start" }}
              >
                <div className={style.ellipsis}>{row.title}</div>
              </TableCell>
              <TableCell style={{ fontSize: "14px",textAlign:"start" }} >
                <Link to={`${row.url}`?`/admin/detailteam/${row._id}`:"/admin/team"}>
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
              count={globalTeam.length}
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

export default OurTeamAdmin