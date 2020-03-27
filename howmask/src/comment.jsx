import React, { Component, useRef } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import "./css/grade.css";
import $ from "jquery";
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
    alert(comment_tag.current.value);
  }
  $(".starRev span").click(function() {
    $(this)
      .parent()
      .children("span")
      .removeClass("on");
    $(this)
      .addClass("on")
      .prevAll("span")
      .addClass("on");
    return false;
  });
  const comment_tag = useRef();
  return (
    <div>
      <Form>
        <InputGroup size="sm" className="mb-3">
          <div class="starRev">
            <span class="starR1 on"></span>
            <span class="starR2"></span>
          </div>
          <Form.Control
            as="textarea"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="댓글을 입력하세요"
            ref={comment_tag}
          />
          <Button onClick={insertComment} size="sm" variant="outline-dark">
            댓글 등록
          </Button>
        </InputGroup>
        <commentItems />
      </Form>
    </div>
  );
}
/* class Comment extends Component {
  insertComment = () => {
    alert();
  };
  render() {
    return (
      <div>
        <Form>
          <InputGroup size="sm" className="mb-3">
            <Form.Control
              as="textarea"
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="댓글을 입력하세요"
              ref={ref => (this.comment = ref)}
            />
            <Button onClick={this.insertComment} size="sm" variant="outline-dark">
              댓글 등록
            </Button>
          </InputGroup>
          <commentItems />
        </Form>
      </div>
    );
  }
} */

export default Comment;
