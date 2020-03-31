import React, { useState, useRef } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import "./css/registerlogin.css";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Modify = () => {
    const [emailinvalid, setEmailinvalid] = useState(false);
    const [emailvalid, setEmailvalid] = useState(false);
    const [newpwdinvalid, setNewpwdinvalid] = useState(false);
    const [newpwdvalid, setNewpwdvalid] = useState(false);
    const [confirmpwdinvalid, setConfirmpwdinvalid] = useState(false);
    const [confirmpwdvalid, setConfirmpwdvalid] = useState(false);
    const [nameinvalid, setNameinvalid] = useState(false);
    const [namevalid, setNamevalid] = useState(false);
    const [yearinvalid, setYearinvalid] = useState(false);
    const [yearvalid, setYearvalid] = useState(false);
  
    const inputNick = useRef();
    const inputEmail = useRef();
    const inputNewpwd = useRef();
    const inputConfirmpwd = useRef();
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

      
    const validateNewpwd = newpwdEntered => {
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      //  const pwdRegExp = "";
    
        if (newpwdEntered.match(pwdRegExp)) {
          setNewpwdinvalid(false);
          setNewpwdvalid(true);
        } else {
          setNewpwdinvalid(true);
          setNewpwdvalid(false);
        }
    };

    const validateConfirmpwd = confirmpwdEntered => {
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
       //  const pwdRegExp = ""; 

        if (confirmpwdEntered.match(inputNewpwd.current.value) && confirmpwdEntered.match(pwdRegExp)) {
          setConfirmpwdinvalid(false);
          setConfirmpwdvalid(true);
        } else {
          setConfirmpwdinvalid(true);
          setConfirmpwdvalid(false);
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
      
    const validateYear = yearEntered => {
        const yearRegExp = /^\d{1}$/;
        if (yearEntered.match(yearRegExp)) {
          setYearinvalid(false);
          setYearvalid(true);
        } else {
          setYearinvalid(true);
          setYearvalid(false);
        }
    };
    
    const modifyInsert = event => {
        event.preventDefault();

        const email = inputEmail.current.value;
        const password = inputConfirmpwd.current.value;
        const nick = inputNick.current.value;
        const year = inputYear.current.value;

        if (emailvalid) {
            alert("이메일이 ;" + email + " 으로 변경 되었습니다");
        }else if(newpwdvalid && confirmpwdvalid ) {
            alert("비밀번호가 " + password + " 으로 변경 되었습니다");
        }else if(namevalid) {
            alert("닉네임이 " + nick + " 으로 변경 되었습니다");
        }else if(yearvalid) {
            alert("생년월일 끝자리가 " + year  + " 으로 변경 되었습니다");
            return;
        };
     
        const sendParam = {
        headers,
        email,
        password,
        nick,
        year
        };

    axios
    .post(`http://${url}:8080/user/modify`, sendParam)
    .then(returnData => {
      alert(returnData.data.message);
      if (returnData.data.dupYn === "0") {
        window.location.href = "/#/";
      }
     })
    .catch(err => {
      console.log(err);
     });
    };

return (
    <div>
      <Container>
        <p>회원정보 변경</p>
        <Form noValidate onSubmit={modifyInsert}>
        
          <Form.Group as={Row} controlId="formUsertype">
            <Form.Label column sm={2}>
              기본정보 
            </Form.Label>
          </Form.Group>

          <Form.Group as={Row} controlId="formEmail">
            <Form.Label column sm={3}>
              이메일
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="email"
                placeholder="새 이메일을 입력해주세요"
                isInvalid={emailinvalid}
                isValid={emailvalid}
                ref={inputEmail}
                onChange={e => validateEmail(e.target.value)}
                required
              />
            </Col>
            <Button variant="primary" type="submit">
                변경
            </Button>
          </Form.Group>
      
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={3}>
              비밀번호 
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="password"
                className="pwdfont"
                placeholder="새 비밀번호를 입력해주세요"
                isInvalid={newpwdinvalid}
                isValid={newpwdvalid}
                ref={inputNewpwd}
                onChange={e => validateNewpwd(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                비밀번호는 영문자 및 숫자, 특수문자 포함 8자 이상이어야합니다
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={3}>
              비밀번호 확인
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                type="password"
                className="pwdfont"
                placeholder="새 비밀번호를 한번 더 확인해주세요"
                isInvalid={confirmpwdinvalid}
                isValid={confirmpwdvalid}
                ref={inputConfirmpwd}
                onChange={e => validateConfirmpwd(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                비밀번호는 영문자 및 숫자, 특수문자 포함 8자 이상이어야합니다
              </Form.Control.Feedback>
            </Col>
            <Button variant="primary" type="submit">
                변경
            </Button>
          </Form.Group>

          <Form.Group as={Row} controlId="formNickname">
            <Form.Label column sm={3}>
              닉네임
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                placeholder="새 닉네임을 입력해주세요"
                isInvalid={nameinvalid}
                isValid={namevalid}
                ref={inputNick}
                onChange={e => validateName(e.target.value)}
                required
              />
            </Col>
            <Button variant="primary" type="submit">
                    변경
            </Button>
          </Form.Group>
             

          <Form.Group as={Row} controlId="yearForm">
            <Form.Label column sm={3}>
              태어난 년도 끝자리
            </Form.Label>
            <Col sm={5}>
              <Form.Control
                placeholder="새 끝자리를 입력해주세요"
                ref={inputYear}
                isInvalid={yearinvalid}
                isValid={yearvalid}
                onChange={e => validateYear(e.target.value)}
                maxLength="1"
                required
              />
              <Form.Control.Feedback type="invalid">
                숫자만 입력해주세요
              </Form.Control.Feedback>
            </Col>
            <Button variant="primary" type="submit">
                    변경
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Modify;
