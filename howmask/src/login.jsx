import React from "react";
import { Navbar } from 'react-bootstrap';

const Login = () => {
    const navbarStyle = {
        margin : "0 auto"
    }
    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/" style={navbarStyle}>
            <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            마스크 어때?
            </Navbar.Brand>
        </Navbar>
    )
}

export default Login;