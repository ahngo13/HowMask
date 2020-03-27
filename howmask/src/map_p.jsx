import React, { useState, useEffect } from 'react';
import Map from './map';
import Search from './search';


const MapP = () => {


    return(
        <div id="mapPage">
            <div id='searchDiv'>
                <Search />
            </div>
            <Map />
        </div>
        
    )
}

export default MapP;