import React from 'react';
import Image from 'next/image'
import clsx from 'clsx';
import styles from '../styles/HowItWorks.module.scss';

interface IItem {
    text: string;
    name: string;
    image: string;
};

const items: Array<IItem> = [
    {
        "text": "Choose the desired Category",
        "name": "Choose",
        "image": "/choose.png"
    },
    {
        "text": "Select the product you are looking for",
        "name": "Select",
        "image": "/select.png"
    },
    {
        "text": "Scroll and click on the supplier",
        "name": "Scroll",
        "image": "/scroll.png"
    },
    {
        "text": "Contact the supplier and rate them.",
        "name": "Review",
        "image": "/review.png"
    }
];
const HowItWorks = () => {
    return (
        <div className="container">
            <h1 className={styles.title}>How It Works</h1>
            <div className={clsx("inner", styles.items)}>
                {items.map((item: IItem, key: number) => (
                    <aside key={key} className={styles.item}>
                        <div>
                            <img height={60}  src={item.image} alt={item.name} />
                        </div>
                        <div>
                            <h2>{item.name}</h2>
                            <p>{item.text}</p>
                        </div>
                    </aside>
                ))}
            </div>
        </div>
    )
}

export default HowItWorks;
