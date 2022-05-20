import clsx from 'clsx';
import Head from 'next/head';
import Footer from '../layouts/Footer';
import BreadCrumb from '../components/BreadCrumb';
import AllCategories from '../containers/AllCategories';
import Filter from '../containers/Filter';
import styles from '../styles/categories.module.scss'

export default function Categories() {
  return (
    <>
      <Head>
        <title>Lumsum | Categories</title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>

      <main>
        <BreadCrumb title="All Categories">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>All Categories</BreadCrumb.Item>
        </BreadCrumb>
        <div className={clsx("container", styles.allCategories)}>
          <div className={styles.filterContainer}>
            <h1 className={clsx("filter", styles.heading)}>Filter</h1>
            <Filter />
          </div>
          <div className={styles.dataContainer}>
            <h1 className={styles.heading}>All Categories</h1>
            <AllCategories />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
