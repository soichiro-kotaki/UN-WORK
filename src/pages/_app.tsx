import React, { useState, useEffect } from "react";

//styles
import "@styles/tailwind.css";

//components
import Head from "next/head";
import { ThemeProvider } from "next-themes";

//libs
import { auth } from "@libs/firebaseConfig";

//types
import { UserAuthContextType } from "src/types/user/UserAuthContextType";
import type { AppProps } from "next/app";

//contextAPI
export const UserAuthContext = React.createContext<UserAuthContextType>({
    uid: undefined,
    isTestUser: false,
});

function MyApp({ Component, pageProps }: AppProps) {
    const [uid, setUid] = useState(undefined);
    const [isTestUser, setIsTestUser] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            //認証状態に関するUserオブジェクトをグローバルstateとして、ユーザーの状態を管理
            if (user) {
                setUid(user.uid);

                if (user.isAnonymous) {
                    setIsTestUser(true);
                }
            }
        });

        return () => {
            setUid(undefined);
            setIsTestUser(false);
        };
    }, []);

    return (
        <>
            <Head>
                <title>UN WORK</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width,initial-scale=1.0" />
                <link rel="icon" href="/un-work-icon.svg" />
            </Head>
            <ThemeProvider attribute="class" defaultTheme="light">
                <UserAuthContext.Provider value={{ uid: uid, isTestUser: isTestUser }}>
                    <Component {...pageProps} />
                </UserAuthContext.Provider>
            </ThemeProvider>
        </>
    );
}

export default MyApp;
