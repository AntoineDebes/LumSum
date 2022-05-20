import styled from "styled-components";
import { Button } from "antd";

interface DropdownButtonProps {
  maxwidth?: string;
  minwidth?: string;
}

export const HeaderDropdown = styled.div`
  font-size: ${({ theme }) => theme.fontSize.base};
  display: flex;
  align-items: flex-end;
  margin-left: 1rem;

  @media (max-width: 430px) {
    align-items: center;
  }
`;

export const HeaderDropdownIconWrap = styled.div`
  position: relative;
  bottom: 0.375em;
  display: flex;

  @media (max-width: 430px) {
    bottom: 0;
  }
`;

export const DropdownWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.25rem;
`;

export const DropdownButton = styled(Button)<DropdownButtonProps>`
  font-size: 1em;
  font-weight: 700;
  background: transparent;
  height: unset;
  padding: 0.125rem 0.375rem;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & span:first-child {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 8.5rem;
  }

  @media (max-width: 600px) {
    & span:first-child {
      font-size: 0.875rem;
      width: 6rem;
    }
  }

  @media (max-width: 540px) {
    & span:first-child {
      width: 4.75rem;
    }
  }

  @media (max-width: 430px) {
    & span:first-child {
      display: none;
    }
  }
`;

export const DropdownLabel = styled.small`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 0.875em;
  line-height: 1;
  padding: 0.125rem 0.375rem;

  @media (max-width: 430px) {
    display: none;
  }
`;
