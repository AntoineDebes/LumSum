import React, { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import styles from '../styles/Details.module.scss';

interface DetailsProps {
    name: string;
    desc: string;
    icon: string;
    banner?: string;
    bannerMobile?: string;
    bannerActive?: boolean;
    bannerUrl?: string;
}

const Details: FC<DetailsProps> = ({ name, desc, icon, banner, bannerMobile, bannerActive, bannerUrl }) => (
    <>
        <h1 className={clsx(styles.heading, styles.name)}>{name}</h1>
        <div className={styles.infoContainer}>
            <div className={styles.info}>
                <dl className={styles.desc}>
                    <dt>About</dt>
                    <dd>{desc}</dd>
                </dl>
                <div className={styles.adImage} hidden={!bannerActive}>
                    <a href={bannerUrl}>
                    <img
                        alt="banner image"
                        src={`${process.env.UPLOAD_URL}${banner}`}
                        srcSet={`${process.env.UPLOAD_URL}${bannerMobile} 640w, 
                        ${process.env.UPLOAD_URL}${banner}`}
                        sizes="
                          (min-width: 768px) 768px,
                          100vw
                        "
                        />
                    </a>
                </div>
            </div>
            <div className={styles.imgWrap}>
                <img
                    src={`${process.env.UPLOAD_URL}${icon}`}
                    alt={name}
                    height={150}
                    width={150}
                />
            </div>
        </div>
    </>
)

export default Details;
