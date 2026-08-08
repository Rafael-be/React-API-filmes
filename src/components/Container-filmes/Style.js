import styled from "styled-components";

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    span {
        font-weight: bold;
        font-size: 120%;
        text-align: center;
    }
    a {
        transition: transform var(--transition-fast);
    }
    a:hover {
        transform: scale(1.1);
    }
`;

export const EstrelaFlutuante = styled.div`
    position: absolute;
    top: 1.15rem;
    right: 1.89rem;
    opacity: 0;
    transition: opacity var(--transition-fast), transform var(--transition-fast);
    cursor: pointer;

    &:hover {
        opacity: 0.8;
        transform: translateY(-2px) scale(1.01);
    }

    svg {
        transition: transform var(--transition-fast);
    }

    svg:hover {
        transform: scale(1.07);
    }

    svg:active {
        animation: pulso 0.3s ease;
    }

    @keyframes pulso {
        0%   { transform: scale(1); }
        50%  { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
`;

export const Imagem = styled.div`
    img {
        width: 200px;
        border-radius: var(--radius-xl);
        margin: 0.7rem 1.5rem;
        box-shadow: var(--shadow-sm);
    }
    position: relative;

    &:hover ${EstrelaFlutuante}{
        opacity: 1;
    }
`;

export const Btn = styled.button`
    margin-top: 5px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: var(--radius-xl);
    color: var(--color-text-inverse);
    background-color: var(--color-text-primary);
    font-weight: 1000;
    font-size: 12 px;
    cursor: pointer;
    transition: transform var(--transition-fast), opacity var(--transition-fast);
`;
