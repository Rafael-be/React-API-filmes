import styled from "styled-components";

// Container geral da página (caso precise usar em páginas de listagem)
export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;

  h1 {
    text-align: center;
    margin: 1rem 0;
    font-size: 2.5rem;
    
    span {
      color: #f3fd6b;
    }
  }
`;

// Wrapper principal da página (Garante fundo escuro e centralização da página toda)
export const ContainerIndividual = styled.div`
  padding: 2rem 1rem; /* Menos padding nas laterais para telas pequenas */
  width: 100%;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  display: flex;
  justify-content: center;
  font-family: sans-serif;
`;

// Centraliza tudo em uma única coluna vertical perfeita
export const Conteudo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o card do filme e os comentários horizontalmente */
  gap: 3rem;           /* Espaçamento confortável entre o filme e as avaliações */
  width: 100%;
  max-width: 1000px;    /* Largura ajustada para suportar o novo Card Individual horizontal */
`;

// Área do Card do Filme
export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

// Seção que agrupa a lista de comentários
export const SecaoComentarios = styled.div`
  width: 100%;        /* Garante que os comentários acompanhem a largura do conteúdo */
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h2 {
    font-size: 1.4rem;
    color: #fff;
    border-bottom: 2px solid #2a2a2a;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

// Card de cada comentário
export const AreaComentario = styled.div`
  background: #1e1e1e;
  padding: 1.2rem;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, border-color 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    border-color: #f3fd6b;
  }

  .header-comentario {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .usuario {
      font-weight: bold;
      color: #e0e0e0;
      font-size: 0.95rem;
    }

    .nota {
      background: #f3fd6b;
      color: #121212;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.85rem;
    }
  }

  .texto {
    font-size: 0.95rem;
    line-height: 1.5;
    color: #b3b3b3;
  }

  .data {
    font-size: 0.8rem;
    color: #666;
    text-align: right;
  }
`;

// Grid auxiliar mantido intacto
export const MovieList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  column-gap: 3rem;
  row-gap: 4rem;
`;