import React, { useContext, SetStateAction } from "react";

//components
import { FaTrash } from "react-icons/fa";

//types
import { CommentDataType } from "src/types/comment/CommentDataType";
import { UserAuthContext } from "@pages/_app";
import { MeitionDataType } from "src/types/reply/MeitionDataType";

type Props = {
    firstCommentData: CommentDataType;
    postUserID: string;
    setIsReply: React.Dispatch<SetStateAction<boolean>>;
    setCommentDocID: React.Dispatch<SetStateAction<string>>;
    setMention: React.Dispatch<SetStateAction<MeitionDataType>>;
    inputRef: React.MutableRefObject<HTMLInputElement>;
};

export const FirstComment: React.FC<Props> = (props) => {
    const { firstCommentData, postUserID, setIsReply, setCommentDocID, setMention, inputRef } =
        props;
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="flex p-3 border-t-2 border-gray-500 lg:p-4">
                <div className="w-full">
                    <div className="flex justify-between">
                        <p className="font-semibold">{firstCommentData.displayName}</p>
                        <span className="text-gray-500 text-sm ml-8 dark:text-dark-time">
                            {firstCommentData.created_at}
                        </span>
                    </div>
                    <p className="break-words mt-2 text-sm">{firstCommentData.comment}</p>
                    <div className="flex justify-end">
                        <p
                            className="text-gray-500 mt-4 underline text-sm inline-block hover:cursor-pointer hover:text-gray-300 lg:mt-6 dark:text-dark-text"
                            onClick={() => {
                                setCommentDocID(firstCommentData.id);
                                setIsReply(true);
                                setMention({
                                    uid: firstCommentData.uid,
                                    text: firstCommentData.comment,
                                    displayName: firstCommentData.displayName,
                                });
                                inputRef.current?.focus();
                            }}
                        >
                            {User.uid === postUserID && "返信する"}
                        </p>
                        {User.uid === firstCommentData.uid && (
                            <FaTrash
                                onClick={() => {
                                    alert(
                                        "コメントを削除したい場合は、運営(unwork1201@gmail.com)までご連絡ください。",
                                    );
                                }}
                                className="w-6 h-6 mt-4 ml-4 lg:w-8 text-gray-500 lg:h-8 hover:cursor-pointer hover:text-gray-300 "
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
