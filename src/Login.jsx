import React, { useEffect, useState } from "react";
import "./Login/Login_web.css";
import banklogo from "./img/bank.png";
import ModalRes from "ModalRes";
import constants from "utils/constants";
import error_img from "./Login/error.png";
import encrypt from "utils/Functions/encrypt.js";
import Loader from "./Loader/Loaderimage.jsx";
import { Button, FormGroup, Input, Label } from "reactstrap";
import delete_cache from "./global/clear_browser_cache";
const Login = () => {
  const [alertTitle, setAlertTitle] = useState("none");
  const [alertMessage, setAlertMessage] = useState("none");
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState("none");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const modalClose = () => {
    setModal(false);
  };

  const loginRequest = (event) => {
    event.preventDefault();
    setLoader("block");
    let usernameVal = username;
    let passwordVal = password;

    if (usernameVal && usernameVal != "" && passwordVal && passwordVal !== "") {
      fetch(constants.url + "authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameVal, password: passwordVal }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            if (result.success === true) {
              const role = result.role;
              const id = result.id+"";
              if (role && role !== "" && role == "banker") {
                window.location.replace("/admin/transaction");
              } else if (role && role !== "" && role == "customer") {
                window.location.replace("/subuser/transaction");
              }
              localStorage.setItem("flag", encrypt("Y"));
              localStorage.setItem("role", encrypt(role));
              localStorage.setItem("id", encrypt(id));
              const expiry = new Date();
              expiry.setHours(expiry.getHours() + 6);
              localStorage.setItem(
                "session_expired_time",
                encrypt(expiry.toString())
              );
              localStorage.setItem("username", encrypt(username.toUpperCase()));
              localStorage.setItem("token", result.token);
            } else {
              setAlertTitle("Error");
              setModal(true);
              setLoader("none");
              setAlertMessage(result.msg);
            }
          },
          (error) => {
            setModal(true);
            setAlertTitle("Error");
            setLoader("none");
            setAlertMessage("Something Went Wrong");
            console.log(error);
          }
        );
    } else {
      setLoader("none");
      setAlertTitle("Error");
      setAlertMessage("Please Enter All Details");
      setModal(true);
    }
  };
  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("flag", encrypt("N"));
    delete_cache();
  }, []);

  return (
    <div className="Login">
      <Loader show={loader} />
      <ModalRes
        header={alertTitle}
        open_v={modal}
        clicker={modalClose}
        alert_msg={alertMessage}
        img={error_img}
      />
      <div className="container-fluid" id="cf">
        <div className="row" id="r">
          <div className="col-md-5" id="right">
            <form
              id="formmain"
              className="contact_form"
              autoComplete="off"
              onSubmit={loginRequest}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={banklogo}
                  className="img-fluid"
                  id="vendorimage"
                  style={{ maxWidth: "100px" }}
                ></img>
                <br />
              </div>
              <marquee>
                <Label
                  id="label"
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "#000000",
                    marginBottom: "20px",
                  }}
                >
                  Welcome To{" "}
                  <span style={{ color: "#ff5c5c", paddingLeft: "7px" }}>
                    {" "}
                    Banking App
                  </span>
                </Label>
              </marquee>
              <div
                className="group"
                style={{
                  left: "0",
                  right: "0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormGroup>
                  <Input
                    type="text"
                    placeholder="Username"
                    name="id"
                    id="id"
                    autoComplete="off"
                    defaultValue={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></Input>
                </FormGroup>
              </div>
              <br></br>

              <div
                className="group"
                style={{
                  left: "0",
                  right: "0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <FormGroup>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="pass"
                    id="pass"
                    autoComplete="false"
                    defaultValue={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  ></Input>
                </FormGroup>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  className="btn"
                  style={{
                    marginTop: "20px",
                    width: "200px",
                    left: "0",
                    right: "0",
                    textAlign: "center",
                    backgroundColor: "#F47216",
                  }}
                >
                  SIGN IN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
