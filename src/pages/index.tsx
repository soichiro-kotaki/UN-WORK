import { useEffect, useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

//apis
import { getAllPostsData } from "@apis/post";

//libs
import { auth } from "@libs/firebaseConfig";

//components
import { TopPageTemplate } from "@components/templates/TopPageTemplate";
import { UserAuthContext } from "./_app";
import { LoadingIcon } from "@components/atoms/LoadingIcon";

//types
import { GetServerSideProps } from "next";
import { PostDataType } from "src/types/post/PostDataType";

type Props = {
    allPostsData: PostDataType[];
};

const Home: NextPage<Props> = (props) => {
    const { allPostsData } = props;
    const router = useRouter();
    const User = useContext(UserAuthContext);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                if (user.isAnonymous) {
                    return;
                } else {
                    if (!user.emailVerified) {
                        router.push("/login");
                    }
                }
            } else {
                router.push("/login");
            }
        });
    }, [router, User.uid]);

    return (
        <>
            {User.uid ? (
                <TopPageTemplate allPostsData={allPostsData} />
            ) : (
                <div className="mt-8">
                    <LoadingIcon />
                </div>
            )}
        </>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const allPostsData = await getAllPostsData();

    return { props: { allPostsData: allPostsData } };
};
