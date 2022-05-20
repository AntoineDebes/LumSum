import styled from "styled-components";

interface BlogCardProps {
  width?: string;
}

export const BlogCard = styled.div<BlogCardProps>`
  width: 100%;
  max-width: 27rem;
  height: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px #00000016;
  overflow: hidden;
`;

export const ImageWrap = styled.div`
  position: relative;
  padding: 30% 50%;

  img {
    object-fit: cover;
  }
`;

export const Title = styled.h5`
  &:last-child {
    text-align: center;
    height: 2.625em;
    margin: 0.75em 1em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
