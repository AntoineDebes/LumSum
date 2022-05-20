import styled from "styled-components";

export const MobilePreferenceBlock = styled.div`
  display: none;
  @media (max-width: 1023.98px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;
