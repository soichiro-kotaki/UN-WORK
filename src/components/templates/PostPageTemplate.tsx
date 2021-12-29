import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { LoadingIcon } from "@components/atoms/LoadingIcon";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";
import { convertDateStr } from "src/utils/convertDateStr";

type Props = {
    userData: UserDataType;
    postData: PostDataType;
};

export const PostPageTemplate: React.FC<Props> = (props) => {
    const { userData, postData } = props;

    const router = useRouter();

    if (router.isFallback) {
        return (
            <>
                <BaseLayout>
                    <main className="w-full min-h-screen bg-background-main mt-16 pt-6 pb-6 lg:mt-20 lg:w-3/5 lg:mx-auto">
                        <div className="mt-8">
                            <LoadingIcon />
                        </div>
                    </main>
                </BaseLayout>
            </>
        );
    }

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen mt-16 pt-6  bg-white lg:mt-20 lg:w-3/5 lg:mx-auto">
                    <h1 className="mb-4 p-4 text-2xl font-bold text-center text-green-400 md:text-3xl lg:text-4xl">
                        {postData.title}
                    </h1>
                    <p className="w-11/12 font-bold mb-2 text-right text- text-xs md:text-xl">{`投稿者連絡先: ${userData.user_email.slice(
                        0,
                        21,
                    )}`}</p>
                    <div>
                        <Image
                            src={postData.post_img}
                            width={1000}
                            height={1000}
                            alt={"求人詳細イメージ画像"}
                        />
                    </div>
                    <div className="w-11/12 mx-auto">
                        <p className="text-xs text-center mx-auto p-2 rounded-full inline-block text-white mb-4 bg-background-sub lg:text-xs lg:mb-6">
                            {postData.category}
                        </p>
                        <div className="flex justify-between mb-4 md:mb-6">
                            <p className="text-sm lg:text-lg">{`時給: ${postData.salary}`}</p>
                            <span className="block text-xs text-gray-500 lg:text-sm">{`投稿日: ${convertDateStr(
                                postData.created_at,
                            )}`}</span>
                        </div>
                        <h2 className="my-6 text-xl text-center font-semibold lg:my-12 lg:text-3xl">
                            ---求人詳細---
                        </h2>
                        {postData.body
                            .split(/(\n)/g)
                            .map((text, index) => (text === "\n" ? <br key={index} /> : text))}
                    </div>
                    <div className="mt-12 p-8 bg-background-main lg:pb-12">
                        <h2 className="my-6 font-bold lg:text-2xl text-green-400">
                            投稿者プロフィール
                        </h2>
                        <div className="lg;flex lg:justify-between">
                            <div className="my-4 text-center">
                                <Image
                                    src={userData.user_img}
                                    width={180}
                                    height={180}
                                    alt={"ユーザー画像"}
                                    className="rounded-full"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-xl lg:text-2xl">{`氏名: ${userData.user_name}`}</p>
                                <p className="my-4">
                                    所属: {`${userData.user_subject}学科 ${userData.user_grade}`}
                                </p>
                                <p>{convertDateStr(userData.created_at)}に登録</p>
                            </div>
                        </div>
                    </div>
                </main>
            </BaseLayout>
        </>
    );
};
