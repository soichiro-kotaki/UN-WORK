import React from "react";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";

export const AddPostPlusButton: React.FC = () => {
    return (
        <>
            <Link href="/postform">
                <a className="z-20 fixed right-4 bottom-16 inline-block lg:hidden">
                    <MdAddCircle className="h-16 w-16 text-green-400 hover:text-green-700 transition-colors drop-shadow-md" />
                </a>
            </Link>
        </>
    );
};
