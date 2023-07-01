import React from "react";
import { MDBCheckbox, MDBInput } from "mdb-react-ui-kit";
import { useFormik } from "formik";
import { UsersValidation } from "./users.validation";
import { Button } from "@mui/material";
import {  signUP } from "../../../../api/login.requests";
import Swal from "sweetalert2";
import { useState } from "react";
import { useUserContext } from "../../../../global";

const RegisterUsers = () => {
  const [usersAll] = useUserContext();
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);


  //Formik
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      checkbox: false,
    },
    validationSchema: UsersValidation,
    onSubmit: async (values, actions) => {
      const username = usersAll?.find(
        (user) => user.username === values.username
      );
      const email = usersAll?.find((user) => user.email === values.email);
      if (username) {
        setErrorSurname(true);
        setErrorSurname(true);
      } else if (email) {
        setErrorEmail(true);
        setErrorSurname(false);
      } else {
        setErrorSurname(false);
        setErrorEmail(false);
        const newUser = {
          username: values.username,
          email: values.email,
          password: values.password,
        };
        await signUP(newUser);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User signed up successfully!!",
          showConfirmButton: false,
          width: 250,
          timer: 1000,
        });
        setTimeout(() => {
          actions.resetForm();
        }, 2000);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="text-center mb-3">
        <p style={{color:"white"}}>Sign un with:</p>
      </div>
      <MDBInput
        onChange={formik.handleChange}
        value={formik.values.username}
        name="username"
        onBlur={formik.handleBlur}
        wrapperClass="mb-1"
        label={
          formik.errors.username && formik.touched.username ? (
            <li style={{ color: "rgb(252,96,96)" }}>
              {formik.errors.username}
            </li>
          ) : (
            <li style={{ color: "white" }}>Username</li>
          )
        }
        id="form1"
        type="text"
      />
      <MDBInput
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        onBlur={formik.handleBlur}
        wrapperClass="mb-1"
        label={
          formik.errors.email && formik.touched.email ? (
            <li style={{ color: "rgb(252,96,96)" }}>{formik.errors.email}</li>
          ) : (
            <li style={{ color: "white" }}>Email</li>
          )
        }
        id="form1"
        type="email"
      />
      <MDBInput
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        onBlur={formik.handleBlur}
        wrapperClass="mb-0"
        label={
          formik.errors.password && formik.touched.password ? (
            <li style={{ color: "rgb(252,96,96)" }}>
              {formik.errors.password}
            </li>
          ) : (
            <li style={{color:"white"}}>Password</li>
          )
        }
        id="form1"
        type="password"
      />

      <div className="d-flex justify-content-center mb-2">
        <MDBCheckbox
          name="checkbox"
          id="flexCheckDefault"
          onChange={formik.handleChange}
          value={formik.values.checkbox}
          label={
            formik.errors.checkbox && formik.touched.checkbox ? (
              <li style={{ color: "rgb(252,96,96)" }}>
                {formik.errors.checkbox}
              </li>
            ) : (
            <li style={{color:"white"}}>I have read and agree to the terms</li>
            )
          }
        />
      </div>
      {errorSurname ? (
        <div style={{ color: "red" }}>surname is not unique!</div>
      ) : (
        ""
      )}
      {errorEmail ? (
        <span style={{ color: "red" }}>email is not unique!</span>
      ) : (
        ""
      )}

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ width: "100%" }}
      >
        Sign up
      </Button>
    </form>
  );
};

export default RegisterUsers;
