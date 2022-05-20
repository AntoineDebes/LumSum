import styled from "styled-components";
import Image from "next/image";

export const ExternalLogins = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const ExternalLoginOption = styled.a`
  background-color: hsl(171 15% 69% / 60%);
  padding: 1rem 1.5rem;
  border-radius: 0.25rem;
  display: flex;
`;

export const ExternalLoginOptionIcon = styled(Image)`
  width: 1.5rem;
  height: 1.5rem;
`;
