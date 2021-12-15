import React from "react";
import Link from "next/link";

export const AddPostPlusButton: React.FC = () => {
    return (
        <>
            <Link href="/">
                <a className="rounded fixed right-4 bottom-16 inline-block lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-green-400 hover:text-green-700 transition-colors"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </Link>
        </>
    );
};
