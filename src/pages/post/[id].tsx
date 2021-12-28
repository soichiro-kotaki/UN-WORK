import type { NextPage } from "next";
import Head from "next/head";

//apis
import { getUserProfileData } from "@apis/user";
import { getPostDetail } from "@apis/post";

//components
import { PostPageTemplate } from "@components/templates/PostPageTemplate";

//types
import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;

    let postData = await getPostDetail(id as string);
    const userData = await getUserProfileData(postData.uid);

    return { props: { userData: userData, postData: postData } };
};
