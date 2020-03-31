import React, {useRef} from "react";
import {Button} from 'react-bootstrap';

const Search = (props) => {

    const inputWord = useRef();

    function clickSearch () {
        const word = inputWord.current.value;
        console.log(word);
        props.search(word);
    }

    return(
        <div>
            <input id='searchBar' ref={inputWord}></input> <Button onClick={clickSearch}>검색</Button>
        </div>
    )
}

export default Search;