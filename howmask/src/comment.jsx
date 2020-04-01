import React, { useRef, useEffect } from "react";
import { InputGroup, Form, Button, Badge, FormControl } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";
import "./css/grade.css";
import "./css/comment.css";
import "./js/grade.js";
import { useState } from "react";

const url = "localhost";

function Comment() {
  const [comments, setComments] = useState(); // 댓글
  const [selectedFile, setSelectedFile] = useState(null); // 파일
  const [imgBase64, setImgBase64] = useState(null); // 파일 base64
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 미리보기 파일 경로
  const [gradeValue, setGradeValue] = useState(5);

  // 평점 값
  function handleGradeInput(e) {
    setGradeValue(e.target.value);
  }
  // 파일 업로드
  function handleFileInput(e) {
    e.preventDefault();
    let reader = new FileReader(); // 파일 읽기
    let file = e.target.files[0];
    reader.onloadend = function(e) {
      // 파일 load가 성공인 경우
      const base64 = e.target.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
      setImagePreviewUrl(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file); // 1. 파일을 읽어 버퍼에 저장합니다.
      setSelectedFile(e.target.files[0]); // 파일 상태 업데이트
    }
  }
  //댓글 삭제
  async function deleteComment(_id, image) {
    const sendParam = { _id, image};
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
    if (!commentTag.current.value) {
      alert("댓글 내용을 입력하세요");
      commentTag.current.focus();
      return;
    } else {
      if (selectedFile) {
        formData.append("img", selectedFile);
      }
      formData.append("code", 111);
      formData.append("grade", gradeValue);
      formData.append("text", commentTag.current.value);
    }
    const result = await axios.post(`http://${url}:8080/comment/write`, formData);
    if (result.data.message === "login") {
      alert("로그인이 필요합니다.");
      commentTag.current.focus();
    } else if (result.data.message === "ok") {
      commentTag.current.value = "";
      fileTag.current.value = "";
      setSelectedFile(null);
      commentTag.current.focus();
      setImagePreviewUrl("");
      setGradeValue(5);
      showComment();
    } else {
      alert("오류");
      setSelectedFile(null);
      setImagePreviewUrl("");
    }
  }

  //모든 댓글 출력
  async function showComment() {
    const result = await axios.post(`http://${url}:8080/comment/getCommentList`);
    try {
      if (result.data.list) {
        const allComments = result.data.list.map(comment => {
          const commentId = comment._id;
          const image = comment.image;

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
              <img src={comment.image} />
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
                  deleteComment(commentId, image);
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
  const grade = useRef();

  return (
    <div>
      <Form>
        {/* <div className="starRev">
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
        </div> */}
        평점 :
        <input
          style={{ width: "100px" }}
          type="number"
          name="name"
          min={1}
          max={5}
          ref={grade}
          onChange={e => handleGradeInput(e)}
        />
        <InputGroup>
          <FormControl placeholder="댓글을 입력하세요" ref={commentTag}></FormControl>
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
        <img
          style={{ backgroundColor: "#efefef", width: "150px", height: "150px" }}
          src={imagePreviewUrl}
        />
        <br />
        <InputGroup>
          <Form.File>
            <Form.File.Input accept="image/" ref={fileTag} onChange={e => handleFileInput(e)} />
          </Form.File>
        </InputGroup>
      </Form>
      <br />
      {comments}
    </div>
  );
}

export default Comment;
