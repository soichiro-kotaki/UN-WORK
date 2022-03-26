import React from "react";

export const EditProfileButton: React.FC = () => {
    return (
        <>
            <a className="p-3 text-gray-50 text-center block cursor-pointer shadow-lg hover:shadow-xl bg-normal-btn hover:bg-normal-btn-hover transition-colors rounded-full lg:p-3 lg:px-5 2xl:px-16">
                プロフィールを編集する
            </a>
        </>
    );
};
