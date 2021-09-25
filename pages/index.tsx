import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";
import Gun from "gun/gun";
import Counter from "../components/counter";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
const qs = require('querystring')

const gun = Gun("https://wtfdoc.herokuapp.com/gun");

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const [number, setNumber] = useState(0);
  const [board, setBoard] = useState("modez");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const query = qs.parse(window.location.search.replace('?', ''))
    const board = query.board || Math.random().toString(36).slice(2)
    const location: string = /board/.test(window.location + "") ? window.location + "" : `${window.location}?board=${board}`
    setBoard(board);
    setLocation(location);
  }, []);

  gun.get(board).on((state) => {
    console.log(state)
    setNumber(state.number);
    setBoard(state.board);
  }, true);

  const handleAddOne = () => {
    setNumber(number + 1);
    gun.get(board).put({ number: number });
  };

  const handleSubtractOne = () => {
    setNumber(number - 1);
    gun.get(board).put({ number });
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Counter
        number={number}
        plusOne={handleAddOne}
        minusOne={handleSubtractOne}
      />
      <section className={utilStyles.headingMd}>
        <p>A new generation of unproductivity tools. Its free</p>
        <p>
          Waste some more time on :
          <ul>
            <li>
              <a href="https://www.loana2001.com">Loana2001</a>
            </li>
          </ul>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
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
      </section>
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
