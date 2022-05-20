import Head from 'next/head';
import Footer from '../layouts/Footer';
import BreadCrumb from '../components/BreadCrumb';
import styles from '../styles/about-us.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>About Us | Lumsum  </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title="About Lumsum">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>About Lumsum</BreadCrumb.Item>
        </BreadCrumb>
        <div className={styles.container}>
          <div className={styles.inner}>
            <h1 className={styles.title}>What is Lumsum?</h1>
            <div className={styles.content}>
              <aside className={styles.item}>
                <img src="/shovel.png" alt="shovel" />
                <h2>Research</h2>
                <p>Our team digs deep in the market and gather data about buildings material suppliers.</p>
              </aside>
              <aside className={styles.item}>
                <img src="/organize-and-sort.png" alt="organize & sort" />
                <h2>Process &amp; Sort</h2>
                <p>Our team analyze the gathered data constantly to sort and list it under the right category to suit the industry requirements.</p>
              </aside>
              <aside className={styles.item}>
                <img src="/projector.png" alt="Projector" />
                <h2>Display</h2>
                <p>We show you the information that matter to you most. Suppliers displayed along with direct contact information to make reaching them easily like never before.</p>
              </aside>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
