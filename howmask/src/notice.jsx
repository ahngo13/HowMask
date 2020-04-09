import React from "react";
import {Modal} from "react-bootstrap";


const Notice = (props) => {

    
    const week = ['평일 미구입자', '1, 6', '2, 7', '3, 8', '4, 9', '5, 0', '평일 미구입자'];
    const dayOfWeek = week[new Date().getDay()];
    
  
    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter" className="modalStyles">
                    <div className="mainTitle">마스크 어때?</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mainContent">오늘의 공적 마스크</div>
                <div className="mainContent">구입 생년 끝자리</div>
                <div className="mainContent red">{dayOfWeek}</div><br/>
                <div className="mainContentLeft">주말구매</div>
                <div className="mainContentLeft">주말은 평일에 구매하지 못한 경우에만 구입가능</div><br/>
                <div className="mainContentLeft">대리구매</div>
                <div className="mainContentLeft">10세 이하 및 80세 이상 고령자를 부양하는 경우 또는 동거인 대리구매 가능</div><br/>
                <div className="mainContentLeft">필요서류</div>
                <div className="mainContentLeft">신분증 or 주민등록등본 or 장애인복지카드</div><br/>
                <div className="mainContentLeft">서비스되는 재고 현황 정보는 데이터 처리 및 전송으로 인해 실제 현장 판매처의 현황과 5분~10분 정도의 차이가 있습니다.</div><br/>
                <div className="mainContentLeft">저희 "마스크 어때?" 팀은 공적 마스크 서비스 시 어려운 환경에서도 일선에서 공헌해 주시는 약사님, 우체국 종사자분, 하나로마트 분들께 감사와 응원을 드립니다.</div><br/>
                <div className="mainContent"><a href="http://blog.naver.com/kfdazzang/221839489769" target="_blank" rel="noopener noreferrer">식약처 공적마스크 구매안내 링크</a></div>

            </Modal.Body>
        </Modal>
        
    )
}

export default Notice;