import React from "react";
import { Modal, Button, Badge, Table, Card, Container, Col, Row } from "react-bootstrap";
import Comment from "./comment";

// 판매처 정보 수정 제안
function suggestStoreInfo() {
  alert("c");
}
function RegisterStoreAccount() {
  window.location.href = "/#/register/seller";
}

//판매처 상세정보 Modal
function StoreInfoModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          한서 약국 <Badge variant="success">재고많음</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive borderless>
          <tbody>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">판매처 종류</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 약국
              </td>
              <td>
                <strong>
                  <font color="#1a0066">주소</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 서울특별시 강남구 테헤란로
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">영업시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; (월~금) 9:00 ~ 18:00
              </td>
              <td>
                <strong>
                  <font color="#1a0066">판매예정시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 12:00 ~ 18:00
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">평균 재고수량</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 200개
              </td>
              <td>
                <strong>
                  <font color="#1a0066">유아용 마스크 판매여부</font>
                </strong>
                &nbsp;&nbsp;&nbsp; <Badge variant="primary">있음</Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table responsive borderless>
          <tBody>
            <tr>
              <td>
                <font color="#1a0066">
                  {" "}
                  <strong>공지사항</strong>
                </font>
                <Card>
                  <Card.Body>
                    <p>금일 KP94 100개 입고 되었습니다.</p>
                  </Card.Body>
                </Card>
              </td>
            </tr>
          </tBody>
        </Table>
        <Container>
          <Row>
            <Col>
              <Button onClick={() => suggestStoreInfo(true)} variant="warning" size="lg" block>
                판매처정보가 잘못되었어요!
              </Button>
            </Col>
            <Col>
              <Button onClick={() => RegisterStoreAccount(true)} variant="info" size="lg" block>
                무료 판매처계정 생성하기
              </Button>
            </Col>
          </Row>
        </Container>
        <br />
        <strong>댓글</strong>
        <Comment />
      </Modal.Body>
    </Modal>
  );
}

//판매처 상세정보 Component
function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        약국 정보 보기
      </Button>

      <StoreInfoModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

function StoreInfo() {
  return <App />;
}

export default StoreInfo;
