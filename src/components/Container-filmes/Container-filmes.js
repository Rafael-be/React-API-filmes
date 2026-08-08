import { Link } from "react-router-dom"
import { Movie, Btn, EstrelaFlutuante, Imagem } from "./Style";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { adicionarFavorito, removerFavorito } from "../../services/favoritosService";

import PropTypes from "prop-types";

import { useAuth } from "../../contexts/AuthContext";
import { useFavoritos } from "../../contexts/FavoritosContext";

const imagePath = process.env.REACT_APP_IMAGE_URL;
const corEstrela = "var(--color-accent-gold)";

const notaParaEstrela = (  { media } ) => {
    let nota = media / 2;
    const array = [1, 2, 3, 4, 5];

    return(
        <span className="estrelas">
             {array.map((numero) => {
                if (numero <= Math.floor(nota))
                    return <FaStar key={numero} color={corEstrela} />;
                if (numero - nota < 1)
                    return <FaStarHalfAlt key={numero} color={corEstrela}/>;

                return <FaRegStar key={numero} color={corEstrela}/>;
            })}
        </span>
    );
};

const ContainerFilmes = ({movie}) => {
   
    const { usuario } = useAuth();
    const { idsFavoritos, setIdsFavoritos } = useFavoritos();

    const favoritar = async ( { id } ) => {
        if(!usuario) return;
        await adicionarFavorito(usuario.id, id);
        setIdsFavoritos([...idsFavoritos, Number(id)])
    }
    const desFavoritar = async ( { id } ) => {
        if(!usuario) return;
        await removerFavorito(usuario.id, id);
        setIdsFavoritos(idsFavoritos.filter(idFavorito => idFavorito !== id));
    }

    return (
        <Movie>
            <Imagem>
                <img
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.title}
                />
                <EstrelaFlutuante className={`${movie.title}`} >
                    {!idsFavoritos.includes(movie.id) && <FaRegStar onClick={ () => favoritar({ id: movie.id }) } />}
                    {idsFavoritos.includes(movie.id) && <FaStar color={corEstrela} onClick={ () => desFavoritar({ id: movie.id }) } />}
                </EstrelaFlutuante>
            </Imagem>
            {<span>{movie.title}</span>}

            { notaParaEstrela( {media: movie.vote_average} ) }

            {<Link to={`/movie/${movie.id}`}> <Btn>Detalhes</Btn> </Link>}
            
        </Movie>
    );
};

ContainerFilmes.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
  }).isRequired
};

export default ContainerFilmes;
