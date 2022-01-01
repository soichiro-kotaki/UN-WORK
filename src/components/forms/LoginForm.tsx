import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "@libs/firebaseConfig";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { LoginFormValuesType } from "src/types/form/LoginFormValuesType";

export const LoginForm: React.FC = () => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleOnLogin: SubmitHandler<LoginFormValuesType> = async (values) => {
        const { email, password } = values;

        try {
            const user = await auth.signInWithEmailAndPassword(email, password);
            reset();
            user.user.emailVerified
                ? router.push("/")
                : alert("送信されたメールから認証を行ってください。");
        } catch {
            alert("メールアドレスもしくはパスワードが違います。");
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnLogin)}>
                {/* メールアドレス入力フォーム */}
                <label className="label mt-6" htmlFor="email">
                    <span className="text-lg label-text">メールアドレス</span>
                </label>
                <div className="mb-2">
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
                </div>
                <input
                    id="email"
                    type="email"
                    placeholder="〇〇G000@u-nagano.ac.jp"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("email", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^[0-9]{2}[C,F,G][0-9]{3}@u-nagano.ac.jp$/,
                            message: "メールアドレスが正しくありません。",
                        },
                    })}
                />

                {/* パスワード入力フォーム */}
                <label className="label mt-6" htmlFor="password">
                    <span className="text-lg label-text">パスワード</span>
                </label>
                <div className="mb-2">
                    {errors.password && <ErrorMessage errorMessage={errors.password.message} />}
                </div>
                <input
                    type="password"
                    id="password"
                    placeholder="英数字8文字
        "
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("password", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8}$/,
                            message: "パスワードの形式が正しくありません。",
                        },
                    })}
                />

                {/* パスワード再設定ページのリンク */}
                <Link href="/resetPassword">
                    <a className="mt-6 inline-block text-green-400 text-xs underline hover:cursor-pointer hover:text-green-300">
                        パスワードを忘れた場合はこちら
                    </a>
                </Link>

                {/* ログインボタン */}
                <div className="mt-10 mx-auto w-40">
                    <SubmitButton text={"ログイン"} />
                </div>
            </form>
        </>
    );
};
