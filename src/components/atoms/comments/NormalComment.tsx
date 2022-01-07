import React, { useContext } from "react";
import Image from "next/image";

//types
import { CommentDataType } from "src/types/comment/CommentDataType";

type Props = {
    comment: CommentDataType;
    postUserID: string;
};

export const NormalComment: React.FC<Props> = (props) => {
    const { comment, postUserID } = props;

    return (
        <>
            <div className="flex">
                <Image
                    src={"/匿名コメント用アイコン画像"}
                    width={60}
                    height={60}
                    alt="匿名コメント画像"
                    className="rounded-full"
                />
                <div>
                    <span>{comment.created_at}</span>
                    <p>{comment.comment}</p>
                </div>
                <p className="text-gray-300 text-sm">
                    {postUserID === comment.uid ? "返信する" : ""}
                </p>
            </div>
        </>
    );
};
