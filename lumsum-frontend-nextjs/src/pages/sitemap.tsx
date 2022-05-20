import { useQuery } from '@apollo/react-hooks';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../layouts/Footer';
import BreadCrumb from '../components/BreadCrumb';
import CATEGORIES_WITH_PRODUCTS from '../graphql/categories-with-products.query';
import styles from '../styles/sitemap.module.scss'

export default function Sitemap() {
  const { data } = useQuery(CATEGORIES_WITH_PRODUCTS, {
    fetchPolicy: "cache-and-network"
  });
  return (
    <>
      <Head>
        <title>Sitemap | Lumsum  </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title="Sitemap">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>Sitemap</BreadCrumb.Item>
        </BreadCrumb>
        <div className="container">
          <div className="inner">
            <h1>Main Menu</h1>
            <ul className={styles.list}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/terms-of-use">Terms Of Use</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li>
                <Link href="/categories">Categories</Link>
                <ul className={styles.list}>
                  {data?.categories?.map((category: any, key: number) => {
                    return (
                      <li key={key}>
                        <Link href={`/${category.id}`}>{category.name}</Link>
                        <ul className={styles.list}>
                          {category?.products?.map((product: any, key: number) => {
                            return (
                              <li key={key}>
                                <Link href={`/${category.id}/${product.id}`}>{product.name}</Link>
                              </li>
                            )
                          })}
                        </ul>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
