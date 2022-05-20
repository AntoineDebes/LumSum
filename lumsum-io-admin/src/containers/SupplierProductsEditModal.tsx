import { Button, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik, FormikProps } from "formik";
import { Checkbox, FormikDebug, Form, FormItem } from "formik-antd";
import React, { FC, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";

const CATEGORIES = gql`
    query {
        categories {
            id
            name
            products {
                id
                name
                icon
            }
        }
    }
`;

const PRODUCT_OF_SUPPLIER = gql`
    query getProductsOfSupplier($id: ID!) {
        getProductsOfSupplier(id: $id) {
            id
        }
    }
`;

const UPDATE_PRODUCTS_OF_SUPPLIER = gql`
    mutation updateProductsOfSupplier($id: ID!, $products: [String!]!) {
        updateProductsOfSupplier(id: $id, products: $products)
    }
`;

const SupplierSchema = Yup.object().shape({
    products: Yup.array().required("Product is required").nullable(),
});

interface SupplierEditModalProps {
    match: any;
    supplier: any;
}

interface IParams {
    supplierId: string | undefined;
}

const SupplierEditModal: FC<SupplierEditModalProps> = ({ match, supplier }) => {
    console.log("SupplierEditModal");
    const history = useHistory();
    const { supplierId } = useParams<IParams>();
    const formRef = useRef<FormikProps<any>>(null);
    const { data: productsOfSupplier, error } = useQuery(PRODUCT_OF_SUPPLIER, {
        variables: { id: supplierId },
        fetchPolicy: "cache-and-network",
    });
    const { loading, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network",
    });
    const [updateProductsOfSupplier] = useMutation(UPDATE_PRODUCTS_OF_SUPPLIER, {
        onCompleted: (data) => {
            if (data.updateProductsOfSupplier) {
                message.success("Supplier's Products Updated!");
                history.goBack();
            } else {
                message.error("Something Error!");
            }
        },
        onError: (error) => {
            console.info("onError");
            console.log(error.message);
            message.error(error.message);
            // message.error(JSON.stringify(error));
        },
        refetchQueries: [{ query: PRODUCT_OF_SUPPLIER, variables: { id: supplierId } }],
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
    const onSubmit = (values: any, actions: any) => {
        console.log("Form Submit");
        console.log(values);
        updateProductsOfSupplier({
            variables: {
                id: supplierId,
                products: values.products,
            },
        });
    };

    const products: Array<string> = [];
    productsOfSupplier?.getProductsOfSupplier?.forEach((product: any) => {
        products.push(product.id);
    });

    return (
        <Modal
            visible={Boolean(match)}
            title="Edit Supplier's Products"
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
                    products,
                }}
                onSubmit={onSubmit}
                validationSchema={SupplierSchema}
            >
                {() => (
                    <Form layout="vertical">
                        <FormItem name="products">
                            <Checkbox.Group name="products">
                                {data &&
                                    data.categories.map((category: any, key: number) => (
                                        <div key={key}>
                                            <h3>{category.name}</h3>
                                            <Flex>
                                                {category.products.map((product: any, key: number) => (
                                                    <Checkbox key={key} name="products" value={product.id}>
                                                        {product.name}
                                                    </Checkbox>
                                                ))}
                                            </Flex>
                                        </div>
                                    ))}
                            </Checkbox.Group>
                        </FormItem>
                        <FormikDebug />
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default SupplierEditModal;

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;

    label {
        margin-left: 0 !important;
    }
`;
