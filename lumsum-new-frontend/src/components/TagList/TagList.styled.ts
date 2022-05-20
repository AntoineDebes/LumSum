import Link from "next/link";
import styled from "styled-components";

interface TagListProps {
  colorTheme?: string;
}

export const TagList = styled.ul<TagListProps>`
  font-size: 0.875rem;
  margin: 1em 0 0;

  &:not(.swiper-wrapper) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em 0.75em;
  }
`;

export const Container = styled.div`
  margin-top: 1em;
`;

export const TagListLi = styled.li`
  width: auto;
  padding-bottom: 0.375em;
`;

export const TagListLink = styled(Link)``;

export const TagListTag = styled.a<TagListProps>`
  color: ${({ theme }) => theme.colors.primaryDark};
  padding: 0.3em 1em;
  margin-bottom: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  border-radius: 1rem;
  box-shadow: 0 3px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: inline-block;
  ${(props) =>
    props.colorTheme == "highlight" &&
    `
      {
        color: #ffa17a;
        border-color: #ffa17a;
      }
    `}
`;
