import React from "react";
import { Form, Col } from "react-bootstrap";

// 판매처 정보 관리 Form
const StoreInfoAdmin = (props) => {

  let storeForm;

  const registerForm = {
    width: "100%",
    margin: "auto",
  };
  
  if(props.storeInfo){
    storeForm = (
      <>
        <Form style={registerForm}>
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
