import styled from "styled-components";

interface mainContainerProps {
  rightAside?: boolean;
}

export const ContainerMainFixedAside = styled.section<mainContainerProps>`
  ${(props) =>
    props.rightAside
      ? `
          {
            height: 100%;
            padding: 3rem 1.5rem 3rem 0;
            margin-right: 24rem;
            border-left: none;
            border-right: 1px solid #aeaeae8a;   

            & + aside {
              right: calc((100vw - 1360px + 1rem) / 2);
              width: 24rem;
              padding: 3rem 0 0 1.5rem;
            }
          }

          @media (max-width: 1359.98px) {
            margin-right: 22rem;

            & + aside {
              right: 1rem;
              width: 22rem;
            }
          }

          @media (max-width: 1023.98px) {
            width: 100%;
            border-right: none;

            & + aside {
              width: 100%;
              padding: 0;
            }
          }
        `
      : `{
          flex: 1;
          padding: 3rem 0 3rem 1.5rem;
          border-left: 1px solid #aeaeae8a;
          margin-left: 16rem;
          @media(max-width: 1279px) {
            margin-left: 13rem;
          }
      }`}

  @media (max-width: 1023px) {
    padding: 1.5rem 0;
    margin-left: 0;
    border-left: none;
  }
`;
