import styled from "styled-components";

interface SellerLegacyProps {
  fontSize?: string;
}
export const SellerLegacy = styled.h5<SellerLegacyProps>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : "0.75rem")};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const SellerLegacyUnits = styled.span`
  font-size: 0.5em;
`;
