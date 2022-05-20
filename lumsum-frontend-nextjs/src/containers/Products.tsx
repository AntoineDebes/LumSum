import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/products.module.scss';

const Products = ({ products }) => {
    const router = useRouter()
    const { category } = router.query;
    
    if (!products?.length)
        return (
            <div>empty</div>
        )
    
        return(
        <div className="container">
            <div className={styles.grid}>
            {products?.map((product) => (
                <Link href={`/${category}/${product.id}`}>
                    <div className={styles.card}>
                        <div className={styles.imgWrap}>
                            <img 
                                src={`${process.env.UPLOAD_URL}${product.icon}`} 
                                alt={product.name} 
                                // layout="responsive"
                                height={150}
                                width={150}
                            />
                        </div>
                        <p className={styles.name}>{product.name}</p>
                    </div>
                </Link>
                    ))}
            </div>
        </div>
    )
}

export default Products;