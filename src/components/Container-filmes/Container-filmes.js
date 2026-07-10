import { Link } from "react-router-dom"
import { Movie, Btn, EstrelaFlutuante, Imagem } from "./Style";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import PropTypes from "prop-types";

const imagePath = process.env.REACT_APP_IMAGE_URL;

const notaParaEstrela = (  { media } ) => {
    let nota = media / 2;
    const array = [1, 2, 3, 4, 5];

    return(
        <span className="estrelas">
             {array.map((numero) => {
                if (numero <= Math.floor(nota))
                    return <FaStar key={numero} color="#f7d354" />;
                if (numero - nota < 1)
                    return <FaStarHalfAlt key={numero} color="#f7d354"/>;

                return <FaRegStar key={numero} color="#f7d354"/>;
            })}
        </span>
    );
};

const ContainerFilmes = ({movie, logado = false}) => {
    return (
        <Movie>
            <Imagem>
                <img
                    src={`${imagePath}${movie.poster_path}`}
                    alt={movie.title}
                />
                <EstrelaFlutuante className={`${movie.title}`}> <FaRegStar/>  </EstrelaFlutuante>
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
  }).isRequired,
  mostrarLink: PropTypes.bool
};

export default ContainerFilmes;