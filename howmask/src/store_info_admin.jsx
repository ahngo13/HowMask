import React, { useState, useEffect, useRef } from "react";
import { Form, Col } from "react-bootstrap";
import axios from "axios";

axios.defaults.withCredentials = true;
const url = "localhost";
const headers = { withCredentials: true };

// 판매처 정보 관리 Form
const StoreInfoAdmin = (props) => {
  const [title, setTitle] = useState(" 판매처 정보 조회");

  
  let storeForm;

  const registerTitle = {
    
    margin: "auto",
    textAlign: "center",
  };
  const registerForm = {
    width: "100%",
    margin: "auto",
  };
  
  async function getStoreDetail(props) {
    console.log("getInfo");
    console.log(props);
   /*  const sendParam = { code, headers };

    const result = await axios
      .post(`http://${url}:8080/store/getStoreInfo`, sendParam)
      .then((returnData) => {
        console.log(returnData.data.info);
        setStoreInfo(returnData.data.info);
      })
      .catch((err) => {
        console.log(err);
      }); */

    console.log(props);


    /* if (result.data.info) {
      const info = result.data.info;
      setCode(info.code);
      setStoreNameState(info.storeName);
      setBizCodeState(info.bizCode);
      setAddrState(info.address);
      setSellerNameState(info.sellerName);
      setPhoneState(info.phone);
      setEmailState(result.data.email);
    } else {
      console.log("setting fail");
    } */
  }
  if(props.storeInfo){
    storeForm = (
      <>
        <h2 style={registerTitle}>{title}</h2>
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
                readOnly={true}
                defaultValue={props.storeInfo.storeName}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="storeLocation">
              <Form.Label>
                <font color="#246dbf">사업자등록번호</font>
              </Form.Label>
              <Form.Control
                readOnly={true}
                defaultValue={props.storeInfo.bizCode}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                <font color="#246dbf">주소</font>
              </Form.Label>
              <Form.Control
                readOnly={true}
                defaultValue={props.storeInfo.address}
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
                readOnly={true}
                defaultValue={props.storeInfo.sellerName}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>
                <font color="#246dbf">휴대전화번호</font>
              </Form.Label>
              <Form.Control
                readOnly={true}
                defaultValue={props.storeInfo.phone}
              />
            </Form.Group>

          </Form.Row>
        </Form>
      </>
    );
  }

  return <>{storeForm}</>;
};

export default StoreInfoAdmin;
