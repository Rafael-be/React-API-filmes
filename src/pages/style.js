import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;

    h1 {
        text-align: center;
        margin: 1rem 0;
    }

    h1 span{
        color: #f3fd6b;
    }
`;

export const ContainerIndividual = styled.div`
    padding: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 40% 1fr;
    h1 {
        text-align: center;
        margin: 1rem 0;
    }
`;

export const Conteudo = styled.div`
    grid-column: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Info = styled.div`
    display: flex;
    padding: 4px 0;
`;
