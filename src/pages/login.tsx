import type { NextPage } from "next";
import Head from "next/head";

//components
import { LoginPageTemplate } from "@components/templates/LoginPageTemplate";

const login: NextPage = () => {
    return (
        <>
            <Head>
                <title>ログイン</title>
            </Head>

            <LoginPageTemplate />
        </>
    );
};

export default login;
