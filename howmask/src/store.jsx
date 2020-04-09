import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

// 판매처 정보 관리 Form
const Store = () => {
  const [check, setCheck] = useState(false);
  const [pwstate, setPwstate] = useState({ valid: false, invalid: false });

  const [btnDefaultFlag, setBtnDefaultFlag] = useState("inline-block"); //수정하기 버튼
  const [btnSuccessFlag, setBtnSuccessFlag] = useState("none"); //수정완료 버튼
  const [title, setTitle] = useState(" 판매처 정보 조회");
  const [textFlag, setTextFlag] = useState(true);

  const [code, setCode] = useState();
  const [storeNameState, setStoreNameState] = useState();
  const [addrState, setAddrState] = useState();
  const [bizCodeState, setBizCodeState] = useState();
  const [sellerNameState, setSellerNameState] = useState();
  const [phoneState, setPhoneState] = useState();
  const [emailState, setEmailState] = useState();
  const [soldTimeState, setSoldTimeState] = useState();
  const [stockAverageState, setStockAverageState] = useState();
  const [kidMaskState, setKidMaskState] = useState();
  const [noticeState, setNoticeState] = useState();
  const [timestate, setTimestate] = useState({ start: null, end: null });

  const storeName = useRef(); //판매처명 (store)
  const addr = useRef(); //주소 (store)
  const bizCode = useRef(); //사업자등록번호 (store)
  const sellerName = useRef(); //관리자 이름 (store)
  const phone = useRef(); // 관리자 휴대전화번호 (store)
  const email = useRef(); // 관리자 이메일 (user)
  const soldTime = useRef(); //판매 예정시간
  const stockAverage = useRef(); //재고 수량
  const kidMask = useRef(); // 유야용 마스크
  const notice = useRef(); // 공지사항
  const startTime = useRef(); // 시작시간
  const endTime = useRef(); // 종료시간

  const inputCheckPw = useRef();
  let storeForm;

  const registerTitle = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 60,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    textAlign: "center",
  };
  const registerForm = {
    display: "inline-block",
    width: "50%",
    position: "fixed",
    top: 100,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
  };
  const btnDefaultStyle = {
    display: btnDefaultFlag,
  };
  const btnSuccessStyle = {
    display: btnSuccessFlag,
  };
  function goToUpdateForm() {
    setBtnSuccessFlag("inline-block");
    setBtnDefaultFlag("none");
    setTitle("판매처 정보 수정");
    setTextFlag(false);
  }
  async function updateInfo() {
    const timeRegExp = /^([1-9]|[01][0-9]|2[0-3]):([0-5][0-9])$/;
    const phoneRegExp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
    if (
      !startTime.current.value.match(timeRegExp) ||
      !endTime.current.value.match(timeRegExp) ||
      !soldTime.current.value.match(timeRegExp)
    ) {
      alert("시간 형식은 HH:MM입니다.");
      return;
    }
    if (!phone.current.value.match(phoneRegExp)) {
      alert("전화번호를 정확히 입력해주세요");
      return;
    }

    const sendParam = {
      code,
      name: storeName.current.value,
      address: addr.current.value,
      bizCode: bizCode.current.value,
      sellerName: sellerName.current.value,
      phone: phone.current.value,
      email: email.current.value,
      soldTime: soldTime.current.value,
      stockAverage: stockAverage.current.value,
      kidMask: kidMask.current.value,
      notice: notice.current.value,
      startTime: startTime.current.value,
      endTime: endTime.current.value,
    };
    const result = await axios.post(
      `http://${url}:8080/store/update`,
      sendParam
    );
    if (result.data.message) {
      alert(result.data.message);
      setBtnSuccessFlag("none");
      setBtnDefaultFlag("inline-block");
      setTitle("판매처 정보 조회");
      setTextFlag(true);
      window.location.href = "/";
    } else {
      alert("수정실패");
    }
  }

  async function getInfo() {
    const result = await axios.post(`http://${url}:8080/store/getInfo`);
    if (result.data.info) {
      const info = result.data.info;
      setCode(info.code);
      setStoreNameState(info.storeName);
      setBizCodeState(info.bizCode);
      setAddrState(info.address);
      setSellerNameState(info.sellerName);
      setPhoneState(info.phone);
      setEmailState(result.data.email);
      setSoldTimeState(info.soldTime);
      setStockAverageState(info.stockAverage);
      setKidMaskState(info.kidsMask);
      setNoticeState(info.notice);
      setTimestate({ start: info.startTime, end: info.endTime });
    } else {
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  const validatePwd = (pwdEntered) => {
    // const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    const pwdRegExp = "";

    if (pwdEntered.match(pwdRegExp)) {
      setPwstate({ valid: true, invalid: false });
    } else {
      setPwstate({ valid: false, invalid: true });
    }
  };

  const checkPwInsert = (event) => {
    event.preventDefault();

    if (!pwstate.valid) {
      alert("필수 항목을 입력하세요");
      return;
    }
    const password = inputCheckPw.current.value;
    const sendParam = { password, headers };

    // alert(password);

    axios
      .post(`http://${url}:8080/store/checkpw`, sendParam)
      .then((returnData) => {
        if (returnData.data.dupYn === "0") {
          setCheck(true);
        } else {
          alert(returnData.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!check) {
    storeForm = (
      <Form onSubmit={checkPwInsert} style={registerForm}>
        <Form.Group controlId="checkPassword">
          <Form.Label>비밀번호 입력</Form.Label>
          <Form.Control
            type="password"
            className="pwdfont"
            ref={inputCheckPw}
            isInvalid={pwstate.invalid}
            isValid={pwstate.valid}
            onChange={(e) => validatePwd(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="info" type="submit" block>
          확인
        </Button>
      </Form>
    );
  } else {
    storeForm = (
      <>
        <h2 style={registerTitle}>{title}</h2>
        <div
          style={{
            position: "absolute",
            left: "60%",
            top: "8%",
          }}
        >
          <Button
            variant="warning"
            style={btnDefaultStyle}
            onClick={() => goToUpdateForm(true)}
          >
            수정하기
          </Button>
          <Button
            variant="success"
            style={btnSuccessStyle}
            onClick={() => updateInfo(true)}
          >
            수정완료
          </Button>
        </div>
        <Form style={registerForm}>
          <Form.Text className="text-muted"></Form.Text>
          <Form.Label>판매처 정보</Form.Label>
          <Form.Text className="text-muted"></Form.Text>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                <font color="#246dbf">판매처명</font>
              </Form.Label>
              <Form.Control
                ref={storeName}
                readOnly={textFlag}
                defaultValue={storeNameState}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId="storeLocation">
              <Form.Label>
                <font color="#246dbf">사업자등록번호</font>
              </Form.Label>
              <Form.Control
                ref={bizCode}
                readOnly={textFlag}
                defaultValue={bizCodeState}
                maxLength="12"
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                <font color="#246dbf">주소</font>
              </Form.Label>
              <Form.Control
                ref={addr}
                readOnly={textFlag}
                defaultValue={addrState}
                disabled
              />
            </Form.Group>
          </Form.Row>
          <Form.Label>영업시간</Form.Label>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                <font color="#246dbf">시작시간</font>
              </Form.Label>
              <Form.Control
                ref={startTime}
                readOnly={textFlag}
                defaultValue={timestate.start}
                maxLength="5"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="storeLocation">
              <Form.Label>
                <font color="#246dbf">종료시간</font>
              </Form.Label>
              <Form.Control
                ref={endTime}
                readOnly={textFlag}
                defaultValue={timestate.end}
                maxLength="5"
              />
            </Form.Group>
          </Form.Row>
          <br />
          <Form.Label>관리자 정보</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>
                <font color="#246dbf">이름</font>
              </Form.Label>
              <Form.Control
                ref={sellerName}
                readOnly={textFlag}
                defaultValue={sellerNameState}
                maxLength="24"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <font color="#246dbf">휴대전화번호</font>
              </Form.Label>
              <Form.Control
                ref={phone}
                readOnly={textFlag}
                defaultValue={phoneState}
                maxLength="13"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <font color="#246dbf">이메일</font>
              </Form.Label>
              <Form.Control
                ref={email}
                readOnly={textFlag}
                defaultValue={emailState}
                maxLength="36"
              />
            </Form.Group>
          </Form.Row>
          <br />
          <Form.Label>마스크 정보</Form.Label>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>
                <font color="#246dbf">판매 예정시간</font>
              </Form.Label>
              <Form.Control
                ref={soldTime}
                readOnly={textFlag}
                defaultValue={soldTimeState}
                maxLength="5"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <font color="#246dbf">평균 재고수량</font>
              </Form.Label>
              <Form.Control
                ref={stockAverage}
                readOnly={textFlag}
                defaultValue={stockAverageState}
                maxLength="4"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>
                <font color="#246dbf">유아용마스크 판매여부</font>
              </Form.Label>
              <Form.Control
                as="select"
                ref={kidMask}
                readOnly={textFlag}
                defaultValue={kidMaskState}
              >
                <option>무</option>
                <option>유</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>
                <font color="#246dbf">공지사항</font>
              </Form.Label>
              <Form.Control
                ref={notice}
                as="textarea"
                readOnly={textFlag}
                defaultValue={noticeState}
                maxLength="300"
              />
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    );
  }

  return <>{storeForm}</>;
};

export default Store;
