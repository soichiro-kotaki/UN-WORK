import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { EditProfileForm } from "@components/forms/EditProfileForm";

export const EditProfilePageTemplate: React.FC = () => {
    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen py-6 bg-background-main lg:w-3/5 lg:mx-auto">
                    <h1 className="pt-4 text-2xl font-bold text-center text-green-400 lg:text-4xl">
                        プロフィール編集
                    </h1>
                    <div className="w-4/5 mx-auto lg:2/5">
                        <EditProfileForm />
                    </div>
                </main>
            </BaseLayout>
        </>
    );
};
