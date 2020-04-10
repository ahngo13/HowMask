import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "./css/registerlogin.css";
import ReCAPTCHA from "react-google-recaptcha";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Register = () => {
  const [usertypestate, setUsertypestate] = useState({ value: "0" });
  const [emailstate, setEmailstate] = useState({
    valid: false,
    invalid: false,
  });
  const [pwstate, setPwstate] = useState({ valid: false, invalid: false });
  const [namestate, setNamestate] = useState({ valid: false, invalid: false });
  const [yearstate, setYearstate] = useState({ valid: false, invalid: false });

  const inputNick = useRef();
  const inputEmail = useRef();
  const inputPwd = useRef();
  const inputYear = useRef();

  let userRegisterform;

  const recaptchaRef = React.createRef();

  const changeUsertype = (e) => {
    setUsertypestate({ value: e });
  };

  const validateEmail = (emailEntered) => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (emailEntered.match(emailRegExp)) {
      setEmailstate({ valid: true, invalid: false });
    } else {
      setEmailstate({ valid: false, invalid: true });
    }
  };

  const validatePwd = (pwdEntered) => {
    const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    // const pwdRegExp = "";

    if (pwdEntered.match(pwdRegExp)) {
      setPwstate({ valid: true, invalid: false });
    } else {
      setPwstate({ valid: false, invalid: true });
    }
  };
  const validateName = (nameEntered) => {
    const regExp = /^[ㄱ-ㅎ가-힣0-9a-zA-Z]*$/;
    if (nameEntered.length > 1 && nameEntered.match(regExp)) {
      setNamestate({ valid: true, invalid: false });
    } else {
      setNamestate({ valid: false, invalid: true });
    }
  };
  const validateYear = (yearEntered) => {
    const yearRegExp = /^\d{1}$/;
    if (yearEntered.match(yearRegExp)) {
      setYearstate({ valid: true, invalid: false });
    } else {
      setYearstate({ valid: false, invalid: true });
    }
  };

  const joinInsert = (event) => {
    event.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    // alert(recaptchaValue);

    if (
      !emailstate.valid ||
      !pwstate.valid ||
      !namestate.valid ||
      !yearstate.valid ||
      !recaptchaValue
    ) {
      alert("필수 항목을 입력하세요");
      return;
    }

    const usertype = usertypestate.value;
    const email = inputEmail.current.value;
    const password = inputPwd.current.value;
    const nick = inputNick.current.value;
    const year = inputYear.current.value;

    // alert(usertype + ":" + email + ":" + pwd + ":" + nick + ":" + year);
    let auth;
    if (usertype === "1") {
      auth = false;
    } else {
      auth = true;
    }
    const sendParam = {
      headers,
      usertype,
      email,
      password,
      nick,
      year,
      auth,
    };

    axios
      .post(`http://${url}:8080/user/join`, sendParam)
      .then((returnData) => {
        alert(returnData.data.message);
        if (returnData.data.dupYn === "0") {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        if (err.response.status) {
          if (err.response.status === 429) {
            // 다수 request 응답 거부
            alert(err.response.data);
            window.location.href = "/";
            console.log(err);
          }
        } else {
          window.location.href = "/#/error ";
        }
      });
  };

  const registerTitle = {
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
  const registerForm = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };

  userRegisterform = (
    <Container>
      <h2 style={registerTitle}>회원가입</h2>
      <Form noValidate style={registerForm} onSubmit={joinInsert}>
        <Form.Group as={Row} controlId="formUsertype">
          <Form.Label column sm={3}>
            가입형식
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              as="select"
              value={usertypestate.value}
              onChange={(e) => changeUsertype(e.target.value)}
            >
              <option value="0">개인</option>
              <option value="7791">관리자</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={3}>
            이메일
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해주세요"
              isInvalid={emailstate.invalid}
              isValid={emailstate.valid}
              ref={inputEmail}
              onChange={(e) => validateEmail(e.target.value)}
              maxLength="40"
              required
            />
            <Form.Control.Feedback type="invalid">
              주소를 양식에 맞게 입력해주세요
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={3}>
            비밀번호
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="password"
              className="pwdfont"
              isInvalid={pwstate.invalid}
              isValid={pwstate.valid}
              ref={inputPwd}
              onChange={(e) => validatePwd(e.target.value)}
              maxLength="16"
              required
            />
            <Form.Control.Feedback type="invalid">
              비밀번호는 영문자 및 숫자, 특수문자 포함 8자 이상이어야합니다
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formNickname">
          <Form.Label column sm={3}>
            닉네임
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              isInvalid={namestate.invalid}
              isValid={namestate.valid}
              ref={inputNick}
              onChange={(e) => validateName(e.target.value)}
              maxLength="24"
              required
            />
            <Form.Control.Feedback type="invalid">닉네임을 입력해주세요</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="yearForm">
          <Form.Label column sm={3}>
            태어난 년도 끝자리
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              ref={inputYear}
              isInvalid={yearstate.invalid}
              isValid={yearstate.valid}
              onChange={(e) => validateYear(e.target.value)}
              maxLength="1"
              required
            />
            <Form.Control.Feedback type="invalid">숫자만 입력해주세요</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={3}></Form.Label>
          <Col sm={9}>
            <ReCAPTCHA ref={recaptchaRef} sitekey="6Ld7CucUAAAAAIx2bAazLyMpGWYpusA7tStIGokY" />
          </Col>
        </Form.Group>

        <Button variant="info" type="submit" size="lg" block>
          회원가입
        </Button>
      </Form>
    </Container>
  );
  // }

  return <div>{userRegisterform}</div>;
};

export default Register;
