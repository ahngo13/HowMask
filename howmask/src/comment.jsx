import React, { Component, useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./css/grade.css";
import "./js/grade.js";

const url = "localhost";

function Comment() {
  function insertComment() {
    const sendParam = {
      email: "test email",
      code: 111,
      grade: 5,
      text: commentTag.current.value
    };
    axios
      .post(`http://${url}:8080/comment/write`, sendParam)
      .then()
      .catch();
  }

  const commentTag = useRef();
  return (
    <div>
      <Form>
        <div className="starRev">
          <span className="starR1 on"></span>
          <span className="starR2 on"></span>
          <span className="starR1 on"></span>
          <span className="starR2 on"></span>
          <span className="starR1 on"></span>
          <span className="starR2 on"></span>
          <span className="starR1 on"></span>
          <span className="starR2 on"></span>
          <span className="starR1 on"></span>
          <span className="starR2 on"></span>
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
      </Form>
    </div>
  );
}

export default Comment;
