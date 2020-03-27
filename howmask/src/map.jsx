import React, { useState, useEffect } from 'react';
const { kakao } = window;
const { daum } = window;


const Map = () => {

    useEffect(()=>{
        let el = document.getElementById('map');
        let map = new daum.maps.Map(el, {
          center: new daum.maps.LatLng(33.450701, 126.570667)
        });

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

    });

    return(
        <div className="App" id="map"></div>
    )
}

export default Map;