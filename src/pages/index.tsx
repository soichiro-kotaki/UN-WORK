import { useEffect, useContext } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

//libraries
import "firebase/auth";
import { auth } from "@libs/firebaseConfig";

//components
import { TopPageTemplate } from "@components/templates/TopPageTemplate";
import { IsUserContext } from "./_app";
import { LoadingIcon } from "@components/atoms/LoadingIcon";

const Home: NextPage = () => {
    const router = useRouter();
    const currentUser = useContext(IsUserContext);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (!currentUser || !user.emailVerified) {
                router.push("/login");
            }
        });
    }, [router, currentUser]);

    const handleLogOut = async () => {
        try {
            await auth.signOut();
            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return <>{currentUser ? <TopPageTemplate handleLogOut={handleLogOut} /> : <LoadingIcon />}</>;
};

export default Home;
