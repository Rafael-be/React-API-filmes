import { useEffect, useState } from "react";
import { useFavoritos } from "../../contexts/FavoritosContext";

import { MovieList, Container } from "../style"
import ContainerFilmes from "../../components/Container-filmes/Container-filmes";

const Favoritos = () => {

    const { idsFavoritos } = useFavoritos();
    const [ favoritos, setFavoritos] = useState([]);

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    useEffect(() => {
        if (idsFavoritos.length === 0) {
            setFavoritos([]);
            return;
        }

        const buscarFavoritos = async () => {
            const resultados = await Promise.all(
                idsFavoritos.map((id) =>
                    fetch(`${URL}${id}?api_key=${KEY}&language=pt-BR`)
                        .then(res => res.json())
                )
            );
            setFavoritos(resultados);
        };

        buscarFavoritos();
    }, [idsFavoritos, KEY, URL]);


    return (
        <Container>

            <h1> <span> FAVORITOS </span> </h1>     
            {favoritos.length === 0 && <h1> Nenhum favorito encontrado </h1>}
            {favoritos.length > 0 &&
                <MovieList>
                    {favoritos.map((movie) => (<ContainerFilmes key={movie.id} movie={movie}/>))}
                </MovieList>
            }       

        </Container>
    );
}

export default Favoritos;