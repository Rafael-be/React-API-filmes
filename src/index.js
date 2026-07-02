import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import MovieById from "./pages/movie"
import Home from "./pages/home"
import Categorias from "./pages/categorias"
import Pesquisa from "./pages/pesquisa"
// import Login from "./pages/login"
// import Cadastro from "./pages/cadastro"
// import Favoritos from "./pages/favoritos"

import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/privateRoutes";

import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Está fora do app porque tem layout próprio */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} /> */}

          <Route path="/" element={<App />} >

            <Route path="/" element={<Home/>} />
            <Route path="movie/:id" element={<MovieById />} />
            <Route path="/search" element={<Pesquisa/>} />
            <Route path="/categoria" element={<Categorias />} />
            
            {/* <Route path="/favoritos" element={
              <PrivateRoute>
                <Favoritos />
              </PrivateRoute>
            }
            /> */}

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
