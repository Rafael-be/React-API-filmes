import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { buscarComentarioPorUsuario } from "../../services/comentarioService"

import "./comentarios.css"

const Comentarios = () => {
    const { usuario } = useAuth();
    const [comentarios, setComentarios] = useState([]);
    const [publica, setPublica] = useState(false);

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;
    const imagePath = process.env.REACT_APP_IMAGE_URL;

    useEffect(() => {
        if (!usuario) return;

        const carregar = async () => {
            const { data } = await buscarComentarioPorUsuario(usuario.id);
            if (!data) return;

            const comDetalhes = await Promise.all(
                data.map(async (comentario) => {
                    const res = await fetch(`${URL}${comentario.movie_id}?api_key=${KEY}&language=pt-BR`);
                    const filme = await res.json();
                    return { ...comentario, poster_path: filme.poster_path, title: filme.title };
                })
            );
            setComentarios(comDetalhes);
        };

        carregar();
    }, [usuario]);

    return(
        <div className="meus-comentarios">
            <div className="meus-comentarios-header">
                <h1>Meus Comentários</h1>
                <button className="btn-toggle" onClick={() => setPublica(!publica)}>
                    {publica ? "🔓 Pública" : "🔒 Privada"}
                </button>
            </div>

            <div className="lista-comentarios">
                {comentarios.map((comentario) => (
                    <div key={comentario.id} className="card-comentario">
                        <img
                            src={`${imagePath}${comentario.poster_path}`}
                            alt={comentario.movie_id}
                        />
                        <div className="card-comentario-conteudo">
                            <div className="card-comentario-topo">
                                <h3>{comentario.movie_id}</h3>
                                <span className="card-comentario-nota">
                                    {comentario.nota}/10
                                </span>
                            </div>
                            <p className="card-comentario-texto">{comentario.texto}</p>
                        </div>
                        <span className="card-comentario-data">
                            {new Date(comentario.created_at).toLocaleDateString("pt-BR")}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comentarios;