import React from "react";
import { useRouter } from "next/router";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@libs/firebaseConfig";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { ResetPasswordFormValueType } from "src/types/form/ResetPasswordFormValueType";

export const ResetPasswordForm: React.FC = () => {
    const router = useRouter();

    const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_BASE_URL + "/login",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ResetPasswordFormValueType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: "",
        },
    });

    const handleOnSendVerification: SubmitHandler<ResetPasswordFormValueType> = async (value) => {
        const { email } = value;

        try {
            await auth.sendPasswordResetEmail(email, actionCodeSettings);
            alert(`${email}宛にパスワード再設定用メールが送信されました。`);
            reset();
            router.push("/login");
        } catch {
            alert("再度メールアドレスを入力してください。");
        }
    };

    return (
        <>
            <form
                action=""
                className="w-full text-gray-900"
                onSubmit={handleSubmit(handleOnSendVerification)}
            >
                {/* メールアドレス入力フォーム */}
                <label className="label mt-6" htmlFor="email">
                    <span className="text-lg">メールアドレス</span>
                </label>
                <div className="mb-2">
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
                </div>
                <input
                    id="email"
                    type="email"
                    placeholder="19G000@u-nagano.ac.jp"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("email", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^[0-9]{2}[C,F,G][0-9]{3}@u-nagano.ac.jp$/,
                            message: "メールアドレスが正しくありません。",
                        },
                    })}
                />

                {/* メール送信ボタン */}
                <div className="mt-10 mx-auto w-40">
                    <SubmitButton text={"送信"} />
                </div>
            </form>
        </>
    );
};
