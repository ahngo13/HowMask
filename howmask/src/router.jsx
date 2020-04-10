import React from "react";
import { Route } from "react-router-dom";
import Store from "./store";
import Login from "./login";
import Register from "./register";
import Modify from "./modify";
import CheckPw from "./check_pw";
import Birth from "./birth";
import Locaiton from "./location";
import Map from "./map";
import Marker from "./marker";
import StoreInfoUpdate from "./store_info_update";
import StoreInfo from "./store_info";
import RegisterSeller from "./register_seller";
import Suggest from "./suggest";
import Admin from "./admin";
import ErrorPage from "./errorPage";

const Router = () => {
  return (
    <>
      <Route exact path="/" component={Map}></Route>
      <Route path="/store" component={Store}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/modify" component={Modify}></Route>
      <Route path="/checkPw" component={CheckPw}></Route>
      <Route path="/birth" component={Birth}></Route>
      <Route path="/location" component={Locaiton}></Route>
      <Route path="/marker" component={Marker}></Route>
      <Route path="/storeInfoUpdate" component={StoreInfoUpdate}></Route>
      <Route path="/storeInfo" component={StoreInfo}></Route>
      <Route path="/registerSeller" component={RegisterSeller}></Route>
      <Route path="/suggest" component={Suggest}></Route>
      <Route path="/admin" component={Admin}></Route>
      <Route path="/error" component={ErrorPage}></Route>
    </>
  );
};

export default Router;
