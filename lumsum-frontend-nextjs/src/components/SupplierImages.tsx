import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Carousel, Modal } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

type SupplierImage = {
    id: string;
    image: string;
};

type OnCancel = () => void;

interface SupplierImagesProps {
    images: SupplierImage[];
    isLoggedIn: boolean;
}

interface ModalCarouselProps {
    images: SupplierImage[];
    visible: boolean;
    currentIndex: number;
    onCancel: OnCancel;
}

const ModalCarousel: FC<ModalCarouselProps> = ({ images, visible, currentIndex, onCancel }) => {
    const modalSlider = useRef(null);
    const [refVisible, setRefVisible] = useState(false);

    useEffect(() => {
        if (refVisible) modalSlider.current.goTo(currentIndex);
    }, [refVisible, currentIndex]);

    return (
        <Modal centered title={null} footer={null} visible={visible} onCancel={onCancel} className="carousel-modal">
            <div className="carousel">
                <div className="carousel-arrows left" onClick={() => modalSlider.current.prev()}>
                    <LeftOutlined />
                </div>
                <Carousel
                    ref={(ref) => {
                        modalSlider.current = ref;
                        setRefVisible(!!ref);
                    }}
                    arrows={false}
                    dots={false}
                >
                    {images.map((image, index) => (
                        <img key={image.id} src={`${process.env.UPLOAD_URL}${image.image}`} alt={`image-${index}`} width="90%" />
                    ))}
                </Carousel>
                <div className="carousel-arrows right" onClick={() => modalSlider.current.next()}>
                    <RightOutlined />
                </div>
            </div>
        </Modal>
    );
};

const SupplierImages: FC<SupplierImagesProps> = ({ images, isLoggedIn }) => {
    const router = useRouter();
    const slider = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [indexToPass, setIndexToPass] = useState(0);

    const imageClickHandler = (index: number) => {
        if (!isLoggedIn) {
            Swal.fire({
                text: "Login to see images",
                icon: "warning",
                showCancelButton: false,
                confirmButtonText: "Continue",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });
        } else {
            setIndexToPass(index);
            setIsModalVisible(true);
        }
    };

    const calculateSlidesToShow = (): number => {
        let slidesToShow = 3;
        if (images.length === 1) {
            slidesToShow = 1;
        } else if (images.length === 2) {
            slidesToShow = 2;
        }

        return slidesToShow;
    };

    const initialSlideToShow = (): number => {
        let initialSlide = 1;
        if (images.length === 2) {
            initialSlide = 0;
        }

        return initialSlide;
    };

    return (
        <Fragment>
            <div className={`carousel-container ${calculateSlidesToShow() === 1 ? "one" : null}`}>
                <div className="carousel-arrows left" onClick={() => slider.current.prev()}>
                    <LeftOutlined />
                </div>
                <Carousel
                    ref={(ref) => {
                        slider.current = ref;
                    }}
                    arrows={false}
                    centerMode={true}
                    infinite={true}
                    slidesToShow={calculateSlidesToShow()}
                    centerPadding="0px"
                    dots={false}
                    className="center"
                    initialSlide={initialSlideToShow()}
                >
                    {images.map((image, index) => (
                        <img
                            onClick={() => imageClickHandler(index)}
                            key={image.id}
                            src={`${process.env.UPLOAD_URL}${image.image}`}
                            alt={`image-${index}`}
                            width="100%"
                        />
                    ))}
                </Carousel>
                <div className="carousel-arrows right" onClick={() => slider.current.next()}>
                    <RightOutlined />
                </div>
            </div>

            <ModalCarousel currentIndex={indexToPass} visible={isModalVisible} images={images} onCancel={() => setIsModalVisible(false)} />
        </Fragment>
    );
};

export default SupplierImages;
