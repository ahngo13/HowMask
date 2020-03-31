import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

// 메인화면 이동
const RouterStore = () => {
  window.location.href = "/#/";
};
// 판매처 정보 수정 완료
const UpdateStoreBtn = () => {
  alert("판매처 정보가 수정되었습니다.");

  window.location.href = "/#/suggest";
};
// 판매처 정보 수정 Form
const StoreInfoUpdate = () => {
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
      <h2 style={registerTitle}>판매처 정보 수정</h2>
      <Form style={registerForm}>
        <Form.Text className="text-muted">(* 필수입력)</Form.Text>
        <Form.Label>판매처 정보</Form.Label>
        <Form.Text className="text-muted"></Form.Text>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control disabled defaultValue="한서약국*" />
          </Form.Group>

          <Form.Group as={Col} controlId="storeLocation">
            <Form.Control disabled defaultValue="서울특별시 강남구*" />
          </Form.Group>

          <Form.Group as={Col} controlId="storeCode">
            <Form.Control disabled defaultValue="사업자등록번호*" />
          </Form.Group>
        </Form.Row>
        <br />
        <Form.Label>관리자 정보</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control disabled defaultValue="이름" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control /* ref={inputPhoneNumber} */ defaultValue="휴대전화번호*" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control
              /*  ref={inputSellerEmail}
              isInvalid={emailinvalid}
              isValid={emailvalid}
              onChange={e => validateEmail(e.target.value)} */
              defaultValue="이메일*"
            />
          </Form.Group>
        </Form.Row>
        <br />
        <Form.Label>마스크 정보</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control defaultValue="판매 예정 시간" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control /* ref={inputPhoneNumber} */ defaultValue="평균 재고수량" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control
              /*  ref={inputSellerEmail}
                          isInvalid={emailinvalid}
                          isValid={emailvalid}
                          onChange={e => validateEmail(e.target.value)} */
              defaultValue="유아용 마스크 판매여부"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control as="textarea" defaultValue="공지사항" />
          </Form.Group>
        </Form.Row>
        <Row>
          <Col>
            <Button
              variant="warning"
              as={Col}
              onClick={() => {
                RouterStore(true);
              }}
            >
              돌아가기
            </Button>
          </Col>
          <Col>
            <Button variant="info" as={Col} onClick={UpdateStoreBtn}>
              신청하기
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default StoreInfoUpdate;
