import { Info } from "./Style";
import "./cardIndividual.css";

//toLocaleString faz a localização de algo. Por exemplo no EUA: 123,13 e no BR: 123.13
const formatCurrency = (numero) =>{
    const formatado = numero.toLocaleString("pt", {
      style: "currency",
      currency: "BRL",
    });
    numero *= 5;
    return formatado;
}

const imagePath = process.env.REACT_APP_IMAGE_URL;

const cardIndividual = ({movie}) => {
    return(
        <Info>
          <div className="imagem">
            <img
              src={`${imagePath}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
          <h3 id="titulo">{movie.title}</h3>
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
             Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </Info>
    );
}

export default cardIndividual;