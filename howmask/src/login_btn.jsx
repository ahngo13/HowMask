import React from "react";
import { NavLink } from "react-router-dom";

const navLinkStyle = {
  margin: 5
};

const LoginBtn = () => {
  return (
    <NavLink style={navLinkStyle} to="/login">
      login
    </NavLink>
  );
};

export default LoginBtn;
