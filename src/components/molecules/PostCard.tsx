import React, { useContext } from "react";

//apis
import { deleteJobPost } from "@apis/post";

//components
import { DetailButton } from "@components/atoms/DetailButton";
import { FaTrash } from "react-icons/fa";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";

//types
import { PostDataType } from "src/types/post/PostDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";
import { UserAuthContext } from "@pages/_app";

type Props = {
    userPostData: PostDataType;
};

export const PostCard: React.FC<Props> = (props) => {
    const { userPostData } = props;
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="w-11/12 rounded-3xl bg-white border border-gray-300 p-6 mx-auto lg:w-9/12">
                <div>
                    <div className="mb-4 mt-4 lg:flex lg:flex-col lg:text-left lg:mb-8 xl:mr-0">
                        <h2 className="text-2xl font-semibold mb-2 mx-auto lg:text-3xl lg:inline-block lg:mx-0 ">
                            {userPostData.title}
                        </h2>
                        <div className="flex justify-between">
                            <p className="text-xs text-center  p-2 rounded-full inline-block text-white mb-4 bg-background-sub lg:text-xs lg:mb-6">
                                <AiOutlineTags className="inline-block w-5 h-5" />
                                {` ${userPostData.category}`}
                            </p>
                            <div className="flex">
                                <BsFillBookmarkHeartFill
                                    onClick={() => {
                                        alert("ブックマーク機能は現在開発中です🙇‍♂️");
                                    }}
                                    className="text-pink-200 w-6 h-6 mr-3 lg:w-10 lg:h-10 hover:cursor-pointer hover:text-pink-400 lg:mr-4"
                                />
                                {User.uid === userPostData.uid ? (
                                    <div className="dropdown dropdown-end ">
                                        <FaTrash
                                            tabIndex={0}
                                            className=" w-6 h-6 lg:w-10 text-gray-500 lg:h-10 hover:cursor-pointer hover:text-gray-300"
                                        />
                                        <ul
                                            tabIndex={0}
                                            className="text-sm p-1 shadow menu dropdown-content text-gray-100 bg-background-danger rounded-full w-20 lg:p-2 lg:w-40 hover:bg-red-700"
                                        >
                                            <li>
                                                <label
                                                    htmlFor="my-modal-2"
                                                    className="modal-button"
                                                >
                                                    <a
                                                        onClick={async () => {
                                                            await deleteJobPost(
                                                                userPostData.postID,
                                                                userPostData.post_img,
                                                            );
                                                        }}
                                                        className="
                                                        text-center block"
                                                    >
                                                        削除する
                                                    </a>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mb-4 md:mb-6">
                            <p className="text-sm font-semibold lg:text-lg">{`時給: ${userPostData.salary}`}</p>
                            <span className="block text-xs text-gray-500 lg:text-sm">{` ${convertDateStr(
                                userPostData.created_at,
                            )}`}</span>
                        </div>
                        <div>
                            <p className="line-clamp-3 w-full mb-6 text-sm lg:mb-8">
                                {userPostData.body}
                            </p>
                        </div>
                        <div className="w-4/5 mx-auto md:w-3/5 lg lg:w-2/5">
                            <DetailButton text={"詳細を見る"} postID={userPostData.postID} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 削除後に表示されるモーダル */}
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <p>投稿した求人が削除されました。</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-2" className="btn w-2/5 lg:w-1/3">
                            戻る
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};
