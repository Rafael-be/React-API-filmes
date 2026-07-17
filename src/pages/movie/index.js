import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardIndividual from "../../components/Card-individual/cardIndividual"
import Comentario from "../../components/Comentario/Comentario";
import AdicionarComentario from "../../components/Comentario/AdicionarComentario";
import { buscarComentarios } from "../../services/comentarioService";

import { Info, ContainerIndividual, Conteudo, SecaoComentarios } from "../style";

const Movie = () => {
    const { id } = useParams();

    const KEY = process.env.REACT_APP_KEY;
    const URL = process.env.REACT_APP_URL;

    const [comentarios, setComentarios] = useState([
        { id: 1, user_id: "teste", nota: 10, texto: "Teste", created_at: new Date() }
    ]);
    const [movie, setMovie] = useState(null);

    const recarregarComentarios = async () => {
        const { data } = await buscarComentarios(id);
        if (data) setComentarios(data);
    };
    
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
                    {movie && <CardIndividual key={movie.id} movie={movie} />}
                </Info>
                
                <SecaoComentarios>
                    <h2>Avaliações dos Usuários</h2>
                    {comentarios.map((comentario) => (
                        <Comentario key={comentario.id} comentario={comentario} />
                    ))}
                </SecaoComentarios>
            </Conteudo>
        </ContainerIndividual>
    );
};

export default Movie;
