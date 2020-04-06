import React, { useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const url = "localhost";

// 판매처 정보 관리 Form
const Store = () => {
  const [btnDefaultFlag, setBtnDefaultFlag] = useState("inline-block"); //수정하기 버튼
  const [btnSuccessFlag, setBtnSuccessFlag] = useState("none"); //수정완료 버튼
  const [title, setTitle] = useState(" 판매처 정보 조회");
  const [textFlag, setTextFlag] = useState("true");

  const storeName = useRef(); //판매처명 (store)
  const addr = useRef(); //주소 (store)
  const bizCode = useRef(); //사업자등록번호 (store)
  const sellerName = useRef(); //관리자 이름 (store)
  const phone = useRef(); // 관리자 휴대전화번호 (store)
  const email = useRef(); // 관리자 이메일 (user)

  const registerTitle = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 60,
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
    top: 100,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto"
  };
  const btnDefaultStyle = {
    display: btnDefaultFlag
  };
  const btnSuccessStyle = {
    display: btnSuccessFlag
  };
  function goToUpdateForm() {
    setBtnSuccessFlag("inline-block");
    setBtnDefaultFlag("none");
    setTitle("판매처 정보 수정");
    setTextFlag("");
  }
  function updateInfo() {
    const sendParam = {
      name: storeName.current.vlaue,
      address: addr.current.vlaue,
      bizCode: bizCode.current.vlaue,
      sellerName: sellerName.current.vlaue,
      phone: phone.current.vlaue,
      email: email.current.vlaue
    };
    const result = axios.post(`http://${url}:8080/store/update`);
  }
  return (
    <>
      <h2 style={registerTitle}>{title}</h2>
      <div
        style={{
          position: "absolute",
          left: "60%",
          top: "8%"
        }}
      >
        <Button variant="warning" style={btnDefaultStyle} onClick={() => goToUpdateForm(true)}>
          수정하기
        </Button>
        <Button variant="success" style={btnSuccessStyle} onClick={() => updateInfo(true)}>
          수정완료
        </Button>
      </div>
      <Form style={registerForm}>
        <Form.Text className="text-muted"></Form.Text>
        <Form.Label>판매처 정보</Form.Label>
        <Form.Text className="text-muted"></Form.Text>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              <font color="#246dbf">판매처명</font>
            </Form.Label>
            <Form.Control ref={storeName} readOnly="false" defaultValue="한서약국" />
          </Form.Group>
          <Form.Group as={Col} controlId="storeLocation">
            <Form.Label>
              <font color="#246dbf">사업자등록번호</font>
            </Form.Label>
            <Form.Control ref={bizCode} readOnly={textFlag} defaultValue="123-456789" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              <font color="#246dbf">주소</font>
            </Form.Label>
            <Form.Control ref={addr} readOnly={textFlag} defaultValue="서울특별시 강남구" />
          </Form.Group>
        </Form.Row>
        <br />
        <Form.Label>관리자 정보</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <font color="#246dbf">이름</font>
            </Form.Label>
            <Form.Control ref={sellerName} readOnly={textFlag} defaultValue="홍길동" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>
              <font color="#246dbf">휴대전화번호</font>
            </Form.Label>
            <Form.Control ref={phone} readOnly={textFlag} defaultValue="010-1234-1234" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              <font color="#246dbf">이메일</font>
            </Form.Label>
            <Form.Control ref={email} readOnly={textFlag} defaultValue="seller@gmail.com" />
          </Form.Group>
        </Form.Row>
        <br />
        <Form.Label>마스크 정보</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <font color="#246dbf">판매 예정시간</font>
            </Form.Label>
            <Form.Control readOnly={textFlag} defaultValue="(1차) 10시~12시 (2차) 16시~18시" />
          </Form.Group>
          <Form.Group as={Col} readOnly={textFlag} controlId="formGridState">
            <Form.Label>
              <font color="#246dbf">평균 재고수량</font>
            </Form.Label>
            <Form.Control readOnly={textFlag} defaultValue="300개" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>
              <font color="#246dbf">유아용마스크 판매여부</font>
            </Form.Label>
            <Form.Control readOnly={textFlag} defaultValue="판매중" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>
              <font color="#246dbf">공지사항</font>
            </Form.Label>
            <Form.Control as="textarea" readOnly={textFlag} defaultValue="재고 많습니다." />
          </Form.Group>
        </Form.Row>
      </Form>
    </>
  );
};

export default Store;
