import React from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { AdminValidation } from "./loginadmin.validation";
import { Button } from "@mui/material";
import { signIn } from "../../../api/login.requests";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  ///Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: AdminValidation,
    onSubmit: async (values, actions) => {
      const res = await signIn(values);
      if (res.auth && res.user.isAdmin) {
        localStorage.setItem("admintoken", res.token);
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    },
  });
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              <form onSubmit={formik.handleSubmit}>
                <MDBInput
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  name="username"
                  wrapperClass="mb-4"
                  label={
                    formik.errors.username && formik.touched.username ? (
                      <li style={{ color: "rgb(252,96,96)" }}>
                        {formik.errors.username}
                      </li>
                    ) : (
                      "Username"
                    )
                  }
                  id="form1"
                  type="text"
                />
                <MDBInput
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  name="password"
                  wrapperClass="mb-4"
                  label={
                    formik.errors.password && formik.touched.password ? (
                      <li style={{ color: "rgb(252,96,96)" }}>
                        {formik.errors.password}
                      </li>
                    ) : (
                      "Password"
                    )
                  }
                  id="form2"
                  type="password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", margin: "10px auto 0" }}
                >
                  Sign in
                </Button>
              </form>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default AdminLogin;
