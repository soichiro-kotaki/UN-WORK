import React from "react";

//components
import { DetailButton } from "@components/atoms/DetailButton";

//types
import { PostDataType } from "src/types/post/PostDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";

type Props = {
    userPostData: PostDataType;
};

export const PostCard: React.FC<Props> = (props) => {
    const { userPostData } = props;

    return (
        <>
            <div className="w-11/12 rounded-3xl bg-white border border-gray-300 p-6 mx-auto">
                <div className="">
                    <div className="mb-4 mt-4 lg:flex lg:flex-col lg:text-left lg:mb-8  xl:mr-0">
                        <h2 className="text-2xl font-semibold mb-2 mx-auto lg:text-3xl lg:inline-block lg:mx-0 ">
                            {userPostData.title}
                        </h2>
                        <div>
                            <p className="text-xs text-center mx-auto p-2 rounded-full inline-block text-white mb-4 bg-background-sub lg:text-xs lg:mb-6">{` ${userPostData.category}`}</p>
                        </div>
                        <div className="flex justify-between mb-4 md:mb-6">
                            <p className="text-sm lg:text-lg">{`時給: ${userPostData.salary}`}</p>
                            <span className="block text-xs text-gray-500 lg:text-sm">{`投稿日: ${convertDateStr(
                                userPostData.created_at,
                            )}`}</span>
                        </div>

                        <div>
                            <p className="line-clamp-3 w-full mb-6 text-sm lg:mb-8">
                                {userPostData.body}
                            </p>
                        </div>
                        <div className="w-4/5 mx-auto md:w-3/5 lg lg:w-2/5">
                            <DetailButton text={"詳細を見る"} uid={userPostData.uid} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
