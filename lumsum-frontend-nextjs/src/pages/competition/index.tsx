import React, { Fragment } from "react";
import Head from "next/head";
import styles from "../../styles/forum.module.scss";
import styles2 from "../../styles/Header.module.scss";
import Footer from "src/layouts/Footer";
import Link from "next/link";
import BreadCrumb from "../../components/BreadCrumb";

const Forum = () => {
    return (
        <Fragment>
            <Head>
                <title>Competition | Lumsum </title>
                <link rel="icon" href="/lumsum.png" type="image/png" />
                <script type="text/javascript" src="https://widget.gleamjs.io/e.js" async />
            </Head>
            <main>
                <BreadCrumb title="Leader Board">
                    <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
                    <BreadCrumb.Item>Competition</BreadCrumb.Item>
                </BreadCrumb>
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className="lb-btn-container">
                            <Link href="/competition/leader-board">
                                <div className="button">View Leader Board</div>
                            </Link>
                        </div>
                        <a className="e-widget no-button" href="https://gleam.io/bXZ0D/lumsum-hunt" rel="nofollow">
                            Lumsum Hunt
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </Fragment>
    );
};

export default Forum;
