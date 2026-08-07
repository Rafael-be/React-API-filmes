import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MovieList, Container } from "../style"
import ContainerFilmes from "../../components/Container-filmes/Container-filmes";
import Spinner from "../../components/Spinner";

const Pesquisa = () => {

    const URLdePesquisa = process.env.REACT_APP_SEARCH_URL;
    const KEY = process.env.REACT_APP_KEY;

    const [searchParams] = useSearchParams("");
    const [movie, setMovie] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const pesquisa = searchParams.get("nome")
    
    const obterFilmesPesquisados = async (urlParaFetch) => {
        setCarregando(true);
        const res = await fetch(urlParaFetch);
        const dados = await res.json();
        setMovie(dados.results || []);
        setCarregando(false);
    }

    useEffect(() => {
        const urlParaFetch = `${URLdePesquisa}?api_key=${KEY}&query=${pesquisa}`
        obterFilmesPesquisados(urlParaFetch);
    }, [pesquisa, KEY, URLdePesquisa])

    return (
        <Container>

            <h1> RESULTADOS PARA <span>{`${pesquisa.toUpperCase()}`} </span></h1>

            {carregando ? (
                <Spinner />
            ) : (
                <MovieList>
                    {movie.map((movie) => (<ContainerFilmes key={movie.id} movie={movie} />))}
                </MovieList>
            )}

        </Container>
    );
}

export default Pesquisa;
