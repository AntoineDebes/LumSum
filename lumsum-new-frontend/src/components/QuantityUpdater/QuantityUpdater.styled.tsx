import styled from "styled-components";
import Button from "@/components/Button/Button";

export const QuantityUpdater = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.25rem;
`;

export const QuantityValue = styled.span`
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
  min-width: 1.3em;
  margin: 0 1.125em;
`;

export const QuantityButton = styled(Button)`
  color: #ffa17a;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 0.625rem;
  padding: 0.375em 0.875em;

  &:last-child {
    color: #00a69c;
  }
`;
