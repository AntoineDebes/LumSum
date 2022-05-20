import * as S from "./RatingOverview.styled";

import ICON_AMAZING from "@/assets/images/smileys/amazing.svg";
import ICON_BAD from "@/assets/images/smileys/bad.svg";
import ICON_GOOD from "@/assets/images/smileys/good.svg";
import ICON_GREAT from "@/assets/images/smileys/great.svg";
import ICON_NOT_GOOD from "@/assets/images/smileys/not-good.svg";

interface IProps {
  rating: {
    rating: number;
    count: number;
  };
  marginBottom?: string;
  size?: "large" | "medium";
}

const RatingOverview = ({ rating, marginBottom, size, ...props }: IProps) => {
  const ratingValue = rating.rating;
  let ratingInText = "";
  let ratingInImage = ICON_BAD;

  switch (true) {
    case ratingValue < 1:
      ratingInText = "Bad";
      ratingInImage = ICON_BAD;
      break;
    case ratingValue < 2:
      ratingInText = "Not Good";
      ratingInImage = ICON_NOT_GOOD;
      break;
    case ratingValue < 3:
      ratingInText = "Good";
      ratingInImage = ICON_GOOD;
      break;
    case ratingValue < 4:
      ratingInText = "Very Good";
      ratingInImage = ICON_GREAT;
      break;
    case ratingValue <= 5:
      ratingInText = "Amazing";
      ratingInImage = ICON_AMAZING;
      break;
  }

  return (
    <S.RatingOverview
      size={size}
      marginBottom={marginBottom}
      {...props}
      title={`Rated ${rating.rating}/5`}
    >
      <S.ratingIconWrap size={size}>
        <S.ratingIcon src={ratingInImage} layout="fill" />
      </S.ratingIconWrap>
      <S.ratingValue>{ratingInText}</S.ratingValue>
      <S.ratingCount>({rating.count})</S.ratingCount>
    </S.RatingOverview>
  );
};

export default RatingOverview;
