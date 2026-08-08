import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { buscarComentariosPorUsuarioId } from "../../services/comentarioService";
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
                    if (!res.ok) return comentario;

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
        let ativo = true;

        const carregar = async () => {
            setCarregandoDados(true);
            setErro("");

            try {
                if (!slug) {
                    if (!usuario) {
                        navigate("/?auth=login", { replace: true });
                        return;
                    }

                    const { data: meuPerfil, error } = await buscarMeuPerfil(usuario.id);

                    if (!ativo) return;

                    if (error || !meuPerfil?.slug) {
                        setPerfil(meuPerfil || null);
                        setComentarios([]);
                        setErro("Nao foi possivel encontrar o slug do seu perfil.");
                        return;
                    }

                    navigate(`/comentarios/${meuPerfil.slug}`, { replace: true });
                    return;
                }

                const { data: perfilEncontrado, error } = await buscarPerfilPorSlug(slug);

                if (!ativo) return;

                if (error || !perfilEncontrado) {
                    setErro("Este perfil nao existe ou nao esta disponivel.");
                    setPerfil(null);
                    setComentarios([]);
                    return;
                }

                setPerfil(perfilEncontrado);

                const ehDonoVisitante = Boolean(usuario && usuario.id === perfilEncontrado.id);
                if (!perfilEncontrado.lista_publica && !ehDonoVisitante) {
                    setComentarios([]);
                    return;
                }

                const { data } = await buscarComentariosPorUsuarioId(perfilEncontrado.id);
                const comDetalhes = await enriquecerComentarios(data || []);

                if (ativo) setComentarios(comDetalhes);
            } catch (err) {
                // eslint-disable-next-line no-console
                console.error("Erro ao carregar comentarios:", err);

                if (ativo) {
                    setErro("Ocorreu um erro ao carregar os comentarios. Tente novamente mais tarde.");
                    setPerfil(null);
                    setComentarios([]);
                }
            } finally {
                if (ativo) setCarregandoDados(false);
            }
        };

        if (!carregando) {
            carregar();
        }

        return () => {
            ativo = false;
        };
    }, [carregando, enriquecerComentarios, navigate, slug, usuario]);

    const handleToggle = async () => {
        if (!usuario || !perfil) return;

        const novoValor = !perfil.lista_publica;
        setPerfil({ ...perfil, lista_publica: novoValor });

        const { error } = await atualizarVisibilidade(usuario.id, novoValor);
        if (error) {
            setPerfil({ ...perfil, lista_publica: !novoValor });
            setErro("Nao foi possivel atualizar a visibilidade agora.");
        }
    };

    if (carregando) {
        return <div className="meus-comentarios carregando"><Spinner /></div>;
    }

    const titulo = ehDono ? "Meus Comentarios" : (perfil?.nome ? `Comentarios de ${perfil.nome}` : "Comentarios");

    return (
        <div className="meus-comentarios">
            <div className="meus-comentarios-header">
                <div>
                    <h1>{titulo}</h1>
                    {ehDono && (
                        <div className="toggle-info" role="note">
                            <span>Este botao controla se sua lista de comentarios fica publica ou privada para outras pessoas.</span>
                        </div>
                    )}
                </div>

                {ehDono && (
                    <label className="toggle-wrapper" htmlFor="visibilidade-lista">
                        <span className="toggle-label">{perfil?.lista_publica ? "Publico" : "Privado"}</span>
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
                        ? "Esta lista de comentarios esta privada ou ainda nao possui comentarios."
                        : "Redirecionando para seus comentarios..."}
                </p>
            )}

            {!carregandoDados && (
                <div className="lista-comentarios">
                    {comentarios.map((comentario) => (
                        <div key={comentario.id} className="card-comentario">
                            {comentario.poster_path && (
                                <img
                                    src={`${imagePath}${comentario.poster_path}`}
                                    alt={comentario.title || comentario.movie_id}
                                />
                            )}
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
