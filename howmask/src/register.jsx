import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Register = () => {
  const [emailinvalid, setEmailinvalid] = useState(false);
  const [emailvalid, setEmailvalid] = useState(false);
  const [pwdinvalid, setPwdinvalid] = useState(false);
  const [pwdvalid, setPwdvalid] = useState(false);
  const [nameinvalid, setNameinvalid] = useState(false);
  const [namevalid, setNamevalid] = useState(false);

  const inputNick = useRef();
  const inputEmail = useRef();
  const inputPwd = useRef();
  const inputYear = useRef();

  const validateEmail = emailEntered => {
    const emailRegExp = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    if (emailEntered.match(emailRegExp)) {
      setEmailinvalid(false);
      setEmailvalid(true);
    } else {
      setEmailinvalid(true);
      setEmailvalid(false);
    }
  };

  const validatePwd = pwdEntered => {
    // const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const pwdRegExp = "";

    if (pwdEntered.match(pwdRegExp)) {
      setPwdinvalid(false);
      setPwdvalid(true);
    } else {
      setPwdinvalid(true);
      setPwdvalid(false);
    }
  };
  const validateName = nameEntered => {
    if (nameEntered.length > 1) {
      setNameinvalid(false);
      setNamevalid(true);
    } else {
      setNameinvalid(true);
      setNamevalid(false);
    }
  };

  const joinInsert = event => {
    event.preventDefault();
    if (!emailvalid || !pwdvalid || !namevalid) {
      alert("필수 항목을 입력하세요");
      return;
    }

    const email = inputEmail.current.value;
    const pwd = inputPwd.current.value;
    const nick = inputNick.current.value;
    const year = inputYear.current.value;
    const send_param = {
      headers,
      email,
      pwd,
      nick,
      year
    };

    axios
      .post(`http://${url}:8080/user/join`, send_param)
      .then(returnData => {
        alert(returnData.data.message);
        if (returnData.data.href) {
          window.location.href = "/login#/login";
        }
      })
      .catch(err => {
        console.log(err);
      });

    alert(email + ":" + pwd + ":" + nick + ":" + year);
  };

  return (
    <div>
      <p>회원가입</p>
      <Form noValidate onSubmit={joinInsert}>
        <Form.Group as={Row} controlId="formEmail">
          <Form.Label column sm={2}>
            이메일
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="이메일을 입력해주세요"
              isInvalid={emailinvalid}
              isValid={emailvalid}
              ref={inputEmail}
              onChange={e => validateEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              주소를 양식에 맞게 입력해주세요
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPassword">
          <Form.Label column sm={2}>
            비밀번호
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              isInvalid={pwdinvalid}
              isValid={pwdvalid}
              ref={inputPwd}
              onChange={e => validatePwd(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              비밀번호는 영문자 및 숫자, 특수문자 포함 8자 이상이어야합니다
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formNickname">
          <Form.Label column sm={2}>
            닉네임
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              isInvalid={nameinvalid}
              isValid={namevalid}
              ref={inputNick}
              onChange={e => validateName(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              닉네임을 입력해주세요
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="yearForm">
          <Form.Label column sm={2}>
            태어난 년도
          </Form.Label>
          <Col sm={10}>
            <Form.Control ref={inputYear} required />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default Register;
