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

        const buscarFilmes = async () => {
            const resultados = await Promise.all(
                idsFavoritos.map((id) =>
                    fetch(`${URL}movie/${id}?api_key=${KEY}&language=pt-BR`)
                        .then(res => res.json())
                )
            );
            setFavoritos(resultados);
        };

        buscarFilmes();
    }, [idsFavoritos, KEY, URL]);


    return (
        <Container>

        <h1> <span> FAVORITOS </span> </h1>     

        <MovieList>
            {favoritos.map((movie) => (<ContainerFilmes key={movie.id} movie={movie}/>))}
        </MovieList>       

        </Container>
    );
}

export default Favoritos;