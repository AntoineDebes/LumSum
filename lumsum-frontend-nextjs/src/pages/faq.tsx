import Head from "next/head";
import Footer from "../layouts/Footer";
import BreadCrumb from "../components/BreadCrumb";
import styles from "../styles/privacy-policy.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Frequently Asked Question | Lumsum </title>
        <link rel="icon" href="/lumsum.png" type="image/png" />
      </Head>
      <main>
        <BreadCrumb title="Frequently Asked Question">
          <BreadCrumb.ItemLink href="/">Home</BreadCrumb.ItemLink>
          <BreadCrumb.Item>Frequently Asked Question</BreadCrumb.Item>
        </BreadCrumb>
        <div className={styles.container}>
          <div className={styles.inner}>
            <h1 className={styles.title}>Frequently Asked Question</h1>
            <div className={styles.content}>
              <h2 className={styles.subTitle}>
                1. What is Lumsum and how can I search in Lumsum?
              </h2>
              <p className={styles.paragraph}>
                Lumsum is your one-stop solution for the latest construction
                materials and tools. With lumsum you are always a click away
                from connecting with suppliers you are looking for. The website
                is made to be simple and friendly, but still covers all the
                categories needed. Each category has a sub-category to narrow it
                down. Once chosen it will provide you with the business that can
                supply it to you. You can scroll, select and contact the
                supplier.
              </p>
              <h2 className={styles.subTitle}>
                2. What is the meaning of Lumsum ?
              </h2>
              <p className={styles.paragraph}>
                Lumsum is the way the market here pronounces Lumpsum. It is
                meant to show that the website can cater to all your
                construction needs.
              </p>
              <h2 className={styles.subTitle}>
                3. How do I get my business listed?
              </h2>
              <p className={styles.paragraph}>
                We like to keep it personal. Drop us you email, number, and city
                in the contact us form, and our representative will contact you.
              </p>
              <p className={styles.paragraph}>
                Keep in mind that there are NO CHARGES to be a member of our
                website.
              </p>
              <h2 className={styles.subTitle}>4. How do I register a user ?</h2>
              <ul className={styles.listItem}>
                <li>
                  On the Lumsum home page, select your login icon in the top
                  right-hand corner.
                </li>
                <li>
                  Click Register and select a username of your choice in the
                  name area (publicly visible)
                </li>
                <li>Enter your e-mail and add an appropriate password.</li>
                <li>
                  Click Register to confirm. Now you can choose a new profile
                  picture and add as many reviews as you want.
                </li>
              </ul>
              <h2 className={styles.subTitle}>
                5. Can I buy directly from the website?
              </h2>
              <p className={styles.paragraph}>
                Lumsum offers the direct contact information of suppliers, but
                we help you decide by showing their ratings and sharing reviews
                about them by other users.
              </p>
              <h2 className={styles.subTitle}>
                6. Does your site edit the content of the reviews published?
              </h2>
              <p className={styles.paragraph}>
                Absolutely no! We work hard to create a site that is helpful and
                maintains high-quality, relevant content. Therefore, every
                review must be connected to a user profile that has a real
                person behind it. We will always make sure that the reviews are
                here to provide valuable insights and feedbacks of the
                suppliers' products.
              </p>
              <h2 className={styles.subTitle}>7. What cities you cover?</h2>
              <p className={styles.paragraph}>
                We are currently covering all seven emirates of the UAE.
                Hopefully, we will expand our services to other countries in the
                Middle East.
              </p>
              <h2 className={styles.subTitle}>8. How much does Lumsum cost?</h2>
              <p className={styles.paragraph}>
                Business listing is FREE, and users registration is FREE.
              </p>
              <h2 className={styles.subTitle}>
                9. How does Lumsum help my Business grow?
              </h2>
              <p className={styles.paragraph}>
                Being a part of Lumsum family will help your business attract
                more customers. We will showcase your business details with
                direct contact information to make reaching you easily like
                never before. We will also notify you and allow you to respond
                to reviews or ask for more information about customers'
                experience.
              </p>
              <h2 className={styles.subTitle}>
                10. Do I need a user account to use Lumsum?
              </h2>
              <p className={styles.paragraph}>
                If you just want to read reviews and check our categories you
                don't need a user account, but you'll definitely need one if you
                want to write a review!
              </p>
              <h2 className={styles.subTitle}>11. Why my review is removed ?</h2>
              <p className={styles.paragraph}>
                Users'reviews and vendor responses to a review must be
                respectful and constructive and may not contain abusive,
                hateful, threatening, or harassing content. Any fraudulent
                review or response that violate these Guidelines may be removed.
              </p>
              <h2 className={styles.subTitle}>
                12. Can't find what you're looking for ?
              </h2>
              <p className={styles.paragraph}>
                We are always here for you, contact us directly on
                <br />
                +(971) - 056 5423746
                <br /> +(971) - 056 5427286
                <br /> or send us an e-mail to info@lumsum.io
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
