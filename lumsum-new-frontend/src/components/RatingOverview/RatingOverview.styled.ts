import styled from "styled-components";
import Image from "next/image";

interface ratingOverviewProps {
  marginBottom?: string;
  size?: "large" | "medium";
}

export const RatingOverview = styled.div<ratingOverviewProps>`
  font-size: 0.8125rem;
  ${(props) =>
    props.size === "large" &&
    `
      font-size: 1rem;
    `}
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom || 0};
`;

export const ratingIconWrap = styled.div<ratingOverviewProps>`
  position: relative;
  width: 1.25em;
  height: 1.25em;
  ${(props) =>
    props.size === "large" &&
    `
      width: 2em;
      height: 2em;
    `}
`;

export const ratingIcon = styled(Image)``;

export const ratingValue = styled.h5`
  font-size: 1em;
  font-weight: 400;
  margin: 0 1.1em 0 0.4em;
`;

export const ratingCount = styled.small`
  font-size: 0.7em;
`;
