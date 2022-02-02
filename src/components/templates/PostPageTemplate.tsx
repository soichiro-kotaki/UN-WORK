import React, { useContext, useState } from "react";
import Image from "next/image";

//apis
import { getCommentsOnPost } from "@apis/comment";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { AiFillTags } from "react-icons/ai";
import { CommentSection } from "@components/molecules/CommentSection";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    userData: UserDataType;
    postData: PostDataType;
};

export const PostPageTemplate: React.FC<Props> = (props) => {
    const { userData, postData } = props;
    const [comments, setComments] = useState([]);
    const [isVisibleComments, setIsVisibleComments] = useState(false);
    const User = useContext(UserAuthContext);

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen pt-6  bg-white text-gray-900 lg:w-3/5 lg:mx-auto">
                    <h1 className="mb-4 p-4 text-2xl font-bold text-center text-green-400 md:text-3xl lg:text-4xl">
                        {postData.title}
                    </h1>
                    <p className="w-11/12 font-bold mb-4 text-right text- text-xs md:text-xl">{`投稿者連絡先: ${userData.user_email.slice(
                        0,
                        21,
                    )}`}</p>
                    <div className="w-full mx-auto text-center lg:p-6">
                        <Image
                            src={postData.post_img}
                            width={1000}
                            height={1000}
                            alt={"求人詳細イメージ画像"}
                            className="object-cover"
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
                        <h2 className="my-6 py-2 w-3/5 mx-auto text-xl text-center  font-semibold lg:my-12 lg:text-3xl">
                            ---紹介文---
                        </h2>
                        {postData.body
                            .split(/(\n)/g)
                            .map((text, index) => (text === "\n" ? <br key={index} /> : text))}

                        <label htmlFor="my-modal-2" className="modal-button">
                            <a className="bg-normal-btn text-white rounded-md text-center mt-8 mb-20 mx-auto py-3 font-semibold shadow-xl block w-3/5 lg:w-2/5 hover:cursor-pointer hover:bg-normal-btn-hover">
                                応募フォームへ
                            </a>
                        </label>
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
                            className="mt-8 mb-6 p-4 duration-300 ml-auto block text-xs shadow-xl text-white rounded-full bg-background-sub border border-background-sub hover:text-background-sub hover:bg-white lg:mb-12 lg:text-lg"
                        >
                            {isVisibleComments ? "コメントを閉じる" : "コメントを見る"}
                        </button>
                        {isVisibleComments && (
                            <CommentSection
                                postData={postData}
                                userData={userData}
                                comments={comments}
                                isVisibleComments={isVisibleComments}
                                setIsVisibleComments={setIsVisibleComments}
                            />
                        )}
                    </div>
                    <div className="p-8 bg-background-main text-gray-900 border-t border-gray-300 lg:pb-12">
                        <h2 className="my-6 font-bold text-green-400 text-center text-2xl ">
                            投稿者プロフィール
                        </h2>
                        <div>
                            <div className="my-4 text-center ">
                                <div className="avatar">
                                    <Image
                                        src={userData.user_img}
                                        width={200}
                                        height={200}
                                        alt={"ユーザー画像"}
                                        className="rounded-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-xl lg:text-2xl">{`${userData.user_name}`}</p>
                                <p className="my-4">{`連絡先: ${userData.user_email}`}</p>
                                <p className="my-4">
                                    所属: {`${userData.user_subject}学科 ${userData.user_grade}`}
                                </p>
                                <p>アカウント作成日: {convertDateStr(userData.created_at)}</p>
                            </div>
                        </div>
                    </div>
                </main>
            </BaseLayout>

            {/* 応募メッセージ送信用モーダル */}
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <p className="font-bold text-center text-xl">応募メッセージフォーム</p>
                    <p className="my-2">{`件名：${postData.title}への応募`}</p>
                    <p className="my-2">{`送信先：${userData.user_email}`}</p>
                    <form action="" className="w-full text-gray-900">
                        {/* 応募文入力フォーム */}
                        <label className="label mt-6" htmlFor="body">
                            <span className="text-lg">応募メッセージを入力</span>
                        </label>
                        <textarea
                            required={true}
                            id="body"
                            maxLength={400}
                            placeholder={`※最大400文字`}
                            className="w-full h-60 p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                        />
                    </form>
                    <div className="modal-action">
                        <label
                            htmlFor="my-modal-2"
                            className="btn btn-accent  lg:w-1/3 mx-auto"
                            onClick={async () => {
                                alert("現在開発中です🙇‍♂️");
                            }}
                        >
                            メールを送信
                        </label>
                        <label htmlFor="my-modal-2" className="btn lg:w-1/3 mx-auto">
                            キャンセル
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};
