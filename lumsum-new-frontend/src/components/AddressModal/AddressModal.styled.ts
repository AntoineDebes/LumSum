import styled from "styled-components";
import { Input as AntDInput } from "antd";
import Button from "@/components/Button/Button";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";

export const FormInnerWrap = styled.div`
  overflow: auto;
`;

export const MapSelectorWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const MapWrap = styled.div`
  max-width: 800px;
  position: relative;
`;
export const MapLocationInput = styled(AntDInput)`
  font-size: 0.875rem;
  width: calc(100% - 5rem);
  padding: 0.5rem;
  border-color: ${({ theme }) => theme.colors.borderColorDarker2};
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  z-index: 1;
`;

export const AddressInMap = styled.div`
  font-size: 13px;
  line-height: 1.3;
  background: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
  position: relative;
  top: 4rem;
  left: 1rem;
`;

export const AddressInMapTitle = styled.strong`
  line-height: 1.3;
  margin-bottom: 0.5em;
`;

export const AddressInMapAddress = styled.p`
  margin-bottom: 0.25em;
`;

export const AddressInMapButtonWrap = styled(ButtonWrap)`
  margin-top: 0.75rem;
`;

export const AddressInMapButton = styled(Button)`
  font-size: 13px;
`;
