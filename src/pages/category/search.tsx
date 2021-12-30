import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

//components
import { getAllCategories } from "@apis/category";
import { CategoryDataType } from "src/types/category/CategoryDataType";
import { CategorySearchPageTemplate } from "@components/templates/CategorySearchPageTemplate";

type Props = {
    categoriesData: CategoryDataType[];
};

const search: NextPage<Props> = (props) => {
    const { categoriesData } = props;

    return (
        <>
            <Head>
                <title>カテゴリー検索</title>
            </Head>

            <CategorySearchPageTemplate categoriesData={categoriesData} />
        </>
    );
};

export default search;

export const getStaticProps: GetStaticProps = async () => {
    const categoriesData = await getAllCategories();

    return { props: { categoriesData: categoriesData } };
};
