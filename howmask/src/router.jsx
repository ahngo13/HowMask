import React from "react";
import { Route } from "react-router-dom";
import Home from "./home";
import MapP from "./map_p";
import Store from "./store";
import Login from "./login";
import Register from "./register";
import Modify from "./modify";
import CheckPw from "./check_pw";
import Birth from "./birth";
import Locaiton from "./location";
import Map from "./map";
import Marker from "./marker";
import Search from "./search";
import StoreInfoUpdate from "./store_info_update";
import StoreInfo from "./store_info";
import RegisterSeller from "./register_seller";
import Suggest from "./suggest";
import Admin from "./admin";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={Home}></Route>
      <Route path="/map_p" component={MapP}></Route>
      <Route path="/store" component={Store}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route path="/modify" component={Modify}></Route>
      <Route path="/checkPw" component={CheckPw}></Route>
      <Route path="/birth" component={Birth}></Route>
      <Route path="/location" component={Locaiton}></Route>
      <Route path="/map" component={Map}></Route>
      <Route path="/marker" component={Marker}></Route>
      <Route path="/search" component={Search}></Route>
      <Route path="/storeInfoUpdate" component={StoreInfoUpdate}></Route>
      <Route path="/storeInfo" component={StoreInfo}></Route>
      <Route path="/register/seller" component={RegisterSeller}></Route>
      <Route path="/suggest" component={Suggest}></Route>
      <Route path="/admin" component={Admin}></Route>
    </>
  );
};

export default Router;
