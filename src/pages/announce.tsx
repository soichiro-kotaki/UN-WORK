import type { NextPage } from "next";
import Head from "next/head";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

const announce: NextPage = () => {
    return (
        <>
            <Head>
                <title>お知らせ</title>
            </Head>

            <BaseLayout>
                <main className="w-full min-h-screen mt-16 py-6 bg-background-main lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                        お知らせ一覧
                    </h1>
                    <h2 className="pt-4 text-2xl text-center">現在開発中です🙇‍♂️</h2>
                </main>
            </BaseLayout>
        </>
    );
};

export default announce;
