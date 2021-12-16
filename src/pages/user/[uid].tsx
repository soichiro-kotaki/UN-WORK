import { useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";

//libs
import { db } from "@libs/firebaseConfig";

//components
import { UserPageTemplate } from "@components/templates/UserPageTemplate";

//types
import { GetServerSideProps } from "next";
import { UserDataType } from "src/types/user/UserDataType";

type Props = {
    userData: UserDataType;
};

const user: NextPage<Props> = (props) => {
    const { userData } = props;

    return (
        <>
            <Head>
                <title>マイページ</title>
            </Head>

            <UserPageTemplate userData={userData} />
        </>
    );
};

export default user;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { uid } = context.params;
    let userData = (await db.collection("users").doc(`${uid}`).get()).data();
    userData.created_at = userData.created_at.toDate().toLocaleDateString();

    return { props: { userData: userData } };
};
