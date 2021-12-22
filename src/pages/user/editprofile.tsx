import type { NextPage } from "next";
import Head from "next/head";

//components
import { EditProfilePageTemplate } from "@components/templates/EditProfilePageTemplate";

const editprofile: NextPage = () => {
    return (
        <>
            <Head>
                <title>プロフィール編集</title>
            </Head>

            <EditProfilePageTemplate />
        </>
    );
};

export default editprofile;
