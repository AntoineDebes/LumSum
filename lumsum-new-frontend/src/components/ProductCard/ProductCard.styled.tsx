import styled from "styled-components";

export const BlockInfo = styled.div`
  flex-basis: 50%;
  padding: 0.875rem 1.25rem;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
  }
`;

export const BlockInfoLabel = styled.h3`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textDark};
  text-align: left;
`;

export const BlockImageWrap = styled.div`
  position: relative;
  padding: 45%;
  max-width: 90%;
  margin-bottom: 0.5rem;
`;

export const BlockInfoWrap = styled.div`
  @media (max-width: 1080px) {
    flex: 1;
  }
`;

export const BockInfoTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BlockInfoTitle = styled(BlockInfoLabel)``;

export const ProductCard = styled.div`
  background: #ffffff;
  max-width: 30rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: flex;
  cursor: pointer;

  @media (max-width: 1080px) {
    flex-direction: column-reverse;

    ${BlockInfo} {
      display: flex;
      flex-wrap: wrap;
      padding: 1rem;

      & + ${BlockInfo} {
        padding-bottom: 0;
      }
    }

    ${BlockInfoLabel} {
      width: 100%;
    }

    ${BlockImageWrap} {
      width: 5rem;
      height: 5rem;
      padding: 0;
      margin: 0 1.25rem 0 0;
    }
  }
`;
