import React, { useContext } from "react";
import { useRouter } from "next/router";

//apis
import { updateUserProfile } from "@apis/user";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { UpdateUserProfileValuesType } from "src/types/user/UpdateUserProfileValuesType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

export const EditProfileForm: React.FC = () => {
    const router = useRouter();
    const User = useContext(UserAuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UpdateUserProfileValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            userImg: null,
        },
    });

    const handleOnUserImg: SubmitHandler<UpdateUserProfileValuesType> = async (
        userImg: UpdateUserProfileValuesType,
    ) => {
        if (User.isTestUser) {
            alert(
                "プロフィール画像編集を行うには、ログインもしくは新規アカウント登録を行ってください。",
            );
            reset();
        } else {
            try {
                alert("画像が更新されました。変更の反映に1分程かかる場合があります。");
                await updateUserProfile(userImg, User.uid);
                reset();
                router.push(`/user/${User.uid}`);
            } catch (error) {
                alert("更新出来ませんでした。");
                console.log(error.message);
            }
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnUserImg)} className="text-gray-900">
                {/* プロフィール画像更新フォーム */}
                <label className="label mt-6" htmlFor="userImg">
                    <span className="text-lg">新たなプロフィール用画像を選択</span>
                </label>
                <div className="mb-2">
                    {errors.userImg && <ErrorMessage errorMessage={errors.userImg.message} />}
                </div>
                <input
                    type="file"
                    id="userImg"
                    name="userImg"
                    accept="image/*"
                    className="w-full p-2 text-lg duration-150 bg-white ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    {...register("userImg", {
                        required: "画像を選択してください。",
                    })}
                />

                {/* 更新ボタン */}
                <div className="mt-10 mb-4 mx-auto w-40">
                    <SubmitButton text={"更新"} />
                </div>
            </form>
        </>
    );
};
