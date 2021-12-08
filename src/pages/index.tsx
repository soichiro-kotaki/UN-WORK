import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

//libraries
import { auth } from "@libs/firebaseConfig";

const Home: NextPage = () => {
    const router = useRouter();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            !user && router.push("/login");
            !user.emailVerified && router.push("/login");
        });
    }, [router]);

    const handleLogOut = async () => {
        try {
            await auth.signOut();
            router.push("login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <main className="w-full mt-16  mb-16 pt-6 pb-6 border-2   lg:mt-20 ">
                <h1 className="text-4xl text-center text-green-400">
                    ここに求人投稿の一覧を表示する
                </h1>

                <p onClick={handleLogOut} className="p-3 rounded-md ml-4 inline-block bg-green-400">
                    ログアウト
                </p>
            </main>
        </div>
    );
};

export default Home;
