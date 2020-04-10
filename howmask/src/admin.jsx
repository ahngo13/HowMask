import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Table, Container, Modal, Form } from "react-bootstrap";
import StoreInfoAdmin from "./store_info_admin";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

function StoreInfoModal(props) {
  const [storeInfo, setStoreInfo] = useState();

  useEffect(() => {
    if (props.code) {
      getStoreDetail(props.code);
    }
  }, [props.code]);

  const getStoreDetail = async (code) => {
    const sendParam = { code, headers };

    await axios
      .post(`http://${url}:8080/store/getStoreInfo`, sendParam)
      .then((returnData) => {
        setStoreInfo(returnData.data.info);
      })
      .catch((err) => {
        window.location.href="/#/error";
      });
  };

  return (
    <>
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">판매처 신청 정보</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StoreInfoAdmin storeInfo={storeInfo}></StoreInfoAdmin>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
    </>
  )
}

const Admin = () => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState();

  const [pwstate, setPwstate] = useState({ valid: false, invalid: false });

  let adminForm;
  const [check, setCheck] = useState(false);
  const inputCheckPw = useRef();

  useEffect(() => {
    viewList();
  }, []);

  const viewList = () => {
    if (!sessionStorage.getItem("login")) {
      sessionStorage.clear();
      window.location.href = "/";
      return;
    }

    axios
      .get(`http://${url}:8080/user/adminViewList`, { headers })
      .then((returnData) => {
        if (returnData.data.result) {
          setList(returnData.data.result);
          setList2(returnData.data.result2);
        } else {
          sessionStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((err) => {
        window.location.href="/#/error";
      });
  };

  const grantAuth = (email) => {
    const sendParam = { email, headers };
    axios
      .post(`http://${url}:8080/user/grantAuth`, sendParam)
      .then((returnData) => {
        if (returnData.data.resultCode === "1") {
          alert("판매처가 승인 되었습니다.");
          viewList();
        } else if (returnData.data.resultCode === "0") {
          alert("다시 로그인해주세요");
          sessionStorage.clear();
          window.location.href = "/login";
        } else {
          alert("판매처 승인 실패");
        }
      })
      .catch((err) => {
        window.location.href="/#/error";
      });
  };

  const revokeAuth = (email) => {
    const sendParam = { email, headers };
    axios
      .post(`http://${url}:8080/user/revokeAuth`, sendParam)
      .then((returnData) => {
        if (returnData.data.resultCode === "1") {
          alert("판매처가 반려 되었습니다.");
          viewList();
        } else if (returnData.data.resultCode === "0") {
          alert("다시 로그인해주세요");
          sessionStorage.clear();
          window.location.href = "/login";
        } else {
          alert("판매처 반려 실패");
        }
      })
      .catch((err) => {
        window.location.href="/#/error";
      });
  };

  const deleteList = (email) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      const sendParam = { email, headers };

      axios
        .post(`http://${url}:8080/user/admindelete`, sendParam)
        .then((returnData) => {
          if (returnData.data.resultCode === "1") {
            alert("삭제 되었습니다.");
            viewList();
          } else if (returnData.data.resultCode === "0") {
            alert("다시 로그인 해주세요");
            sessionStorage.clear();
            window.location.href = "/login";
          } else {
            alert("삭제 실패");
          }
        })
        .catch((err) => {
          window.location.href="/#/error";
        });
    }
  };

  const unlockLogin = (email) => {
    if (window.confirm(email + " 계정을 잠금해제 하시겠습니까?")) {
      const sendParam = { email, headers };

      axios
        .post(`http://${url}:8080/user/unlockLogin`, sendParam)
        .then((returnData) => {
          if (returnData.data.resultCode === "1") {
            alert("잠금해제 되었습니다.");
            viewList();
          } else if (returnData.data.resultCode === "0") {
            alert("다시 로그인 해주세요");
            sessionStorage.clear();
            window.location.href = "/login";
          } else {
            alert("삭제 실패");
          }
        })
        .catch((err) => {
          window.location.href="/#/error";
        });
    }
  };
  const detailClick = (listsCode) => {
    setModalShow(true);
    setCode(listsCode);
  };

  const checkPwInsert = (event) => {
    event.preventDefault();

    if (!pwstate.valid) {
      alert("필수 항목을 입력하세요");
      return;
    }

    const password = inputCheckPw.current.value;
    const sendParam = { password, headers };

    axios
      .post(`http://${url}:8080/user/checkpw`, sendParam)
      .then((returnData) => {
        alert(returnData.data.message);
        if(returnData.data.dupYn === "0"){

          setCheck(true);
        }
      })
      .catch((err) => {
        window.location.href="/#/error";
      });
  };

  const validatePwd = (pwdEntered) => {
    // const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const pwdRegExp = "";

    if (pwdEntered.match(pwdRegExp)) {
      setPwstate({ valid: true, invalid: false });
    } else {
      setPwstate({ valid: false, invalid: true });
    }
  };

  let listForm = list.map((lists, index) => {
    const listsEmail = lists.email;
    const grantBtn = (
      <Button
        onClick={() => {
          grantAuth(listsEmail);
        }}
      >
        승인
      </Button>
    );
    const revokeBtn = (
      <Button
        variant="danger"
        onClick={() => {
          revokeAuth(listsEmail);
        }}
      >
        반려
      </Button>
    );
    const unlockBtn = (
      <Button
        onClick={() => {
          unlockLogin(listsEmail);
        }}
      >
        잠금해제
      </Button>
    );
    const detailBtn = <Button onClick={() => detailClick(lists.code)}>상세보기</Button>;

    return (
      <tr key={listsEmail}>
        <td>{index + 1}</td>
        <td>{lists.user_type === "0" ? "개인" : "판매처"}</td>
        <td>{lists.email}</td>
        <td>{lists.lockYn === true ? unlockBtn : "No"}</td>
        <td>{lists.user_type === "0" ? "" : detailBtn}</td>
        <td>
          {lists.auth === false && lists.user_type === "1" ? grantBtn : ""}
          {lists.auth === true && lists.user_type === "1" ? revokeBtn : ""}
        </td>
        <td>
          <Button
            variant="danger"
            onClick={() => {
              deleteList(listsEmail);
            }}
          >
            회원삭제
          </Button>
        </td>
      </tr>
    );
  });

  let listForm2 = list2.map((lists, index) => {
    
    return (
      <tbody key={lists.code}>
        <tr>
          <td rowSpan="3">{index + 1}</td>
          <td>{lists.code}</td>
          <td>{lists.email}</td>
          <td>{lists.suggestType}</td>
        </tr>
        <tr>
          <td colSpan="3">제안 상세 내용</td>
        </tr>
        <tr> 
          <td colSpan="3">{lists.Text}</td>
        </tr>
      </tbody>
    );
  });

  const tableStyle = {
    textAlign: "center",
  };

  const titleStyle = {
    textAlign:"center"
  };

  const pwCheckForm = {
    display: "inline-block",
    width: "45%",
    position: "fixed",
    top: 150,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };

  if (!check) {
    adminForm = 
      <Form style={pwCheckForm} onSubmit={checkPwInsert}>
        <h2 style={titleStyle}>회원관리</h2>
        <br></br>
        <Form.Group controlId="checkPassword">
          <Form.Label>비밀번호 입력</Form.Label>
          <p>
            개인정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해
            주세요.
          </p>
          <Form.Control
            type="password"
            className="pwdfont"
            ref={inputCheckPw}
            isInvalid={pwstate.invalid}
            isValid={pwstate.valid}
            onChange={(e) => validatePwd(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" block>
          확인
        </Button>
      </Form>
    
  } else {
    adminForm = (<div>
        <>
          <Container>
            <h2 style={titleStyle}>회원 관리</h2>
            <Table striped style={tableStyle}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>구분</th>
                  <th>이메일</th>
                  <th>잠금여부</th>
                  <th>신청정보</th>
                  <th>계정승인</th>
                  <th>
                    <Button variant="warning" onClick={viewList}>
                      새로고침
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>{listForm}</tbody>
            </Table>
            <br></br>
            <h2 style={titleStyle}>판매처 수정 제안 목록</h2>
            <Table bordered style={tableStyle}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>판매처 코드</th>
                  <th>이메일</th>
                  <th>수정 제안 항목</th>
                </tr>
              </thead>
              {listForm2}
            </Table>
          </Container>
          <StoreInfoModal show={modalShow} code={code} onHide={() => setModalShow(false)} />
        </>
    </div>)
  }

  return (
  <>{adminForm}</>
  );
};

export default Admin;
