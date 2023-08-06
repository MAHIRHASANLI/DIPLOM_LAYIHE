import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBInput,
} from "mdb-react-ui-kit";
import { useFormik } from "formik";
import style from "./index.module.css";
import { useUserContext } from "../../../../global";
import UsersRegister from "../UsersRegister";
import { UsersValidation } from "./users.validation";
import { Button } from "@mui/material";
import { signIn } from "../../../../api/login.requests";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginUser() {
  const [user, setUser, usersAll] = useUserContext();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);

  useEffect(() => {
    if (user || localStorage.getItem("token") || localStorage.getItem("user")) {
      navigate("/fawori");
    }
  }, [navigate, user]);

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };
  //Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: UsersValidation,
    onSubmit: async (values, actions) => {
      const username = usersAll?.find(
        (user) => user.username === values.username
      );
      if (values.password === values.confirmpassword) {
        setError(false);
        setErrorSurname(false);
        const login = {
          username: values.username,
          password: values.password,
        };
        const res = await signIn(login);
        if (res.auth && !res.user?.isAdmin) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user));
          localStorage.setItem("fawori", JSON.stringify([]));
          setUser(res.user);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User signed in successfully!!",
            showConfirmButton: false,
            width: 250,
            timer: 700,
          });
          navigate("/fawori");
        }
        setTimeout(() => {
          actions.resetForm();
        }, 2000);
      } else if (!username) {
        setErrorSurname(true);
        setError(false);
      } else {
        setError(true);
        setErrorSurname(false);
      }
    },
  });
  return (
    <div className={style.login}>
      <button className={style.btn}>
        <NavLink to="/">Go Back</NavLink>
      </button>
      <div className={style.login_item}>
        <MDBContainer className="p-3 my-0 d-flex flex-column w-100">
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={justifyActive === "tab1"}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={justifyActive === "tab2"}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={justifyActive === "tab1"}>
              <form onSubmit={formik.handleSubmit}>
                <div className="text-center mb-1">
                  <p style={{ color: "white" }}>
                    Please enter your Surname and your Password
                  </p>
                </div>

                <MDBInput
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  name="username"
                  wrapperClass="mb-1"
                  id="form1"
                  type="text"
                  label={
                    formik.errors.username && formik.touched.username ? (
                      <li style={{ color: "rgb(252,96,96)" }}>
                        {formik.errors.username}
                      </li>
                    ) : (
                      <li style={{ color: "white" }}>Username</li>
                    )
                  }
                />
                <MDBInput
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  wrapperClass="mb-1"
                  id="form2"
                  type="password"
                  label={
                    formik.errors.password && formik.touched.password ? (
                      <li style={{ color: "rgb(252,96,96)" }}>
                        {formik.errors.password}
                      </li>
                    ) : (
                      <li style={{ color: "white" }}>Password</li>
                    )
                  }
                />
                <MDBInput
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmpassword}
                  name="confirmpassword"
                  wrapperClass="mb-1"
                  id="form3"
                  type="password"
                  label={
                    formik.errors.confirmpassword &&
                    formik.touched.confirmpassword ? (
                      <li style={{ color: "rgb(252,96,96)" }}>
                        {formik.errors.confirmpassword}
                      </li>
                    ) : (
                      <li style={{ color: "white" }}>Confirm password</li>
                    )
                  }
                />
                {error ? (
                  <span style={{ color: "red" }}>passsword eyni deyil!</span>
                ) : (
                  ""
                )}
                {errorSurname ? (
                  <span style={{ color: "red" }}>Username is wrong!</span>
                ) : (
                  ""
                )}
                <div className="d-flex justify-content-center mx-9 mb-9"></div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%", margin: "10px auto 0" }}
                >
                  Sign in
                </Button>
                <p className="text-center">
                  Not a member?
                  <MDBTabsLink
                    style={{ color: "white", display: "inline" }}
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                  >
                    Register
                  </MDBTabsLink>
                </p>
              </form>
            </MDBTabsPane>

            <MDBTabsPane show={justifyActive === "tab2"}>
              <UsersRegister />
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBContainer>
      </div>
    </div>
  );
}

export default LoginUser;
