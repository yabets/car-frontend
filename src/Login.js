import { useState } from "react";
import { SERVER_URL } from "./constants";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CarList from "./CarList";
import { Redirect, Route } from "react-router";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const login = () => {
    axios
      .post(SERVER_URL + "login", user)
      .then((res) => {
        console.log(res);
        const jwt = res.headers.authorization;
        if (jwt !== null) {
          sessionStorage.setItem("jwt", jwt);
          props.setAuthenticated(true);
        } else {
          toast.warn("Check your username and password", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        }
      })
      .catch((err) =>
        toast.warn("Check your username and password", {
          position: toast.POSITION.BOTTOM_LEFT,
        })
      );
  };
  if (props.isAuthenticated === true) {
    return <Redirect to="/cars" />;
  } else {
    return (
      <>
        <TextField name="username" label="Username" onChange={handleChange} />{" "}
        <br />
        <TextField
          name="password"
          label="Password"
          onChange={handleChange}
        />{" "}
        <br /> <br />
        <Button variant="outlined" color="primary" onClick={login}>
          Login
        </Button>
        <ToastContainer autoClose={3500} />
      </>
    );
  }
};

export default Login;
