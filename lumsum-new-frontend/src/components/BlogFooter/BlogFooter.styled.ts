import styled from "styled-components";

export const BlogFooter = styled.div``;

export const Title = styled.h5`
  font-size: 1rem;
`;

export const SuggestedLinks = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;

  &:not(:last-child)::after {
    content: ",";
    margin-right: 1ch;
  }
`;

export const LinkShareBlock = styled.div`
  margin-top: 1.5rem;
`;

export const LinkShareTitle = styled.h5`
  font-size: 1rem;
`;

export const LinkList = styled.div`
  display: flex;
  gap: 0.5rem;
`;
