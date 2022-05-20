import * as S from "./ReviewModal.styled";
import Button from "@/components/Button/Button";
import RatingCard from "@/components/RatingCard/RatingCard";

interface IProps {
  visible: boolean;
  handleOkReviewModal: () => void;
  handleCancelReviewModal: () => void;
}

const ReviewModal = ({
  visible,
  handleOkReviewModal,
  handleCancelReviewModal,
}: IProps) => {
  return (
    <S.Modal
      title="Your Review"
      visible={visible}
      onOk={handleOkReviewModal}
      onCancel={handleCancelReviewModal}
      footer={[
        <Button type="submit" key="submit" theme="primary" onClick={handleOkReviewModal}>
          Save Changes
        </Button>,
        <Button type="reset" key="reset" onClick={handleCancelReviewModal}>
          Back
        </Button>,
      ]}
    >
      <RatingCard key="1" question="Did product quality meet your expectations?" />
      <RatingCard key="2" question="Was the product as described?" />
      <RatingCard key="3" question="Did we deliver on time?" />
    </S.Modal>
  );
};

export default ReviewModal;
