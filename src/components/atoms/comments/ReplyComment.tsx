import React, { useContext, SetStateAction } from "react";
import Image from "next/image";

//components
import { FaTrash } from "react-icons/fa";

//types
import { UserDataType } from "src/types/user/UserDataType";
import { ReplyDataType } from "src/types/reply/ReplyDataType";
import { MeitionDataType } from "src/types/reply/MeitionDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    replyCommentData: ReplyDataType;
    postUserID: string;
    userData: UserDataType;
    commentDocID: string;
    firstCommentUID: string;
    setIsReply: React.Dispatch<SetStateAction<boolean>>;
    setCommentDocID: React.Dispatch<SetStateAction<string>>;
    setMention: React.Dispatch<SetStateAction<MeitionDataType>>;
    inputRef: React.MutableRefObject<HTMLInputElement>;
};

export const ReplyComment: React.FC<Props> = (props) => {
    const {
        replyCommentData,
        postUserID,
        userData,
        commentDocID,
        firstCommentUID,
        setIsReply,
        setCommentDocID,
        setMention,
        inputRef,
    } = props;
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="ml-12 p-3 border-t border-gray-300 flex lg:ml-24 lg:p-4">
                <div className="w-1/6">
                    {postUserID === replyCommentData.uid && (
                        <Image
                            src={userData.user_img}
                            width={80}
                            height={80}
                            alt="投稿者画像"
                            className="rounded-full object-cover"
                        />
                    )}
                </div>
                <div className="w-5/6 ml-4 lg:ml-8">
                    <div className="flex justify-between">
                        <p className="font-semibold">
                            {postUserID === replyCommentData.uid
                                ? userData.user_name
                                : replyCommentData.displayName}
                        </p>
                        <span className="text-gray-500 text-sm ml-8 dark:text-dark-time">
                            {replyCommentData.created_at.toDate().toLocaleDateString()}
                        </span>
                    </div>
                    <p className="break-words w-full mt-2 text-sm">{replyCommentData.comment}</p>
                    {User.uid === replyCommentData.uid && (
                        <FaTrash
                            onClick={() => {
                                alert(
                                    "コメントを削除したい場合は、運営(unwork1201@gmail.com)までご連絡ください。",
                                );
                            }}
                            className="w-6 h-6 mt-4 lg:w-8 text-gray-500 lg:h-8 ml-auto hover:cursor-pointer hover:text-gray-300 dark:text-dark-text"
                        />
                    )}
                    {User.uid !== replyCommentData.uid && User.uid === firstCommentUID ? (
                        <div className="flex justify-end">
                            <p
                                className="text-gray-500 mt-4 underline text-sm inline-block hover:cursor-pointer hover:text-gray-300 lg:mt-6 dark:text-dark-text"
                                onClick={() => {
                                    setCommentDocID(commentDocID);
                                    setIsReply(true);
                                    setMention({
                                        displayName: replyCommentData.displayName,
                                        uid: replyCommentData.uid,
                                        text: replyCommentData.comment,
                                    });
                                    inputRef.current?.focus();
                                }}
                            >
                                返信する
                            </p>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};
