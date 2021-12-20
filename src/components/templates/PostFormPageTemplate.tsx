import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { PostForm } from "@components/forms/PostForm";

export const PostFormPageTemplate: React.FC = () => {
    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen mt-16 pt-6 pb-6 bg-background-main lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="pt-4 text-2xl font-bold text-center text-green-400 lg:text-4xl">
                        求人投稿
                    </h1>
                    <div className="w-4/5 mx-auto lg:2/5">
                        <PostForm />
                    </div>
                </main>
            </BaseLayout>
        </>
    );
};
