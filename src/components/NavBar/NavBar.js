import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import './NavBar.css'
import { useAuth } from "../../contexts/AuthContext";
import { buscarMeuPerfil } from "../../services/perfilService";

const NavBar = () =>{
    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const [perfilSlug, setPerfilSlug] = useState(null);

    useEffect(() => {
        let mounted = true;
        if (!usuario) {
            setPerfilSlug(null);
            return;
        }

        (async () => {
            const { data } = await buscarMeuPerfil(usuario.id);
            if (mounted && data) setPerfilSlug(data.slug);
        })();

        return () => { mounted = false; };
    }, [usuario]);


    const preencherSubmit = (busca) => {
        busca.preventDefault(); //previne o comportamente padrão da página: dar reaload ao enviar forms

        if (!pesquisa) return;

        navigate(`/search?nome=${pesquisa}`, { replace: true });
        setPesquisa("");
    };

    const selecaoCategoria = (categoria) => {
        const valor = categoria.target.value;
        if (!valor) return;
        navigate(`/categoria?nome=${valor}`, { replace: true });
    };

    const comentariosLink = usuario ? (perfilSlug ? `/comentarios/${perfilSlug}` : "/comentarios") : "/login";

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
                <input type="text"
                placeholder="Digite o nome de um filme..."
                onChange={(busca) => setPesquisa(busca.target.value)}
                value={pesquisa}
                />
                <button type="submit"> Buscar </button>
            </form>
        </div>

        {/* NOVO */}
        <div id="navbar-direita">
            <Link to="/favoritos">
                <div id="favoritos"> <AiFillStar size={30}/> </div>
            </Link>
            <Link to={comentariosLink}>
                <FaComments size={22} color="#F3FD6B" />
            </Link>
            <Link to="/login">
                <div id="perfil"/>
            </Link>
        </div>
    </nav>
);
}

export default NavBar;