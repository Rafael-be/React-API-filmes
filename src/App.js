import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar"

const App = () => {
    return (
        <div className="navBar">
            <NavBar/>
            <Outlet />
        </div>
    );
};

export default App;
