import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./register1.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Register1 = () => {


  const handleLogin = () => {
    window.location.href = '/login'
  }

  const navigate = useNavigate();
  return (
    <>
          <Formik
            initialValues={{ custName: "", custAddress: "", custPhone: "", custEmail: "", custPassword : "",cardHolder : "", Points : 0,cart : null  }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(async() => {
                try {
                    const res = await axios.post("http://localhost:8080/api/Customer", values);
                    console.log(res.data); 
                  } catch (error) {
                    console.error("Error:", error);
                  } finally {
                    setSubmitting(false);
                    alert("Registration Successful")
                    navigate('/login');
                  }
              }, 500);
            }}

            validationSchema={Yup.object().shape({
              custName: Yup.string()
                  .required("Customer name must be entered")
                  .matches(/^[a-zA-Z ]+$/, "Customer name must contain only characters"),
              custAddress: Yup.string()
                  .required("Customer Address must be entered"),
              custPhone: Yup.string()
                  .required("Customer Phone number must be entered")
                  .matches(/^[0-9]+$/, "Phone number must contain only numbers")
                  .min(10, "Phone number has to be 10 digits")
                  .max(10, "Phone number has to be 10 digits"),
              custEmail: Yup.string()
                  .email("Invalid email format")
                  .required("Email is required"),
              custPassword: Yup.string()
                  .required("No password provided.")
                  .matches(/^[A-Za-z0-9]+$/, "Password must contain only numbers and letters")
                  .min(5, "Password is too short - should be 10 chars minimum.")
                  .max(10, "Password is too long - should be 10 characters maximum."),
                  confirm_password: Yup.string()
                .required("No password provided.")
                .oneOf([Yup.ref('custPassword'), null], "Password must match."),
              cardHolder: Yup.boolean()
                  .required("Please indicate if the person is a card holder.")
          })}
          
          >

            {props => {
              const {
                values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
              } = props;

              if (isSubmitting) {
                var disableStyle = { cursor: "not-allowed", }
              }

              return (
                <div className="bg-light min-vh-100 p-5 m-5">
                  <h1>Please Register</h1>
                  <form onSubmit={handleSubmit}>

                    <label htmlFor="custName">Name</label>
                    <input
                      id="custName"
                      name="custName"
                      type="text"
                      placeholder="Enter your name"
                      value={values.custName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.custName && touched.custName && "error"}
                    />
                    {errors.custName && touched.custName && (
                      <div className="input-feedback">{errors.custName}</div>
                    )}

                    <label htmlFor="custAddress">Address</label>
                    <input
                      id="custAddress"
                      name="custAddress"
                      type="custAddress"
                      placeholder="Enter your Address"
                      value={values.custAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.custAddress && touched.custAddress && "error"}
                    />
                    {errors.custAddress && touched.custAddress && (
                      <div className="input-feedback">{errors.custAddress}</div>
                    )}

                    <label htmlFor="custPhone">Phone</label>
                    <input
                      id="custPhone"
                      name="custPhone"
                      type="custPhone"
                      placeholder="Enter your Phone number"
                      value={values.custPhone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.custPhone && touched.custPhone && "error"}
                    />
                    {errors.custPhone && touched.custPhone && (
                      <div className="input-feedback">{errors.custPhone}</div>
                    )}

                    <label htmlFor="custEmail">Email</label>
                    <input
                      id="custEmail"
                      name="custEmail"
                      type="text"
                      placeholder="Enter your email"
                      value={values.custEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.custEmail && touched.custEmail && "error"}
                    />
                    {errors.custEmail && touched.custEmail && (
                      <div className="input-feedback">{errors.custEmail}</div>
                    )}

                    <label htmlFor="custPassword">Password</label>
                    <input
                      id="custPassword"
                      name="custPassword"
                      type="custPassword"
                      placeholder="Enter your password"
                      value={values.custPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.custPassword && touched.custPassword && "error"}
                    />
                    {errors.custPassword && touched.custPassword && (
                      <div className="input-feedback">{errors.custPassword}</div>
                    )}

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="confirm_password"
                      placeholder="Enter your Confirm Password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.confirm_password && touched.confirm_password && "error"}
                    />
                    {errors.confirm_password && touched.confirm_password && (
                      <div className="input-feedback">{errors.confirm_password}</div>
                    )}

                    <label htmlFor="cardHolder">Are you a CardHolder</label>
                    <input
                      id="cardHolder"
                      name="cardHolder"
                      type="cardHolder"
                      placeholder="true/false"
                      value={values.cardHolder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.cardHolder && touched.cardHolder && "error"}
                    />
                    {errors.cardHolder && touched.cardHolder && (
                      <div className="input-feedback">{errors.cardHolder}</div>
                    )}

                    <div className="d-flex justify-content-between">
                      <button className="btnRegister" style={disableStyle} type="submit" disabled={isSubmitting}>Register</button>
                      <button className="btnRegister" onClick={handleLogin}>Login</button>
                    </div>

                  </form>
                </div>
              );
            }}
          </Formik>
    </>
  )
}

export default Register1;