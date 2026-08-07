import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ModalAuth from "./components/ModalAuth";

const App = () => {
    return (
        <div className="navBar">
            <NavBar />
            <Outlet />
            <ModalAuth />
        </div>
    );
};

export default App;
