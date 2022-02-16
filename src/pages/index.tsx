import { useEffect, useContext } from "react";
import type { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";

//apis
import { getAllPostsData } from "@apis/post";

//libs
import { auth } from "@libs/firebaseConfig";

//components
import { TopPageTemplate } from "@components/templates/TopPageTemplate";
import { LoadingIcon } from "@components/atoms/icons/LoadingIcon";

//types
import { PostDataType } from "src/types/post/PostDataType";

//contextAPI
import { UserAuthContext } from "./_app";

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
    }, [router]);

    return (
        <>
            {User.uid ? (
                <TopPageTemplate allPostsData={allPostsData} />
            ) : (
                <div className="mt-20">
                    <LoadingIcon />
                </div>
            )}
        </>
    );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = await getAllPostsData();

    return { props: { allPostsData: allPostsData }, revalidate: 60 };
};
