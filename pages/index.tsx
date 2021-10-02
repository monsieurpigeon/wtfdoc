import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Emoji from "../components/emoji";
import Counter from "../components/counter";
import { GetStaticProps } from "next";
const qs = require('querystring')

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Counter board={"/"}/>
      <Emoji board={"/"}/>
      <section className={utilStyles.headingMd}>
        <p>A new generation of unproductivity tools. Its free</p>
        <p>You can visit any URL and get a WTFDoc : <a href="/RANDOM">RANDOM</a></p>
        {/* <p>You can write whatever you want in it, the content is only stored on your private machines</p>
        <p>If every writer closes the tab of this WTFDoc, the content is invisible for anyone else</p> */}
        <p>All of this is working without infrastructure using <a href="https://gun.eco/">Gun database</a>, <a href="https://nextjs.org/">NextJS</a>, <a href="https://heroku.com/">Heroku</a> and <a href="https://vercel.com/">Vercel</a></p>
        <p>Check out the trending pages on the right. These are timestamps:</p>
        <p>All the website is open-sourced on <a href="https://github.com/WTFDoc">Github</a>, can't wait for your PRs</p>
        {/* <p>
          Waste some more time on :
          <ul>
            <li>
              <a href="https://www.loana2001.com">Loana2001</a>
            </li>
          </ul>
        </p> */}
      </section>
      {/* <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section> */}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
