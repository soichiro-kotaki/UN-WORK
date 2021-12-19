import type { NextPage } from "next";
import Head from "next/head";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

const categories: NextPage = () => {
    return (
        <>
            <Head>
                <title>カテゴリー</title>
            </Head>

            <BaseLayout>
                <main className="w-full min-h-screen mt-16 pb-6 bg-background-main lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="pt-4 text-2xl text-center">現在開発中です🙇‍♂️</h1>
                </main>
            </BaseLayout>
        </>
    );
};

export default categories;
