import { Link } from "react-router-dom"
import { Container, Header, Body, Footer } from './Style';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

import { useAuth } from "../../contexts/AuthContext";

const Comentario = ({comentario}) => {
   
    const { usuario } = useAuth();

    return (
        <Container>
            <Header>
            <span>Usuário #{comentario.user_id}</span>
            <span className="nota">★ {comentario.nota}/10</span>
            </Header>
            
            <Body>
            <p>{comentario.texto}</p>
            </Body>
            
            <Footer>
            <a href="#util">Útil</a> 
            <span>{new Date(comentario.created_at).toLocaleDateString("pt-BR")}</span>
            </Footer>
        </Container>
    );
};


export default Comentario;