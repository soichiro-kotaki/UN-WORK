import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//apis
import { updateUserProfile } from "@apis/user";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//components
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { UpdateUserProfileValuesType } from "src/types/user/UpdateUserProfileValuesType";
import { UserDataType } from "src/types/user/UserDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    userData: UserDataType;
};

export const EditProfileForm: React.FC<Props> = (props) => {
    const { userData } = props;
    const [preview, setPreview] = useState(userData.user_img);
    const router = useRouter();
    const User = useContext(UserAuthContext);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
        reset,
        watch,
    } = useForm<UpdateUserProfileValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            userImg: null,
            instagram: userData.instagram ? userData.instagram : "",
            selfIntroduction: userData.selfIntroduction ? userData.selfIntroduction : "",
        },
    });

    const handleOnUserImg: SubmitHandler<UpdateUserProfileValuesType> = async (
        values: UpdateUserProfileValuesType,
    ): Promise<void> => {
        if (User.isTestUser) {
            alert(
                "プロフィール編集を行うには、ログインもしくは新規アカウント登録を行ってください。",
            );
            reset();
        } else {
            try {
                await updateUserProfile(values, User.uid, userData);
                alert("プロフィール情報が更新されました。変更の反映に1分程かかる場合があります。");
                reset();
                router.push(`/`);
            } catch (error) {
                alert("更新出来ませんでした。");
                console.log(error.message);
            }
        }
    };

    //投稿画像が変更された時にプレビュー用の画像URLを生成し、表示
    const isChanged = watch("userImg");
    useEffect(() => {
        const files = getValues("userImg");

        if (files) {
            setPreview(window.URL.createObjectURL(files[0]));
        }
    }, [getValues, isChanged]);

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnUserImg)} className="text-gray-900">
                {/* プロフィール画像更新フォーム */}
                <label
                    className="label mt-6 flex flex-col w-56 mx-auto hover:brightness-75 hover:cursor-pointer"
                    htmlFor="userImg"
                >
                    <span className=" mb-1 text-lg text-normal-btn hover:text-normal-btn-hover">
                        変更する
                    </span>
                    <input
                        type="file"
                        id="userImg"
                        name="userImg"
                        accept="image/*"
                        className="hidden w-full p-2 text-lg duration-150 bg-white ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 dark:bg-transparent"
                        {...register("userImg")}
                    />
                    <Image
                        src={preview}
                        width={200}
                        height={200}
                        alt={"求人画像プレビュー"}
                        className="object-cover rounded-full block"
                    />
                </label>

                {/* リンク(Instagram)入力フォーム */}
                <label className="label mt-4" htmlFor="instagram">
                    <span className="text-lg">InstagramアカウントURL</span>
                </label>
                <input
                    type="instagram"
                    id="instagram"
                    placeholder=" https://instagram.com/~"
                    {...register("instagram")}
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                />

                {/* 自己紹介文入力フォーム */}
                <label className="label mt-6" htmlFor="selfIntroduction">
                    <span className="text-lg">自己紹介</span>
                </label>
                <div className="mb-2">
                    {errors.selfIntroduction && (
                        <ErrorMessage errorMessage={"入力できる文字数は20文字以内です。"} />
                    )}
                </div>
                <input
                    type="selfIntroduction"
                    id="selfIntroduction"
                    placeholder="最大20文字
            "
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                    {...register("selfIntroduction", {
                        maxLength: 40,
                    })}
                />

                <div className="modal-action">
                    <label htmlFor="modal-profile-edit" className="btn btn-accent lg:w-1/3 mx-auto">
                        <button type="submit" className="font-bold" disabled={isSubmitting}>
                            {isSubmitting ? "送信中" : "編集内容を反映"}
                        </button>
                    </label>
                    <label htmlFor="modal-profile-edit" className="btn lg:w-1/3 mx-auto">
                        キャンセル
                    </label>
                </div>
            </form>
        </>
    );
};
