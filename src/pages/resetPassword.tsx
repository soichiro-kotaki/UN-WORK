import type { NextPage } from "next";
import Head from "next/head";

//components
import { ResetPasswordPageTemplate } from "@components/templates/ResetPasswordPageTemplate";

const resetpassword: NextPage = () => {
    return (
        <>
            <Head>
                <title>パスワード再設定</title>
            </Head>

            <ResetPasswordPageTemplate />
        </>
    );
};

export default resetpassword;
