import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import styled from "styled-components/macro";
import { Button, message, Modal, Space, Table, Tooltip, Typography } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { GET_LEADER_BOARD_ADMIN } from "../graphql/query";
import AddToLeaderBoard from "../components/AddToLeaderBoard";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { DELETE_FROM_LEADER_BOARD, UPDATE_LEADER_BOARD } from "../graphql/mutation";
import { Formik, FormikProps } from "formik";
import { Input, Form, FormItem } from "formik-antd";

const LeaderBoardSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    scores: Yup.number().typeError("Number").required("Required").integer(),
    images: Yup.number().typeError("Number").required("Required").integer(),
});

const LeaderBoard = () => {
    const { loading, data } = useQuery(GET_LEADER_BOARD_ADMIN, {
        fetchPolicy: "cache-and-network",
    });
    const [updateLeaderBoard] = useMutation(UPDATE_LEADER_BOARD, {
        onCompleted: (data) => {
            if (data.updateLeaderBoard) {
                message.success("Record updated!");
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
    const formRef = useRef<FormikProps<any>>(null);
    const [visible, setVisible] = useState(false);
    const [editCompetition, setEditCompetition] = useState<any>(null);

    const [deleteFromLeaderBoard] = useMutation(DELETE_FROM_LEADER_BOARD, {
        onCompleted: () => message.success("Successfully deleted"),
        onError: () => message.error("Something Error!"),
        refetchQueries: [{ query: GET_LEADER_BOARD_ADMIN }],
    });

    const removeFromLeaderBoard = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this record!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.value) {
                deleteFromLeaderBoard({
                    variables: { id },
                });
            }
        });
    };

    const editLeaderBoard = (competition: any) => {
        setVisible(true);
        setEditCompetition(competition);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Scores",
            dataIndex: "scores",
            key: "scores",
        },
        {
            title: "No of Images",
            dataIndex: "images",
            key: "images",
        },
        {
            title: "Actions",
            key: "operation",
            width: "200px",
            render: (competition: any) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button
                            onClick={() => editLeaderBoard(competition)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<EditOutlined />}
                            size="middle"
                        />
                    </Tooltip>

                    <Tooltip title="Delete">
                        <Button
                            value={competition.id}
                            onClick={() => removeFromLeaderBoard(competition.id)}
                            type="primary"
                            ghost
                            shape="circle"
                            icon={<DeleteOutlined />}
                            size="middle"
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const onSubmit = (values: any, actions: any) => {
        updateLeaderBoard({
            variables: {
                id: values.id,
                name: values.name,
                scores: +values.scores,
                images: +values.images,
            },
        });
    };

    const onCancel = () => {
        if (formRef.current) {
            formRef.current.resetForm();
        }
        setVisible(false);
        setEditCompetition(null);
    };

    const onOk = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    return (
        <div>
            <Helmet>
                <title>Lumsum | Leader Board</title>
            </Helmet>

            <NewButtonWrapper>
                <Title level={3}>Leader Board</Title>
                <AddToLeaderBoard />
            </NewButtonWrapper>
            <Table
                rowKey={(competition) => competition.id}
                loading={loading}
                sticky={true}
                dataSource={data?.getLeaderBoardAdmin}
                columns={columns}
                bordered
            />

            <Modal
                visible={visible}
                title="Update Leader Board"
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
                        Update
                    </Button>,
                ]}
                maskClosable={false}
            >
                <Formik
                    enableReinitialize={true}
                    innerRef={formRef}
                    initialValues={{
                        id: editCompetition ? editCompetition.id : "",
                        name: editCompetition ? editCompetition.name : "",
                        scores: editCompetition ? editCompetition.scores : "",
                        images: editCompetition ? editCompetition.images : "",
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
        </div>
    );
};

export default LeaderBoard;

const NewButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px auto;
`;

const Title = styled(Typography.Title)`
    margin: 0 !important;
`;
