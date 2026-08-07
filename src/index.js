import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import MovieById from "./pages/movie";
import Home from "./pages/home";
import Categorias from "./pages/categorias";
import Pesquisa from "./pages/pesquisa";
import Favoritos from "./pages/favoritos";
import Comentarios from "./pages/comentarios";

import { AuthProvider } from "./contexts/AuthContext";
import { FavoritosProvider } from "./contexts/FavoritosContext";
import { ModalAuthProvider } from "./contexts/ModalAuthContext";
import PrivateRoute from "./routes/privateRoutes";

import "./global.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ModalAuthProvider>
          <FavoritosProvider>
            <Routes>
              <Route path="/" element={<App />} >
                <Route path="/" element={<Home />} />
                <Route path="movie/:id" element={<MovieById />} />
                <Route path="/search" element={<Pesquisa />} />
                <Route path="/categoria" element={<Categorias />} />

                <Route path="/favoritos" element={
                  <PrivateRoute>
                    <Favoritos />
                  </PrivateRoute>
                } />

                <Route path="comentarios" element={<Comentarios />} />
                <Route path="comentarios/:slug" element={<Comentarios />} />
              </Route>
            </Routes>
          </FavoritosProvider>
        </ModalAuthProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
