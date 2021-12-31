import React from "react";

//components
import { MdNotifications } from "react-icons/md";
import { ServiceLogo } from "@components/atoms/ServiceLogo";

export const TopBar: React.FC = () => {
    return (
        <>
            <div className="flex justify-between items-center w-full h-16 border-b border-gray-300 text-right lg:w-3/5 lg:h-20 lg:mx-auto ">
                <div className="ml-4 lg:ml-8">
                    <ServiceLogo />
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
