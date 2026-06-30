import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import MovieById from "./pages/movie"
import Home from "./pages/home"
import Categorias from "./pages/categorias"
import Pesquisa from "./pages/pesquisa"

import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/" element={<Home/>} />
          <Route path="movie/:id" element={<MovieById />} />
          <Route path="/search" element={<Pesquisa/>} />
          <Route path="/categoria" element={<Categorias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
