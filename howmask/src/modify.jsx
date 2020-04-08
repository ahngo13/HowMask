import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col} from "react-bootstrap";
import axios from "axios";
import "./css/registerlogin.css";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Modify = () => {

    const [check, setCheck] = useState(false);
    const [pwstate, setPwstate] = useState({valid: false, invalid: false});

    const [btnDefaultFlag, setBtnDefaultFlag] = useState("inline-block"); // 수정하기 버튼
    const [btnSuccessFlag, setBtnSuccessFlag] = useState("none"); // 수정완료 버튼 
    const [title, setTilte] = useState('내 정보 조회');
    const [textFlag, setTextFlag] = useState(true);

    const [newpwdinvalid, setNewpwdinvalid] = useState();
    const [newpwdvalid, setNewpwdvalid] = useState();
    const [confirmpwdinvalid, setConfirmpwdinvalid] = useState();
    const [confirmpwdvalid, setConfirmpwdvalid] = useState();
    const [nameinvalid, setNameinvalid] = useState();
    const [namevalid, setNamevalid] = useState();
    const [yearinvalid, setYearinvalid] = useState();
    const [yearvalid, setYearvalid] = useState();
  
    const [emailState, setEmailState] = useState();
    const [inputNickState, setInputNickState] = useState();
    const [inputNewpwdState, setInputNewpwdState] = useState();
    const [inputConfirmpwdState, setInputConfirmpwdState] = useState();
    const [inputYearState, setInputYearState] = useState();

    const email = useRef();
    const inputNick = useRef();
    const inputNewpwd = useRef();
    const inputConfirmpwd = useRef();
    const inputYear = useRef();

    const inputCheckPw = useRef();
    let userForm;

    const btnDefaultStyle = {
      display: btnDefaultFlag, 
    };

    const btnSuccessStyle = {
      display: btnSuccessFlag,
    };

    const userTitleStyle = {
      display: "inline-block",
      width: "50%",
      position: "fixed",
      top: 60,
      margin: "auto",
      textAlign: "center"
    };

    const userFormStyle = {
      display: "inline=block",
      width: "50%",
      position: "fixed",
      top: 100,
      margin: "auto"
    };

    const validatePwd = (pwdEntered) => {
      // const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
      const pwdRegExp = "";
  
      if (pwdEntered.match(pwdRegExp)) {
        setPwstate({ valid: true, invalid: false });
      } else {
        setPwstate({ valid: false, invalid: true });
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
   
    function userUpdateForm() {
      setBtnSuccessFlag("inline-block");
      setBtnDefaultFlag("none");
      setTilte("내 정보 수정");
      setTextFlag(true);
    }

    async function updateInfo() {
      const sendParam = {
        email, 
        password : inputConfirmpwd.current.value,
        nick : inputNick.current.value,
        year : inputYear.current.value,
      };  
      
      const returnData = await axios.post(`http://${url}:8080/user/update`, sendParam);
      if(returnData.data.message) {
        alert(returnData.data.message);
        setBtnSuccessFlag("none");
        setBtnDefaultFlag("inline-block");
        setTilte("회원 정보 수정")
        setTextFlag(true);
      } else {
        alert("수정 실패")
      };
    };

    async function getUserInfo() {
      console.log("getUserInfo");
      const returnData = await axios.post(`http://${url}:8080/user/getUserInfo`);
      if(returnData.data.info) {
        const info = returnData.data.info;
        setEmailState(returnData.data.email);
        setInputNickState(info.inputNick);
        setInputNewpwdState(info.InputNewpwd);
        setInputConfirmpwdState(info.InputConfimpwd);
        setInputYearState(info.inputYear);
      } else 
        console.log("setting fail");
  };
  
  useEffect(() => {
    console.log("useEffect");
    getUserInfo();
  },[]);
  
    const checkPwInsert = (event) => {
      event.preventDefault();

      if(!pwstate.valid){
        alert("필수 항목을 입력하세요");
        return;
      }
      const password = inputCheckPw.current.value;
      const sendParam = { password, headers};

      axios 
        .post(`http://${url}:8000/store/checkpw`, sendParam)
        .then((returnData) => {
          alert(returnData.data.message);
          if(returnData.data.dupYn === "0") {
            setCheck(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (!check) {
      userForm = (
        <Form style={userFormStyle} >
          <Form.Group controlId="checkPassword">
           <Form.Lable> 비밀번호 입력</Form.Lable>
           <p> 개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
           <Form.Control
             type="password"
             className="pwdfont"
             ref={inputCheckPw}
             isInvalid={pwstate.invalid}
             isValid={pwstate.valid}
             onChange={(e) => validatePwd(e.targe.value)}
             required>
            </Form.Control>
          </Form.Group>
          <Button variant="light" type="submit">
           취소 
          </Button>
          <Button variant="primary" type="submit" onSubmit={checkPwInsert}>
            확인
          </Button>
        </Form>
      );
    } else {
      userForm = (
      <>
        <h2 style={userTitleStyle}>{title}</h2>
        <div 
          style = {{
            position: "absolute",
            left: "60%",
            top: "8%"
          }}
        >
            <Button
              variant="warning"
              style={btnDefaultStyle}
              onClick={() => userUpdateForm(true)}
            >
              수정하기 
            </Button>
            <Button
              variant="success"
              style={btnSuccessStyle}
              onClick={() =>  updateInfo(true)}
            >
              수정완료
            </Button>
        </div>
        
      <Form style={userFormStyle}>
          <Form.Text className="text-muted"></Form.Text>
          <Form.Label>내 정보 조회</Form.Label>
          <Form.Text className="text-muted"></Form.Text>
    
            <Form.Group as={Row} controlId="formUsertype">
              <Form.Label column sm={2}>
                <font color="#246dbf">이메일(아이디)</font>
              </Form.Label>
              <Form.Control
                ref={email}
                readOnly={textFlag}
                defaultValue={email}
              />
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
                defaultValue={inputNickState}
                onChange={e => validateName(e.target.value)}
                required
              />
            </Col>
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
          </Form.Group>
            <Button variant="primary" type="submit">
                    변경
            </Button>
        </Form>
      </>
    );
  }
  return <>{userForm}</>;

};

export default Modify;
