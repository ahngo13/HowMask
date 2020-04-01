import React, {useState, useEffect, useRef} from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, FormControl, Col } from "react-bootstrap";

const Search = (props) => {


    const [siGu, setSiGu] = useState();
    const [word, setWord] = useState();
    const si = useRef();
    
    function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        
        const name = data.getAll('name');
        const space = (name[2] === "") ? "" : " ";
        const searchWord = cityName[name[0]] + " " + name[1] + space + name[2];

        console.log(searchWord);

        if(props.page !== "main"){
            props.clickSearch(searchWord);
        }else{
            setWord(searchWord);
        }
    }

    useEffect(() => {
        getSiGuList();
      }, []);

    const getSiGuList=()=>{
        const siGuName = [];
        //서울특별시
        siGuName.push(['강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구']);
        //부산광역시
        siGuName.push(['강서구','금정구','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구','기장군']);
        //대구광역시
        siGuName.push(['남구','달서구','동구','북구','서구','수성구','중구','달성군']);
        //인천광역시
        siGuName.push(['계양구','남구','남동구','동구','부평구','서구','연수구','중구','강화군','옹진군']);
        //광주광역시
        siGuName.push(['광산구','남구','동구','북구','서구']);
        //대전광역시
        siGuName.push(['대덕구','동구','서구','유성구','중구']);
        //울산광역시
        siGuName.push(['남구','동구','북구','중구','울주군']);
        //세종특별자치시
        siGuName.push(['전체']);
        //경기도
        siGuName.push(['고양시 덕양구','고양시 일산구','과천시','광명시','광주시','구리시','군포시','김포시','남양주시','동두천시','부천시 소사구','부천시 오정구','부천시 원미구','성남시 분당구','성남시 수정구','성남시 중원구','수원시 권선구','수원시 장안구','수원시 팔달구','시흥시','안산시 단원구','안산시 상록구','안성시','안양시 동안구','안양시 만안구','오산시','용인시','의왕시','의정부시','이천시','파주시','평택시','하남시','화성시','가평군','양주군','양평군','여주군','연천군','포천군']);
        //강원도
        siGuName.push(['강릉시','동해시','삼척시','속초시','원주시','춘천시','태백시','고성군','양구군','양양군','영월군','인제군','정선군','철원군','평창군','홍천군','화천군','횡성군']);
        //충청북도
        siGuName.push(['제천시','청주시 상당구','청주시 흥덕구','충주시','괴산군','단양군','보은군','영동군','옥천군','음성군','진천군','청원군']);
        //충청남도
        siGuName.push(['공주시','논산시','보령시','서산시','아산시','천안시','금산군','당진군','부여군','서천군','연기군','예산군','청양군','태안군','홍성군']);
        //전라북도
        siGuName.push(['군산시','김제시','남원시','익산시','전주시 덕진구','전주시 완산구','정읍시','고창군','무주군','부안군','순창군','완주군','임실군','장수군','진안군']);
        //전라남도
        siGuName.push(['광양시','나주시','목포시','순천시','여수시','강진군','고흥군','곡성군','구례군','담양군','무안군','보성군','신안군','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군']);
        //경상북도
        siGuName.push(['경산시','경주시','구미시','김천시','문경시','상주시','안동시','영주시','영천시','포항시 남구','포항시 북구','고령군','군위군','봉화군','성주군','영덕군','영양군','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군']);
        //경상남도
        siGuName.push(['거제시','김해시','마산시','밀양시','사천시','양산시','진주시','진해시','창원시','통영시','거창군','고성군','남해군','산청군','의령군','창녕군','하동군','함안군','함양군','합천군']);
        //제주도
        siGuName.push(['서귀포시','제주시','남제주군','북제주군']);

        const siGuList = siGuName[si.current.value].map(siGu => {
            return (
                <option key={siGu} value={siGu}>{siGu}</option>
            );
        });
        
        setSiGu(siGuList);
    }

    const cityName = [];

    cityName.push('서울특별시');
    cityName.push('부산광역시');
    cityName.push('대구광역시');
    cityName.push('인천광역시');
    cityName.push('광주광역시');
    cityName.push('대전광역시');
    cityName.push('울산광역시');
    cityName.push('세종특별자치시');
    cityName.push('경기도');
    cityName.push('강원도');
    cityName.push('충청북도');
    cityName.push('충청남도');
    cityName.push('전라북도');
    cityName.push('전라남도');
    cityName.push('경상북도');
    cityName.push('경상남도');
    cityName.push('제주특별자치도');

    const siDoList = cityName.map((item, index) => {
        return (
            <option key={index} value={index}>{item}</option>
        );
    });

    let searchForm;
    if(props.page === "main"){
        searchForm = 
            <Form onSubmit={handleSubmit}>
                {/* <div id="mainSearch"> */}
                <Form.Group controlId="siDoData">
                    <Form.Control as="select" ref={si} onChange={getSiGuList} name="siDoName"  >
                        {siDoList}
                    </Form.Control>
                </Form.Group>
                <Form.Control as="select" name="siGuName">
                    {siGu}
                </Form.Control>
                <FormControl placeholder="읍면동을 입력해주세요."  name="areaName" />
                <Form.Text className="text-muted searchNotice">
                    <div>읍면동을 정확히 입력해주세요.</div>
                    <div>리까지 입력하시는 경우 띄어쓰기를 해주세요.</div>
                    <div>올바른 예) 역삼동 or 시종면 구산리</div>
                    <div>틀린 예) 관악 or 부산 or 여의도 or 시종구산</div>
                </Form.Text>
                <NavLink to={{pathname:'/map', query:{id:word}}} > 
                    <Form.Group>
                        <Button id="searchBtn" type="submit" className="addressSearchBtn" variant="primary" block>주소로 검색</Button>
                    </Form.Group>
                </NavLink>
            </Form>
    }else{
        searchForm = 
            <Form onSubmit={handleSubmit}>
                <Form.Row>
                    {/* <div id="mainSearch"> */}
                    <Form.Group as={Col} md="1" >
                        <Form.Control as="select" ref={si} onChange={getSiGuList} name="name" value={0}>
                            {siDoList}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="1" >
                        <Form.Control as="select" name="name">
                            {siGu}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="9" > 
                        <FormControl placeholder="읍면동을 입력해주세요." name="name" />
                    </Form.Group>
                    <Form.Group as={Col} md="1">
                        <Button id="searchBtn" type="submit" className="addressSearchBtn" variant="primary" block>주소로 검색</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
    }
    
    return(
        <>
            {searchForm}
        </>
    )
}

export default Search;