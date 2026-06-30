import styled from "styled-components";

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 640px;
    margin: 3rem auto;
    padding: 2.5rem 2rem;
    background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%);
    border-radius: 1.25rem;
    border: 1px solid rgba(247, 211, 84, 0.15);
    box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.8);

    @media (max-width: 600px) {
        margin: 1.5rem 1rem;
        padding: 1.75rem 1.25rem;
        border-radius: 1rem;
    }
`;