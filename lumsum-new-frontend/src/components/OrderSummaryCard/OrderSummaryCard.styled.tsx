import styled from "styled-components";
import iconTick from "@/assets/images/tick.svg";

export const OrderSummaryCard = styled.div`
  font-size: 1rem;
  background: #ffffff;
  max-width: 56rem;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 6px ${({ theme }) => theme.colors.boxShadowColor};
  display: block;

  @media (max-width: 767px) {
    padding: 0;
    box-shadow: none;
  }
`;

export const Table = styled.table`
  font-size: 0.875rem;
  width: 100%;
  margin-bottom: -0.875rem;
`;

export const TableTd = styled.td`
  font-size: 1rem;
  padding-bottom: 0.875rem;
`;

export const TableTh = styled.th`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-align: left;
  width: 9em;
  padding-bottom: 0.875rem;
`;

export const OrderNumberWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Verfied = styled.span`
  background: ${`url(${iconTick.src})`} ${({ theme }) => theme.colors.primary}
    center/.625em no-repeat;
  width: 1em;
  height: 1em;
  display: inline-block;
  border-radius: 50%;
  margin-left: 0.625em;
`;

export const OrderItemList = styled.ul`
  position: relative;
  padding-top: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 0;

  &::before {
    content: "";
    background: ${({ theme }) => theme.colors.borderColor};
    width: 75%;
    height: 1px;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

export const OrderItemListLi = styled.li`
  margin-bottom: 0.625rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 560px) {
    margin-bottom: 1rem;
  }
`;
