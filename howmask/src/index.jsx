import React from "react";
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./login";
import Router from "./router";


ReactDOM.render(
    <HashRouter>
        <Login/>
        <Router/>
    </HashRouter>,
    document.getElementById('container')
);
