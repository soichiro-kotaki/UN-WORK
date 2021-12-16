import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { UserProfile } from "@components/molecules/UserProfile";

//types
import { UserDataType } from "src/types/user/UserDataType";

type Props = {
    userData: UserDataType;
};

export const UserPageTemplate: React.FC<Props> = (props) => {
    const { userData } = props;

    return (
        <>
            <BaseLayout>
                <main className="w-full bg-background-main mt-16 pt-6 pb-6 lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <UserProfile userData={userData} />

                    <h1 className="mt-8 text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                        あなたの投稿
                    </h1>
                    <p className="mb-16 mx-auto text-center">申し訳ありません! 現在開発中です🙇‍♂️ </p>
                    <h1 className="mt-8 text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                        ブックマークした求人投稿
                    </h1>
                    <p className="mb-16 mx-auto text-center">申し訳ありません! 現在開発中です🙇‍♂️ </p>
                </main>
            </BaseLayout>
        </>
    );
};
