import styled from "styled-components";

// O card completo do comentário
export const Container = styled.div`
    background-color: #1e1e1e;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, border-color 0.2s ease;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    &:hover {
        transform: translateY(-2px);
        border-color: #f3fd6b;
    }
`;

// Parte superior: Nome/ID do usuário e a Nota
export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #2a2a2a;
    padding-bottom: 0.5rem;
    width: 100%;

    span {
        font-weight: bold;
        font-size: 1rem;
        color: #e0e0e0;
    }

    // Estilo especial para quando o span for a nota do filme
    span.nota {
        background: #f3fd6b;
        color: #121212;
        padding: 0.2rem 0.6rem;
        border-radius: 20px;
        font-size: 0.85rem;
    }
`;

// O texto da avaliação em si
export const Body = styled.div`
    width: 100%;
    
    p {
        color: #b3b3b3;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
        text-align: left;
    }
`;

// Parte inferior: Data e possíveis links (como "Curtir" ou "Denunciar")
export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 0.3rem;

    span {
        font-size: 0.8rem;
        color: #666;
    }

    a {
        color: #f3fd6b;
        text-decoration: none;
        font-size: 0.85rem;
        transition: all 0.3s;
    }

    a:hover {
        transform: scale(1.05);
        text-shadow: 0 0 5px rgba(243, 253, 107, 0.5);
    }
`;