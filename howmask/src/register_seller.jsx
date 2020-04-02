import React, { useState, useRef, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Register from "./register";

const url = "localhost";

// 판매처 조회화면 돌아가기
function RouterStore() {
  const confirm = window.confirm("이전 화면으로 이동하시겠습니까?");
  if (confirm) {
    window.location.href = "/#/map";
  }
}

// 판매처 계정 등록 Form
function RegisterSeller(props) {
  // 판매처 계정 등록 Event
  const [emailinvalid, setEmailinvalid] = useState(false);
  const [emailvalid, setEmailvalid] = useState(false);
  const [param, setParam] = useState();

  const inputStoreName = useRef();
  const inputStoreAddress = useRef();
  const inputStoreBizCode = useRef();
  const inputSellerName = useRef();
  const inputPhoneNumber = useRef();
  const inputSellerEmail = useRef();

  // Modal로부터 값 받아오기
  function setStoreInfo() {
    const param = props.location.state;
    
    //파라미터 저장(input 이외에 추가로 이전페이지에서 넘겨줘야 되는 값들을 사용하기 위해 세팅)
    setParam(param);
    //textfield 값 세팅
    inputStoreName.current.defaultValue = param.name;
    inputStoreAddress.current.defaultValue = param.code;
  }

  useEffect(() => {
    //locaiton state값이 비어있지 않을 경우
    if(props.location.state != undefined){
      setStoreInfo();
    }
  });

  // 이메일 형식 체크
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
  async function Register(event) {
    // event.preventDefault();
    if (!emailvalid) {
      alert("필수 항목을 입력하세요");
      return;
    }
    const bizCode = inputStoreBizCode.current.value;
    const name = inputStoreName.current.value;
    const address = inputStoreAddress.current.value;
    const nickname = inputSellerName.current.value;
    const phone = inputPhoneNumber.current.value;
    const email = inputSellerEmail.current.value;
    const type = param.type;
    const code = param.code;

    const sendParam = {
      bizCode,
      name,
      address,
      nickname,
      phone,
      email,
      type,
      code
    }

    console.log(sendParam);

   const result = await axios.post(`http://${url}:8080/user/join`, sendParam);
   if (result.data.message === "ok") {

    } else {
      alert("오류");
    }
  }
  const registerTitle = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 90,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    textAlign: "center"
  };
  const registerForm = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto"
  };
  return (
    <>
      <h2 style={registerTitle}>판매처 계정 신청</h2>
      <Form style={registerForm}>
        <Form.Label>판매처 정보</Form.Label>
        <Form.Text className="text-muted">(* 필수입력)</Form.Text>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control ref={inputStoreName} placeholder="판매처명" />
          </Form.Group>

          <Form.Group as={Col} controlId="storeLocation">
            <Form.Control ref={inputStoreAddress} placeholder="판매처 주소" />
          </Form.Group>

          <Form.Group as={Col} controlId="storeCode">
            <Form.Control ref={inputStoreBizCode} placeholder="사업자등록번호*" />
          </Form.Group>
        </Form.Row>
          <Button variant="info" size="lg" block>
            사업자등록증 첨부
          </Button>
          <Form.Text className="text-muted">
            사업자등록증은 판매처 관계자임을 증명하는 자료로만 사용됩니다. 신속한 계정 발급을 위해
            꼭 첨부해주세요.
          </Form.Text>
          <br />
        <Form.Label>관리자 정보</Form.Label>
        <Form.Text className="text-muted">
          입력하신 이메일로 계정정보 안내를 해드립니다. 정확하게 작성해주세요. (* 필수입력)
        </Form.Text>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control ref={inputSellerName} placeholder="이름*" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control ref={inputPhoneNumber} placeholder="휴대전화번호*" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control
              ref={inputSellerEmail}
              isInvalid={emailinvalid}
              isValid={emailvalid}
              onChange={e => validateEmail(e.target.value)}
              placeholder="이메일*"
            />
          </Form.Group>
        </Form.Row>
        <Row>
          <Col>
            <Button
              as={Col}
              variant="warning"
              onClick={() => {
                RouterStore(true);
              }}
            >
              돌아가기
            </Button>
          </Col>
          <Col>
            <Button
              variant="info"
              as={Col}
              onClick={() => {
                Register();
              }}
            >
              신청하기
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default RegisterSeller;
