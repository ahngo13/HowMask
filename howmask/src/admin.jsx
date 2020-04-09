import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container, Modal } from "react-bootstrap";
import StoreInfoAdmin from "./store_info_admin"

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

function StoreInfoModal(props) {
  const [storeInfo, setStoreInfo] = useState();

  useEffect(() => {
    if(props.code){
      getStoreDetail(props.code);
    }
  },[props.code]); 

  const getStoreDetail = async (code) => {

    const sendParam = { code, headers };

    console.log("code:" + code);

    await axios
      .post(`http://${url}:8080/store/getStoreInfo`, sendParam)
      .then((returnData) => {
        console.log(returnData.data.info);
        setStoreInfo(returnData.data.info);
      })
      .catch((err) => {
        console.log(err);
      });
    
  };
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        판매처 정보
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StoreInfoAdmin storeInfo={storeInfo}></StoreInfoAdmin>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Admin = () => {
  const [list, setList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [code, setCode] = useState();

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
        // alert(returnData.data.message);
        // console.log(returnData.data.result);
        if (returnData.data.result) {
          setList(returnData.data.result);
        } else {
          sessionStorage.clear();
          window.location.href = "/";
        }
      });
  };

  const grantAuth = (email) => {
    const sendParam = {email, headers};
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
        console.log(err);
      });
  }

  const revokeAuth = (email) => {
    const sendParam = {email, headers};
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
        console.log(err);
      });
  }

  const deleteList = (email) => {

    if(window.confirm("정말 삭제하시겠습니까?")){
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
        console.log(err);
      });
    }
  };

  const unlockLogin = (email) => {

    if(window.confirm(email + " 계정을 잠금해제 하시겠습니까?")){
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
        console.log(err);
      });
    }
  };
  const detailClick = (listsCode) => {
    setModalShow(true);
    setCode(listsCode);
  }


  let listForm = list.map((lists) => {
    const listsEmail = lists.email;
    const grantBtn = <Button onClick={()=>{grantAuth(listsEmail)}}>승인</Button>
    const revokeBtn = <Button variant="danger" onClick={()=>{revokeAuth(listsEmail)}}>반려</Button>
    const unlockBtn = <Button onClick={()=>{unlockLogin(listsEmail)}}>잠금해제</Button>
    const detailBtn = <Button onClick={()=>detailClick(lists.code)}>상세보기</Button>

    return (
      <tr key={listsEmail}>
        <td>{lists.user_type === "0" ? "개인" : "판매처"}</td>
        <td>{lists.email}</td>
        <td>{lists.lockYn === true ? unlockBtn : "No" }</td>
        <td>
          {lists.auth === false && lists.user_type === "1" ? grantBtn : ""}
          {lists.auth === true && lists.user_type === "1" ? revokeBtn : ""}
        </td>
        <td>{lists.user_type === "0" ? "" : detailBtn}</td>
        <td>
          <Button variant="danger"
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

  return (
    <div>
    <Container>
      <Table striped hover>
        <thead>
          <tr>
            <th>구분</th>
            <th>이메일</th>
            <th>잠금여부</th>
            <th>계정승인</th>
            <th></th>
            <th><Button onClick={viewList}>새로고침</Button></th>
          </tr>
        </thead>
        <tbody>{listForm}</tbody>
      </Table>
    </Container>
      <StoreInfoModal
        show={modalShow}
        code={code}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default Admin;

