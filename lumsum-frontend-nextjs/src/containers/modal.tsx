import React from 'react';
import Modal from 'react-modal';
import styles from '../styles/Banner.modal.module.scss';
import Link from 'next/link';

const ModalContainer = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setIsOpen(true);
        }, 2000);
    }, []);


    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Campaign Video"
            style={{
                overlay: {zIndex: 999},
            }}
            className="absolute  overflow-visible"
        >

            <div className={styles.background}>
                <div>
                    <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                        <img src="/competition/cancel.svg" width={20} height={20}/>
                    </button>
                        <Link href='/competition'>
                        <picture>
                            <source
                                srcSet="https://lumsum-assets.s3.me-south-1.amazonaws.com/competition/banner.webp"
                                type="image/webp"
                            />
                            <img
                                src="https://lumsum-assets.s3.me-south-1.amazonaws.com/Image.jpg"
                                alt="competition modal"
                                className={styles.modalImage}
                            />
                        </picture>
                    </Link>

                </div>
            </div>
        </Modal>
    )
};

export default ModalContainer;