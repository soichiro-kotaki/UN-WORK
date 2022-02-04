import React from "react";
import Image from "next/image";

//components
import { ChangeThemeButton } from "@components/atoms/buttons/ChangeThemeButton";

export const TopBar: React.FC = () => {
    return (
        <>
            <div className="flex justify-between items-center w-full h-16 border-b border-gray-300 bg-white text-right lg:w-3/5 lg:h-20 lg:mx-auto dark:bg-dark-screen">
                <div className="ml-2 lg:ml-4">
                    <Image
                        src="/service-logo.png"
                        width={260}
                        height={65}
                        alt="ロゴ画像です。"
                        className="mix-blend-mutiple"
                    />
                </div>
                <ChangeThemeButton />
            </div>
        </>
    );
};
