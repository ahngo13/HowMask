import React, { useRef, useEffect } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./css/grade.css";
import "./js/grade.js";
import { useState } from "react";

const url = "localhost";

function Comment() {
  const [comments, setComments] = useState([]);

  //모든 댓글 출력
  async function showComment() {
    const result = await axios.post(`http://${url}:8080/comment/getCommentList`);
    try {
      if (result) {
        const allComments = result.data.list.map(comment => {
          return <li key={comment._id}>{comment.text}</li>;
        });
        setComments(allComments);
        /*  console.log(comments); */
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    showComment();
  });

  //댓글 입력
  function insertComment() {
    const sendParam = {
      code: 111,
      grade: 5,
      text: commentTag.current.value
    };
    axios
      .post(`http://${url}:8080/comment/write`, sendParam)
      .then()
      .catch(err => {
        console.log(err);
      });
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
