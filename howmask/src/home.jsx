import React from "react";
import Search from './search';

const Home = () => {
    return(
        <div>
            <div id="buyMask">
                오늘 마스크 구입 끝자리 0, 5
            </div>
            <div id="mainSearch">
                <Search />
            </div>
            <div id="searchLocation">
                <button>Search by my location</button>
            </div>
        </div>
    )
}

export default Home;