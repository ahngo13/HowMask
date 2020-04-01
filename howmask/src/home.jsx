import React from "react";
import "./css/main.css";
import { NavLink } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Search from './search';

const Home = () => {


    const week = ['평일 미구입자', '1, 6', '2, 7', '3, 8', '4, 9', '5, 0', '평일 미구입자'];
    const dayOfWeek = week[new Date().getDay()];
    
  
    return(
        <>
        <Container>
            <div className="dayOfWeek">
                <div className="mainTitle">마스크 어때?</div>
                <div className="mainContent">오늘의 공적 마스크</div>
                <div className="mainContent">구입 생년 끝자리</div>
                <div className="mainContent red">{dayOfWeek}</div>
            </div>

            <div>
            <NavLink to="/map">
                <Button id="goMapBtn" variant="primary" block>마스크<br/>찾으로<br/>가기</Button>
            </NavLink>
            </div>
        </Container>    
        </>
    )
}

export default Home;