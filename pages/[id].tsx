import Layout from "../components/layout";
import Head from "next/head";
import utilStyles from "../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import Counter from "../components/counter";

export default function Doc({
  docData,
}: {
  docData: {
    id: string;
  };
}) {
  console.log(docData);
  return (
    <Layout>
      <Head>
        <title>{docData.id}</title>
      </Head>
      <Counter board={docData.id} />
      <article>
        <h1 className={utilStyles.headingXl}>{docData.id}</h1>
        <div className={utilStyles.lightText}></div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "modez" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      docData: params,
    },
  };
};

// SERVER SIDE RENDERING
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }

// CLIENT SIDE RENDERING
// Private data when SEO is not relevant

// SWR
// import useSWR from "swr";

// function Profile() {
//   const { data, error } = useSWR("/api/user", fetch);

//   if (error) return <div>failed to load</div>;
//   if (!data) return <div>loading...</div>;
//   return <div>hello {data.name}!</div>;
// }
