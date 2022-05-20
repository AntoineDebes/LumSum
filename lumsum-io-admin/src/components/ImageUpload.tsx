import { CameraOutlined } from '@ant-design/icons';
import React, { FC, Fragment, useMemo, useRef } from 'react';
import styled from 'styled-components';

type OnChange = (event: React.ChangeEvent<HTMLInputElement>) => void

interface ImageUploadProps {
    error: boolean;
    image: File;
    setImage: (image: File) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({ error, image, setImage }) => {

    const onChange: OnChange = (event) => {
        if (event.target.files?.length) {
            const file = event.target.files[0];
            setImage(file);
        }
    }

    const renderBody = useMemo(() => {
        if (!image)
            return (
                <Button>
                    <CameraOutlined />
                </Button>
            )
        return (
            <ImagePreview src={URL.createObjectURL(image)} />
        )
    }, [image])

    return (
        <Fragment>
            <Label htmlFor="fileElem">
                <Wrapper error={error}>
                    {renderBody}
                </Wrapper>
            </Label>
            <Upload id="fileElem" onChange={onChange} />
        </Fragment >
    )
}

export default ImageUpload;

const Wrapper = styled.div<{ error: boolean }>`
    --image-upload-container-size: 150px;
    height: var(--image-upload-container-size);
    width: var(--image-upload-container-size);
    background-color: rgb(128 128 128 / 0.1);
    border-radius: 4px;
    border: 1px dashed ${({ error }) => error ? 'red' : 'rgb(128 128 128 / 0.5)'};
`;

const Button = styled.div`
    height: 100%;
    width: 100%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
    background-color: transparent;

    svg {
        height: calc(var(--image-upload-container-size) / 4);
        width: calc(var(--image-upload-container-size) / 4);
        font-weight: normal;
        color: rgb(128 128 128 / 0.5);
        transition: color 0.25s;
    }

    &:hover {
        svg {
            color: var(--base-color);
        }
    }
`;

const Label = styled.label`
    height: 100%;
    width: 100%;
    cursor: pointer;
`;

const ImagePreview = styled.img`
    height: 100%;
    width: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
`;

const Upload = styled.input.attrs(props => ({
    type: "file",
    accept: "image/*"
}))`
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
`;
