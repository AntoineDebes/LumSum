import React, { FC } from 'react';
import Image from 'next/image';
import gql from "graphql-tag";
import { useQuery } from '@apollo/react-hooks';
import { Empty, Spin } from 'antd';
import Link from 'next/link';
import CATEGORIES from '../graphql/categories.query';
import styles from '../styles/AllCategories.module.scss';

const GET_CATEGORY_TEXT = gql`
  {
    getCategoryText {
      text
    }
  }
`;
const QuickSearchCategories: FC = () => {
    const { loading, error, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network"
    })
    const { data: categoryText } = useQuery(GET_CATEGORY_TEXT);

    if (loading)
        return (<Spin />);

    if (error)
        return (<Empty>Can't find what you want... <Link href="/contact-us">Contact Us</Link></Empty>)

    return (
        <div className="container">
            <h2 className={styles.title1}>The Categories</h2>
            <h1 className={styles.title2}>Quick Search</h1>
            <div className={styles.grid}>
            {data?.categories?.map((category, key:number) => (
                <Link key={key} href={`/${category.id}`}>
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
            {/* <div
          className={styles.categoryText}
          dangerouslySetInnerHTML={{
            __html: categoryText?.getCategoryText?.text || "",
          }}
        /> */}
        </div>
    )
}

export default QuickSearchCategories;

