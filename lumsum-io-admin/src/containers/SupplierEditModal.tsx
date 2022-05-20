import { Button, Divider, Image, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik, FormikProps } from "formik";
import { Input, Form, FormItem, DatePicker, Radio } from "formik-antd";
import React, { FC, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import clsx from "clsx";
import styled from "styled-components";
import * as Yup from "yup";
import { UPDATE_SUPPLIER } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { SUPPLIER } from "../graphql/query";
import AWS from "aws-sdk";
import { deleteS3File } from "../utils";

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const reURL = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

const SupplierSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    date: Yup.string().required("Required"),
    tradeName: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required("Required"),
    legalName: Yup.string().min(2, "Too Short!").max(70, "Too Long!").required("Required"),
    landlineNumber: Yup.string().matches(rePhoneNumber, "Landline number is not valid"),
    mobileNumber: Yup.string().matches(rePhoneNumber, "Mobile number is not valid"),
    contactPerson: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    city: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    areaWithInCity: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    website: Yup.string().matches(reURL, "Enter correct url!").nullable(),
    facebook: Yup.string().matches(reURL, "Enter correct url!").nullable(),
    linkdin: Yup.string().matches(reURL, "Enter correct url!").nullable(),
    youtube: Yup.string().matches(reURL, "Enter correct url!").nullable(),
    location: Yup.string().matches(reURL, "Enter correct url!").nullable(),
    logo: Yup.mixed().required("Image File is required!"),
});

interface SupplierEditModalProps {
    match: any;
    supplier: any;
}

interface IParams {
    supplierId: string | undefined;
}

