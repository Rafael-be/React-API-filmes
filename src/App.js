import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ModalAuth from "./components/ModalAuth";
import ModalConta from "./components/ModalConta";

const App = () => {
    return (
        <div className="navBar">
            <NavBar />
            <Outlet />
            <ModalAuth />
            <ModalConta />
        </div>
    );
};

export default App;
