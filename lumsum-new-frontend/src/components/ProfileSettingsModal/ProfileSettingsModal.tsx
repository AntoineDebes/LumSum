import Box from "@/components/Box/Box";
import { Formik } from "formik";
import Modal from "@/components/Modal/Modal";
import Form from "@/components/Form/Form";
import Button from "@/components/Button/Button";
import FormGroup from "@/components/FormGroup/FormGroup";
import ButtonWrap from "@/components/ButtonWrap/ButtonWrap";
import * as Yup from "yup";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  organization?: string;
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  organization: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .required("Required"),
  newPassword: Yup.string()
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string()
    .min(8, "Too Short!")
    .max(24, "Too Long!")
    .required("Required"),
});

interface IProps {
  visible: boolean;
  handleOkProfileSettingsModal: () => void;
  handleCancelProfileSettingsModal: () => void;
}

const ProfileSettingsModal = ({
  visible,
  handleOkProfileSettingsModal,
  handleCancelProfileSettingsModal,
}: IProps) => {
  return (
    <Modal
      title="Edit Profile Information"
      visible={visible}
      onOk={handleOkProfileSettingsModal}
      onCancel={handleCancelProfileSettingsModal}
      footer={null}
    >
      <Box title="Profile Settings" maxwidth="38rem">
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            organization: "",
            phoneNumber: "",
            email: "",
          }}
          validationSchema={ProfileSchema}
          onSubmit={(values: ProfileFormValues) => {
            console.log("");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup
                label="First Name"
                id="firstName"
                placeholder="John"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Last Name"
                id="lastName"
                placeholder="Smith"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Organization"
                id="organization"
                placeholder="Ace"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Phone Number"
                id="phoneNumber"
                placeholder="+971"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Email"
                id="email"
                placeholder="john@gmail.com"
                requiredField
                errors={errors}
                touched={touched}
              />
              <ButtonWrap theme="inForm">
                <Button theme="primary" size="medium" type="submit">
                  Save Changes
                </Button>
              </ButtonWrap>
            </Form>
          )}
        </Formik>
      </Box>
      <Box title="Password Settings" maxwidth="38rem">
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={PasswordSchema}
          onSubmit={(values: PasswordFormValues) => {
            console.log("");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormGroup
                label="Current Password"
                id="currentPassword"
                placeholder="********"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="New Password"
                id="newPassword"
                placeholder="********"
                requiredField
                errors={errors}
                touched={touched}
              />
              <FormGroup
                label="Confirm Password"
                id="confirmPassword"
                placeholder="********"
                requiredField
                errors={errors}
                touched={touched}
              />
              <ButtonWrap theme="inForm">
                <Button theme="primary" size="medium" type="submit">
                  Save Changes
                </Button>
              </ButtonWrap>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProfileSettingsModal;
