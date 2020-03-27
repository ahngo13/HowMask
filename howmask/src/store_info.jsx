import React from "react";
import { Modal, Button, Badge, Table, Card } from "react-bootstrap";
import Comment from "./comment";

function MyVerticallyCenteredModal(props) {
  const TableName = {
    backgroundColor: "#b3ffe7"
  };
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          한서 약국 <Badge variant="success">재고많음</Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          <strong>판매처 상세정보</strong>
        </h6>
        <Table responsive>
          <tbody>
            <tr>
              <td style={TableName}>판매처 종류</td>
              <td>약국</td>
              <td style={TableName}>주소</td>
              <td>서울특별시 강남구 테헤란로</td>
            </tr>
            <tr>
              <td style={TableName}>평균 재고수량</td>
              <td>200개</td>
              <td style={TableName}>운영시간</td>
              <td>9:00 ~ 18:00</td>
            </tr>
            <tr>
              <td style={TableName}>유아용 마스크 판매여부</td>
              <td>
                {" "}
                <Badge variant="primary">있음</Badge>
              </td>
              <td style={TableName}>판매 예정시간</td>
              <td>1차: 10시~12시 / 2차: 16시~18시</td>
            </tr>
          </tbody>
        </Table>
        <strong>공지사항</strong>
        <Card>
          <Card.Body>금일 KP94 100개 입고 되었습니다.</Card.Body>
        </Card>
        <br />
        <strong>댓글</strong>
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
