import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Container } from "react-bootstrap";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

const Admin = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    viewList();
  }, []);

  const viewList = () => {
    if (!sessionStorage.getItem("login")) {
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
          window.location.href = "/login";
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

  let listForm = list.map((lists) => {
    const listsEmail = lists.email;
    const grantBtn = <Button onClick={()=>{grantAuth(listsEmail)}}>승인</Button>
    const revokeBtn = <Button onClick={()=>{revokeAuth(listsEmail)}}>반려</Button>
    const unlockBtn = <Button onClick={()=>{unlockLogin(listsEmail)}}>잠금해제</Button>
    return (
      <tr key={listsEmail}>
        <td>{lists.user_type === "0" ? "개인" : "판매처"}</td>
        <td>{lists.email}</td>
        <td>{lists.nickname}</td>
        <td>{lists.lockYn === true ? unlockBtn : "No" }</td>
        <td>
          {lists.auth === false && lists.user_type === "1" ? grantBtn : ""}
          {lists.auth === true && lists.user_type === "1" ? revokeBtn : ""}
        </td>
        <td>
          <Button
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
    <Container>
      <Button onClick={viewList}>새로고침</Button>
      <Table>
        <thead>
          <tr>
            <th>구분</th>
            <th>이메일</th>
            <th>닉네임</th>
            <th>잠금여부</th>
            <th>계정승인</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listForm}</tbody>
      </Table>
    </Container>
  );
};

export default Admin;

