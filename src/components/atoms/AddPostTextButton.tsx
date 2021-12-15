import React from "react";
import Link from "next/link";

export const AddPostTextButton: React.FC = () => {
    return (
        <>
            <Link href="/">
                <a className="text-gray-50 text-center block bg-green-400 hover:bg-green-700 transition-colors rounded-full lg:p-4">
                    求人を投稿する
                </a>
            </Link>
        </>
    );
};