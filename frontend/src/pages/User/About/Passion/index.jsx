import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import style from "./index.module.css";
import { useGlobalPassion } from "../../../../global";
import { useState } from "react";

const PassionUser = () => {
  const [globalPassion] = useGlobalPassion();
  const [file, setFile] = useState(null);

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

                      <a className={style.button}>Contact Us</a>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <div className={style.iframe_img}>
                      <i
                        onClick={() => setFile(item)}
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

      <div className={style.popup_media}  style={{ display: file ? "block" : "none" }}>
        <span onClick={() => setFile(null)}>&times;</span>
        {<video src={file?.url} muted autoPlay controls></video>}
      </div>
    </div>
  );
};

export default PassionUser;
