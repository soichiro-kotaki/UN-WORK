import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getBookmarkedPosts, getPostEachUser } from "@apis/post";
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
    userBookmarkedPostsData: PostDataType[];
};

const user: NextPage<Props> = (props) => {
    const { userData, userPostsData, userBookmarkedPostsData } = props;

    return (
        <>
            <Head>
                <title>マイページ</title>
            </Head>

            <UserPageTemplate
                userData={userData}
                userPostsData={userPostsData}
                userBookmarkedPostsData={userBookmarkedPostsData}
            />
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
    let userPostsData = [];
    let userBookmarkedPostsData = [];

    const signinedUserData = await getUserProfileData(uid as string);
    userData = signinedUserData;

    if (!userData) {
        const testUserData = await getTestUserProfileData();
        userData = testUserData;
    } else {
        userPostsData = await getPostEachUser(uid as string);
        userBookmarkedPostsData = await getBookmarkedPosts(uid as string);
    }

    return {
        props: {
            userData: userData,
            userPostsData: userPostsData,
            userBookmarkedPostsData: userBookmarkedPostsData,
        },
        revalidate: 30,
    };
};
