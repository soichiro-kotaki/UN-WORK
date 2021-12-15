import React from "react";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

type Props = {
    handleLogOut: () => void;
};

export const TopPageTemplate: React.FC<Props> = (props) => {
    const { handleLogOut } = props;

    return (
        <>
            <BaseLayout>
                <main className="w-full mt-16 pb-6 lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="text-4xl text-center text-green-400">
                        ここに求人投稿の一覧を表示する
                    </h1>
                    <p
                        onClick={handleLogOut}
                        className="p-3 rounded-md fixed bottom right-10 inline-block bg-green-400"
                    >
                        ログアウト
                    </p>
                </main>
            </BaseLayout>
        </>
    );
};
