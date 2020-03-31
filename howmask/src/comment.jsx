import React, { useRef, useEffect } from "react";
import { InputGroup, Form, Button, Badge, FormControl, Row, Col } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";
import "./css/grade.css";
import "./css/comment.css";
import "./js/grade.js";
import { useState } from "react";

const url = "localhost";

function Comment() {
  const [comments, setComments] = useState();
  const [selectedFile, setSelectedFile] = useState(null);

  // 파일 업로드
  function handleFileInput(e) {
    setSelectedFile(e.target.files[0]);
  }
  //댓글 삭제
  async function deleteComment(_id) {
    const sendParam = { _id };
    const result = axios.post(`http://${url}:8080/comment/delete`, sendParam);
    if ((await result).data.message) {
      showComment();
    } else {
      alert("오류");
    }
  }
  //댓글 수정
  async function updateComment(_id) {
    const sendParam = { _id };
    const result = axios.post(`http://${url}:8080/comment/update`, sendParam);
    if (result) {
      console.log((await result).data.comment[0].text);
      commentTag.current.value = (await result).data.comment[0].text;
      commentTag.current.focus();
    }
  }
  //댓글 입력
  async function insertComment() {
    let formData = new FormData();
    formData.append("img", selectedFile);
    formData.append("code", 111);
    formData.append("grade", 5);
    formData.append("text", commentTag.current.value);

    const result = await axios.post(`http://${url}:8080/comment/write`, formData);
    if (result.data.message === "login") {
      alert("로그인이 필요합니다.");
      commentTag.current.focus();
    } else if (result.data.message === "ok") {
      commentTag.current.value = "";
      fileTag.current.value = "";
      commentTag.current.focus();
      showComment();
    } else {
      alert("오류");
    }
  }

  //모든 댓글 출력
  async function showComment() {
    const result = await axios.post(`http://${url}:8080/comment/getCommentList`);
    try {
      if (result.data.list) {
        const allComments = result.data.list.map(comment => {
          const commentId = comment._id;
          return (
            <div key={comment._id}>
              <Badge pill variant="dark">
                {comment.email}
              </Badge>
              &nbsp;&nbsp;
              <span>{comment.text}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Moment format="YYYY-MM-DD HH:mm">{comment.createdAt}</Moment>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                size="sm"
                variant="warning"
                onClick={() => {
                  updateComment(commentId);
                }}
              >
                수정
              </Button>
              <span>&nbsp;</span>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  deleteComment(commentId);
                }}
              >
                삭제
              </Button>
              <br />
              <Button variant="light">답글</Button>
              <hr />
            </div>
          );
        });
        setComments(allComments);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    showComment();
  }, []);

  const commentTag = useRef();
  const fileTag = useRef();
  return (
    <div>
      <Form>
        <div className="starRev">
          <span className="starR1 on" value="0.5"></span>
          <span className="starR2 on" value="0.5"></span>
          <span className="starR1 on" value="0.5"></span>
          <span className="starR2 on" value="0.5"></span>
          <span className="starR1 on" value="0.5"></span>
          <span className="starR2 on" value="0.5"></span>
          <span className="starR1 on" value="0.5"></span>
          <span className="starR2 on" value="0.5"></span>
          <span className="starR1 on" value="0.5"></span>
          <span className="starR2 on" value="0.5"></span>
          <span>()</span>
        </div>
        <InputGroup>
          <FormControl placeholder="댓글을 입력하세요" ref={commentTag} />
          <InputGroup.Append>
            <Button
              onClick={() => {
                insertComment(true);
              }}
              variant="outline-dark"
            >
              댓글 등록
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <br />
        <InputGroup>
          <Form.File>
            <Form.File.Input ref={fileTag} onChange={e => handleFileInput(e)} />
          </Form.File>
        </InputGroup>
      </Form>
      <br />
      {comments}
    </div>
  );
}

export default Comment;
