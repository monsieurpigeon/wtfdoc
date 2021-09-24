import Link from "next/link";
import Head from "next/head";
import Layout from "../components/layout";

export default function Contact() {
  // If you need to add attributes like, for example, className, add it to the a tag,
  // not to the Link tag.
  return (
    <>
      <Layout>
        <Head>
          <title>Contact Me</title>
        </Head>
        <h1>Contact Me</h1>
        <p>If you want</p>
        <h2>
          <Link href="/">
            <a>Back to home</a>
          </Link>
        </h2>
      </Layout>
    </>
  );
}
