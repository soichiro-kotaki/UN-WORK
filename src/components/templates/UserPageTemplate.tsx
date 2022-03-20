import React, { useContext } from "react";
import { useRouter } from "next/router";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { LoadingIcon } from "@components/atoms/icons/LoadingIcon";
import { PostCard } from "@components/molecules/PostCard";
import { UserProfile } from "@components/molecules/UserProfile";

//types
import { PostDataType } from "src/types/post/PostDataType";
import { UserDataType } from "src/types/user/UserDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    userData: UserDataType;
    userPostsData: PostDataType[];
    userBookmarkedPostsData: PostDataType[];
};

export const UserPageTemplate: React.FC<Props> = (props) => {
    const { userData, userPostsData, userBookmarkedPostsData } = props;
    const router = useRouter();
    const User = useContext(UserAuthContext);

    if (router.isFallback) {
        return (
            <>
                <BaseLayout>
                    <main className="w-full min-h-screen bg-background-main py-6  lg:w-3/5 lg:mx-auto">
                        <div className="mt-8">
                            <LoadingIcon />
                        </div>
                    </main>
                </BaseLayout>
            </>
        );
    }

    return (
        <>
            {User.uid ? (
                <BaseLayout>
                    <main className="w-full min-h-screen bg-background-main py-6 lg:w-3/5 lg:mx-auto dark:bg-dark-screen">
                        <h1 className="text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                            プロフィール
                        </h1>
                        <UserProfile userData={userData} />

                        <h1 className="mt-14 text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mt-20 lg:mb-8">
                            あなたの投稿
                        </h1>
                        {userPostsData[0] ? (
                            userPostsData.map((userPostData) => {
                                return (
                                    <div className="mb-10 lg:mb-14" key={userPostData.postID}>
                                        <PostCard userPostData={userPostData} />
                                    </div>
                                );
                            })
                        ) : (
                            <p className="mx-auto text-center text-gray-900 dark:text-dark-text">
                                投稿した求人がありません
                            </p>
                        )}
                        <h1 className="mt-14 text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mt-20 lg:mb-8">
                            <BsFillBookmarkHeartFill className="inline-block  w-6 h-6 mr-4 lg:w-8 lg:h-8 hover:cursor-pointer lg:ml-2 " />
                            ブックマークした投稿
                        </h1>
                        {userBookmarkedPostsData[0] ? (
                            userBookmarkedPostsData.map((userBookmarkedPostData) => {
                                return (
                                    <div
                                        className="mb-10 lg:mb-14"
                                        key={userBookmarkedPostData.postID}
                                    >
                                        <PostCard userPostData={userBookmarkedPostData} />
                                    </div>
                                );
                            })
                        ) : (
                            <p className="mb-16 mx-auto text-center text-gray-900 dark:text-dark-text">
                                ブックマークした求人がありません
                            </p>
                        )}
                    </main>
                </BaseLayout>
            ) : (
                <div className="mt-20">
                    <LoadingIcon />
                </div>
            )}
        </>
    );
};
