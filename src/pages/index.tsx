import { useEffect, useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

//apis
import { getAllPostsData } from "@apis/post";

//libs
import { auth } from "@libs/firebaseConfig";

//components
import { TopPageTemplate } from "@components/templates/TopPageTemplate";
import { IsUserContext } from "./_app";

//types
import { GetServerSideProps } from "next";
import { PostDataType } from "src/types/post/PostDataType";

type Props = {
    allPostsData: PostDataType[];
};

const Home: NextPage<Props> = (props) => {
    const { allPostsData } = props;
    const router = useRouter();
    const currentUser = useContext(IsUserContext);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!currentUser || !user.emailVerified) {
                router.push("/login");
            }
        });
    }, [router, currentUser]);

    // const handleLogOut = async () => {
    //     try {
    //         await auth.signOut();
    //         router.push("/login");
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // };

    return <>{currentUser ? <TopPageTemplate allPostsData={allPostsData} /> : <div></div>}</>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const allPostsData = await getAllPostsData();

    return { props: { allPostsData: allPostsData } };
};
