import React from "react";
import Image from "next/image";

//components
import { EditProfileButton } from "@components/atoms/EditProfileButton";

//types
import { UserDataType } from "src/types/user/UserDataType";

type Props = {
    userData: UserDataType;
};

export const UserProfile: React.FC<Props> = (props) => {
    const { userData } = props;

    return (
        <>
            <div className="w-11/12 rounded-3xl bg-white border border-gray-300 p-8 mx-auto md:w-9/12 lg:w-11/12">
                <h1 className="text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                    プロフィール
                </h1>
                <div className="lg:flex lg:justify-evenly">
                    <div className="rounded-full text-center mx-auto lg:text-left lg:inline-block lg:m-0 lg:mr-20 xl:mr-60">
                        <Image
                            src={userData.user_img}
                            width={180}
                            height={180}
                            alt="プロフィール画像"
                            className="rounded-full"
                        />
                    </div>
                    <div className="mb-4 mt-4 lg:flex lg:flex-col lg:text-right lg:mb-8  xl:mr-0">
                        <h2 className="text-2xl font-semibold mb-2 mx-auto lg:text-3xl lg:inline-block lg:mx-0 ">
                            {userData.user_name}
                        </h2>
                        <p className="mb-4">{`${userData.user_subject}学科${userData.user_grade}`}</p>
                        <p className="text-sm mb-4 lg:text-base">{` ${userData.user_email}`}</p>
                        <span className="block mb-8 text-sm text-gray-500">{`${userData.created_at}に登録`}</span>
                        <EditProfileButton />
                    </div>
                </div>
            </div>
        </>
    );
};