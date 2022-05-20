import { ReactNode } from "react";
import * as S from "./Modal.styled";

interface ModalProps {
  title: ReactNode;
  visible: boolean;
  onOk: (e: any) => void;
  onCancel: (e: any) => void;
  children: ReactNode;
  footer?: {}[] | null;
}

const Modal = ({
  title,
  visible,
  onOk,
  onCancel,
  children,
  footer,
}: ModalProps) => {
  return (
    <S.Modal
      title={title}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={footer}
    >
      {children}
    </S.Modal>
  );
};

export default Modal;
