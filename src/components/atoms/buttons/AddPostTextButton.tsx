import React from "react";
import Link from "next/link";

//components
import { RiFileEditLine } from "react-icons/ri";

export const AddPostTextButton: React.FC = () => {
    return (
        <>
            <Link href="/postform" legacyBehavior>
                <a className="text-gray-50 text-center block bg-normal-btn hover:bg-normal-btn-hover transition-colors rounded-full lg:p-4 lg:shadow-xl hover:shadow-2xl">
                    <RiFileEditLine className="inline-block mr-2 w-5 h-5 lg:w-8 lg:h-8" />
                    求人を投稿する
                </a>
            </Link>
        </>
    );
};
