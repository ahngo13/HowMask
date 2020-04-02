import React, { useRef } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

const url = "localhost";

// 판매처 조회화면 돌아가기 (confirm)
function RouterStore1() {
  const confirm = window.confirm("이전 화면으로 이동하시겠습니까?");
  if (confirm) {
    window.location.href = "/";
  }
}
function RouterStore2() {
  window.location.href = "/#/storeInfo";
}

// 판매처 정보수정 제안 Form
function Suggest() {
  const suggestType = useRef();
  const Text = useRef();

  async function registerSuggestion() {
    if (!Text.current.value) {
      alert("제안 내용을 입력해주세요");
      Text.current.focus();
      return;
    }
    const sendParam = {
      suggestType: suggestType.current.value,
      Text: Text.current.value
    };
    const result = await axios.post(`http://${url}:8080/store/suggest`, sendParam);
    if (result.data.message) {
      Text.current.value = "";
      RouterStore2();
    } else {
      alert("오류");
    }
  }

  const suggestTitle = {
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
  const suggestForm = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 100,
    margin: "auto"
  };
  return (
    <>
      <h2 style={suggestTitle}>판매처 정보수정 제안</h2>
      <Form style={suggestForm}>
        <Col sm={10}>
          <Form.Label>수정 제안할 항목을 선택하세요.</Form.Label>
          <Form.Control as="select" ref={suggestType}>
            <option>폐업</option>
            <option>판매처명</option>
            <option>주소 및 위치</option>
            <option>전화번호</option>
            <option>진료 및 영업시간</option>
            <option>마스크 종류 및 재고</option>
            <option>기타(약국 등 판매처 정보에 대한 제보만 가능)</option>
          </Form.Control>
          <br />
          <Form.Label>제안 상세 내용</Form.Label>
          <Form.Text className="text-muted">반드시 입력해주세요.</Form.Text>
          <Form.Control
            as="textarea"
            rows="3"
            ref={Text}
            placeholder="진료시간이 오후 5시까지인데 6시까지로 되어 있습니다."
          />
          <br />
          <Row>
            <Col>
              <Button
                onClick={() => {
                  RouterStore1(true);
                }}
                variant="warning"
                size="lg"
                block
              >
                돌아가기
              </Button>
            </Col>
            <Col>
              <Button variant="info" size="lg" block onClick={registerSuggestion}>
                등록하기
              </Button>
            </Col>
          </Row>
        </Col>
      </Form>
    </>
  );
}

export default Suggest;
