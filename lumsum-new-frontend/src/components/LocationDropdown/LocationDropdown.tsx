import { useState } from "react";
import Image from "next/image";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import iconMapMarker from "@/assets/images/map-marker.svg";
import * as S from "./LocationDropdown.styled";

import { locations } from "@/dummy-data/locations";

const LocationDropdown = () => {
  const [selectedLocation, setSelectedLocation] = useState("Dubai");

  const locationSelect = ({ key }: { key: string }) => {
    setSelectedLocation(key);
  };

  const locationsList = (
    <Menu onClick={locationSelect}>
      {locations.map((location) => {
        return <Menu.Item key={location}>{location}</Menu.Item>;
      })}
    </Menu>
  );

  return (
    <S.HeaderDropdown>
      <S.HeaderDropdownIconWrap>
        <Image src={iconMapMarker} width="32" height="32" alt="map marker" />
      </S.HeaderDropdownIconWrap>
      <S.DropdownWrap>
        <S.DropdownLabel>Deliver to</S.DropdownLabel>
        <Dropdown overlay={locationsList}>
          <S.DropdownButton
            size="middle"
            onClick={(e) => e.preventDefault()}
          >
            {selectedLocation} <DownOutlined />
          </S.DropdownButton>
        </Dropdown>
      </S.DropdownWrap>
    </S.HeaderDropdown>
  );
};

export default LocationDropdown;
