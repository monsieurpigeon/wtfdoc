import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>A new generation of unproductivity tools. Its free</p>
        <p>
          Waste some more time on :
          <ul>
            <li><a href="https://www.loana2001.com">Loana2001</a></li>
          </ul>
        </p>
      </section>
    </Layout>
  );
}
