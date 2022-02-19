import React from "react";
import Link from "next/link";

export const EditProfileButton: React.FC = () => {
    return (
        <>
            <Link href="/user/editprofile">
                <a className="p-3 text-gray-50 text-center block cursor-pointer bg-normal-btn hover:bg-normal-btn-hover transition-colors rounded-full  lg:p-3 lg:px-5 2xl:px-16">
                    ユーザー画像を変更する
                </a>
            </Link>
        </>
    );
};
