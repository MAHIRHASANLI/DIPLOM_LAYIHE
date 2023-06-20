import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useGlobalPassion } from "../../../../../global";

const stylemodal = {
  position: "absolute",
  top: "57%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "97%",
  height: "83%",
  padding: "0",
  margin: "auto",
  overflow: "hidden",
  bgcolor: "background.paper",
  border: "1px solid black",
  background: "rgba(0,0,0,0.7)",
  borderRadius: "15px",
  boxShadow: 24,
  zIndex: "9999999",
  pt: 4,
  px: 0,
  pb: 4,
};
const stylebutton = {
  position: "absolute",
  top: "-2px",
  right: "-1px",
  color: "white",
  padding: "5px 16px",
  background: "rgb(252, 96, 96)",
};

const IframeModal = (props) => {
  const [globalPassion] = useGlobalPassion();
  const [loading, setLoading] = useState(true);
  const open = props.open;
  const setOpen = props.setOpen;
  // {
  //   globalPassion &&
  //     globalPassion.map((item)=>item.url? setLoading(false):setLoading(true));
  // }

  //   function handleOpen() {

  // }

  const handleConnected = () => {
    setOpen(false);
    // setLoading(true);
  };

  return (
    <Modal
      open={open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={stylemodal}>
        <button style={stylebutton} onClick={handleConnected}>
          X
        </button>
        {globalPassion &&
          globalPassion.map((item) => {
            return (
              <iframe
                key={item._id}
                width="100%"
                height="100%"
                src={item.url}
              ></iframe>
            );
          })}
      </Box>
    </Modal>
  );
};

export default IframeModal;
