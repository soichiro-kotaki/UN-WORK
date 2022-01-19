import React from "react";
import Link from "next/link";

export const AddPostTextButton: React.FC = () => {
    return (
        <>
            <Link href="/postform">
                <a className="text-gray-50 text-center block bg-normal-btn hover:bg-normal-btn-hover transition-colors rounded-full lg:p-4 lg:shadow-xl hover:shadow-2xl">
                    求人を投稿する
                </a>
            </Link>
        </>
    );
};
