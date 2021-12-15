import React from "react";
import Link from "next/link";

//components

export const Footer: React.FC = () => {
    return (
        <>
            <div className="bg-gray-200 border-gray-300 border-t w-full lg:fixed lg:right-0 lg:top-0 lg:w-1/5 lg:h-full lg:border-l">
                <h1 className="text-center font-bold lg:mt-20 lg:text-3xl">フッター</h1>
            </div>
        </>
    );
};
