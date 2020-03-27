import React, { Component } from "react";
import { Modal, Button, Form, Row, Col, InputGroup, Badge } from "react-bootstrap";
import Comment from "./comment";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">한서 약국</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          판매처 상세정보 <Badge variant="success">재고많음</Badge>
        </h5>

        <Form>
          <Form.Group as={Row} controlId="">
            <Row>
              <Form.Label column>판매처 종류</Form.Label>
              <Col>
                <Form.Control plaintext readOnly defaultValue="약국" /> {/* api value */}
              </Col>
            </Row>
            <Form.Label column>주소</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="서울특별시 강남구 테헤란로" />{" "}
              {/* api value */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="">
            <Form.Label colum>평균 재고수량</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="200개" /> {/* api value */}
            </Col>
            <Form.Label colum>운영시간</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="9:00 ~ 18:00" /> {/* api value */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="">
            <Form.Label colum>유아용 마스크 판매여부</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="있음" /> {/* api value */}
            </Col>
            <Form.Label colum>판매 예정시간</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="1차: 10시~12시 / 2차: 16시~18시" />{" "}
              {/* api value */}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="">
            <Form.Label colum>공지사항</Form.Label>
            <Col>
              <Form.Control plaintext readOnly defaultValue="금일 KP94 100개 입고 되었습니다." />{" "}
              {/* api value */}
            </Col>
          </Form.Group>
        </Form>
        <h5>댓글</h5>
        <Comment />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        약국 정보 보기
      </Button>

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function StoreInfo() {
  return <App />;
}

export default StoreInfo;
