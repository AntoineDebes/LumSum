import * as S from "./Progress.styled";
import { OrderStatusType } from "@/typings/types";

interface IProps {
  status: OrderStatusType;
}

const Progress = ({ status }: IProps) => {
  let percent = 0;
  switch (status) {
    case "ordered":
      percent = 25;
      break;
    case "processing":
      percent = 50;
      break;
    case "shipping":
      percent = 75;
      break;
    case "delivered":
      percent = 100;
      break;
  }

  return (
    <S.ProgressWrap>
      <S.Progress percent={percent} />
      <S.ProgressStatus>{status}</S.ProgressStatus>
    </S.ProgressWrap>
  );
};

export default Progress;
