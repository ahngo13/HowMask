import React, {useState} from 'react';
import Map from './map';
import Search from './search';
import { useEffect } from 'react';


const MapP = () => {

    const [keyWord, setKeyWord] = useState(null);

    function search(word) {
        console.log(word);
        setKeyWord(word);
    }

    useEffect(()=>{
        console.log(keyWord);
    },[keyWord]);

    return(
        <div id="mapPage">
            <div id='searchDiv'>
                <Search search={search} />
            </div>
            <Map keyWord={keyWord} search={search} />
        </div>
        
    )
}

export default MapP;