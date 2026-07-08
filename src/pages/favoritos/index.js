import { useEffect, useState } from "react";

import { MovieList, Container } from "../style"
import ContainerFilmes from "../../components/Container-filmes/Container-filmes";

const Categoria = () => {

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    const [movie, setMovie] = useState([]);



    useEffect(() => {

        const obterFilmesPorCategoria = async (urlParaFetch) => {
            const res = await fetch(urlParaFetch);
            const dados = await res.json();
            setMovie(dados.results);
        }

        const urlParaFetch = `${URL}${categoria}?api_key=${KEY}&language=pt-BR`

        obterFilmesPorCategoria(urlParaFetch);
    }, [categoria, KEY, URL])

    return (
        <Container>

            <h1> {`FILMES ${nome}`} </h1>

            <MovieList>
                {movie.map((movie) => (<ContainerFilmes key={movie.id} movie={movie} />))}
            </MovieList>

        </Container>
    );
}

export default Categoria;