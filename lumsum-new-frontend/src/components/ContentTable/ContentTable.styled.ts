import styled from "styled-components";

export const ContentTable = styled.table`
  font-size: 0.875rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker5};

  @media (max-width: 480px) {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.borderColorDarker5};
  }
`;
export const Row = styled.tr`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
  }
`;
export const ColumnHead = styled.th`
  text-align: left;
  background: ${({ theme }) => theme.colors.primaryLight1};
  min-width: 13em;
  padding: 0.4em 0.75em;
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker5};

  @media (max-width: 480px) {
    border-bottom: none;
    border-top: none;
  }
`;
export const Column = styled.td`
  min-width: 15em;
  padding: 0.4em 0.75em;
  border: 1px solid ${({ theme }) => theme.colors.borderColorDarker5};
`;
