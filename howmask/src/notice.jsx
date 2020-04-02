import React, { useState, useEffect } from "react";
import {Modal} from "react-bootstrap";


const Notice = (props) => {

    
    const week = ['평일 미구입자', '1, 6', '2, 7', '3, 8', '4, 9', '5, 0', '평일 미구입자'];
    const dayOfWeek = week[new Date().getDay()];
    
  
    return (
        <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter" className="modalStyles">
                    <div className="mainTitle">마스크 어때?</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mainContent">오늘의 공적 마스크</div>
                <div className="mainContent">구입 생년 끝자리</div>
                <div className="mainContent red">{dayOfWeek}</div>
            </Modal.Body>
        </Modal>
        
    )
}

export default Notice;