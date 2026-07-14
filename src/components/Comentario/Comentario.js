import { Link } from "react-router-dom"
import { Container, Header, Body, Footer } from "./Style";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import PropTypes from "prop-types";

import { useAuth } from "../../contexts/AuthContext";

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

const Comentario = () => {
   
    const { usuario } = useAuth();

    const comentar = async() => {

    }
    const retirarComentario = async () => {

    }

    return (
        <Container>
            <Header>
                <p>Nome teste</p>
            </Header>

            <Body>

            </Body>

            <Footer>

            </Footer>
        </Container>
    );
};


export default Comentario;