import React, { useRef, useEffect } from "react";
import { InputGroup, Form, Button, Badge } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";
import "./css/grade.css";
import "./js/grade.js";
import { useState } from "react";

const url = "localhost";

function Comment() {
  const [comments, setComments] = useState();

  // 댓글창 활성화 여부 : True/False
  const [active, setActive] = useState(false);

  //모든 댓글 출력
  async function showComment() {
    const result = await axios.post(`http://${url}:8080/comment/getCommentList`);
    try {
      if (result.data.list) {
        const allComments = result.data.list.map(comment => {
          return (
            <div key={comment._id}>
              <Badge pill variant="dark">
                {comment.email}
              </Badge>
              &nbsp;&nbsp;
              {comment.text}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Moment format="YYYY-MM-DD HH:mm">{comment.createdAt}</Moment>
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

  //댓글 입력
  async function insertComment() {
    const sendParam = {
      code: 111,
      grade: 5,
      text: commentTag.current.value
    };
    const result = await axios.post(`http://${url}:8080/comment/write`, sendParam);
    if (result.data.message === "login") {
      alert("로그인이 필요합니다.");
    } else if (result.data.message === "ok") {
    } else {
      alert("오류");
    }
  }

  const commentTag = useRef();
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
        <InputGroup size="sm" className="mb-3">
          <Form.Control
            as="textarea"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="댓글을 입력하세요"
            ref={commentTag}
          />
          <Button onClick={insertComment} size="sm" variant="outline-dark">
            댓글 등록
          </Button>
        </InputGroup>
        <ul></ul>
      </Form>
      {comments}
    </div>
  );
}

export default Comment;
