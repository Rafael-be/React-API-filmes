import styled from "styled-components";

export const Info = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 640px;
    margin: 3rem auto;
    padding: 2.5rem 2rem;
    background: linear-gradient(180deg, var(--color-surface-start) 0%, var(--color-surface-end) 100%);
    border-radius: 1.25rem;
    border: 1px solid var(--color-border-soft);
    box-shadow: var(--shadow-panel);

    @media (max-width: 600px) {
        margin: 1.5rem 1rem;
        padding: 1.75rem 1.25rem;
        border-radius: 1rem;
    }
`;
