import React from "react";
import SearchMain from './search_main';
import "./css/main.css";
import { NavLink } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const Home = () => {


    const week = ['평일 미구입자', '1, 6', '2, 7', '3, 8', '4, 9', '5, 0', '평일 미구입자'];
    const dayOfWeek = week[new Date().getDay()];

    return(
        <div>
        <Container>
            {/* <div id="buyMask"> */}
            <div className="dayOfWeek">
                <div className="mainTitle">마스크 어때?</div>
                <div className="mainContent">오늘의 공적 마스크</div>
                <div className="mainContent">구입 생년 끝자리</div>
                <div className="mainContent red">{dayOfWeek}</div>
            </div>
            {/* {<div id="mainSearch">} */}
            <div>
                <SearchMain />
            </div>
            {/* <div id="searchLocation"> */}
            <div>
            <NavLink to="/map_p">
                <Button variant="primary" block>현재 위치로 검색</Button>
            </NavLink>
            </div>
        </Container>    
        </div>
    )
}

export default Home;