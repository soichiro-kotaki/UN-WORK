import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getUserProfileData } from "@apis/user";
import { getPostDetail } from "@apis/post";

//libs
import { db } from "@libs/firebaseConfig";

//components
import { PostPageTemplate } from "@components/templates/PostPageTemplate";

//types
import { UserDataType } from "src/types/user/UserDataType";
import { PostDataType } from "src/types/post/PostDataType";

type Props = {
    userData: UserDataType;
    postData: PostDataType;
};

const user: NextPage<Props> = (props) => {
    const { userData, postData } = props;

    return (
        <>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <PostPageTemplate userData={userData} postData={postData} />
        </>
    );
};

export default user;

export const getStaticPaths: GetStaticPaths = async () => {
    const postIDList = [];
    const allPostsData = await db.collection("posts").get();
    allPostsData.forEach((postData) => {
        postIDList.push(postData.id);
    });

    const paths = postIDList.map((postID) => `/post/${postID}`);

    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postID = params.id;

    const postData = await getPostDetail(postID as string);
    const userData = await getUserProfileData(postData.uid);

    return { props: { userData: userData, postData: postData }, revalidate: 300 };
};
