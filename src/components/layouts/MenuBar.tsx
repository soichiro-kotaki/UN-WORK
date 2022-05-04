import React, { useContext } from "react";
import Link from "next/link";

//components
import { AddPostTextButton } from "@components/atoms/buttons/AddPostTextButton";
import { AiFillHome, AiFillTags } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

//contestAPI
import { UserAuthContext } from "@pages/_app";

export const MenuBar: React.FC = () => {
    const User = useContext(UserAuthContext);

    return (
        <>
            <div className="z-10 fixed bottom-0  bg-white text-gray-900 border-gray-300 border-t w-full h-16 lg:left-0 lg:top-0 lg:w-1/5 lg:h-full lg:border-r lg:border-t-0 dark:bg-dark-screen dark:text-white">
                <div className="md:w-4/5 h-full md:mx-auto lg:w-full lg:h-2/5">
                    <Link href="/">
                        <a className="text-xs w-1/4 h-full text-center pt-3 inline-block md:w-1/4 lg:block lg:w-4/5 lg:h-16 lg:mt-12 lg:mx-auto lg:pt-5 lg:text-lg hover:bg-gray-200 lg:rounded-full dark:hover:bg-dark-content">
                            <AiFillHome className="w-5 h-5 text-center mx-auto lg:inline-block lg:mr-3" />
                            ホーム
                        </a>
                    </Link>

                    <Link href="/announce">
                        <a className="text-xs w-1/4 h-full text-center pt-3 inline-block md:w-1/4 lg:block lg:w-4/5 lg:h-16 lg:mt-12 lg:mx-auto lg:pt-5  lg:text-lg hover:bg-gray-200 lg:rounded-full dark:hover:bg-dark-content">
                            <MdAnnouncement className="w-5 h-5 text-center mx-auto lg:inline-block lg:mr-3" />
                            お知らせ
                        </a>
                    </Link>

                    <Link href="/category/search">
                        <a className="text-xs w-1/4 h-full text-center pt-3 inline-block md:w-1/4 lg:block lg:w-4/5 lg:h-16 lg:mt-12 lg:mx-auto lg:pt-5  lg:text-lg hover:bg-gray-200 lg:rounded-full dark:hover:bg-dark-content">
                            <AiFillTags className="w-5 h-5 text-center mx-auto lg:inline-block lg:mr-3" />
                            カテゴリー
                        </a>
                    </Link>

                    <Link href={`/user/${User.uid}`}>
                        <a className="text-xs w-1/4 h-full text-center pt-3 inline-block md:w-1/4 lg:block lg:w-4/5 lg:h-16 lg:mt-12 lg:mx-auto lg:pt-5  lg:text-lg hover:bg-gray-200 lg:rounded-full dark:hover:bg-dark-content">
                            <FaUserAlt className="w-5 h-5 text-center mx-auto lg:inline-block lg:mr-3" />
                            マイページ
                        </a>
                    </Link>
                </div>

                {/* PC版の求人投稿ページ遷移ボタン */}
                <div className="hidden lg:block lg:w-4/5 lg:mx-auto lg:mt-20">
                    <AddPostTextButton />
                </div>
            </div>
        </>
    );
};
