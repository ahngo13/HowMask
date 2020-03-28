import React from "react";
import { Form, Col, Button } from "react-bootstrap";

// 메인화면 돌아가기
function RouterMain() {
  window.location.href = "/";
}
// 판매처 계정 등록 Form
function RegisterSeller() {
  return (
    <>
      <h4>판매처 계정 신청</h4>
      <Form>
        <Form.Label>판매처 정보</Form.Label>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control defaultValue="한서약국" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control defaultValue="서울특별시 강남구 " />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control defaultValue="사업자등록번호" />
          </Form.Group>
        </Form.Row>
        <Form>
          <Button variant="primary" size="lg" block>
            사업자등록증 첨부
          </Button>
          <Form.Text className="text-muted">
            사업자등록증은 판매처 관계자임을 증명하는 자료로만 사용됩니다. 신속한 계정 발급을 위해
            꼭 첨부해주세요.
          </Form.Text>
        </Form>
        <Form.Label>관리자 정보</Form.Label>
        <Form.Text className="text-muted">
          입력하신 이메일로 계정정보 안내를 해드립니다. 정확하게 작성해주세요.
        </Form.Text>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control placeholder="이름" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Control placeholder="휴대전화번호 " />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Control placeholder="이메일" />
          </Form.Group>
        </Form.Row>
        <Button>등록하기</Button>
        <Button
          onClick={() => {
            RouterMain(true);
          }}
        >
          돌아가기
        </Button>
        <br />
      </Form>
    </>
  );
}

export default RegisterSeller;
