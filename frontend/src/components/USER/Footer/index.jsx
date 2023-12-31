import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetAllLogoFooter } from "../../../api/logo.footer.requests";
import style from "./index.module.css";
import { useState } from "react";
import { useEffect } from "react";

const FooterUser = () => {
  const [footer, setFooter] = useState([]);
  useEffect(() => {
    GetAllLogoFooter().then((res) => {
      setFooter(res);
    });
  }, []);
  return (
    <div className={style.footeruser}>
      <div style={{ width: "86%" }}>
        <Box sx={{ flexGrow: 1 }}>
          {footer &&
            footer.map((item) => {
              return (
                <Grid key={item._id} container spacing={3}>
                  <Grid item xs={12} sm={7} md={8} lg={9}>
                    <p className={style.count}>
                      {item.count}{" "}
                      <span style={{ color: "red", display: "inline" }}>
                        Colorlib
                      </span>
                    </p>
                  </Grid>
                  <Grid item xs={12} sm={5} md={4} lg={3}>
                    <div className={style.logo_icons}>
                      <img
                        style={{ width: "82px", height: "22px" }}
                        src={item.urlblack}
                        alt="Alime."
                      />{" "}
                      <div className={style.team_icons}>
                        <div>
                          <a href="https://www.facebook.com/sharer/sharer.php?u=example.org">
                            <i className="fa-brands fa-facebook-f"></i>
                          </a>
                          <a href="https://www.facebook.com/sharer/sharer.php?u=example.org">
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                          <a href="https://www.linkedin.com/in/mahir-hasanli-002413273/">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                          <a href="https://www.linkedin.com/in/mahir-hasanli-002413273/">
                            <i className="fa-brands fa-pinterest-p"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              );
            })}
        </Box>
      </div>
    </div>
  );
};

export default FooterUser;
