import React, { SetStateAction, useContext } from "react";

//apis
import { addPostToBookmarkList, deletePostToBookmarkList } from "@apis/bookmark";

//libs
import { db } from "@libs/firebaseConfig";

//components
import { BsFillBookmarkHeartFill } from "react-icons/bs";

//types
import { PostDataType } from "src/types/post/PostDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    userPostData: PostDataType;
    isBookmarked: boolean;
    setIsBookmarked: React.Dispatch<SetStateAction<boolean>>;
};

export const BookmarkedIcon: React.FC<Props> = (props) => {
    const { userPostData, isBookmarked, setIsBookmarked } = props;
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="dropdown dropdown-end">
                <BsFillBookmarkHeartFill
                    tabIndex={0}
                    className="w-6 h-6 mr-3 lg:w-10 lg:h-10 hover:cursor-pointer text-pink-400 hover:text-pink-700 lg:mr-4"
                    onClick={async () => {
                        let list = [];
                        const bookmarkData = await db
                            .collection("users")
                            .doc(`${User.uid}`)
                            .collection("bookmarks")
                            .get();
                        bookmarkData.forEach((data) => {
                            list.push(data.id);
                            const isPostID = list.find((postID) => postID === userPostData.postID);
                            if (isPostID) {
                                setIsBookmarked(true);
                            }
                        });
                    }}
                />
                <div
                    tabIndex={0}
                    className="text-sm mr-3 p-1 shadow menu dropdown-content text-gray-100 bg-pink-400 rounded-lg w-32 hover:bg-pink-700 lg:mr-4 lg:p-2 lg:w-40"
                    onClick={async () => {
                        if (User.isTestUser) {
                            alert(
                                "ブックマーク機能を利用するには、ログインもしくはアカウント作成を行ってください。",
                            );
                        } else {
                            try {
                                if (isBookmarked) {
                                    await deletePostToBookmarkList(User.uid, userPostData.postID);
                                    setIsBookmarked(false);
                                    alert("ブックマークから削除されました。");
                                } else {
                                    await addPostToBookmarkList(User.uid, userPostData);
                                    alert("ブックマークに登録されました。");
                                }
                            } catch {
                                alert("操作に失敗ました。再度試してください。");
                            }
                        }
                    }}
                >
                    <a className="block text-center mx-auto">
                        {isBookmarked ? "ブックマークから削除" : "ブックマークへの登録"}
                    </a>
                </div>
            </div>
        </>
    );
};
