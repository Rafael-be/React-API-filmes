import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../services/supaBase";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const { usuario } = useAuth();
    const [idsFavoritos, setIdsFavoritos] = useState([]);
    const [carregandoFavoritos, setCarregandoFavoritos] = useState(true);

    useEffect(() => {
        let ativo = true;

        if (!usuario) {
            setIdsFavoritos([]);
            setCarregandoFavoritos(false);
            return () => {
                ativo = false;
            };
        }

        const buscarFavoritos = async () => {
            setCarregandoFavoritos(true);

            try {
                const { data, error } = await supabase
                    .from("favoritos")
                    .select("movie_id")
                    .eq("user_id", usuario.id);

                if (!ativo) return;

                if (error || !data) {
                    setIdsFavoritos([]);
                    return;
                }

                setIdsFavoritos(data.map((item) => Number(item.movie_id)));
            } catch {
                if (ativo) setIdsFavoritos([]);
            } finally {
                if (ativo) setCarregandoFavoritos(false);
            }
        };

        buscarFavoritos();

        return () => {
            ativo = false;
        };
    }, [usuario]);

    return (
        <FavoritosContext.Provider value={{ idsFavoritos, setIdsFavoritos, carregandoFavoritos }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => useContext(FavoritosContext);
