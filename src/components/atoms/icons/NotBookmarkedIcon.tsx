import React, { SetStateAction, useContext } from "react";

//apis
import { addPostToBookmarkList } from "@apis/bookmark";

//components
import { BsFillBookmarkHeartFill } from "react-icons/bs";

//types
import { PostDataType } from "src/types/post/PostDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    userPostData: PostDataType;
    setIsBookmarked: React.Dispatch<SetStateAction<boolean>>;
};

export const NotBookmarkedIcon: React.FC<Props> = (props) => {
    const { userPostData, setIsBookmarked } = props;
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="dropdown dropdown-end">
                <BsFillBookmarkHeartFill
                    tabIndex={0}
                    className="w-6 h-6 mr-3 lg:w-10 lg:h-10 hover:cursor-pointer text-pink-200 hover:text-pink-400 lg:mr-4"
                />
                <div
                    tabIndex={0}
                    className="text-sm mr-3 p-1 shadow menu dropdown-content text-gray-100 bg-pink-200 rounded-lg w-32 hover:bg-pink-400 lg:mr-4 lg:p-2 lg:w-40"
                    onClick={async () => {
                        if (User.isTestUser) {
                            alert(
                                "ブックマークを行うには、ログインもしくは新規アカウント作成を行ってください。",
                            );
                        } else {
                            try {
                                await addPostToBookmarkList(User.uid, userPostData);
                                setIsBookmarked(true);
                                alert("ブックマークに登録されました。");
                            } catch {
                                alert("ブックマークに失敗しました。");
                            }
                        }
                    }}
                >
                    <a className="block text-center mx-auto">ブックマーク</a>
                </div>
            </div>
        </>
    );
};
