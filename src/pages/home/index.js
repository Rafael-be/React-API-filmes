import { useEffect, useState } from "react";
import { Container, MovieList } from "../style";
import ContainerFilmes from '../../components/Container-filmes/Container-filmes'
import Spinner from "../../components/Spinner";

function Home() {
    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    const [movies, setMovies] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const obterFilmesPopulares = async (urlParaFetch) => {
        setCarregando(true);
        const res = await fetch(urlParaFetch);
        const dados = await res.json();
        setMovies(dados.results || []);
        setCarregando(false);
    }

    useEffect(() => {
        const urlParaFetch = `${URL}popular?api_key=${KEY}&language=pt-BR`;
        obterFilmesPopulares(urlParaFetch);
    }, [KEY, URL]);

    
    return (
        <Container>
            <h1> FILMES </h1>
            {carregando ? (
                <Spinner />
            ) : (
                <MovieList>
                    {movies.map((movie) => (<ContainerFilmes key={movie.id} movie={movie} />))}
                </MovieList>
            )}
        </Container>
    );
}

export default Home;
