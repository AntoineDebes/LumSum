import Image from "next/image";
import * as S from "./Location.styled";
import iconMapMarker from "@/assets/images/map-marker.svg";

interface LocationProps {
  location: string;
}

const Location = ({ location }: LocationProps) => {
  return (
    <S.Location>
      <S.LocationIconWrap>
        <Image src={iconMapMarker} alt="map marker" layout="fill" />
      </S.LocationIconWrap>
      <S.LocationText>{location}</S.LocationText>
    </S.Location>
  );
};

export default Location;
