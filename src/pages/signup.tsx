import type { NextPage } from "next";
import Head from "next/head";

//components
import { SignupPageTemplate } from "@components/templates/SignupPageTemplate";

const signup: NextPage = () => {
    return (
        <>
            <Head>
                <title>新規アカウント作成</title>
            </Head>

            <SignupPageTemplate />
        </>
    );
};

export default signup;
