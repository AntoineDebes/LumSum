import Aside from "@/components/Aside/Aside";
import Button from "@/components/Button/Button";
import { Select as AntDSelect } from "antd";
import styled from "styled-components";

interface FiltersProps {
  hiddenBelowIpad?: boolean;
}

export const Filters = styled(Aside)`
  z-index: 5;
`;

export const FilterHeader = styled.div`
  padding: 0 1rem 1rem 0.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FilterTitleWrap = styled.div`
  flex: 1;
`;

export const FilterTitle = styled.h3`
  font-size: 1.625rem;
  color: ${({ theme }) => theme.colors.textDark};
  margin-bottom: 0;
`;

export const FilterSubtitle = styled.h4`
  color: ${({ theme }) => theme.colors.primary};
`;

export const FilterClear = styled(Button)`
  align-self: center;
`;

export const CloseFilter = styled(Button)`
  display: none;

  @media (max-width: 1023.98px) {
    display: flex;
    margin-left: 2.5rem;
  }
`;

export const FilterBlock = styled.div<FiltersProps>`
  padding: 1rem 1rem 1rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColorDarker1};

  ${(props) =>
    props.hiddenBelowIpad == true &&
    `
      {
        border-bottom: none;
      }
      @media (max-width: 1023.98px) {
        display: none;
      }
    `}
`;

export const FilterBlockTitle = styled.h5`
  font-size: 1rem;
`;

export const SearchableList = styled(AntDSelect)`
  width: 100%;
  font-size: 0.875rem;

  .ant-select-selector {
    border-color: ${({ theme }) => theme.colors.borderColorDarker2};
  }
`;
