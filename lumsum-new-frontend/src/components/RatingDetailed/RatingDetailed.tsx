import { useState } from "react";
import * as S from "./RatingDetailed.styled";

import ReviewModal from "@/components/ReviewModal/ReviewModal";

interface IProps {
  ratingDetail: {
    amazing: number;
    veryGood: number;
    good: number;
    notGood: number;
    bad: number;
  };
  percent?: number;
}

const RatingDetailed = ({ ratingDetail, ...props }: IProps) => {
  const totalRatings = Object.values(ratingDetail).reduce((a, b) => a + b);
  const ratingCount = Object.values(ratingDetail).map((a, b) => a + b);
  let percentList = ratingCount.map((fig) =>
    Number(((fig / totalRatings) * 100).toFixed())
  );

  const [IsReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const showReviewModal = () => {
    setIsReviewModalVisible(true);
  };

  const handleOkReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  const handleCancelReviewModal = () => {
    setIsReviewModalVisible(false);
  };

  return (
    <S.RatingDetailed {...props}>
      {percentList.map((percent, index) => {
        return (
          <S.RatingRow title={percent + "%"} key={index}>
            <S.RatingIcon />
            <S.RatingProgress percent={percent} showInfo={false} />
            <S.RatingInPercentage>{percent}%</S.RatingInPercentage>
            <S.RatingCount>72</S.RatingCount>
          </S.RatingRow>
        );
      })}
      <S.AddButton theme="primaryGhost" onClick={showReviewModal}>
        Add a review
      </S.AddButton>

      <ReviewModal
        visible={IsReviewModalVisible}
        handleOkReviewModal={handleOkReviewModal}
        handleCancelReviewModal={handleCancelReviewModal}
      />
    </S.RatingDetailed>
  );
};

export default RatingDetailed;
