import * as React from "react";
import style from "./index.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import MoreIcon from "@mui/icons-material/More";
import Paper from "@mui/material/Paper";
import { TableHead } from "@mui/material";
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import { GetAllPassion } from "../../../../../api/position.requests";

export default function Passion() {
    const [forPossion, setForPossion] = useState([])
   useEffect(()=>{
    GetAllPassion().then((res)=>{
      setForPossion(res)
    })
  },[])
  
  return (
       <div className={style.Table}>
        {/* table uzeri companent */}
        <div className={style.Table_companent}>
           <div className={style.companent_left}>
            <button className={style.companent_left__item}>
            <strong className={style.count}>count: [ {forPossion.length} ]</strong>
            </button>
           </div>
          <h2 className={style.namePage}>Possion Data</h2>    
        </div>

        {/* table */}
        <TableContainer component={Paper}>
        
          <Table sx={{ width: "100%" }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>About</TableCell>
                <TableCell style={{textAlign:"center"}}>Update<CreateIcon style={{fontSize:"20px",marginBottom:"6px"}}/></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {forPossion && forPossion.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                className={style.container}
                style={{ fontSize: "14px",textAlign:"center" }}
              >
                <div className={style.ellipsis}>{row.about}</div>
              </TableCell>
                  <TableCell style={{ fontSize: "14px",textAlign:"center" }}>
                    <Link to={`/admin/detailpassion/${row._id}`}><MoreIcon style={{ color: "blueviolet" }} /></Link>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
  );
}
