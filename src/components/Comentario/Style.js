import styled, { css } from "styled-components";

const BaseCard = styled.div`
  background-color: var(--color-surface-solid);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  width: 100%;
  box-sizing: border-box;
  box-shadow: var(--shadow-sm);
`;

const inputBaseStyles = css`
  background: var(--color-bg-page);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  outline: none;
  transition: border-color var(--transition-fast);

  &:focus {
    border-color: var(--color-accent);
  }
`;

export const Container = styled(BaseCard)`
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  transition: transform var(--transition-fast), border-color var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  width: 100%;

  span {
    font-weight: bold;
    font-size: 1rem;
    color: var(--color-text-soft);

    &.nota {
      background: var(--color-accent);
      color: var(--color-bg-page);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-pill);
      font-size: 0.85rem;
    }
  }
`;

export const Body = styled.div`
  width: 100%;

  p {
    color: var(--color-text-secondary);
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
    color: var(--color-text-subtle);
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    font-size: 0.85rem;
    transition: transform var(--transition-fast);

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export const ContainerForm = styled(BaseCard)`
  padding: 1.5rem;

  h3 {
    color: var(--color-text-primary);
    font-size: 1.2rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 0.5rem;
  }

  .erro {
    color: var(--color-error);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    background: var(--color-error-bg);
    padding: 0.6rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--color-error-border);
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
    color: var(--color-text-subtle);
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
  color: var(--color-text-soft);
  font-size: 0.95rem;
  font-weight: bold;

  input,
  select {
    ${inputBaseStyles}
    color: var(--color-accent);
    padding: 0.5rem 0.8rem;
    font-size: 0.95rem;
    font-weight: bold;
    width: 120px;
  }

  select {
    cursor: pointer;

    option {
      background: var(--color-bg-page);
      color: var(--color-text-primary);
    }
  }
`;

export const BotaoEnviar = styled.button`
  background: var(--color-accent);
  color: var(--color-bg-page);
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.6rem 1.4rem;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform var(--transition-fast), background-color var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-accent-gold);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
