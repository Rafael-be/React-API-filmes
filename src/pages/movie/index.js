import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CardIndividual from "../../components/Card-individual/cardIndividual"
import Comentario from "../../components/Comentario/Comentario";
import AdicionarComentario from "../../components/Comentario/AdicionarComentario";
import { useAuth } from "../../contexts/AuthContext";
import { buscarComentarioPorUsuarioEFilme } from "../../services/comentarioService";

import { Info, ContainerIndividual, Conteudo, SecaoComentarios } from "../style";

const Movie = () => {
    const { id } = useParams();
    const { usuario } = useAuth();

    const KEY = process.env.REACT_APP_KEY;
    const URL = process.env.REACT_APP_URL;

    const [comentarios, setComentarios] = useState(null);
    const [movie, setMovie] = useState(null);

    const recarregarComentarios = async () => {
        if(!usuario) return;
        const { data } = await buscarComentarioPorUsuarioEFilme(usuario.id, id);
        if (data) setComentarios(data);
    };
    
    const obterFilmePorId = async (urlParaFetch) => {
        const res = await fetch(urlParaFetch);
        const dados = await res.json();
        setMovie(dados);
        return dados;
    }

    useEffect(() => {
        const carregarFilme = async () => {
            const urlParaFetch = `${URL}${id}?api_key=${KEY}&language=pt-BR`;
            let filmeEncontrado = await obterFilmePorId(urlParaFetch);
            setMovie(filmeEncontrado);
        }
        carregarFilme();
        recarregarComentarios();
    }, [KEY, URL, id]);

    return (
        <ContainerIndividual>
            <Conteudo>
                <Info>
                    {movie && <CardIndividual key={movie.id} movie={movie} />}
                </Info>
                
                <SecaoComentarios>
                    {comentarios &&
                        <Comentario comentario={comentarios}/>
                    }
                    {!comentarios &&    
                        <AdicionarComentario 
                            movieId={Number(id)} 
                            onComentarioAdicionado= {recarregarComentarios}  
                        />
                    }
                </SecaoComentarios>
            </Conteudo>
        </ContainerIndividual>
    );
};

export default Movie;
