import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { MovieList, Container } from "../style"
import ContainerFilmes from "../../components/Container-filmes/Container-filmes";
import Spinner from "../../components/Spinner";

const Categoria = () => {

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;

    const [searchParams] = useSearchParams("");
    const [movie, setMovie] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const categoria = searchParams.get("nome");

    let nome;
    if(categoria === "top_rated"){
        nome = "MAIS BEM AVALIADOS";
    }else if(categoria === "now_playing"){
        nome = "NOS CINEMAS";
    }else{nome = "EM CARTAZ";}

    useEffect(() => {

        const obterFilmesPorCategoria = async (urlParaFetch) => {
            setCarregando(true);
            const res = await fetch(urlParaFetch);
            const dados = await res.json();
            setMovie(dados.results || []);
            setCarregando(false);
        }

        const urlParaFetch = `${URL}${categoria}?api_key=${KEY}&language=pt-BR`

        obterFilmesPorCategoria(urlParaFetch);
    }, [categoria, KEY, URL])

    return (
        <Container>

            <h1> {`FILMES ${nome}`} </h1>

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

export default Categoria;
