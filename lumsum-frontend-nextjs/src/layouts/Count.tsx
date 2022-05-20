import React from 'react';
import clsx from 'clsx';
import CountUp from 'react-countup';
import { useQuery } from '@apollo/react-hooks';
import COUNTS from '../graphql/counts.query';
import styles from '../styles/count.module.scss';

const Count = () => {
    const { loading, error, data } = useQuery(COUNTS, {
        fetchPolicy: "cache-and-network"
    });

    if (loading)
        return (<div>Loading..</div>)

    if (error)
        return (<div>Error!</div>)

    return (
        <div className={clsx("container", styles.countContainer)}>
            <div className={clsx("inner", styles.countWrap)}>
                <aside className={styles.countItem}>
                    <CountUp className={styles.count} end={data.counts.visitors} duration={5} />
                    <h2 className={styles.title}>Visitors</h2>
                </aside>
                <aside className={styles.countItem}>
                    <CountUp className={styles.count} end={data.counts.suppliers} duration={5} />
                    <h2 className={styles.title}>Suppliers</h2>
                </aside>
                <aside className={styles.countItem}>
                    <CountUp className={styles.count} end={data.counts.products} duration={5} />
                    <h2 className={styles.title}>Products</h2>
                </aside>
                <aside className={styles.countItem}>
                    <CountUp className={styles.count} end={data.counts.reviews} duration={5} />
                    <h2 className={styles.title}>Total Reviews</h2>
                </aside>
            </div>
        </div>
    )
}

export default Count;