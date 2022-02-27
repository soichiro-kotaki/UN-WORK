import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getFAQData } from "@apis/fixedArticles";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

//types
import { Article } from "src/types/fixed/Article";

type Props = {
    faqData: Article;
};

const faq: NextPage<Props> = (props) => {
    const { faqData } = props;

    return (
        <>
            <Head>
                <title>FAQ</title>
            </Head>

            <BaseLayout>
                <article className="w-full min-h-screen py-6 text-gray-900 bg-background-main lg:w-3/5 lg:mx-auto dark:bg-dark-screen">
                    <h1 className="text-center mb-6 text-2xl font-bold lg:text-4xl dark:text-dark-text">
                        {faqData.title}
                    </h1>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: faqData.body,
                        }}
                        className="w-11/12 mx-auto cms-fixed-content md:w-4/5 lg:w-10/12"
                    ></div>
                </article>
            </BaseLayout>
        </>
    );
};

export default faq;

export const getStaticProps: GetStaticProps = async () => {
    const faqData = await getFAQData();

    return { props: { faqData: faqData } };
};
