import React, { useContext, useState, useRef, SetStateAction } from "react";

//apis
import { addCommentOnPost, addReplyOnComment } from "@apis/comment";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { FirstComment } from "@components/atoms/comments/FirstComment";
import { ReplyComment } from "@components/atoms/comments/ReplyComment";

//contestAPI
import { UserAuthContext } from "@pages/_app";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";
import { CommentDataType } from "src/types/comment/CommentDataType";
import { MeitionDataType } from "src/types/reply/MeitionDataType";

type Props = {
    postData: PostDataType;
    userData: UserDataType;
    comments: CommentDataType[];
    isVisibleComments: boolean;
    setIsVisibleComments: React.Dispatch<SetStateAction<boolean>>;
};

export const CommentSection: React.FC<Props> = (props) => {
    const { postData, userData, comments, isVisibleComments, setIsVisibleComments } = props;
    const [message, setMessage] = useState("");
    const [commentDocID, setCommentDocID] = useState("");
    const [mention, setMention] = useState<MeitionDataType>({ uid: "", text: "" });
    const [isReply, setIsReply] = useState(false);

    const User = useContext(UserAuthContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return (
        <>
            <div className="w-full mx-auto text-gray-900 my-8 lg:w-4/5 dark:text-dark-text">
                <h2 className="text-center text-2xl font-semibold mb-8 lg:text-3xl">コメント</h2>
                {comments[0] ? (
                    <div>
                        {comments.map((comment, index) => {
                            return (
                                <div key={index} className="mt-8">
                                    <FirstComment
                                        firstCommentData={comment}
                                        postUserID={postData.uid}
                                        setIsReply={setIsReply}
                                        setCommentDocID={setCommentDocID}
                                        setMention={setMention}
                                        inputRef={inputRef}
                                    />
                                    {comment.replies &&
                                        comment.replies.map((reply, index) => {
                                            return (
                                                <ReplyComment
                                                    key={index}
                                                    replyCommentData={reply}
                                                    postUserID={postData.uid}
                                                    commentDocID={comment.id}
                                                    firstCommentUID={comment.uid}
                                                    userData={userData}
                                                    setIsReply={setIsReply}
                                                    setCommentDocID={setCommentDocID}
                                                    setMention={setMention}
                                                    inputRef={inputRef}
                                                />
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="my-12 text-lg">コメントはありません</div>
                )}
                {User.uid !== postData.uid || isReply ? (
                    <div className="mt-4">
                        {User.uid !== postData.uid && !isReply ? (
                            <label className="label mt-6 " htmlFor="comment">
                                <span className="text-lg">新規の質問・コメント</span>
                            </label>
                        ) : (
                            <div className="flex justify-between items-center bg-gray-200 p-2 rounded-md">
                                <div className="w-2/3">
                                    <p className="text-green-500 font-bold">{`＠${
                                        postData.uid === mention.uid
                                            ? userData.user_name
                                            : "匿名ユーザー"
                                    }`}</p>
                                    <p className="line-clamp-3 break-words">{`
                                        ${mention && mention.text}`}</p>
                                </div>
                                <p
                                    onClick={() => {
                                        setIsReply(false);
                                    }}
                                    className="bg-gray-300 rounded-full p-2 text-sm hover:cursor-pointer"
                                >
                                    キャンセル
                                </p>
                            </div>
                        )}
                        <input
                            value={message}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleComment(e);
                            }}
                            id="comment"
                            type="comment"
                            ref={inputRef}
                            autoFocus={isReply}
                            placeholder="メッセージを入力"
                            className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                        />
                        {!isReply && (
                            <label className="label" htmlFor="comment">
                                <span className="text-sm">
                                    ※コメントや質問は匿名で投稿されます。
                                </span>
                            </label>
                        )}

                        {/* コメント送信ボタン */}
                        <div
                            className="mt-10 mx-auto w-40 "
                            onClick={async () => {
                                if ((User.uid === postData.uid || isReply) && message !== "") {
                                    await addReplyOnComment(
                                        message,
                                        postData.postID,
                                        User.uid,
                                        commentDocID,
                                    );
                                    alert("返信が送信されました。");
                                    setMessage("");
                                    setIsVisibleComments(!isVisibleComments);
                                } else if (message !== "") {
                                    await addCommentOnPost(message, postData.postID, User.uid);
                                    alert("コメントが送信されました。");
                                    setMessage("");
                                    setIsVisibleComments(!isVisibleComments);
                                } else {
                                    alert("入力を行なってください。");
                                }
                            }}
                        >
                            <SubmitButton text={"送信"} />
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
};
