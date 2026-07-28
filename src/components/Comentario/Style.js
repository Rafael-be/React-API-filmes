import styled, { css } from "styled-components";

// ==========================================
// ESTILOS BASE REUTILIZÁVEIS (MIXINS / BASE)
// ==========================================

// Estilo base para os cards escuros (Usado no Comentário e no Formulário)
const BaseCard = styled.div`
  background-color: #1e1e1e;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
`;

// Estilo base para inputs/selects (fundo escuro e borda que ilumina no foco)
const inputBaseStyles = css`
  background: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  color: #ffffff;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #f3fd6b;
  }
`;

// ==========================================
// COMPONENTES DO COMENTÁRIO
// ==========================================

export const Container = styled(BaseCard)`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #f3fd6b;
  }
`;

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

    &.nota {
      background: #f3fd6b;
      color: #121212;
      padding: 0.2rem 0.6rem;
      border-radius: 20px;
      font-size: 0.85rem;
    }
  }
`;

export const Body = styled.div`
  width: 100%;

  p {
    color: #b3b3b3;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
  }
`;

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
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

// ==========================================
// COMPONENTES DO FORMULÁRIO DE COMENTÁRIO
// ==========================================

export const ContainerForm = styled(BaseCard)`
  padding: 1.5rem;

  h3 {
    color: #ffffff;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #2a2a2a;
    padding-bottom: 0.5rem;
  }

  .erro {
    color: #ff5555;
    font-size: 0.85rem;
    margin-bottom: 1rem;
    background: rgba(255, 85, 85, 0.1);
    padding: 0.6rem;
    border-radius: 4px;
    border: 1px solid rgba(255, 85, 85, 0.3);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const TextArea = styled.textarea`
  ${inputBaseStyles}
  width: 100%;
  min-height: 110px;
  padding: 0.8rem;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    color: #666666;
  }
`;

export const AcoesForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SelectLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: #e0e0e0;
  font-size: 0.95rem;
  font-weight: bold;

  select {
    ${inputBaseStyles}
    color: #f3fd6b;
    padding: 0.5rem 0.8rem;
    font-size: 0.95rem;
    font-weight: bold;
    cursor: pointer;

    option {
      background: #121212;
      color: #ffffff;
    }
  }
`;

export const BotaoEnviar = styled.button`
  background: #f3fd6b;
  color: #121212;
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.4rem;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover:not(:disabled) {
    background: #e2ee55;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;