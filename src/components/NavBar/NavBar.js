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

    const selecaoCategoria = (categoria) => {
        const valor = categoria.target.value;
        if (!valor) return;
        navigate(`/categoria?nome=${valor}`, { replace: true });
    };

    return (
        <nav id="navbar">
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
        </nav>
    );
}

export default NavBar;