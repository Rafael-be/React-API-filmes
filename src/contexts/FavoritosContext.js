import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../services/supaBase";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const {usuario} = useAuth();
    const [idsFavoritos, setIdsFavoritos] = useState([]);
    const [carregandoFavoritos, setCarregandoFavoritos] = useState(true);

    useEffect(() => {
        if(!usuario){
            setIdsFavoritos([]);
            setCarregandoFavoritos(false);
            return;
        }

        const buscarFavoritos = async () => {
            setCarregandoFavoritos(true);
            const { data } = await supabase
                .from("favoritos")
                .select("movie_id")
                .eq("user_id", usuario.id);

            if(data)
                setIdsFavoritos(data.map(item => Number(item.movie_id)));
            else
                setIdsFavoritos([]);
            setCarregandoFavoritos(false);
        };

        buscarFavoritos();
    }, [usuario]); // roda toda vez que o usuário mudar

    return (
        <FavoritosContext.Provider value={{ idsFavoritos, setIdsFavoritos, carregandoFavoritos }}>
            {children}
        </FavoritosContext.Provider>
    );

    }

export const useFavoritos = () => useContext(FavoritosContext);
