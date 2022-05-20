import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Count from './Count';
import EmailSubscription from './EmailSubscribe';
import Facebook from '../assets/svg/facebook.svg';
import Linkedin from '../assets/svg/linkedin.svg';
import Instagram from '../assets/svg/instagram.svg';
import styles from '../styles/footer.module.scss';

const FooterContainer = () => {
    return (
        <footer>
            <Count />
            <div className={clsx("container", styles.footerMiddle)}>
                <div className={clsx("inner", styles.innerMiddleItems)}>
                    <aside>
                        <div className={styles.footerLogoWrap}>
                            <Link href="/">
                                <img className={styles.footerLogo} src="/lumsum.png" alt="lumsum" />
                            </Link>
                            <p className={styles.title}>Lumsum UAE's Suppliers<br />Directory</p>
                            <p className={styles.title}>Email: <a href="mailto:info@lumsum.io">info@lumsum.io</a></p>
                        </div>
                    </aside>
                    <aside>
                        <h3 className={styles.footerHeading}>Social Links</h3>
                        <div className={styles.socials}>
                            <a className={clsx(styles.socialIconWrapper, styles.facebook)} href="https://www.facebook.com/lumSumUAE" target="_blank">
                                <Facebook />
                            </a>
                            <a className={clsx(styles.socialIconWrapper, styles.linkedin)} href="https://www.linkedin.com/company/lumsum-services-fz-llc" target="_blank">
                                <Linkedin />
                            </a>
                            <a className={clsx(styles.socialIconWrapper, styles.instagram)} href="https://instagram.com/lumsum_uae?igshid=18e1rr0j5b540" target="_blank">
                                <Instagram />
                            </a>
                        </div>
                    </aside>
                    <aside>
                        <h3 className={styles.footerHeading}>Quick Links</h3>
                        <ul className={clsx(styles.links, styles.verticalLinks)}>
                            <li><Link href="/categories">Categories</Link></li>
                            <li><Link href="/faq">FAQ's</Link></li>
                            <li><Link href="/about-us">About Lumsum</Link></li>
                            <li><Link href="/contact-us">Contact Us</Link></li>
                        </ul>
                    </aside>
                    <aside>
                        <h3 className={styles.footerHeading}>Community</h3>
                        <p className={styles.title}>Get the latest news & updates</p>
                        <EmailSubscription />
                    </aside>
                </div>
            </div>
            <div className={clsx("container", styles.footerBottom)}>
                <div className={clsx("inner", styles.innerItems)}>
                    <aside className={styles.bottomLeft}>
                        <ul className={styles.links}>
                            <li><Link href="/terms-of-use">Terms of Use</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/sitemap">Sitemap</Link></li>
                        </ul>
                    </aside>
                    <aside className={styles.bottomRight}>
                        <p className={styles.copyRight}>Copyright© 2020 lumsum services LLC. All rights reserved</p>
                    </aside>
                </div>
            </div>
        </footer>
    )
}

export default FooterContainer;