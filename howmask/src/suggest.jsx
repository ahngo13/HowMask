import React from "react";
import { ButtonGroup, Button, Form, Row, Col } from "react-bootstrap";

// 메인화면 돌아가기
function RouterMain() {
  window.location.href = "/";
}
// 판매처 정보수정 제안 Form
function Suggest() {
  const SuggestFormStyle = {
    position: "absolute",
    height: 500,
    width: 1000,
    top: "15%",
    left: "25%"
  };
  return (
    <>
      <Form.Group as={Row} style={SuggestFormStyle}>
        <Col sm={10}>
          <Form.Label>수정 제안할 항목을 선택하세요.</Form.Label>
          <Form.Check
            type="radio"
            label="폐업되었습니다."
            name="formHorizontalRadios"
            id="formHorizontalRadios1"
          />
          <Form.Check
            type="radio"
            label="판매처명"
            name="formHorizontalRadios"
            id="formHorizontalRadios2"
          />
          <Form.Check
            type="radio"
            label="주소 및 위치"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />
          <Form.Check
            type="radio"
            label="전화번호"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />
          <Form.Check
            type="radio"
            label="진료/영업시간"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />
          <Form.Check
            type="radio"
            label="진료과목"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />
          <Form.Check
            type="radio"
            label="기타(약국 등 판매처 정보에 대한 제보만 가능)"
            name="formHorizontalRadios"
            id="formHorizontalRadios3"
          />{" "}
          <br />
          <Form.Label>제안 상세 내용</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="진료시간이 오후 5시까지인데 6시까지로 되어 있습니다."
          />
        </Col>
        <div>
          <Button size="sm">등록하기</Button>
          <Button
            size="sm"
            onClick={() => {
              RouterMain(true);
            }}
          >
            돌아가기
          </Button>
        </div>
      </Form.Group>
    </>
  );
}

export default Suggest;
