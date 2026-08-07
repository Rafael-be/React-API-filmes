import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import './NavBar.css';
import { useAuth } from "../../contexts/AuthContext";
import { useModalAuth } from "../../contexts/ModalAuthContext";
import AvatarUsuario from "../AvatarUsuario";

const NavBar = () => {
    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();
    const { usuario, perfil } = useAuth();
    const { abrirLogin } = useModalAuth();

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
        <nav id="navbar">
            <div id="navbar-esquerda">
                <h2>
                    <Link to="/"> Biblioteca de filmes </Link>
                </h2>

                <select onChange={selecaoCategoria} defaultValue={""}>
                    <option value="" disabled>Selecionar categoria</option>
                    <option value="top_rated">Melhores avaliados</option>
                    <option value="now_playing">Últimos lançamentos</option>
                    <option value="upcoming">Próximos lançamentos</option>
                </select>

                <form onSubmit={preencherSubmit}>
                    <input
                        type="text"
                        placeholder="Digite o nome de um filme..."
                        onChange={(busca) => setPesquisa(busca.target.value)}
                        value={pesquisa}
                    />
                    <button type="submit"> Buscar </button>
                </form>
            </div>

            <div id="navbar-direita">
                <Link to="/favoritos">
                    <div id="favoritos"> <AiFillStar size={30}/> </div>
                </Link>
                {usuario ? (
                    <>
                        <Link to={comentariosLink}>
                            <FaComments size={22} color="#F3FD6B" />
                        </Link>
                        <Link to="/favoritos">
                            <AvatarUsuario nome={perfil?.nome || usuario?.email} />
                        </Link>
                    </>
                ) : (
                    <button type="button" className="botao-entrar" onClick={abrirLogin}>Entrar</button>
                )}
            </div>
        </nav>
    );
};

export default NavBar;