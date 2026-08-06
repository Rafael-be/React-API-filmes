import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import CardIndividual from "../../components/Card-individual/cardIndividual";
import Comentario from "../../components/Comentario/Comentario";
import AdicionarComentario from "../../components/Comentario/AdicionarComentario";
import { useAuth } from "../../contexts/AuthContext";
import { buscarComentarioPorUsuarioEFilme } from "../../services/comentarioService";
import { obterFilmePorId, buscarKeywords, buscarDiretor, buscarElenco } from "../../services/movieService";

import { Info, ContainerIndividual, Conteudo, SecaoComentarios } from "../style";

const Movie = () => {
    const { id } = useParams();
    const { usuario } = useAuth();



    const [comentarios, setComentarios] = useState(null);
    const [movie, setMovie] = useState(null);
    const [keywords, setKeywords] = useState([]);
    const [diretor, setDiretor] = useState(null);
    const [elenco, setElenco] = useState([]);

    const recarregarComentarios = useCallback(async () => {
        if (!usuario) return;
        const { data } = await buscarComentarioPorUsuarioEFilme(usuario.id, Number(id));
        setComentarios(data);
    }, [id, usuario]);

    useEffect(() => {
        const carregarFilme = async () => {
            const [filmeRes, keywordsRes, diretorRes, elencoRes] = await Promise.all([
                obterFilmePorId(id),
                buscarKeywords(id),
                buscarDiretor(id),
                buscarElenco(id)
            ]);

            setMovie(filmeRes);
            setKeywords(keywordsRes);
            setDiretor(diretorRes);
            setElenco(elencoRes);
        };

        carregarFilme();
        recarregarComentarios();
    }, [id, recarregarComentarios]);

    return (
        <ContainerIndividual>
            <Conteudo>
                <Info>
                    {movie && (
                        <CardIndividual
                            key={movie.id}
                            movie={movie}
                            diretor={diretor}
                            keywords={keywords}
                            elenco={elenco}
                        />
                    )}
                </Info>
                
                <SecaoComentarios>
                    {comentarios &&
                        <Comentario comentario={comentarios}/>
                    }
                    {!comentarios &&    
                        <AdicionarComentario 
                            movieId={Number(id)}
                            title={movie?.title}
                            posterPath={movie?.poster_path}
                            onComentarioAdicionado={recarregarComentarios}  
                        />
                    }
                </SecaoComentarios>
            </Conteudo>
        </ContainerIndividual>
    );
};

export default Movie;
