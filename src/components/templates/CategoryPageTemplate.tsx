import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { PostCard } from "@components/molecules/PostCard";

type Props = {
    categoryPostsData: PostDataType[];
    categoryName: string;
};

export const CategoryPageTemplate: React.FC<Props> = (props) => {
    const { categoryPostsData, categoryName } = props;

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen py-6 bg-background-main lg:w-3/5 lg:mx-auto">
                    <h1 className="mb-4 p-4 text-2xl font-bold text-center text-green-400 lg:text-4xl">
                        {`『 ${categoryName} 』の求人`}
                    </h1>
                    {categoryPostsData[0] ? (
                        categoryPostsData.map((postData, index) => {
                            return (
                                <div className="mb-6 lg:mb-12" key={index}>
                                    <PostCard userPostData={postData} />
                                </div>
                            );
                        })
                    ) : (
                        <p className="w-11/12 mx-auto text-center lg:text-2xl ">
                            現在、このカテゴリーの求人はありません
                        </p>
                    )}
                </main>
            </BaseLayout>
        </>
    );
};
