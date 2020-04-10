import React, { useState, useRef, useEffect } from "react";
import { InputGroup, Form, Button, Badge, FormControl, Table } from "react-bootstrap";
import axios from "axios";
import Moment from "react-moment";
import "./css/grade.css";
import "./css/comment.css";
import "./js/grade.js";

const url = "localhost";

function Comment(props) {
  let flag = false;
  const code = props.code; // 판매처코드
  const [comments, setComments] = useState(); // 댓글 리스트
  const [commentId, setCommentId] = useState(); // 댓글 id
  const [selectedFile, setSelectedFile] = useState(null); // 파일
  const [imagePreviewUrl, setImagePreviewUrl] = useState(""); // 미리보기 파일 경로
  const [gradeValue, setGradeValue] = useState(5);
  const [commentCnt, setCommentCnt] = useState();
  const [functionName, setFunctionName] = useState("insert");
  const [insertBtn, setInsertBtn] = useState("댓글 등록");
  const [cancelStyle, setCancelStyle] = useState("none");

  const [avgGrade, setAvgGrade] = useState("평점 없음");
  const [isError, setIsError] = useState(false);

  const imgExp = /([^\s]+(?=\.(jpg|gif|png|jpeg))\.\2)/;

  const gradeForm = (
    <div className="starRev">
      <span className="starR1 on" onClick={(e) => handleGradeInput(e)}>
        0.5
      </span>
      <span className="starR2 on" onClick={(e) => handleGradeInput(e)}>
        1
      </span>
      <span className="starR1 on" onClick={(e) => handleGradeInput(e)}>
        1.5
      </span>
      <span className="starR2 on" onClick={(e) => handleGradeInput(e)}>
        2
      </span>
      <span className="starR1 on" onClick={(e) => handleGradeInput(e)}>
        2.5
      </span>
      <span className="starR2 on" onClick={(e) => handleGradeInput(e)}>
        3
      </span>
      <span className="starR1 on" onClick={(e) => handleGradeInput(e)}>
        3.5
      </span>
      <span className="starR2 on" onClick={(e) => handleGradeInput(e)}>
        4
      </span>
      <span className="starR1 on" onClick={(e) => handleGradeInput(e)}>
        4.5
      </span>
      <span className="starR2 on 5" onClick={(e) => handleGradeInput(e)}>
        5
      </span>
    </div>
  );

  useEffect(() => {
    showComment();
  }, []);

  // 평점 값
  function handleGradeInput(e) {
    setGradeValue(e.target.textContent);
  }

  // 이미지 파일 Component
  function imageFile(comment, imageUrl, imageStyle) {
    if (comment.image) {
      return <img src={imageUrl} style={imageStyle} />;
    } else {
      return null;
    }
  }
  // 이미지 파일 업로드
  function handleFileInput(e) {
    e.preventDefault();
    let reader = new FileReader(); // 파일 읽기
    let file = e.target.files[0];
    let fileName = e.target.files[0].name;

    if (fileName.match(imgExp) == null) {
      alert("jpg, gif, png 형식의 이미지 파일만 첨부 가능합니다.");
      fileTag.current.value = "";
      commentTag.current.focus();
      return;
    } else {
      reader.onloadend = function (e) {
        // 파일 load가 성공인 경우
        const base64 = e.target.result;
        setImagePreviewUrl(base64);
      };
      if (file) {
        reader.readAsDataURL(file); // 1. 파일을 읽어 버퍼에 저장합니다.
        setSelectedFile(file); // 파일 상태 업데이트
      }
    }
  }
  //댓글 삭제
  async function deleteComment(_id, imageUrl) {
    const sendParam = { _id, imageUrl };
    const result = axios.post(`http://${url}:8080/comment/delete`, sendParam);
    if ((await result).data.session === true) {
      showComment();
    } else if ((await result).data.session === false) {
      alert("로그인이 필요합니다.");
      window.location.href = "/#/login";
    } else if ((await result).data.message === false) {
      alert("에러");
    }
  }
  // 댓글 수정집입 취소
  async function cancelUpdate() {
    setFunctionName("insert");
    setInsertBtn("댓글 등록");
    setCancelStyle("none");
    setSelectedFile(null);
    setImagePreviewUrl("");
    commentTag.current.focus();
    commentTag.current.value = "";
    fileTag.current.value = "";
  }
  //댓글 수정진입
  async function updateComment(_id, flag) {
    const sendParam = { _id, flag };
    const result = axios.post(`http://${url}:8080/comment/update`, sendParam);
    if ((await result).data.comment) {
      commentTag.current.value = (await result).data.comment[0].text;
      commentTag.current.focus();
      setCommentId(_id);
      setFunctionName("update");
      setInsertBtn("댓글 수정");
      setCancelStyle("inline-block");
    } else {
      alert("수정 진입 에러");
    }
  }
  //댓글 입력
  async function insertComment() {
    let formData = new FormData();

    formData.append("code", code);
    formData.append("grade", gradeValue);
    formData.append("text", commentTag.current.value);
    if (selectedFile) {
      formData.append("img", selectedFile);
    }

    //새로운 댓글 등록
    if (functionName === "insert") {
      if (!commentTag.current.value) {
        alert("댓글 내용을 입력하세요");
        commentTag.current.focus();
        return;
      } else {
        const resultWrite = await axios.post(`http://${url}:8080/comment/write`, formData);
        if ((await resultWrite).data.resultCode === 0) {
          sessionStorage.clear(); // 세션스토리지 삭제
          alert("로그인이 필요합니다.");
          window.location.href = "/#/login";
        } else if ((await resultWrite).data.resultCode === 1) {
          commentTag.current.value = "";
          fileTag.current.value = "";
          setSelectedFile(null);
          commentTag.current.focus();
          setImagePreviewUrl("");
          setCommentCnt(commentCnt + 1);
          showComment();
        } else if ((await resultWrite).data.resultCode === 2) {
          alert("에러");
          setSelectedFile(null);
          setImagePreviewUrl("");
        } else if (resultWrite.data.fileCode === 0) {
          alert("업로드 파일이 너무 큽니다.\n적절한 크기의 파일을 업로드해주세요.");
          setSelectedFile(null);
          setImagePreviewUrl("");
        }
      }
    } // 수정한 댓글 등록
    else if (functionName === "update") {
      flag = true;
      formData.append("_id", commentId);
      formData.append("flag", flag);

      const resultUpdate = await axios.post(`http://${url}:8080/comment/update`, formData);
      if (resultUpdate.data.resultCode === 1) {
        alert("댓글 수정 성공");
        setCancelStyle("none");
        setSelectedFile(null);
        setFunctionName("insert");
        setInsertBtn("댓글 등록");
        commentTag.current.value = "";
        fileTag.current.value = "";
        commentTag.current.focus();
      } else if (resultUpdate.data.resultCode === 2) {
        alert("다른 댓글 내용을 입력하세요");
        commentTag.current.focus();
      } else if (resultUpdate.data.resultCode === 3) {
        alert("수정할 댓글 내용을 입력해주세요");
        commentTag.current.value = resultUpdate.data.comment[0].text;
        commentTag.current.focus();
      } else if (resultUpdate.data.resultCode === 0) {
        alert("에러");
      }
      flag = false;
      showComment();
    }
  }

  //모든 댓글 출력
  async function showComment(props) {
    try {
      const sendParam = { code };
      const result = await axios.post(`http://${url}:8080/comment/getCommentList`, sendParam);
      const imageStyle = {
        width: "250px",
        height: "auto",
      };
      let showBtn;
      setCommentCnt(result.data.list.length);

      setAvgGrade(result.data.avg.gradeAvg);
      if (result.data.list) {
        const allComments = result.data.list.map((comment) => {
          const commentId = comment._id;
          const imageUrl = `http://${url}:8080/` + comment.image;

          if (comment.mine) {
            showBtn = "inline-block";
          } else {
            showBtn = "none";
          }
          return (
            <div key={comment._id}>
              <Table responsive borderless>
                <tbody>
                  <tr>
                    <td rowSpan="2">
                      <h5>
                        <Badge variant="info" style={{ textAlign: "center" }}>
                          평점 : {comment.grade}
                        </Badge>
                      </h5>
                    </td>
                    <td colSpan="2">
                      <span>{comment.text}</span>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => {
                          updateComment(commentId, flag);
                        }}
                        style={{ display: showBtn }}
                      >
                        수정
                      </Button>
                      <span>&nbsp;</span>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          deleteComment(commentId, comment.image);
                        }}
                        style={{ display: showBtn }}
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <Badge pill variant="dark">
                        {comment.commenter.nickname}
                      </Badge>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <Moment format="YYYY-MM-DD HH:mm">{comment.updatedAt}</Moment>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                    <td>{imageFile(comment, imageUrl, imageStyle)}</td>
                  </tr>
                </tbody>
              </Table>
              <hr />
            </div>
          );
        });
        setComments(allComments);
      }
    } catch (err) {
      console.log(err);
      setIsError(false);
    }
  }

  const commentTag = useRef();
  const fileTag = useRef();

  return (
    <div>
      <Form>
        {gradeForm}
        <InputGroup>
          <FormControl
            placeholder="댓글을 입력하세요"
            ref={commentTag}
            maxLength="200"
          ></FormControl>
          <InputGroup.Append>
            <Button
              style={{ display: cancelStyle }}
              onClick={() => {
                cancelUpdate(true);
              }}
            >
              수정취소
            </Button>
            <Button
              onClick={() => {
                insertComment(true);
              }}
              variant="outline-dark"
            >
              {insertBtn}
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Text className="text-muted">
          *댓글은 200자 이내로 작성할 수 있습니다.
          <br />
          *파일은 최대 5KB 까지 업로드할 수 있습니다. (jpg, gif, png)
        </Form.Text>
        <img src={imagePreviewUrl} style={({ height: 500 }, { width: 500 })} />
        <br />
        <InputGroup>
          <Form.File>
            <Form.File.Input
              accept=".gif, .jpg, .png"
              ref={fileTag}
              onChange={(e) => handleFileInput(e)}
            />
          </Form.File>
        </InputGroup>
      </Form>
      <br />
      <span>
        총 댓글 갯수 : {commentCnt} &nbsp;&nbsp;&nbsp;
        <h1 style={{ float: "right" }}>
          <font color="yellow">★</font>
          <Badge pill variant="success">
            {avgGrade}
          </Badge>
        </h1>
      </span>
      {comments}
    </div>
  );
}

export default Comment;
