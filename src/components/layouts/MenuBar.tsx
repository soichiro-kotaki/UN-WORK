import React from "react";
import Link from "next/link";

//components
import { AddPostTextButton } from "@components/atoms/AddPostTextButton";
import { AiFillHome, AiFillTags } from "react-icons/ai";
import { MdAnnouncement } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";

export const MenuBar: React.FC = () => {
    return (
        <>
            <div className="z-10 fixed bottom-0 border-gray-300 border-t w-full h-12 lg:left-0 lg:top-0 lg:w-1/5 lg:h-full lg:border-r">
                <Link href="/">
                    <a className="text-xs w-1/4 h-full text-center pt-2 inline-block lg:block lg:w-4/5 lg:h-16 lg:mt-16 lg:mx-auto lg:pt-2 lg:text-lg hover:bg-gray-200 lg:rounded-full">
                        <AiFillHome className="w-5 h-5 text-center mx-auto  lg:w-8 lg:h-6" />
                        ホーム
                    </a>
                </Link>

                <Link href="/announcements">
                    <a className="text-xs w-1/4 h-full text-center pt-2 inline-block lg:block lg:w-4/5 lg:h-16 lg:mt-16 lg:mx-auto lg:pt-2 lg:text-lg hover:bg-gray-200 lg:rounded-full">
                        <MdAnnouncement className="w-5 h-5 text-center mx-auto" />
                        お知らせ
                    </a>
                </Link>

                <Link href="/categories">
                    <a className="text-xs w-1/4 h-full text-center pt-2 inline-block lg:block lg:w-4/5 lg:h-16 lg:mt-16 lg:mx-auto lg:pt-2 lg:text-lg hover:bg-gray-200 lg:rounded-full">
                        <AiFillTags className="w-5 h-5 text-center mx-auto " />
                        カテゴリー
                    </a>
                </Link>

                <Link href="/mypage">
                    <a className="text-xs w-1/4 h-full text-center pt-2 inline-block lg:block lg:w-4/5 lg:h-16 lg:mt-16 lg:mx-auto lg:pt-2 lg:text-lg hover:bg-gray-200 lg:rounded-full">
                        <FaUserAlt className="w-5 h-5 text-center mx-auto" />
                        マイページ
                    </a>
                </Link>

                {/* PC版の求人投稿ページ遷移ボタン */}
                <div className="hidden lg:block lg:w-4/5 lg:mx-auto lg:mt-16">
                    <AddPostTextButton />
                </div>
            </div>
        </>
    );
};
