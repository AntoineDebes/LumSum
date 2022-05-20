import styled from "styled-components";
import BlogCard from "@/components/BlogCard/BlogCard";

export const BlogList = styled.div``;

export const CardBlog = styled(BlogCard)`
  width: 428px;
  margin-bottom: 0.75rem;

  @media (max-width: 1360px) {
    width: calc((100vw - 90px) / 3);
  }

  @media (max-width: 940px) {
    width: 340px;
  }
`;
