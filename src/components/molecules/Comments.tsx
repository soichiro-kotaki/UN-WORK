import React, { useContext, useEffect, useState } from "react";

//apis
import { addCommentOnPost, getCommentsOnPost } from "@apis/comment";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { NormalComment } from "@components/atoms/comments/NormalComment";
import { ReplyComment } from "@components/atoms/comments/ReplyComment";

//contestAPI
import { UserAuthContext } from "@pages/_app";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";
import { CommentDataType } from "src/types/comment/CommentDataType";

type Props = {
    postData: PostDataType;
    userData: UserDataType;
    comments: CommentDataType[];
};

export const Comments: React.FC<Props> = (props) => {
    const { postData, userData, comments } = props;
    const [comment, setComment] = useState("");
    const User = useContext(UserAuthContext);

    const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    return (
        <>
            <div className="w-full mx-auto my-8 lg:w-4/5">
                <h2 className="text-center text-2xl font-semibold mb-8 lg:text-3xl">コメント</h2>
                {comments[0] ? (
                    <div>
                        {comments.map((comment, index) => {
                            if (comment.uid === postData.uid) {
                                return (
                                    <ReplyComment
                                        key={index}
                                        comment={comment}
                                        userData={userData}
                                    />
                                );
                            } else {
                                return (
                                    <NormalComment
                                        key={index}
                                        comment={comment}
                                        postUserID={postData.uid}
                                    />
                                );
                            }
                        })}
                    </div>
                ) : (
                    <div className="my-12 text-lg">コメントはありません</div>
                )}
                <label className="label mt-6" htmlFor="comment">
                    <span className="text-lg label-text">
                        {User.uid === postData.uid ? "返信コメントを入力" : "質問・コメントを入力"}
                    </span>
                </label>
                <input
                    value={comment}
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleComment(e);
                    }}
                    id="comment"
                    type="comment"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                />

                {/* コメント送信ボタン */}
                <div
                    className="mt-10 mx-auto w-40 "
                    onClick={async () => {
                        alert("コメント機能は現在開発中です🙇‍♂️");
                        // if (User.uid === postData.uid) {
                        // } else {
                        //     await addCommentOnPost(comment, postData.postID, User.uid);
                        //     alert("コメントが送信されました。");
                        //     setComment("");
                        // }
                    }}
                >
                    <SubmitButton text={"送信"} />
                </div>
            </div>
        </>
    );
};
