import React, { Component, useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import "./css/grade.css";
import "./js/grade.js";

/* function insertComment() {
  alert(this.comment);
    const send_param = {
      comment: this.comment.value,
      postId: this.props.postId,
      memberId: $.cookie("login_id")
    };
    try {
      await axios.post("http://210.107.78.152:8081/comment/insert", send_param).then(returnData => {
        if (returnData.data.message) {
          alert("댓글 등록완료");
          this.ShowComments();
        } else {
          alert("댓글 등록실패");
        }
        this.commentE.value = "";
        this.commentE.focus();
      });
    } catch (err) {
      alert("error");
    }
} */

function Comment() {
  function insertComment() {
    const sendParam = {
      text: commentTag.current.value
    };
  }

  const commentTag = useRef();
  const gradeScore = useRef();
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
