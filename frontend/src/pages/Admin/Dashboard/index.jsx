import React from "react";
import style from "./index.module.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DeleteMessage, GetAllMessage } from "../../../api/message.requests";
import { useState, useEffect } from "react";
import EmailIcon from "@mui/icons-material/Email";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([]);
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    GetAllMessage().then((res) => {
      setMessage(res);
    });
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("admintoken")) navigate("/login");
  }, [navigate]);
  
  function Row() {
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        {message &&
          message.map((item) => {
            return (
              <TableRow
                key={item._id}
                sx={{ "& > *": { borderBottom: "unset" } }}
              >
                <TableCell style={{ color: "white" }}>
                  <IconButton
                    style={{ color: "white" }}
                    aria-label="expand row"
                    size="small"
                    onClick={() => {
                      setOpen(!open);
                      setDetail(item);
                    }}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  <ContactMailIcon />
                  &nbsp;&nbsp;{item.email}
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  Message&nbsp;(1)
                </TableCell>
              </TableRow>
            );
          })}

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  <li>Delete:</li>
                  <Button
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
                          if (detail) {
                            DeleteMessage(detail?._id);
                            setMessage(
                              message.filter((m) => m._id !== detail._id)
                            );
                          }
                          setMessage(
                            message.filter((m) => m._id !== detail._id)
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
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ color: "white" }} align="left">
                        Name:
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="left">
                        Surname:
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="left">
                        Email:
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="left">
                        Message:
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>
                        {detail?.name}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        {detail?.surname}
                      </TableCell>
                      <TableCell style={{ color: "white" }}>
                        <a href={`mailto:${detail?.email}`}>{detail?.email}</a>
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="left">
                        {detail?.comment}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <div className={style.dashboard}>
      <div className={style.message_table}>
        <TableContainer
          style={{ background: "rgba(0,0,0,0.6" }}
          component={Paper}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ color: "white" }} align="left">
                  <EmailIcon /> Email
                </TableCell>
                <TableCell style={{ color: "white" }} align="left">
                  <MarkChatReadIcon /> Message
                </TableCell>
              </TableRow>
            </TableHead>

            {/* message */}
            <TableBody>
              {message ? (
                <Row />
              ) : (
                <div
                  style={{
                    color: "white",
                    margin: "20px 0",
                    textAlign: "center",
                  }}
                >
                  Message Not Found !!!
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RegisterAdmin;
