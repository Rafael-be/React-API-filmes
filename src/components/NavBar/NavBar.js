import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import './NavBar.css'

const NavBar = () =>{
    const [pesquisa, setPesquisa] = useState("");
    const navigate = useNavigate();


    const preencherSubmit = (busca) => {
        busca.preventDefault(); //previne o comportamente padrão da página: dar reaload ao enviar forms

        if (!pesquisa) return;

        navigate(`/search?nome=${pesquisa}`, { replace: true });
        setPesquisa("");
    };

    return (
        <nav id="navbar">
            <h2>
                <Link to="/"> Biblioteca de filmes </Link>
            </h2>

            <select>
                <option value="popularity">Popularidade</option>
                <option value="vote_average">Nota</option>
                <option value="release_date">Data de lançamento</option>
            </select>

            <form onSubmit={preencherSubmit}>
                <input type="text"
                placeholder="Digite o nome de um filme..."
                onChange={(busca) => setPesquisa(busca.target.value)}
                value={pesquisa}
            />
                <button type="submit"> Buscar </button>
            </form>
        </nav>
    );
}

export default NavBar;