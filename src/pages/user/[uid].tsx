import type { NextPage } from "next";
import Head from "next/head";

//apis
import { getPostEachUser } from "@apis/post";
import { getUserProfileData } from "@apis/user";

//components
import { UserPageTemplate } from "@components/templates/UserPageTemplate";

//types
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { uid } = context.params;

    const userData = await getUserProfileData(uid);
    const userPostData = await getPostEachUser(uid);

    return { props: { userData: userData, userPostsData: userPostData } };
};
