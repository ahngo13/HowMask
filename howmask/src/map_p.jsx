import React, {useState} from 'react';
import Map from './map';
import Search from './search';


const MapP = () => {

    const [keyWord, setKeyWord] = useState(null);

    function search(word) {
        setKeyWord(word);
        console.log(word);
    }

    return(
        <div id="mapPage">
            <div id='searchDiv'>
                <Search search={search} />
            </div>
            <Map keyWord={keyWord} />
        </div>
        
    )
}

export default MapP;