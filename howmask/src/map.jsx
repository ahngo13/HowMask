import React, { useState, useEffect } from 'react';
import {usePosition} from 'use-position';
import axios from 'axios';
const { kakao } = window;
const { daum } = window;

axios.defaults.withCredentials = true;
const headers={withCredentials:true};

const Map = () => {

    const {latitude, longitude} = usePosition();
    const [positions, setPositions] = useState();
    const [coords, setCoords] = useState({
        lat: null,
        lng: null,
    });


    
    console.log("latitude:" +latitude);
    console.log("longitude:" +longitude);

    async function getInfoByGeo (lat, lng) {
        const info = []
        const send_param={
            headers,
            lat,
            lng,
            m:5000,
        }
        const result = await axios.post('http://localhost:8080/mask/storesByGeo', send_param);
        if(result.data.storeList){
            result.data.storeList.forEach((item)=>{  
                info.push({
                    title: item.name, 
                    latlng: new kakao.maps.LatLng(item.lat, item.lng),
                })
            })
        }

        setPositions(info);
        
    }
    async function getInfoByAddr () {
        const info = []
        const send_param={
            headers,
            address:"고양시 덕양구 신원동",
        }
        const result = await axios.post('http://localhost:8080/mask/storesByAddr', send_param);
        if(result.data.storeList){
            result.data.storeList.forEach((item)=>{  
                info.push({
                    title: item.name, 
                    latlng: new kakao.maps.LatLng(item.lat, item.lng),
                })
            })
        }

        setPositions(info);
        
    }

    useEffect(() => {       
        if(latitude && longitude){
            getInfoByGeo(latitude, longitude);
            console.log(positions);
        }
    },[latitude, longitude])

    useEffect(() => {       
        if(coords.lat && coords.lng){
            getInfoByGeo(coords.lat, coords.lng);
            console.log(positions);
        }
    },[coords])
    


    
    useEffect(() =>{

        if(latitude && longitude){
            // getStoreInfo();
            let lat, lng;
            if(coords.lat === null){
                lat = latitude
                lng = longitude
            }else{
                lat = coords.lat
                lng = coords.lng
            }
            console.log(lat);
            console.log(lng);
            let el = document.getElementById('map');
            let map = new daum.maps.Map(el, {
            center: new daum.maps.LatLng(lat, lng)
            });

            // 현재 위치에 표시될 마커의 위치입니다 
            var markerPosition  = new kakao.maps.LatLng(latitude, longitude); 
        

            var imageSrc = "http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

            console.log(positions);

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

            // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
            kakao.maps.event.addListener(map, 'dragend', function() {        
                
                // 지도 중심좌표를 얻어옵니다 
                var latlng = map.getCenter(); 

                setCoords({lat: latlng.getLat(), lng: latlng.getLng()});
                console.log(coords);
                var message = '변경된 지도 중심좌표는 ' + coords.lat + ' 이고, ';
                message += '경도는 ' + coords.lng + ' 입니다';
                
                console.log(message);
                
            });
        }
        
    },[positions]);

    return(
        <div className="App" id="map"></div>
    )
}

export default Map;