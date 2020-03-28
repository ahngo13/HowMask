import React from "react";
import { FormControl, Button, Form } from "react-bootstrap";

const SearchMain = () => {
    return(
        <>
        <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Control as="select">
            <option>서울특별시</option>
            <option>부산광역시</option>
            <option>대구광역시</option>
            <option>인천광역시</option>
            <option>광주광역시</option>
            <option>대전광역시</option>
            <option>울산광역시</option>
            <option>세종특별자치시</option>
            <option>경기도</option>
            <option>강원도</option>
            <option>충청북도</option>
            <option>충청남도</option>
            <option>전라북도</option>
            <option>전라남도</option>
            <option>경상북도</option>
            <option>경상남도</option>
            <option>제주특별자치도</option>
            </Form.Control>
        </Form.Group>
        <FormControl
          placeholder="읍면동을 입력해주세요."
        />
        <Form.Text className="text-muted searchNotice">
        <div>읍면동을 정확히 입력해주세요.</div>
        <div>리까지 입력하시는 경우 띄어쓰기를 해주세요.</div>
        <div>올바른 예) 역삼동 or 시종면 구산리</div>
        <div>틀린 예) 관악 or 부산 or 여의도 or 시종구산</div>
        </Form.Text>
        <Button className="addressSearchBtn" variant="primary" block>주소로 검색</Button>
      </>
    )
}

export default SearchMain;