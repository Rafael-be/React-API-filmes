import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { buscarComentarioPorUsuario, buscarComentariosPorUsuarioId } from "../../services/comentarioService";
import { buscarPerfilPorSlug, buscarMeuPerfil, atualizarVisibilidade } from "../../services/perfilService";
import Spinner from "../../components/Spinner";

import "./comentarios.css";

const Comentarios = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { usuario, carregando } = useAuth();
    const [comentarios, setComentarios] = useState([]);
    const [perfil, setPerfil] = useState(null);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [erro, setErro] = useState("");

    const URL = process.env.REACT_APP_URL;
    const KEY = process.env.REACT_APP_KEY;
    const imagePath = process.env.REACT_APP_IMAGE_URL;

    const ehDono = Boolean(usuario && perfil && usuario.id === perfil.id);

    const enriquecerComentarios = useCallback(async (lista) => {
        if (!lista?.length) return [];

        const comDetalhes = await Promise.all(
            lista.map(async (comentario) => {
                if (comentario.title && comentario.poster_path) {
                    return comentario;
                }

                try {
                    const res = await fetch(`${URL}${comentario.movie_id}?api_key=${KEY}&language=pt-BR`);
                    const filme = await res.json();
                    return { ...comentario, poster_path: filme.poster_path, title: filme.title };
                } catch {
                    return comentario;
                }
            })
        );

        return comDetalhes;
    }, [KEY, URL]);

    useEffect(() => {
        const carregar = async () => {
            setCarregandoDados(true);
            setErro("");

            try {
                if (slug) {
                    const { data: perfilEncontrado, error } = await buscarPerfilPorSlug(slug);

                    if (error || !perfilEncontrado) {
                        setErro("Este perfil não existe ou não está disponível.");
                        setPerfil(null);
                        setComentarios([]);
                        setCarregandoDados(false);
                        return;
                    }

                    setPerfil(perfilEncontrado);

                    const ehDonoVisitante = Boolean(usuario && usuario.id === perfilEncontrado.id);
                    if (!perfilEncontrado.lista_publica && !ehDonoVisitante) {
                        setComentarios([]);
                        setCarregandoDados(false);
                        return;
                    }

                    const { data } = await buscarComentariosPorUsuarioId(perfilEncontrado.id);
                    const comDetalhes = await enriquecerComentarios(data || []);
                    setComentarios(comDetalhes);
                    setCarregandoDados(false);
                    return;
                }

                if (!usuario) {
                    navigate("/login", { replace: true });
                    setCarregandoDados(false);
                    return;
                }

                const { data: meuPerfil } = await buscarMeuPerfil(usuario.id);
                setPerfil(meuPerfil);

                const { data } = await buscarComentarioPorUsuario(usuario.id);
                const comDetalhes = await enriquecerComentarios(data || []);
                setComentarios(comDetalhes);
                setCarregandoDados(false);
            } catch (err) {
                // captura qualquer erro inesperado para evitar que a UI quebre
                // e mostra uma mensagem amigável ao usuário
                // eslint-disable-next-line no-console
                console.error("Erro ao carregar comentários:", err);
                setErro("Ocorreu um erro ao carregar os comentários. Tente novamente mais tarde.");
                setPerfil(null);
                setComentarios([]);
                setCarregandoDados(false);
            }
        };

        if (!carregando) {
            carregar();
        }
    }, [carregando, enriquecerComentarios, navigate, slug, usuario]);

    const handleToggle = async () => {
        if (!usuario || !perfil) return;

        const novoValor = !perfil.lista_publica;
        setPerfil({ ...perfil, lista_publica: novoValor });
        await atualizarVisibilidade(usuario.id, novoValor);
    };

    if (carregando) {
        return <div className="meus-comentarios carregando"><Spinner /></div>;
    }

    const titulo = ehDono ? "Meus Comentários" : (perfil?.nome ? `Comentários de ${perfil.nome}` : "Comentários");

    return (
        <div className="meus-comentarios">
            <div className="meus-comentarios-header">
                <div>
                    <h1>{titulo}</h1>
                    {ehDono && (
                        <div className="toggle-info" role="note">
                            <span>Esse botão controla se sua lista de comentários fica pública ou privada para outras pessoas.</span>
                        </div>
                    )}
                </div>

                {ehDono && (
                    <label className="toggle-wrapper" htmlFor="visibilidade-lista">
                        <span className="toggle-label">{perfil?.lista_publica ? "Público" : "Privado"}</span>
                        <span className="toggle">
                            <input
                                id="visibilidade-lista"
                                type="checkbox"
                                checked={Boolean(perfil?.lista_publica)}
                                onChange={handleToggle}
                            />
                            <span className="slider"></span>
                        </span>
                    </label>
                )}
            </div>

            {erro && <p className="mensagem-estado">{erro}</p>}

            {!erro && carregandoDados && <Spinner />}

            {!erro && !comentarios.length && !carregandoDados && (
                <p className="mensagem-estado">
                    {slug
                        ? "Esta lista de comentários está privada ou ainda não possui comentários."
                        : "Você ainda não possui comentários."}
                </p>
            )}

            {!carregandoDados && (
                <div className="lista-comentarios">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id} className="card-comentario">
                            <img
                                src={`${imagePath}${comentario.poster_path}`}
                                alt={comentario.title || comentario.movie_id}
                            />
                            <div className="card-comentario-conteudo">
                                <div className="card-comentario-topo">
                                    <h3>{comentario.title || comentario.movie_id}</h3>
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
            )}
        </div>
    );
};

export default Comentarios;
