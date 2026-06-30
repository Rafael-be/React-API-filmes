import { useEffect, useState } from "react";
import { Container, MovieList } from "../style";
import ContainerFilmes from '../../components/Container-filmes/Container-filmes'

function Home() {
    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    const [movies, setMovies] = useState([]);

    const obterFilmesPopulares = async (urlParaFetch) => {
        const res = await fetch(urlParaFetch);
        const dados = await res.json();
        setMovies(dados.results);
    }

    useEffect(() => {
        const urlParaFetch = `${URL}popular?api_key=${KEY}&language=pt-BR`;
        obterFilmesPopulares(urlParaFetch);
    }, [KEY, URL]);

    
    return (
        <Container>
            <h1> FILMES </h1>
            <MovieList>
                {movies.map((movie) => (<ContainerFilmes key={movie.id} movie={movie} />))} 
            </MovieList>
        </Container>
    );
}

export default Home;
