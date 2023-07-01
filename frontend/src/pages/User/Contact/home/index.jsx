import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { GetAllContact } from "../../../../api/contact.requests";
import style from "./index.module.css";

const ContactUser = () => {
  const [contact, setContact] = React.useState([]);
  React.useEffect(() => {
    GetAllContact().then((res) => {
      setContact(res);
    });
  }, []);
  return (
    <div className={style.contact_user}>
      <div style={{ width: "86%" }}>
        <Box sx={{ flexGrow: 1 }}>
          {contact &&
            contact.map((item) => {
              return (
                <Grid key={item._id} container spacing={3}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <h2>
                      Let’s Work <br /> Together
                    </h2>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <p>Email</p>
                    <a href={`mailto:${item.email}`}>{item.email}</a>

                    <p>Call Us</p>
                    <a href={`tel:${item.mobile}`}>{item.mobile}</a>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <p>Visit Us</p>
                    <a href={`http://maps.google.com/?q=${item.maps}`}>
                      {item.address}
                    </a>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div style={{ padding: "60px 0 25px" }}>
                      <iframe
                        title="davinci"
                        id="iframevideo"
                        className={style.iframe_user}
                        aria-hidden="false"
                        src={item.maps}
                      ></iframe>
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

export default ContactUser;
