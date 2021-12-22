import React, { useContext } from "react";
import { useRouter } from "next/router";

//apis
import { updateUserProfile } from "@apis/user";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//components
import { SubmitButton } from "@components/atoms/SubmitButton";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

//types
import { UpdateUserProfileValuesType } from "src/types/user/UpdateUserProfileValuesType";

//contextAPI
import { IsUserContext } from "@pages/_app";

export const EditProfileForm: React.FC = () => {
    const router = useRouter();
    const uid = useContext(IsUserContext);

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
        try {
            await updateUserProfile(userImg, uid);
            reset();
            alert("画像が更新されました。");
            router.push(`/user/${uid}`);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnUserImg)}>
                {/* プロフィール画像更新フォーム */}
                <label className="label mt-6" htmlFor="userImg">
                    <span className="text-lg label-text">新たなプロフィール用画像を選択</span>
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
