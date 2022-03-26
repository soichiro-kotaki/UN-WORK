import React from "react";
import Image from "next/image";

//components
import { BsInstagram } from "react-icons/bs";
import { EditProfileButton } from "@components/atoms/buttons/EditProfileButton";
import { EditProfileForm } from "@components/forms/EditProfileForm";

//types
import { UserDataType } from "src/types/user/UserDataType";

//utils
import { convertDateStr } from "src/utils/convertDateStr";

type Props = {
    userData: UserDataType;
};

export const UserProfile: React.FC<Props> = (props) => {
    const { userData } = props;

    return (
        <>
            <div className="w-11/12 rounded-3xl bg-white text-gray-900 border border-gray-300 p-8 mx-auto shadow-xl lg:shadow-2xl md:w-9/12 dark:bg-dark-content dark:text-dark-text">
                <div className="lg:flex lg:justify-between lg:items-center">
                    <div className="rounded-full text-center mx-auto lg:text-left lg:inline-block lg:m-0 ">
                        <div className="avatar">
                            <Image
                                src={userData.user_img}
                                width={200}
                                height={200}
                                alt="プロフィール画像"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <div className="mb-4 mt-4 lg:flex lg:flex-col lg:text-right lg:mb-8  xl:mr-0">
                        <h2 className="text-2xl font-semibold mb-2 mx-auto lg:text-3xl lg:inline-block lg:mx-0 ">
                            {userData.user_name}
                        </h2>
                        <p className="mb-4">{`${userData.user_subject}学科${userData.user_grade}`}</p>
                        <p className="text-sm mb-4 lg:text-base">{` ${userData.user_email}`}</p>
                        <span className="block mb-4 text-sm text-gray-500 dark:text-dark-time">{`${convertDateStr(
                            userData.created_at,
                        )}に登録`}</span>
                        <div className="mb-4 flex lg:block">
                            {userData.instagram && (
                                <a
                                    href={userData.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <BsInstagram className="mr-6 text-gray-900 inline-block w-10 h-10 hover:opacity-60 dark:text-dark-text lg:mb-4" />
                                </a>
                            )}
                            {userData.selfIntroduction && (
                                <p className="font-bold">{userData.selfIntroduction}</p>
                            )}
                        </div>
                        <div className="mx-auto md:w-3/5 lg:w-full">
                            <label htmlFor="modal-profile-edit" className="modal-button">
                                <EditProfileButton />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* プロフィール編集用モーダル */}
            <input type="checkbox" id="modal-profile-edit" className="modal-toggle" />
            <div className="modal opacity-5">
                <div className="modal-box bg-white text-gray-900">
                    <p className="font-bold text-center text-xl">プロフィール編集フォーム</p>
                    {/* プロフィール編集フォーム */}
                    <EditProfileForm userData={userData} />
                </div>
            </div>
        </>
    );
};
