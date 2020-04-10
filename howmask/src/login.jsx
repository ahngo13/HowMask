import React, { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import "./css/registerlogin.css";
import { NavLink } from "react-router-dom";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Login = () => {
  const [emailinvalid, setEmailinvalid] = useState(false);
  const [emailvalid, setEmailvalid] = useState(false);
  const [pwdinvalid, setPwdinvalid] = useState(false);
  const [pwdvalid, setPwdvalid] = useState(false);

  const inputEmail = useRef();
  const inputPwd = useRef();

  const validateEmail = (emailEntered) => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

    if (emailEntered.match(emailRegExp)) {
      setEmailinvalid(false);
      setEmailvalid(true);
    } else {
      setEmailinvalid(true);
      setEmailvalid(false);
    }
  };

  const validatePwd = (pwdEntered) => {
    const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    // const pwdRegExp = "";

    if (pwdEntered.match(pwdRegExp)) {
      setPwdinvalid(false);
      setPwdvalid(true);
    } else {
      setPwdinvalid(true);
      setPwdvalid(false);
    }
  };

  const loginInsert = async (event) => {
    event.preventDefault();
    /* if (!emailvalid || !pwdvalid) {
      alert("필수 항목을 입력하세요");
      return;
    } */
    const email = inputEmail.current.value;
    const password = inputPwd.current.value;

    // alert(usertype + ":" + email + ":" + pwd);
    const sendParam = {
      headers,
      email,
      password,
    };
    const token = await axios.get(process.env.REACT_APP_URL+`user/getToken`);
    if(token.data.csrfToken){
      sessionStorage.setItem('token', token.data.csrfToken);
    }
    axios
      .post(process.env.REACT_APP_URL+`user/login`, sendParam)
      .then((returnData) => {
        alert(returnData.data.message);
        if (returnData.data.dupYn === "0") {
          sessionStorage.setItem("login", true);
          sessionStorage.setItem("type", returnData.data.type);
          window.location.href = "/";
        } else if (returnData.data.dupYn === "2") {
          sessionStorage.setItem("login", "hamletshu");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href = "/error";
      });
  };

  const loginTitle = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 90,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    textAlign: "center",
  };
  const loginForm = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };
  const loginType = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 90,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };
  const registerBtn = {
    margin: 5,
  };

  const removeSession = () => {
    sessionStorage.clear();
  };
  removeSession();

  return (
    <div>
      <Container style={loginType}>
        <h2 style={loginTitle}>로그인</h2>
        <Form noValidate style={loginForm} onSubmit={loginInsert}>
          <Form.Group controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control
              type="email"
              isInvalid={emailinvalid}
              isValid={emailvalid}
              ref={inputEmail}
              onChange={(e) => validateEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              className="pwdfont"
              isInvalid={pwdinvalid}
              isValid={pwdvalid}
              ref={inputPwd}
              onChange={(e) => validatePwd(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="info" type="submit" size="lg" block>
            로그인
          </Button>
          <NavLink to="/register" style={registerBtn}>
            <Button variant="warning" size="lg" block>
              회원가입
            </Button>
          </NavLink>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
