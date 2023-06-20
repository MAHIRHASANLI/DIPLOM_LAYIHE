import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import style from "./index.module.css";
import { useGlobalPassion } from "../../../../global";
import IframeModal from "./modal";

const PassionUser = () => {
  const [globalPassion] = useGlobalPassion();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={style.Passion}>
      <div style={{ width: "87%" }}>
        <Box sx={{ flexGrow: 1 }}>
          {globalPassion &&
            globalPassion.map((item) => {
              return (
                <Grid key={item._id} container spacing={4}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div>
                      <h3 className={style.passion_about}>{item.about}</h3>
                      <p className={style.passion_title}>{item.title}</p>
                      <p className={style.passion_title}>{item.title}</p>

                      <a href="" className={style.button}>
                        Contact Us
                      </a>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={style.iframe_img}>
                        <i
                        onClick={handleOpen}
                          style={{ margin: "auto" }}
                          className="fa-solid fa-play"
                        ></i>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        className="w-full rounded"
                        src={item.img}
                        alt="Loading..."
                      />
                    </div>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </div>
      <IframeModal open={open} handleOpen={handleOpen} setOpen={setOpen} handleClose={handleClose} />
    </div>
  );
};

export default PassionUser;
