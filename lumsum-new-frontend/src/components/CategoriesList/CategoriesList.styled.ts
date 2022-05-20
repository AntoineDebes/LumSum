import styled from "styled-components";

export const CategoryCardWrap = styled.div`
  background: #f5f5f5;
  width: 15rem;
  min-width: 5rem;
  @media (max-width: 768px) {
    width: 7rem;
  }
`;
export const CategoryCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em 1em;
`;
export const CategoryCardImageWrap = styled.div`
  position: relative;
  width: 7rem;
  height: 7rem;

  img {
    object-fit: contain;
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;
export const CategoryCardTitle = styled.h5`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-top: 1em;
`;
