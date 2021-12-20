import type { NextPage } from "next";
import Head from "next/head";

//components
import { PostFormPageTemplate } from "@components/templates/PostFormPageTemplate";

const postform: NextPage = () => {
    return (
        <>
            <Head>
                <title>求人作成</title>
            </Head>

            <PostFormPageTemplate />
        </>
    );
};

export default postform;
