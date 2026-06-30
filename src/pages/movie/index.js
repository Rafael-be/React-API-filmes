import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ContainerFilmes from "../../components/Container-filmes/Container-filmes";
import CardIndividual from "../../components/Card-individual/cardIndividual"

import { MovieList, Info, ContainerIndividual, Conteudo } from "../style";

const Movie = () => {
    const { id } = useParams();

    const KEY = process.env.REACT_APP_KEY;
    const URL = process.env.REACT_APP_URL;

    const [movie, setMovie] = useState(null);
    
    const obterFilmesPopulares = async (urlParaFetch) => {
        const res = await fetch(urlParaFetch);
        const dados = await res.json();
        setMovie(dados);
        return dados;
    }

    useEffect(() => {
        const carregarFilme = async () => {
            const urlParaFetch = `${URL}${id}?api_key=${KEY}&language=pt-BR`;
            let filmeEncontrado = await obterFilmesPopulares(urlParaFetch)
            setMovie(filmeEncontrado);
        }
        carregarFilme();
    }, [KEY, URL, id]);

    return (
        <ContainerIndividual>
            <Conteudo>
                <MovieList>
                {movie && <ContainerFilmes key={movie.id} movie={movie} grid={false} />} 
                </MovieList>
                <Info>
                    {movie && <CardIndividual key={movie.id} movie = {movie}/>}
                </Info>
            </Conteudo>
        </ContainerIndividual>
    );
};

export default Movie;
