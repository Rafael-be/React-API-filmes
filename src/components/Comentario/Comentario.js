import { Container, Header, Body, Footer } from './Style';

const Comentario = ({comentario}) => {
    const nomeAutor = comentario?.perfil_nome
        || comentario?.perfis?.nome
        || comentario?.nome
        || comentario?.user?.nome
        || (comentario?.user_id ? `Usuário ${comentario.user_id.slice(0, 8)}` : "Usuário");

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
                <span>{new Date(comentario.created_at).toLocaleDateString("pt-BR")}</span>
            </Footer>
        </Container>
    );
};

export default Comentario;