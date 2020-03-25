import React from "react";
import { Route } from "react-router-dom";
import Home from "./home";
import MapP from "./map_p";
import Store from "./store";
import Login from "./login";
import Register from "./register";
import Modify from "./modify";


const Router = () => {
    return(
        <>
            라우터
            <Route exact path="/" component={Home}></Route>
            <Route path="/map_p" component={MapP}></Route>
            <Route path="/store" component={Store}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/modify" component={Modify}></Route>
        </>
    )
}

export default Router;