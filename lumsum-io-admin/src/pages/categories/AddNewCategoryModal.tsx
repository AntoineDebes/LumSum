import React, { FC, Fragment, useState } from 'react';
import { Button, Input as AntdInput, Modal, Tooltip } from 'antd';
import { message } from 'antd';
import { isEmpty } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components/macro';
import { useMutation } from '@apollo/client';
import { ADD_CATEGORY } from '../../graphql/mutation';
import { CATEGORIES } from '../../graphql/query';
import ImageUpload from '../../components/ImageUpload';

interface IError {
    [key: string]: string;
}

const AddNewCategoryModal: FC<any> = (props) => {
    console.log({ props })
    const [open, setOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');
    const [icon, setIcon] = useState<File>();
    const [error, setError] = useState<IError>({} as IError);

    const [addNewCategory, { loading }] = useMutation(ADD_CATEGORY, {
        onCompleted: () => {
            message.success('Category added successfully!');
        },
        onError: () => {
            message.error('Something error!');
        },
        fetchPolicy: 'no-cache',
        refetchQueries: [
            { query: CATEGORIES }
        ]
    });

    const handleOk = () => {
        const error: IError = {} as IError;
        if (!category.trim()) error.category = "Category name is required.";
        if (!icon) error.icon = "Icon is required.";
        if (isEmpty(error)) {
            addNewCategory({
                variables: { name: category, image: icon },
                update: (caches: any, { data: updateData }) => {
                    const prevData = caches.readQuery({ query: CATEGORIES });
                    let categories = prevData.categories;
                    categories = [updateData.addCategory, ...categories];
                    caches.writeQuery({ query: CATEGORIES, data: { categories } });
                }
            })
            setCategory("");
            setIcon(undefined);
            setOpen(false);
        }
        setError(error);
    }

    const handleCancel = () => {
        setCategory("");
        setIcon(undefined);
        setOpen(false);
    }
    console.log(error);
    return (
        <Modal
            visible={Boolean(props.match)}
            title="Add New Category"
            onOk={props.history.goBack}
            onCancel={props.history.goBack}
            // onOk={handleOk}
            // onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>Cancel</Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleOk}>Submit</Button>
            ]}
        >
            <FieldContainer>
                <Label>Name*</Label>
                <Input error={Boolean(error.category)} placeholder="Name" value={category} onChange={(e: any) => setCategory(e.target.value)} />
                <Error>{error.category}</Error>
            </FieldContainer>
            <FieldContainer>
                <Label>Icon*</Label>
                <UploadContainer>
                    <ImageUpload error={Boolean(error.icon)} image={icon!} setImage={setIcon} />
                </UploadContainer>
                <Error>{error.icon}</Error>
            </FieldContainer>
        </Modal>
    )
}

export default AddNewCategoryModal;

const FieldContainer = styled.div`
    margin: 8px auto;
`;

const UploadContainer = styled.div`

`;

const Label = styled.label`
    letter-spacing: 1px;
`;

const Error = styled.p`
    color: red;
`;

const Input = styled(AntdInput) <{ error: boolean }>`
    border: 1px solid ${({ error }) => error ? 'red' : 'rgb(128 128 128 / 0.5)'};
`;