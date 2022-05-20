import Head from 'next/head';
import HomeSearch from '../containers/HomeSearch';
import HowItWorks from '../containers/HowItWorks';
import CompetitionModal from '../containers/modal';
import QuickSearchCategories from '../containers/QuickSearchCategories';
import Footer from '../layouts/Footer';
import React from "react";


export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/lumsum.png" type="image/png" />
        <link rel="canonical" href="https://www.lumsum.io/" />
        <title>UAE Business & Building Material Suppliers Directory – Dubai, Abu Dhabi, Sharjah, & Ajman | Lumsum</title>
        <meta content="UAE Business & Building Material Suppliers Directory – Dubai, Abu Dhabi, Sharjah, & Ajman | Lumsum" name="title" />
        <meta content="Lumsum, a business & building material suppliers directory is a first of its kind across the UAE region i.e. Dubai, Abu Dhabi, Sharjah, & Ajman. Find reliable & latest information about suppliers & products as we’re a one stop solution for your business & building material supplier needs." name="description" />
        <meta property="og:type" content='website' />
        <meta property="og:url" content='https://www.lumsum.io/' />
        <meta property="og:title" content='UAE Business & Building Material Suppliers Directory – Dubai, Abu Dhabi, Sharjah, & Ajman | Lumsum" ' />
        <meta property="og:description" content='Lumsum, a business & building material suppliers directory is a first of its kind across the UAE region i.e. Dubai, Abu Dhabi, Sharjah, & Ajman. Find reliable & latest information about suppliers & products as we’re a one stop solution for your business & building material supplier needs.' />
        <meta property="og:image" content='https://www.lumsum.io/lumsum.png' />
        <meta property="twitter:card" content='https://www.lumsum.io/lumsum.png' />
        <meta property="twitter:url" content='https://www.lumsum.io/' />
        <meta property="twitter:title" content='UAE Business & Building Material Suppliers Directory – Dubai, Abu Dhabi, Sharjah, & Ajman | Lumsum" ' />
        <meta property="twitter:description" content='Lumsum, a business & building material suppliers directory is a first of its kind across the UAE region i.e. Dubai, Abu Dhabi, Sharjah, & Ajman. Find reliable & latest information about suppliers & products as we’re a one stop solution for your business & building material supplier needs.' />
        <meta property="twitter:image" content='https://www.lumsum.io/lumsum.png' />
        <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=ea22ea31-186a-498f-b2af-3cb29540a1c1"> </script>
      </Head>
      <main>
        <HomeSearch />
        <HowItWorks />
        <QuickSearchCategories />
      </main>
      <Footer />
    </>
  )
}
