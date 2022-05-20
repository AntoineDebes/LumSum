import Box from "@/components/Box/Box";
import { Formik } from "formik";
import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import PseudoFooter from "@/components/Modal/PseudoFooter/PseudoFooter";
import Form from "@/components/Form/Form";
import FormGroup from "@/components/FormGroup/FormGroup";
import * as Yup from "yup";
import * as S from "./PaymentModal.styled";
import usePaymentCardsStore from "@/store/usePaymentCardsStore";

interface CardFormValues {
  cardholderName: string;
  cardNumber: number;
  cardExpiry: number;
  cardCVV: number;
}

const CardSchema = Yup.object().shape({
  cardholderName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cardNumber: Yup.number().required("Card number is required"),
  cardExpiry: Yup.string().required("Card expiry is required"),
  cardCVV: Yup.number().required("CVV is required"),
});

interface IProps {
  title: string;
  visible: boolean;
  handleOkPaymentModal: () => void;
  handleCancelPaymentModal: () => void;
}

const PaymentModal = ({
  title,
  visible,
  handleOkPaymentModal,
  handleCancelPaymentModal,
}: IProps) => {
  const addPaymentCard = usePaymentCardsStore((state) => state.addPaymentCard);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOkPaymentModal}
      onCancel={handleCancelPaymentModal}
      footer={null}
    >
      <Formik
        initialValues={{
          cardholderName: "",
          cardNumber: "",
          cardExpiry: "",
          cardCVV: "",
        }}
        validationSchema={CardSchema}
        onSubmit={(values, { resetForm }) => {
          addPaymentCard(values);
          resetForm({
            values: {
              cardholderName: "",
              cardNumber: "",
              cardExpiry: "",
              cardCVV: "",
            }
          })
          handleOkPaymentModal();
        }}
      >
        {({ errors, touched }) => (
          <Form withPseudoFooter={true}>
            <Box maxwidth="38rem">
              <FormGroup
                label="Cardholder Name"
                id="cardholderName"
                placeholder="John Smith"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Card"
                id="cardNumber"
                placeholder="Card Number"
                requiredField
                errors={errors}
                touched={touched}
              />
              <S.CardInputWrap>
                <FormGroup
                  label="Expiry"
                  id="cardExpiry"
                  placeholder="MM/YY"
                  noLabel
                  requiredField
                  errors={errors}
                  touched={touched}
                />
                <FormGroup
                  label="CVV"
                  id="cardCVV"
                  placeholder="CVV"
                  noLabel
                  requiredField
                  errors={errors}
                  touched={touched}
                />
              </S.CardInputWrap>
            </Box>
            <PseudoFooter>
              <Button key="submit" theme="primary" type="submit">
                Save Changes
              </Button>
              <Button key="back" onClick={handleCancelPaymentModal}>
                Back
              </Button>
            </PseudoFooter>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default PaymentModal;
