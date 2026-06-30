import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardIndividual from "../../components/Card-individual/cardIndividual"

import { Info, ContainerIndividual, Conteudo } from "../style";

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
                <Info>
                    {movie && <CardIndividual key={movie.id} movie = {movie}/>}
                </Info>
            </Conteudo>
        </ContainerIndividual>
    );
};

export default Movie;
