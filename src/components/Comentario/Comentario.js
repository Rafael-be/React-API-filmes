import { Container, Header, Body, Footer } from './Style';

const Comentario = ({comentario}) => {
    const nomeAutor = comentario?.perfis?.nome
        || comentario?.nome
        || `Usuário ${comentario?.user_id?.slice(0, 8) || ""}`;

    return (
        <Container>
            <Header>
                <span>{nomeAutor}</span>
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