import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

//apis
import { getPostsDataByCategory } from "@apis/post";

//libs
import { db } from "@libs/firebaseConfig";

//components
import { CategoryPageTemplate } from "@components/templates/CategoryPageTemplate";

//types
import { PostDataType } from "src/types/post/PostDataType";

type Props = {
    categoryPostsData: PostDataType[];
    categoryName: string;
};

const category: NextPage<Props> = (props) => {
    const { categoryPostsData, categoryName } = props;

    return (
        <>
            <Head>
                <title>{categoryName}</title>
            </Head>

            <CategoryPageTemplate
                categoryPostsData={categoryPostsData}
                categoryName={categoryName}
            />
        </>
    );
};

export default category;

export const getStaticPaths: GetStaticPaths = async () => {
    const categoryIDList = [];
    const allCategoriesData = await db.collection("categories").get();
    allCategoriesData.forEach((categoryData) => {
        categoryIDList.push(categoryData.id);
    });

    const paths = categoryIDList.map((categoryID) => `/category/${categoryID}`);

    return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const categoryID = params.id;

    const { categoryPostsList, categoryName } = await getPostsDataByCategory(categoryID as string);

    return {
        props: { categoryPostsData: categoryPostsList, categoryName: categoryName },
        revalidate: 30,
    };
};
