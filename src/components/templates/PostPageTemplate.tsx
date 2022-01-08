import React, { useContext, useState } from "react";
import Image from "next/image";

//apis
import { getCommentsOnPost } from "@apis/comment";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { AiFillTags } from "react-icons/ai";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";

//contextAPI
import { UserAuthContext } from "@pages/_app";
import { Comments } from "@components/molecules/Comments";

type Props = {
    userData: UserDataType;
    postData: PostDataType;
};

export const PostPageTemplate: React.FC<Props> = (props) => {
    const { userData, postData } = props;
    const User = useContext(UserAuthContext);
    const [comments, setComments] = useState([]);
    const [isVisibleComments, setIsVisibleComments] = useState(false);

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen pt-6  bg-white text-gray-900  lg:w-3/5 lg:mx-auto">
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
                    <div className="w-11/12 mx-auto mt-4">
                        <p className="text-xs text-center mx-auto p-2 rounded-full inline-block text-white mb-4 bg-background-sub lg:text-xs lg:mb-6 lg:px-4">
                            <AiFillTags className="w-5 h-5 mr-1 text-center mx-auto inline-block" />
                            {postData.category}
                        </p>
                        <div className="flex justify-between mb-4 md:mb-6">
                            <p className="text-sm font-semibold lg:text-lg">{`時給: ${postData.salary}`}</p>
                            <span className="block text-xs text-gray-500 lg:text-sm">{`投稿日: ${convertDateStr(
                                postData.created_at,
                            )}`}</span>
                        </div>
                        <h2 className="my-6 text-xl text-center font-bold lg:my-12 lg:text-3xl">
                            ---求人詳細---
                        </h2>
                        {postData.body
                            .split(/(\n)/g)
                            .map((text, index) => (text === "\n" ? <br key={index} /> : text))}
                        <div className="w-full h-16 mt-6 pt-5 align-middle lg:h-20 lg:pt-7">
                            <p className="text-gray-900 font-semibold text-center lg:text-3xl">{`連絡先: ${userData.user_email}`}</p>
                        </div>
                        <button
                            onClick={async () => {
                                if (User.isTestUser) {
                                    alert(
                                        "コメントを見るには、ログインもしくはアカウント作成を行ってください。",
                                    );
                                } else {
                                    try {
                                        const commentsData = await getCommentsOnPost(
                                            postData.postID,
                                        );
                                        setComments(commentsData);
                                        setIsVisibleComments(!isVisibleComments);
                                    } catch {
                                        alert("コメントの取得に失敗しました。");
                                    }
                                }
                            }}
                            className="mt-8 mb-6 p-3 duration-300 ml-auto block text-xs shadow-xl text-white rounded-full bg-background-sub border border-background-sub hover:text-background-sub hover:bg-white lg:mb-12 lg:text-lg"
                        >
                            {isVisibleComments ? "コメントを閉じる" : "コメントを見る"}
                        </button>
                        {isVisibleComments ? (
                            <Comments postData={postData} userData={userData} comments={comments} />
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="p-8 bg-background-main text-gray-900 border-t border-gray-300 lg:pb-12">
                        <h2 className="my-6 font-bold text-green-400  lg:text-2xl ">
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
