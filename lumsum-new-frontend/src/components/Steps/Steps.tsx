import * as S from "./Steps.styled";

interface IProps {
  current: number;
  steps: {
    title: string;
    description: string;
  }[];
  direction?: "horizontal" | "vertical";
  labelPlacement?: "horizontal" | "vertical";
}

const Steps = ({ current, steps, direction, labelPlacement }: IProps) => {
  return (
    <S.steps
      direction={direction || "vertical"}
      labelPlacement={labelPlacement || "horizontal"}
      current={current}
    >
      {steps.map((step) => {
        return (
          <S.step
            key={step.title}
            title={step.title}
            description={step.description}
          />
        );
      })}
    </S.steps>
  );
};

export default Steps;
