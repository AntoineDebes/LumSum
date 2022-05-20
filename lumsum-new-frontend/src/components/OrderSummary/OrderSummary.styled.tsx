import styled from "styled-components";
import ContainerMainTitle from "@/components/ContainerMainTitle/ContainerMainTitle";

export const InnerWrap = styled.div`
  max-width: 20rem;
  margin: auto;
`;

export const Title = styled(ContainerMainTitle)`
  margin-bottom: 1em;
`;

export const DataBlock = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  @media (max-width: 767.98px) {
    margin-bottom: 1.5rem;
  }
`;

export const DataBlockRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 1.25em;
`;

export const DataBlockValue = styled.span`
  font-size: 0.875em;
  font-weight: 700;
`;

export const DataBlockRowTotal = styled(DataBlockRow)`
  font-size: 1rem;
  padding-top: 1em;
  margin-top: 1.25em;
  margin-bottom: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderColorDarker6};
`;
