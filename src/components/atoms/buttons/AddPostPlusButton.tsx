import React from "react";
import Link from "next/link";
import { IoAddCircleSharp } from "react-icons/io5";

export const AddPostPlusButton: React.FC = () => {
    return (
        <>
            <Link href="/postform" legacyBehavior>
                <a className="z-20 fixed right-4 bottom-16 inline-block lg:hidden">
                    <IoAddCircleSharp className="h-16 w-16 text-normal-btn hover:text-normal-btn-hover transition-colors drop-shadow-xl" />
                </a>
            </Link>
        </>
    );
};
