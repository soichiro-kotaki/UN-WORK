import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";

//libraries
import firebase from "firebase/app";
import "firebase/auth";
import { auth } from "@libs/firebaseConfig";

//components
import { TopPageTemplate } from "@components/templates/TopPageTemplate";

const Home: NextPage = () => {
    const router = useRouter();
    // const [authState, setAuthState] = useState<undefined | firebase.User | null>(undefined);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            // setAuthState(user);
            if (!user || !user.emailVerified) {
                router.push("/login");
            }
        });
    }, [router]);

    const handleLogOut = async () => {
        try {
            await auth.signOut();
            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <TopPageTemplate handleLogOut={handleLogOut} />
        </div>
    );
};

export default Home;
