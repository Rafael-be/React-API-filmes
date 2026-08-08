import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaComments, FaSearch } from "react-icons/fa";
import "./NavBar.css";
import { useAuth } from "../../contexts/AuthContext";
import { useModalAuth } from "../../contexts/ModalAuthContext";
import { useModalConta } from "../../contexts/ModalContaContext";
import AvatarUsuario from "../AvatarUsuario";

const NavBar = () => {
    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();
    const { usuario, perfil } = useAuth();
    const { abrirLogin } = useModalAuth();
    const { abrirConta } = useModalConta();

    const preencherSubmit = (busca) => {
        busca.preventDefault();

        if (!pesquisa) return;

        navigate(`/search?nome=${pesquisa}`, { replace: true });
        setPesquisa("");
    };

    const selecaoCategoria = (categoria) => {
        const valor = categoria.target.value;
        if (!valor) return;
        navigate(`/categoria?nome=${valor}`, { replace: true });
    };

    const comentariosLink = usuario ? (perfil?.slug ? `/comentarios/${perfil.slug}` : "/comentarios") : "#";

    return (
        <nav className="navbar">
            <div className="navbar__grupo navbar__grupo--principal">
                <h2 className="navbar__marca">
                    <Link to="/">Biblioteca de filmes</Link>
                </h2>

                <select
                    className="navbar__categoria"
                    onChange={selecaoCategoria}
                    defaultValue=""
                    aria-label="Selecionar categoria"
                >
                    <option value="" disabled>Selecionar categoria</option>
                    <option value="top_rated">Melhores avaliados</option>
                    <option value="now_playing">Ultimos lancamentos</option>
                    <option value="upcoming">Proximos lancamentos</option>
                </select>

                <form className="navbar__busca" onSubmit={preencherSubmit} role="search">
                    <input
                        type="text"
                        placeholder="Digite o nome de um filme..."
                        aria-label="Digite o nome de um filme"
                        onChange={(busca) => setPesquisa(busca.target.value)}
                        value={pesquisa}
                    />
                    <button type="submit" aria-label="Buscar filme">
                        <FaSearch />
                        Buscar
                    </button>
                </form>
            </div>

            <div className="navbar__grupo navbar__grupo--acoes">
                {usuario ? (
                    <>
                        <Link className="navbar__icone-link" to="/favoritos" aria-label="Ver favoritos">
                            <AiFillStar size={30} />
                        </Link>
                        <Link className="navbar__icone-link" to={comentariosLink} aria-label="Ver comentarios">
                            <FaComments size={22} />
                        </Link>
                        <button type="button" className="navbar__botao-avatar" onClick={abrirConta} aria-label="Abrir conta">
                            <AvatarUsuario nome={perfil?.nome || usuario?.email} />
                        </button>
                    </>
                ) : (
                    <button type="button" className="navbar__botao-entrar" onClick={abrirLogin}>Entrar</button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
