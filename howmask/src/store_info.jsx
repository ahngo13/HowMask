import React, { useState, useEffect } from "react";
import { Modal, Button, Badge, Table, Card, Container, Col, Row } from "react-bootstrap";
import Comment from "./comment";
import axios from "axios";

const url = "localhost";

// 판매처 정보
var storeInfo = {
  storeName: "한서약국",
  howMany: "재고많음",
  storeType: "약국",
  storeLocation: "서울특별시 강남구 테헤란로",
  operatingDate: "월,화,수,목,금",
  operatingTimeStart: "9:00",
  operatingTimeEnd: "18:00",
  soldExpectedTime: "12:00 ~ 18:00",
  stockAverage: 200,
  kidsMaskYN: "있음",
  notice: "금일 KP94 100개 입고 되었습니다."
};

// 판매처 정보 수정 제안
function suggestStoreInfo() {
  if (!sessionStorage.getItem("login")) {
    const confirm = window.confirm(
      "로그인이 필요한 서비스입니다.\n로그인 화면으로 이동하겠습니까? "
    );
    if (confirm) {
      window.location.href = "/#/login";
    }
  } else {
    window.location.href = "/#/suggest";
  }
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
          {storeInfo.storeName} <Badge variant="success">{storeInfo.howMany}</Badge>
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
                &nbsp;&nbsp;&nbsp; {storeInfo.storeType}
              </td>
              <td>
                <strong>
                  <font color="#1a0066">주소</font>
                </strong>
                &nbsp;&nbsp;&nbsp; {storeInfo.storeLocation}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">영업시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; ({storeInfo.operatingDate}) {storeInfo.operatingTimeStart}~
                {storeInfo.operatingTimeEnd}
              </td>
              <td>
                <strong>
                  <font color="#1a0066">판매예정시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; {storeInfo.soldExpectedTime}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">평균 재고수량</font>
                </strong>
                &nbsp;&nbsp;&nbsp; {storeInfo.stockAverage}개
              </td>
              <td>
                <strong>
                  <font color="#1a0066">유아용 마스크 판매여부</font>
                </strong>
                &nbsp;&nbsp;&nbsp; <Badge variant="primary">{storeInfo.kidsMaskYN}</Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table responsive borderless>
          <tBody>
            <tr>
              <td>
                <font color="#1a0066">
                  <strong>공지사항</strong>
                </font>
                <Card>
                  <Card.Body>
                    <p>{storeInfo.notice}</p>
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
