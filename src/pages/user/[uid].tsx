import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getPostEachUser } from "@apis/post";
import { getUserProfileData } from "@apis/user";
import { getTestUserProfileData } from "@apis/user";

//libs
import { db } from "@libs/firebaseConfig";

//components
import { UserPageTemplate } from "@components/templates/UserPageTemplate";

//types
import { UserDataType } from "src/types/user/UserDataType";
import { PostDataType } from "src/types/post/PostDataType";

type Props = {
    userData: UserDataType;
    userPostsData: PostDataType[];
};

const user: NextPage<Props> = (props) => {
    const { userData, userPostsData } = props;

    return (
        <>
            <Head>
                <title>マイページ</title>
            </Head>

            <UserPageTemplate userData={userData} userPostsData={userPostsData} />
        </>
    );
};

export default user;

export const getStaticPaths: GetStaticPaths = async () => {
    const uidList = [];
    const allUserData = await db.collection("users").get();
    allUserData.forEach((userData) => {
        uidList.push(userData.id);
    });

    const paths = uidList.map((uid) => `/user/${uid}`);

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const uid = params.uid;
    let userData = {};
    const signinedUserData = await getUserProfileData(uid);
    userData = signinedUserData;

    if (!userData) {
        const testUserData = await getTestUserProfileData();
        userData = testUserData;
    }

    const userPostData = await getPostEachUser(uid);

    return { props: { userData: userData, userPostsData: userPostData }, revalidate: 60 };
};
