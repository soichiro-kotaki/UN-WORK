import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getDisclaimerData } from "@apis/fixedArticles";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

//types
import { Article } from "src/types/fixed/Article";

type Props = {
    disclaimerData: Article;
};

const disclaimer: NextPage<Props> = (props) => {
    const { disclaimerData } = props;

    return (
        <>
            <Head>
                <title>免責事項</title>
            </Head>

            <BaseLayout>
                <article className="w-full min-h-screen py-6 text-gray-900 bg-background-main lg:w-3/5 lg:mx-auto">
                    <h1 className="text-center mb-6 text-2xl font-bold lg:text-4xl">
                        {disclaimerData.title}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: disclaimerData.body,
                        }}
                        className="w-11/12 mx-auto cms-fixed-content md:w-4/5 lg:w-10/12"
                    ></div>
                </article>
            </BaseLayout>
        </>
    );
};

export default disclaimer;

export const getStaticProps: GetStaticProps = async () => {
    const disclaimerData = await getDisclaimerData();

    return { props: { disclaimerData: disclaimerData } };
};
