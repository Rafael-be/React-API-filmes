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
        transition: all 0.3s;
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
    transition: opacity 0.3s ease;

    &:hover{
        opacity: 0.8;
        transform: translateY(-2px) scale(1.02);
        cursor: pointer;
    }
`;

export const Imagem = styled.div`
    img {
        width: 200px;
        border-radius: 1rem;
        margin: 0.7rem 1.5rem;
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
    border-radius: 15px;
    color: #212121;
    background-color: #ffffff;
    font-weight: 1000;
    font-size: 12 px;
    cursor: pointer;
    transition: all 250ms;
`;
