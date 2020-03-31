import React,{useState} from "react";
import axios from "axios";
import { Button, Table, Container } from "react-bootstrap";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };


const Admin = () => {

  const [list, setList] = useState([]);


  const viewList = ()=>{
    if (!sessionStorage.getItem("login")) {
      alert("다시 로그인해주세요");
      window.location.href = "/";
      return
    }


    axios
    .get(`http://${url}:8080/user/adminViewList`, { headers })
    .then(returnData => {      
      // alert(returnData.data.message);
      // console.log(returnData.data.result);
      if(returnData.data.result){
        setList(returnData.data.result);
      }else{
        window.location.href = "/";       
      }
     
    });
    

  }

  const deleteList= (email)=>{
    const sendParam = { email, headers }

    axios
      .post(`http://${url}:8080/user/admindelete`, sendParam)
      .then(returnData => {
        if (returnData.data.message) {
          alert("삭제완료");
          viewList();
        } else {
          alert("삭제실패");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }



    let listForm = list.map(lists =>{
    const listsEmail = lists.email;
    return(
    <tr key={listsEmail}>
    <td>{lists.user_type}</td>
    <td>{lists.email}</td>
    <td>{lists.nickname}</td>
    <td>{lists.lockYn}</td>
    <td><Button>승인</Button></td>
    <td><Button>승인취소</Button></td>
    <td><Button onClick={()=>{deleteList(listsEmail)}}>회원삭제</Button></td>
    </tr> 
  )});

    return(
        <Container>
          <Button onClick={viewList}>회원조회</Button>
          <Table>
          <thead>
          <tr>
         <th>구분</th>
         <th>이메일</th>
         <th>닉네임</th>
         <th>잠금여부</th>
         <th>승인</th>
         <th>승인취소</th>
         <th></th>
         </tr>
          </thead>
          <tbody>
          {listForm}
          </tbody>
          </Table>
        </Container>
    )
}

export default Admin;