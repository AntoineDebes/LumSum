import React, { FC, Fragment, useRef, useState } from "react";
import { Divider, Modal, Tooltip, message, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { Input, Checkbox, Form, FormItem, DatePicker, Radio } from "formik-antd";
import { ADD_SUPPLIER } from "../graphql/mutation";
import PhoneInput from "react-phone-input-2";
import clsx from "clsx";
import { SUPPLIERS } from "../graphql/query";
import AWS from "aws-sdk";

const CATEGORIES = gql`
    query {
        categories {
            id
            name
            products {
                id
                name
            }
        }
    }
`;

// https://codesandbox.io/s/4wrrx8qok0

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
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
    website: Yup.string().matches(reURL, "Enter correct url!"),
    facebook: Yup.string().matches(reURL, "Enter correct url!"),
    linkdin: Yup.string().matches(reURL, "Enter correct url!"),
    youtube: Yup.string().matches(reURL, "Enter correct url!"),
    location: Yup.string().matches(reURL, "Enter correct url!"),
    products: Yup.array().required("Product is required").min(1),
    logo: Yup.mixed().required("Image File is required!"),
});

const AddNewSupplier: FC = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const { loading: categoriesLoading, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network",
    });
    const [visible, setVisible] = useState(false);
    const [addSupplier, { loading, error }] = useMutation(ADD_SUPPLIER, {
        onCompleted: (data) => {
            if (data.addSupplier) {
                message.success("Supplier Added!");
                onCancel();
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
        refetchQueries: [{ query: SUPPLIERS }],
    });
    const onCancel = () => {
        if (formRef.current) {
            formRef.current.resetForm();
        }
        setVisible(false);
    };
    const onOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };
    const onSubmit = async (values: any, actions: any) => {
        let logoUrl = "";
        let tradeLicenseUrl = "";
        let listingAgreementUrl = "";

        if (values.logo) {
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
            logoUrl = res.Key;
        }
        if (values.tradeLicense) {
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
            tradeLicenseUrl = res.Key;
        }
        if (values.listingAgreement) {
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
            listingAgreementUrl = res.Key;
        }

        addSupplier({
            variables: {
                email: values.email,
                date: values.date,
                tradeName: values.tradeName,
                legalName: values.legalName,
                contactPerson: values.contactPerson,
                landlineNumber: `+${values.landlineNumber}`,
                mobileNumber: `+${values.mobileNumber}`,
                website: values.website.trim().length > 0 ? values.website.trim() : null,
                city: values.city,
                areaWithInCity: values.areaWithInCity,
                scialMediaLinks: {
                    facebook: values.facebook.trim().length > 0 ? values.facebook.trim() : null,
                    linkdin: values.linkdin.trim().length > 0 ? values.linkdin.trim() : null,
                    youtube: values.youtube.trim().length > 0 ? values.youtube.trim() : null,
                    location: values.location.trim().length > 0 ? values.location.trim() : null,
                },
                products: values.products,
                logo: logoUrl,
                tradeLicense: tradeLicenseUrl,
                listingAgreement: listingAgreementUrl,
                about: values.about,
            },
        });
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Add New Supplier">
                <Button
                    onClick={() => setVisible(true)}
                    type="primary"
                    shape="round"
                    icon={<PlusOutlined />}
                    size="large"
                    className="add-new"
                >
                    New
                </Button>
            </Tooltip>
            <Modal
                visible={visible}
                title="Add New Supplier"
                okText="Submit"
                confirmLoading={loading}
                cancelText="Cancel"
                onCancel={onCancel}
                onOk={onOk}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={onOk}>
                        Submit
                    </Button>,
                ]}
                maskClosable={false}
            >
                <Formik
                    enableReinitialize={true}
                    innerRef={formRef}
                    initialValues={{
                        email: "",
                        date: "",
                        tradeName: "",
                        legalName: "",
                        city: "",
                        areaWithInCity: "",
                        landlineNumber: "",
                        mobileNumber: "",
                        contactPerson: "",
                        website: "",
                        facebook: "",
                        linkdin: "",
                        youtube: "",
                        location: "",
                        logo: null,
                        tradeLicense: null,
                        listingAgreement: null,
                        about: "",
                    }}
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
                                <FormItem name="youtube" label="Instagram">
                                    <Input name="youtube" placeholder="Instagram" />
                                </FormItem>
                                <FormItem name="location" label="Location">
                                    <Input name="location" placeholder="Location" />
                                </FormItem>
                            </SocialMediaAccounts>
                            <FormItem name="about" label="About">
                                <Input.TextArea name="about" placeholder="Write something..." />
                            </FormItem>

                            {/* <Divider>Choose Category</Divider> */}

                            <Divider>Select Products</Divider>
                            <FormItem name="products">
                                <Checkbox.Group name="products">
                                    {data &&
                                        data.categories.map((category: any, key: number) => (
                                            <div key={key}>
                                                <h3>{category.name}</h3>
                                                {category.products.map((product: any, key: number) => (
                                                    <Checkbox key={key} name="products" value={product.id}>
                                                        {product.name}
                                                    </Checkbox>
                                                ))}
                                            </div>
                                        ))}
                                </Checkbox.Group>
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
                                        <Image src={URL.createObjectURL(values.logo)} />
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
                            {/* <FormikDebug /> */}
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    );
};

export default AddNewSupplier;

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
