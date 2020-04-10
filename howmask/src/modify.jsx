import React, { useState, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./css/registerlogin.css";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Modify = () => {
  const [check, setCheck] = useState(false);
  const [pwstate, setPwstate] = useState({ valid: false, invalid: false });
  const [newpwdstate, setNewpwdstate] = useState({
    valid: false,
    invalid: false,
  });
  const [confirmpwdstate, setConfirmpwdstate] = useState({
    valid: false,
    invalid: false,
  });

  const [userstate, setUserstate] = useState({
    type: null,
    email: null,
    nick: null,
    year: null,
  });

  const [btnDefaultFlag, setBtnDefaultFlag] = useState("inline-block"); // 수정하기 버튼
  const [btnSuccessFlag, setBtnSuccessFlag] = useState("none"); // 수정완료 버튼
  const [textFlag, setTextFlag] = useState(true);

  const [nameinvalid, setNameinvalid] = useState();
  const [namevalid, setNamevalid] = useState();
  const [yearinvalid, setYearinvalid] = useState();
  const [yearvalid, setYearvalid] = useState();

  const email = useRef();
  const inputNick = useRef();
  const inputNewpwd = useRef();
  const inputConfirmpwd = useRef();
  const inputYear = useRef();

  const inputCheckPw = useRef();
  const inputOriginPw = useRef();

  let userForm;

  const btnDefaultStyle = {
    display: btnDefaultFlag,
  };

  const btnSuccessStyle = {
    display: btnSuccessFlag,
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

  const validateNewpwd = (newpwdEntered) => {
    const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    // const pwdRegExp = "";

    if (newpwdEntered.match(pwdRegExp)) {
      setNewpwdstate({ valid: true, invalid: false });
    } else {
      setNewpwdstate({ valid: false, invalid: true });
    }
  };

  const validateConfirmpwd = (confirmpwdEntered) => {
    const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    // const pwdRegExp = "";

    if (confirmpwdEntered.match(inputNewpwd.current.value) && confirmpwdEntered.match(pwdRegExp)) {
      setConfirmpwdstate({ valid: true, invalid: false });
    } else {
      setConfirmpwdstate({ valid: false, invalid: true });
    }
  };

  const validateName = (nameEntered) => {
    const regExp = /^[ㄱ-ㅎ가-힣0-9a-zA-Z]*$/;

    if (nameEntered.length > 1 && nameEntered.match(regExp)) {
      setNameinvalid(false);
      setNamevalid(true);
    } else {
      setNameinvalid(true);
      setNamevalid(false);
    }
  };

  const validateYear = (yearEntered) => {
    const yearRegExp = /^\d{1}$/;
    if (yearEntered.match(yearRegExp)) {
      setYearinvalid(false);
      setYearvalid(true);
    } else {
      setYearinvalid(true);
      setYearvalid(false);
    }
  };

  function userUpdateForm() {
    setBtnSuccessFlag("inline-block");
    setBtnDefaultFlag("none");
    setTextFlag(false);
  }

  async function pwUpdateForm() {
    // alert(inputNewpwd.current.value);
    if (inputNewpwd.current.value !== inputConfirmpwd.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!newpwdstate.valid || !confirmpwdstate.valid) {
      alert("유효한 비밀번호를 입력해주세요.");
      inputOriginPw.current.focus();
      return;
    }

    const sendParam = {
      passwordOrigin: inputOriginPw.current.value,
      password: inputNewpwd.current.value,
      _csrf: sessionStorage.getItem('token'),
    };

    const returnData = await axios.post(`http://${url}:8080/user/updatepw`, sendParam);

    if (returnData.data.dupYn === "0") {
      alert(returnData.data.message);
      window.location.href = "/";
    } else {
      alert(returnData.data.message);
    }
  }

  async function updateInfo() {
    // alert(userstate.email);
    const regExp = /^[ㄱ-ㅎ가-힣0-9a-zA-Z]*$/;
    const yearRegExp = /^\d{1}$/;
    if (inputNick.current.value.length < 2 || !inputNick.current.value.match(regExp)) {
      alert("닉네임은 특수문자를 제외하고 입력가능합니다");
      return;
    }

    if (!inputYear.current.value.match(yearRegExp)) {
      alert("생년 끝자리는 숫자입니다.");
      return;
    }

    const sendParam = {
      email: userstate.email,
      nick: inputNick.current.value,
      year: inputYear.current.value,
      _csrf: sessionStorage.getItem('token'),
    };

    const returnData = await axios.post(`http://${url}:8080/user/update`, sendParam);
    if (returnData.data.message) {
      alert(returnData.data.message);
      setBtnSuccessFlag("none");
      setBtnDefaultFlag("inline-block");
      setTextFlag(true);
    } else {
      alert("수정 실패");
    }
  }

  const checkPwInsert = (event) => {
    event.preventDefault();

    if (!pwstate.valid) {
      alert("필수 항목을 입력하세요");
      return;
    }

    const password = inputCheckPw.current.value;
    const sendParam = { password, headers };

    axios
      .post(`http://${url}:8080/user/checkpw`, sendParam)
      .then((returnData) => {
        if (returnData.data.dupYn === "0") {
          setUserstate({
            type: returnData.data.user_type,
            email: returnData.data.email,
            nick: returnData.data.nickname,
            year: returnData.data.year,
          });
          setPwstate({ valid: false, invalid: false });
          setCheck(true);
        } else {
          alert(returnData.data.message);
        }
      })
      .catch((err) => {
        alert("패스워드 인증 에러");
      });
  };

  const modifyTitle = {
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
  const modifyForm = {
    display: "inline-block",
    width: "45%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };

  const titleStyle = {
    textAlign: "center",
  };

  if (!check) {
    userForm = (
      <Form style={modifyForm} onSubmit={checkPwInsert}>
        <Form.Group controlId="checkPassword">
          <h2 style={titleStyle}>회원정보수정</h2>
          <br></br>
          <Form.Label>비밀번호 입력</Form.Label>
          <p>개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
          <Form.Control
            type="password"
            className="pwdfont"
            ref={inputCheckPw}
            isInvalid={pwstate.invalid}
            isValid={pwstate.valid}
            onChange={(e) => validatePwd(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" block>
          확인
        </Button>
      </Form>
    );
  } else {
    userForm = (
      <>
        <h2 style={modifyTitle}>내 정보 수정</h2>

        <Form style={modifyForm}>
          <Form.Text className="text-muted"></Form.Text>
          <Form.Label></Form.Label>
          <Form.Text className="text-muted"></Form.Text>

          <Form.Group as={Row} controlId="formUsertype">
            <Form.Label column sm={3}>
              이메일
            </Form.Label>
            <Col>
              <Form.Control ref={email} readOnly="true" defaultValue={userstate.email} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formNickname">
            <Form.Label column sm={3}>
              닉네임
            </Form.Label>
            <Col>
              <Form.Control
                placeholder="새 닉네임을 입력해주세요"
                isInvalid={nameinvalid}
                isValid={namevalid}
                ref={inputNick}
                readOnly={textFlag}
                defaultValue={userstate.nick}
                onChange={(e) => validateName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="yearForm">
            <Form.Label column sm={3}>
              태어난 년도 끝자리
            </Form.Label>
            <Col>
              <Form.Control
                placeholder="새 끝자리를 입력해주세요"
                ref={inputYear}
                isInvalid={yearinvalid}
                isValid={yearvalid}
                readOnly={textFlag}
                onChange={(e) => validateYear(e.target.value)}
                defaultValue={userstate.year}
                maxLength="1"
                required
              />
              <Form.Control.Feedback type="invalid">숫자만 입력해주세요</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Button
            variant="warning"
            style={btnDefaultStyle}
            onClick={() => userUpdateForm(true)}
            block
          >
            수정하기
          </Button>
          <Button variant="success" style={btnSuccessStyle} onClick={updateInfo} block>
            수정완료
          </Button>
          <br></br>
          <br></br>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={3}>
              기존 비밀번호
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                className="pwdfont"
                ref={inputOriginPw}
                isInvalid={pwstate.invalid}
                isValid={pwstate.valid}
                onChange={(e) => validatePwd(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                비밀번호는 영문자 및 숫자, 특수문자 포함 8자 이상이어야합니다
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPassword">
            <Form.Label column sm={3}>
              변경할 비밀번호
            </Form.Label>
            <Col>
              <Form.Control
                type="password"
                className="pwdfont"
                placeholder="새 비밀번호를 입력해주세요"
                isInvalid={newpwdstate.invalid}
                isValid={newpwdstate.invalid}
                ref={inputNewpwd}
                onChange={(e) => validateNewpwd(e.target.value)}
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
            <Col>
              <Form.Control
                type="password"
                className="pwdfont"
                placeholder="새 비밀번호를 한번 더 확인해주세요"
                isInvalid={confirmpwdstate.invalid}
                isValid={confirmpwdstate.valid}
                ref={inputConfirmpwd}
                onChange={(e) => validateConfirmpwd(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                비밀번호가 일치하지 않습니다.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Button variant="primary" onClick={pwUpdateForm} block>
            비밀번호 수정
          </Button>
        </Form>
      </>
    );
  }
  return <>{userForm}</>;
};

export default Modify;