const SupplierEditModal: FC<SupplierEditModalProps> = ({ match, supplier }) => {
    const history = useHistory();
    const { supplierId } = useParams<IParams>();
    const formRef = useRef<FormikProps<any>>(null);
    const [updateSupplier, { loading, error }] = useMutation(UPDATE_SUPPLIER, {
        onCompleted: (data) => {
            if (data.updateSupplier) {
                message.success("Supplier Updated!");
                history.goBack();
            } else {
                message.success("Something Error!");
            }
        },
        onError: (error) => {
            console.info("onError");
            console.log(error.message);
            message.error(error.message);
            // message.error(JSON.stringify(error));
        },
        refetchQueries: [{ query: SUPPLIER, variables: { id: supplierId } }],
    });
    const onCancel = () => {
        if (formRef.current) {
            formRef.current.resetForm();
        }
        history.goBack();
    };
    const onOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };
    const onSubmit = async (values: any, actions: any) => {
        const variables = {
            id: supplierId,
            email: values.email,
            date: values.date,
            tradeName: values.tradeName,
            legalName: values.legalName,
            contactPerson: values.contactPerson,
            landlineNumber: `+${values.landlineNumber}`,
            mobileNumber: `+${values.mobileNumber}`,
            city: values.city,
            areaWithInCity: values.areaWithInCity,
            website: values.website || null,
            scialMediaLinks: {
                facebook: values.facebook || null,
                linkdin: values.linkdin || null,
                youtube: values.youtube || null,
                location: values.location || null,
            },
            logo: values.logo,
            tradeLicense: values.tradeLicense,
            listingAgreement: values.listingAgreement,
            about: values.about,
        };
        if (values.logo !== null && typeof values.logo === "object") {
            const ext = values.logo.name.split(".").pop();
            const key: string = `${new Date().getTime()}.${ext}`;
            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: process.env.REACT_APP_S3_BUCKET!,
                    Key: key,
                    Body: values.logo,
                },
            });
            const res = await upload.promise();
            variables.logo = res.Key;
            // delete old logo
            await deleteS3File(supplier.logo);
        }
        if (values.tradeLicense !== null && typeof values.tradeLicense === "object") {
            const ext = values.tradeLicense.name.split(".").pop();
            const key: string = `${new Date().getTime()}.${ext}`;
            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: process.env.REACT_APP_S3_BUCKET!,
                    Key: key,
                    Body: values.tradeLicense,
                },
            });
            const res = await upload.promise();
            variables.tradeLicense = res.Key;
            // delete old tradeLicense
            await deleteS3File(supplier.tradeLicense);
        }
        if (values.listingAgreement !== null && typeof values.listingAgreement === "object") {
            const ext = values.listingAgreement.name.split(".").pop();
            const key: string = `${new Date().getTime()}.${ext}`;
            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: process.env.REACT_APP_S3_BUCKET!,
                    Key: key,
                    Body: values.listingAgreement,
                },
            });
            const res = await upload.promise();
            variables.listingAgreement = res.Key;
            // delete old listingAgreement
            await deleteS3File(supplier.listingAgreement);
        }
        updateSupplier({ variables });
    };
    return (
        <Modal
            visible={Boolean(match)}
            title="Edit Supplier Info"
            onCancel={onCancel}
            onOk={onOk}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={onOk}>
                    Update
                </Button>,
            ]}
            maskClosable={false}
        >
            <Formik
                enableReinitialize={true}
                innerRef={formRef}
                initialValues={{ ...supplier, email: supplier.user.email }}
                onSubmit={onSubmit}
                validationSchema={SupplierSchema}
            >
                {({ setFieldValue, values, errors, touched }) => (
                    <Form layout="vertical">
                        <FormItem name="email" label="Email" required>
                            <Input name="email" placeholder="Email" />
                        </FormItem>
                        <FormItem name="date" label="Date" required>
                            <DatePicker name="date" placeholder="Date" style={{ width: "100%" }} />
                        </FormItem>
                        <FormItem name="tradeName" label="Trade Name" required>
                            <Input name="tradeName" placeholder="Trade Name" />
                        </FormItem>
                        <FormItem name="legalName" label="Legal Name" required>
                            <Input name="legalName" placeholder="Legal Name" />
                        </FormItem>
                        <FormItem name="city" label="City" required>
                            <Radio.Group name="city">
                                <Radio name="city" value="Abu Dhabi">
                                    Abu Dhabi
                                </Radio>
                                <Radio name="city" value="Dubai">
                                    Dubai
                                </Radio>
                                <Radio name="city" value="Sharjah">
                                    Sharjah
                                </Radio>
                                <Radio name="city" value="Ajman">
                                    Ajman
                                </Radio>
                                <Radio name="city" value="RAK">
                                    RAK
                                </Radio>
                                <Radio name="city" value="Fujairah">
                                    Fujairah
                                </Radio>
                                <Radio name="city" value="Um AL Qiwain">
                                    Umm AL Quwain
                                </Radio>
                                <Radio name="city" value="Al Ain">
                                    Al Ain
                                </Radio>
                                <Radio name="city" value="Other">
                                    Other
                                </Radio>
                            </Radio.Group>
                        </FormItem>
                        <FormItem name="areaWithInCity" label="Area Within City" required>
                            <Input name="areaWithInCity" placeholder="Area Within City" />
                        </FormItem>
                        <FormItem name="landlineNumber" label="Landline Number" required>
                            <PhoneInput
                                inputProps={{
                                    name: "landlineNumber",
                                }}
                                containerClass={clsx("phone-number", touched.landlineNumber && errors.landlineNumber && "error")}
                                country={"us"}
                                value={values.landlineNumber}
                                onChange={(value, country, e, formattedValue) => {
                                    console.log(value, country, e, formattedValue);
                                    setFieldValue("landlineNumber", value);
                                }}
                            />
                        </FormItem>
                        <FormItem name="mobileNumber" label="Mobile Number" required>
                            <PhoneInput
                                inputProps={{
                                    name: "mobileNumber",
                                }}
                                containerClass={clsx("phone-number", touched.mobileNumber && errors.mobileNumber && "error")}
                                country={"us"}
                                value={values.mobileNumber}
                                onChange={(value) => setFieldValue("mobileNumber", value)}
                            />
                        </FormItem>
                        <FormItem name="contactPerson" label="Contact Person" required>
                            <Input name="contactPerson" placeholder="Contact Person" />
                        </FormItem>
                        <FormItem name="website" label="Website">
                            <Input name="website" placeholder="Website" />
                        </FormItem>
                        <Divider>Social Media Accounts</Divider>
                        <SocialMediaAccounts>
                            <FormItem name="facebook" label="Facebook">
                                <Input name="facebook" placeholder="Facebook" />
                            </FormItem>
                            <FormItem name="linkdin" label="Linkedin">
                                <Input name="linkdin" placeholder="Linkedin" />
                            </FormItem>
                            <FormItem name="youtube" label="Youtube">
                                <Input name="youtube" placeholder="Youtube" />
                            </FormItem>
                            <FormItem name="location" label="Location">
                                <Input name="location" placeholder="Location" />
                            </FormItem>
                        </SocialMediaAccounts>
                        <FormItem name="about" label="About">
                            <Input.TextArea name="about" placeholder="Write something..." />
                        </FormItem>
                        <FormItem name="logo" label="Logo" required>
                            <input
                                name="logo"
                                type="file"
                                accept="image/*"
                                onChange={(event: any) => {
                                    setFieldValue("logo", event.currentTarget.files[0]);
                                }}
                            />
                            {values.logo && (
                                <LogoWrap>
                                    <Image
                                        src={
                                            typeof values.logo === "object"
                                                ? URL.createObjectURL(values.logo)
                                                : `${process.env.REACT_APP_IMAGE_URL}${values.logo}`
                                        }
                                    />
                                </LogoWrap>
                            )}
                        </FormItem>
                        <FormItem name="tradeLicense" label="Trade License">
                            <input
                                name="tradeLicense"
                                type="file"
                                onChange={(event: any) => {
                                    setFieldValue("tradeLicense", event.currentTarget.files[0]);
                                }}
                            />
                        </FormItem>
                        <FormItem name="listingAgreement" label="Listing Agreement">
                            <input
                                name="listingAgreement"
                                type="file"
                                onChange={(event: any) => {
                                    setFieldValue("listingAgreement", event.currentTarget.files[0]);
                                }}
                            />
                        </FormItem>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default SupplierEditModal;

const SocialMediaAccounts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
`;

const LogoWrap = styled.div`
    margin-top: 15px;

    div {
        height: 150px;
        width: 150px;
    }
`;
