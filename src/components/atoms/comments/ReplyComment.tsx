import React, { useContext } from "react";
import Image from "next/image";

//types
import { CommentDataType } from "src/types/comment/CommentDataType";
import { UserDataType } from "src/types/user/UserDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";

type Props = {
    comment: CommentDataType;
    userData: UserDataType;
};

export const ReplyComment: React.FC<Props> = (props) => {
    const { comment, userData } = props;

    return (
        <>
            <div className="ml-4 p-3 border-t border-gray-300 flex lg:ml-20 lg:p-4">
                <div className="w-1/6">
                    <Image
                        src={userData.user_img}
                        width={80}
                        height={80}
                        alt="投稿者画像"
                        className="rounded-full"
                    />
                </div>
                <div className="w-5/6 ml-4 lg:ml-8">
                    <div className="flex justify-between">
                        <p className="font-semibold">{userData.user_name}</p>
                        <span className="text-gray-500 text-sm ml-8">
                            {convertDateStr(`${comment.created_at}`)}
                        </span>
                    </div>
                    <p className="mt-2 text-sm">{comment.comment}</p>
                </div>
            </div>
        </>
    );
};
