import { ReactNode } from "react";

interface ConditionalWrapperProps {
  condition: any;
  wrapper: any;
  children: ReactNode;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);

export default ConditionalWrapper;
