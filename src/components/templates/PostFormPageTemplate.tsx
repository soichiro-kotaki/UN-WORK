import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { PostForm } from "@components/forms/PostForm";

export const PostFormPageTemplate: React.FC = () => {
    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen py-6 bg-background-main lg:w-3/5 lg:mx-auto dark:bg-dark-screen">
                    <h1 className="pt-4 text-2xl font-bold text-center text-green-400 lg:text-4xl">
                        新規求人作成
                    </h1>
                    <div className="w-4/5 mx-auto lg:2/5">
                        <PostForm />
                    </div>
                </main>
            </BaseLayout>
        </>
    );
};
