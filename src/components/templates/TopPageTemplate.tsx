import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { PostCard } from "@components/molecules/PostCard";

type Props = {
    allPostsData: PostDataType[];
};

export const TopPageTemplate: React.FC<Props> = (props) => {
    const { allPostsData } = props;

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen mt-16 pt-6 pb-6 bg-background-main lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="mb-4 p-4 text-2xl font-bold text-center text-green-400 lg:text-4xl">
                        最近投稿された求人一覧
                    </h1>
                    {allPostsData[0] ? (
                        allPostsData.map((postData, index) => {
                            return (
                                <div className="mb-6 lg:mb-12" key={index}>
                                    <PostCard userPostData={postData} />
                                </div>
                            );
                        })
                    ) : (
                        <p className="mx-auto text-center">投稿された求人がありません</p>
                    )}
                </main>
            </BaseLayout>
        </>
    );
};
