import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// import logo from "../../resource/logo.png"

import Toast from "./Toast";
import Actions from "../../store/actions";
import "./Login.scss";
import Button from "./Button";
export default function Login() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    login: "",
    password: "",
    rememberMe: false,

  });

  const [error, setError] = useState({
    errorMsg: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type==='checkbox'?target.checked: target.value;
    const name = target.name;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const login = {
      user: state.login,
      pw: state.password,
      rememberMe:state.rememberMe
    };
    if (login.user.trim() && login.pw.trim()) {
      var serverURL = `http://${window.location.hostname}:3000`;

      axios
        .post(
          `${serverURL}/node/api/auth/login`,
          JSON.stringify({ user: login.user, password: login.pw,rememberMe:login.rememberMe }),
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log("logged!");

            dispatch(Actions.ActionLogin(res.data));
            window.location.href = "/";
            //history.push("/");
          }
        })
        .catch(function (error) {
          setError({
            errorMsg: "Invalid user/password !",
          });
        });
    } else {
      setError({
        errorMsg: "Enter Login and Password",
      });
    }
  };
  const onChangeErrorMessage = () => {
    setError({
      errorMsg: "",
    });
  };

  return (
    <div className="row justify-content-center  d-flex">
    <div className="card  d-flex" style={{ width: "320px" }}>
    <form className="form-signin " onSubmit={handleSubmit}>
        {/* <div className="m-3  text-muted w-100 d-flex justify-content-center">
        <img src={logo} width="120px" alt="logo"></img>

        </div> */}
        <h1 className="h3 mb-3">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Login
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Login"
          name="login"
          required=""
          autoFocus=""
          onChange={handleInputChange}
        ></input>
        <label htmlFor="inputPassword" className="sr-only mt-2">
          Password
        </label>
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          name="password"
          required=""
          onChange={handleInputChange}
        ></input>
        <div className="d-flex">
        <input
            className={" form-check-input m-1"}
            type="checkbox"
            name="rememberMe"
            onChange={handleInputChange}
          ></input>
          <h6 className="mt-1">Remember Me</h6>
        </div>


        <div className="d-flex justify-content-start">
         <Button className="btn btn-lg btn-Light btn-block my-1" type="submit"> Sign in</Button>
        </div>
        
        <div className="mt-3  text-muted w-100 d-flex justify-content-center">
        <p >© 2021</p>

        </div>
      </form>

      <Toast
        messageError={error.errorMsg}
        className="bg-danger text-white"
        onChangeErrorMessage={onChangeErrorMessage}
      />
    </div>
  </div>
    // <div className="text-center align-middle">
      // <form className="form-signin mt-5" onSubmit={handleSubmit}>
      //   <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      //   <label htmlFor="inputEmail" className="sr-only">
      //     Login
      //   </label>
      //   <input
      //     type="text"
      //     className="form-control"
      //     placeholder="Login"
      //     name="login"
      //     required=""
      //     autoFocus=""
      //     onChange={handleInputChange}
      //   ></input>
      //   <label htmlFor="inputPassword" className="sr-only">
      //     Password
      //   </label>
      //   <input
      //     type="password"
      //     className="form-control"
      //     placeholder="Password"
      //     name="password"
      //     required=""
      //     onChange={handleInputChange}
      //   ></input>
      //   <button className="btn btn-lg btn-primary btn-block my-1" type="submit">
      //     Sign in
      //   </button>
      //   <p className="mt-5 mb-3 text-muted">© 2021</p>
      // </form>

      // <Toast
      //   messageError={error.errorMsg}
      //   className="bg-danger text-white"
      //   onChangeErrorMessage={onChangeErrorMessage}
      // />
    // </div>
  );
}
/*
<div className="position-fixed bottom-0 end-0 p-3" style={{zIndex:"11"}}>
                    <div className={"toast align-items-center bg-danger toastFadeIn " + (errorShow===true?"show":"")} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex p-2 text-white">
                            <h6 className="me-2"> ERROR:</h6> {error.errorMsg}
                    </div>
                    </div>
                </div>
*/
