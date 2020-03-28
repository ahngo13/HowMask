import React, { useState, useEffect } from 'react';
import {usePosition} from 'use-position';
import axios from 'axios';
const { kakao } = window;
const { daum } = window;

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

const Map = () => {

    const {latitude, longitude, error} = usePosition();

    const [positions, setPositions] = useState();

    
    console.log("latitude:" +latitude);
    console.log("longitude:" +longitude);

    async function getStoreInfo () {
        const positions = []
        const send_param={
            headers,
            lat:latitude,
            lng:longitude,
            m:5000,
        }
        const result = await axios.post('http://localhost:8080/mask/storesByGeo', send_param);
        if(result.data.storeList){
            result.data.storeList.forEach((item)=>{  
                positions.push({
                    title: item.name, 
                    latlng: new kakao.maps.LatLng(item.lat, item.lng),
                })
            })
        }

        setPositions(positions);
        
    }

    function secondPosition () {
        let positions = [
            {
                title: '카카오', 
                latlng: new kakao.maps.LatLng(37.6481337, 126.8843092)
            },
            {
                title: '생태연못', 
                latlng: new kakao.maps.LatLng(37.6500901, 126.8838239)
            },
            {
                title: '텃밭', 
                latlng: new kakao.maps.LatLng(37.6502208, 126.8837453)
            },
            {
                title: '근린공원',
                latlng: new kakao.maps.LatLng(37.6503383, 126.8841003)
            }
        ];

        
        console.log(positions);
        return positions;
    }

    useEffect(() => {       
        if(latitude && longitude){
            getStoreInfo();
            console.log(positions);
        }
    },[latitude, longitude])
    
    useEffect(() =>{

        if(latitude && longitude){
            // getStoreInfo();
        
            
            let el = document.getElementById('map');
            let map = new daum.maps.Map(el, {
            center: new daum.maps.LatLng(latitude, longitude)
            });

            // 마커가 표시될 위치입니다 
            var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
            /* const positions = [] 
            list.forEach((item)=>{  
                positions.push({
                    title: item.name, 
                    latlng: new kakao.maps.LatLng(item.lat, item.lng),
                })
            }) */

            var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            console.log(positions);
            // positions=secondPosition();
            // console.log(positions[0].latlng);

            // positions=position;
            if(positions){
                for (var i = 0; i < positions.length; i ++) {
                    // 마커 이미지의 이미지 크기 입니다
                    var imageSize = new kakao.maps.Size(24, 35); 
                    
                    // 마커 이미지를 생성합니다    
                    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: positions[i].latlng, // 마커를 표시할 위치
                        title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다 
                        image : markerImage // 마커 이미지 
                    });
                }
            }

            //현재 위치 마커를 생성합니다
            marker = new kakao.maps.Marker({
                map:map,
                position: markerPosition
            });
        }
        
    });

    return(
        <div className="App" id="map"></div>
    )
}

export default Map;