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
import { BaseLayout } from "@components/layouts/BaseLayout";

type Props = {
    userData: UserDataType;
    postData: PostDataType | null;
};

const post: NextPage<Props> = (props) => {
    const { userData, postData } = props;

    return (
        <>
            <Head>
                <title>{postData ? postData.title : "404エラー"}</title>
            </Head>
            {postData ? (
                <PostPageTemplate userData={userData} postData={postData} />
            ) : (
                <BaseLayout>
                    <main className="w-full min-h-screen py-6 bg-background-main lg:w-3/5 lg:mx-auto">
                        <div className="text-base lgtext-lg text-center">
                            この求人は投稿者によって削除されました🙏
                        </div>
                    </main>
                </BaseLayout>
            )}
        </>
    );
};

export default post;

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
    const postID = params.postID;
    let userData = {};

    let postData = await getPostDetail(postID as string);
    if (postData) {
        userData = await getUserProfileData(postData.uid);
    } else {
        postData = null;
    }

    return { props: { userData: userData, postData: postData }, revalidate: 60 };
};
