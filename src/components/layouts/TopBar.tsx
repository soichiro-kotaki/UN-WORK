import React from "react";
import Image from "next/image";

//components
import { MdNotifications } from "react-icons/md";

export const TopBar: React.FC = () => {
    return (
        <>
            <div className="flex justify-between items-center w-full h-16 border-b border-gray-300 bg-white text-right lg:w-3/5 lg:h-20 lg:mx-auto ">
                <div className="ml-2 lg:ml-4">
                    <Image src="/service-logo.png" width={260} height={65} alt="ロゴ画像です。" />
                </div>
                <MdNotifications
                    className="w-8 h-8 block text-gray-500 cursor-pointer hover:text-gray-300 mr-8 lg:w-12 lg:h-12 lg:mt-0"
                    onClick={() => {
                        alert("通知機能は現在開発中です🙇‍♂️");
                    }}
                />
            </div>
        </>
    );
};
