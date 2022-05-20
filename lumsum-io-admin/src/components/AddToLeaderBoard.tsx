import React, { Fragment, useRef, useState } from "react";
import * as Yup from "yup";
import { Formik, FormikProps } from "formik";
import { useMutation } from "@apollo/client";
import { ADD_TO_LEADER_BOARD } from "../graphql/mutation";
import { Button, message, Modal, Tooltip } from "antd";
import { GET_LEADER_BOARD_ADMIN } from "../graphql/query";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Form, FormItem } from "formik-antd";

const LeaderBoardSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    scores: Yup.number().typeError("Number").required("Required").integer(),
    images: Yup.number().typeError("Number").required("Required").integer(),
});

const AddToLeaderBoard = () => {
    const formRef = useRef<FormikProps<any>>(null);
    const [visible, setVisible] = useState(false);
    const [addToLeaderBoard, { loading }] = useMutation(ADD_TO_LEADER_BOARD, {
        onCompleted: (data) => {
            if (data.addToLeaderBoard) {
                message.success("Record Added!");
                onCancel();
            } else {
                message.success("Something Error!");
            }
        },
        onError: (error) => {
            console.info("onError");
            console.log(error.message);
            message.error(error.message);
        },
        refetchQueries: [{ query: GET_LEADER_BOARD_ADMIN }],
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

    const onSubmit = (values: any, actions: any) => {
        addToLeaderBoard({
            variables: {
                name: values.name,
                scores: +values.scores,
                images: +values.images,
            },
        });
    };

    return (
        <Fragment>
            <Tooltip placement="left" title="Add to Leader Board">
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
                title="Add to Leader Board"
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
                        name: "",
                        scores: "",
                        images: "",
                    }}
                    onSubmit={onSubmit}
                    validationSchema={LeaderBoardSchema}
                >
                    {({ setFieldValue, values, errors, touched }) => (
                        <Form layout="vertical">
                            <FormItem name="name" label="Name" required>
                                <Input name="name" placeholder="Name" />
                            </FormItem>
                            <FormItem name="scores" label="Scores" required>
                                <Input name="scores" placeholder="Scores" />
                            </FormItem>
                            <FormItem name="images" label="No of Images" required>
                                <Input name="images" placeholder="No of Images" />
                            </FormItem>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </Fragment>
    );
};

export default AddToLeaderBoard;
