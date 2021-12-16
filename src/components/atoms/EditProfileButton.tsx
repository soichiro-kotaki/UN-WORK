import React from "react";
import Link from "next/link";

export const EditProfileButton: React.FC = () => {
    return (
        <>
            {/* <Link href="/"> */}
            <a
                onClick={() => {
                    alert("プロフィール編集機能は現在開発中です🙇‍♂️");
                }}
                className="p-3 text-gray-50 text-center block cursor-pointer bg-green-400 hover:bg-green-700 transition-colors rounded-full  lg:p-3 lg:px-5 2xl:px-16"
            >
                プロフィールを編集する
            </a>
            {/* </Link> */}
        </>
    );
};
