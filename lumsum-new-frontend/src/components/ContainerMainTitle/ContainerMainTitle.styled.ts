import styled from "styled-components";

interface containerMainTitleProps {
  descriptionLike?: boolean;
}

export const ContainerMainTitle = styled.h1<containerMainTitleProps>`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 2.5rem;
  position: relative;
  display: flex;
  align-items: center;

  ${(props) =>
    props.descriptionLike &&
    `
      {
        font-size: 1rem;
        font-weight: 400;
        margin-bottom: 2rem;
      }
    `}

  @media (max-width: 767.98px) {
    margin-bottom: ${(props) =>
      props.descriptionLike ? "1.25rem" : " 1.5rem"};
  }
`;

export const SubText = styled.span`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1.3em;
`;
