import styled from "styled-components";

export const ContainerBlog = styled.div`
  line-height: 1.5;
  width: 100%;
  max-width: 68rem;
  flex: 1;
  padding: 0 0 3rem;
  margin: 0 auto;
`;

export const BlogHeader = styled.div``;

export const BlogImageWrap = styled.div`
  width: 100%;
  padding: 28.125%;
  position: relative;

  @media (max-width: 768px) {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1.875rem;
  font-weight: 700;
  margin: 1.875rem 0 1.25rem !important;
  position: relative;
  display: flex;
  align-items: center;

  @media (max-width: 767.98px) {
    font-size: 1.375rem;
  }
`;

export const Title2 = styled.h2`
  margin-top: 1.5em;
`;
