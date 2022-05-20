import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/react-hooks';
import { Empty, Spin } from 'antd';
import CATEGORIES from '../graphql/categories.query';
import styles from '../styles/AllCategories.module.scss';

const AllCategories: FC = () => {
    const { loading, error, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network"
    })

    if (loading)
        return (<Spin />);

    if (error)
        return (<Empty>Can't find what you want... <Link href="/contact-us">Contact Us</Link></Empty>)

    return (
        <div className="container">
            <div className={styles.grid}>
            {data?.categories?.map((category) => (
                <Link href={`/${category.id}`}>
                    <div className={styles.card}>
                        <div className={styles.imgWrap}>
                            <img 
                                src={`${process.env.UPLOAD_URL}${category.icon}`} 
                                alt={category.name} 
                                height={150}
                                width={150}
                            />
                        </div>
                        <p className={styles.name}>{category.name}</p>
                    </div>
                </Link>
                    ))}
            </div>
        </div>
    )
}

export default AllCategories;

