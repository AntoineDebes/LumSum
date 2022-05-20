import Rating from "@/components/Rating/Rating";
import { useState } from "react";
import { RadioChangeEvent } from "antd/lib/radio";
import * as S from "./RatingCard.styled";

interface IProps {
  question: string;
}

const RatingCard = ({ question }: IProps) => {
  const [ratingValue, setRatingValue] = useState("");

  const onRatingChange = (e: RadioChangeEvent) => {
    setRatingValue(e.target.value);
  };

  return (
    <S.RatingCard>
      {/* <S.Title as="h2">Your Review</S.Title> */}
      <S.Question>{question}</S.Question>
      <Rating
        size="large"
        onChange={onRatingChange}
        value={ratingValue}
      />
      {/* <S.ButtonWrap>
        <S.Button>Submit</S.Button>
      </S.ButtonWrap> */}
    </S.RatingCard>
  );
};

export default RatingCard;
