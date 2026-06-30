import { Link } from "react-router-dom"
import { Movie, Btn } from "./Style";

import PropTypes from "prop-types";

const imagePath = process.env.REACT_APP_IMAGE_URL;

const ContainerFilmes = ({movie, grid = true}) => {
    return (
        <Movie>
            <img
                src={`${imagePath}${movie.poster_path}`}
                alt={movie.title}
            />
            {grid && <span>{movie.title}</span>}

            {grid && <Link to={`/movie/${movie.id}`}> <Btn>Detalhes</Btn> </Link>}
            {/* é um if. Basicamente se grid = true faz isso */}
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