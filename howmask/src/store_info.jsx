import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Badge, Table, Card, Container, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Comment from "./comment";

// 판매처 정보 수정 제안 이동
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

//판매처 상세정보 Modal
function StoreInfoModal(props) {
  const [stockColor, setStockColor] = useState();
  const [stockText, setStockText] = useState();
  const [stockType, setStockType] = useState();

  const registerSeller = useRef();

  function howMany() {
    const stock = props.info.stock;
    return (
      <div>
        {(() => {
          if (stock === "plenty") {
            setStockColor("success");
            setStockText("100개 이상");
            return;
          } else if (stock === "some") {
            setStockColor("warning");
            setStockText("30개 이상~100개 미만");
            return;
          } else if (stock === "few") {
            setStockColor("danger");
            setStockText("2개 이상~30개 미만");
            return;
          } else if (stock === "empty") {
            setStockColor("secondary");
            setStockText("1개 이하");
            return;
          } else {
            setStockColor("secondary");
            setStockText("재고 없음");
            return;
          }
        })()}
      </div>
    );
  }
  function storeType() {
    const type = props.info.type;
    return (
      <div>
        {(() => {
          if (type === "01") {
            setStockType("약국");
            return;
          } else if (type === "02") {
            setStockType("우체국");
            return;
          } else if (type === "03") {
            setStockType("농협");
            return;
          }
        })()}
      </div>
    );
  }
  useEffect(() => {
    howMany();
    storeType();
  });

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.info.name}
          &nbsp;&nbsp;&nbsp;<Badge variant={stockColor}>{stockText}</Badge>
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
                &nbsp;&nbsp;&nbsp; {stockType}
              </td>
              <td>
                <strong>
                  <font color="#1a0066">주소</font>
                </strong>
                &nbsp;&nbsp;&nbsp; {props.info.addr}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">영업시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; (요일) 시작시간~종료시간
              </td>
              <td>
                <strong>
                  <font color="#1a0066">입고시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; {props.info.stockAt}
              </td>
            </tr>
            <tr>
              <td>
                <strong>
                  <font color="#1a0066">판매예정시간</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 실제 마스크 판매시간
              </td>
              <td>
                <strong>
                  <font color="#1a0066">평균 재고수량</font>
                </strong>
                &nbsp;&nbsp;&nbsp; 000개
              </td>
            </tr>
          </tbody>
        </Table>
        <Table responsive borderless>
          <tbody>
            <tr>
              <td>
                <font color="#1a0066">
                  <strong>유아용 마스크 판매여부</strong>
                </font>
                &nbsp;&nbsp;&nbsp; <Badge variant="primary">유(무)</Badge>
              </td>
            </tr>
          </tbody>
        </Table>
        <Table responsive borderless>
          <tbody>
            <tr>
              <td>
                <font color="#1a0066">
                  <strong>공지사항</strong>
                </font>
                <Card>
                  <Card.Body>
                    <p>공지사항 내용</p>
                  </Card.Body>
                </Card>
              </td>
            </tr>
          </tbody>
        </Table>
        <Container>
          <Row>
            <Col>
              <Button onClick={() => suggestStoreInfo(true)} variant="warning" size="lg" block>
                판매처정보가 잘못되었어요!
              </Button>
            </Col>
            <Col>
              <NavLink
                to={{
                  pathname: `/register/seller`,
                  state: {
                    name: props.info.name
                  }
                }}
              >
                <Button className="register" ref={registerSeller} variant="info" size="lg" block>
                  무료 판매처계정 생성하기
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
        <br />
        <Comment code={props.info.code} />
      </Modal.Body>
    </Modal>
  );
}

function StoreInfo(props) {
  let modal;
  if (props.storeInfo) {
    modal = <StoreInfoModal show={props.show} info={props.storeInfo} onHide={props.onHide} />;
  }

  return <>{modal}</>;
}

export default StoreInfo;
