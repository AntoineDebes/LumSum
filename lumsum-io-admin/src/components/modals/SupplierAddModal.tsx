import { Button, Modal, Form, Input, Radio, DatePicker, Row, Col } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';

const SupplierAddModal = (props: any) => {
    console.log('SupplierAddModal')
    const history = useHistory();
    const [form] = Form.useForm();

    const onCancel = () => {
        form.resetFields();
        history.goBack();
    }

    const onOk = () => {
        form
            .validateFields()
            .then(values => {
                form.resetFields();
                history.goBack();
                // onCreate(values);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    console.log(form);
    return (
        <Modal
            visible={Boolean(props.match)}
            title="Add New Category"
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: 'public' }}
            >
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="date"
                    label="DatePicker"
                    rules={[
                        { type: 'object', required: true, message: 'Please select time!' }
                    ]}
                >
                    <DatePicker />
                </Form.Item>
                <Form.Item
                    name="tradeName"
                    label="Trade Name"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="legalName"
                    label="Legal Name"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="city" label="City" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="Abu Dhabi">Abu Dhabi</Radio>
                        <Radio value="Dubai">Dubai</Radio>
                        <Radio value="Sharjah">Sharjah</Radio>
                        <Radio value="Ajman">Ajman</Radio>
                        <Radio value="RAK">RAK</Radio>
                        <Radio value="Fujairah">Fujairah</Radio>
                        <Radio value="Um AL Qiwain">Um AL Qiwain</Radio>
                        <Radio value="Other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name="areaWithinCity"
                    label="Area Within City"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="landlineNumber"
                    label="Landline Number"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobileNumber"
                    label="Mobile Number"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="contactPerson"
                    label="Contact Person"
                    rules={[
                        { required: true, message: 'Please input the title of collection!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Website"
                >
                    <Input />
                </Form.Item>
                <Row>
                    <Col span={12}>
                        <SpaceRight>
                            <Form.Item
                                name="facebook"
                                label="Facebook"
                            >
                                <Input />
                            </Form.Item>
                        </SpaceRight>
                    </Col>
                    <Col span={12}>
                        <SpaceLeft>
                            <Form.Item
                                name="linkdin"
                                label="Linkdin"
                            >
                                <Input />
                            </Form.Item>
                        </SpaceLeft>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <SpaceRight>
                            <Form.Item
                                name="youtube"
                                label="Youtube"
                            >
                                <Input />
                            </Form.Item>
                        </SpaceRight>
                    </Col>
                    <Col span={12}>
                        <SpaceLeft>
                            <Form.Item
                                name="location"
                                label="Location"
                            >
                                <Input />
                            </Form.Item>
                        </SpaceLeft>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}

export default SupplierAddModal;
const SpaceRight = styled.div`
    margin-right: 2px;
`;

const SpaceLeft = styled.div`
    margin-left: 2px;
`;