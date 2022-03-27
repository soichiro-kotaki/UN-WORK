import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//apis
import { signupUserData } from "src/apis/user";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";

export const SignupForm: React.FC = () => {
    const [preview, setPreview] = useState("/no-user-image.jpg");
    const router = useRouter();

    const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_BASE_URL + "/login",
    };

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<SignupFormValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            grade: "1年生",
            subject: "GM",
            userImg: null,
            instagram: "",
            selfIntroduction: "",
        },
    });

    const handleOnSignup: SubmitHandler<SignupFormValuesType> = async (values) => {
        try {
            //新規アカウント登録・アカウント認証メールの送信
            await signupUserData(values, actionCodeSettings);

            //フォームの値を空にしてログインページへ遷移
            reset();
            router.push("/login");
        } catch (error) {
            alert(error.message);
            reset();
        }
    };

    //プロフィール画像が変更された時にプレビュー用の画像URLを生成し、表示
    const watchUserImg = watch("userImg");
    useEffect(() => {
        const imgFile = getValues("userImg");

        if (!imgFile) {
            return;
        }

        if (imgFile.length > 0) {
            setPreview(window.URL.createObjectURL(imgFile[0]));
        }
    }, [getValues, watchUserImg]);

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnSignup)} className="text-gray-900">
                {/* 氏名（ユーザー名）登録フォーム */}
                <label className="label mt-6" htmlFor="name">
                    <span className="text-lg">氏名（本名）</span>
                </label>
                <div className="mb-2">
                    {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
                </div>
                <input
                    type="text"
                    id="name"
                    placeholder="例: 長野 太郎"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("name", {
                        required: "入力必須項目です。",
                    })}
                />

                {/* メールアドレス登録フォーム */}
                <label className="label mt-6" htmlFor="email">
                    <span className="text-lg ">メールアドレス</span>
                </label>
                <div className="mb-2">
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
                </div>
                <input
                    type="email"
                    id="email"
                    placeholder="例: 〇〇G000@u-nagano.ac.jp"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("email", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^[0-9]{2}[C,F,G][0-9]{3}@u-nagano.ac.jp$/,
                            message: "メールアドレスが正しくありません。",
                        },
                    })}
                />
                <label className="label " htmlFor="email">
                    <span className="text-sm">
                        ※大学Outlookのみ利用可、アカウント作成後に入力されたアドレスにアカウント認証用メールが届きます。
                        学籍番号の英文字は大文字で記入してください。
                    </span>
                </label>

                {/* パスワード登録フォーム */}
                <label className="label mt-6" htmlFor="password">
                    <span className="text-lg">アカウント用パスワード</span>
                </label>
                <div className="mb-2">
                    {errors.password && <ErrorMessage errorMessage={errors.password.message} />}
                </div>
                <input
                    type="password"
                    id="password"
                    placeholder="英数字8文字以上16文字以下
        "
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50 focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("password", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,16}$/i,
                            message: "パスワードの形式が正しくありません。",
                        },
                    })}
                />
                <label className="label" htmlFor="password">
                    <span className="text-sm">※ログイン時に使用します</span>
                </label>

                {/* 学年選択フォーム */}
                <label className="label mt-6 mb-2" htmlFor="grade">
                    <span className="text-lg">現在の学年を選択</span>
                </label>
                <select
                    className="w-full select text-lg duration-150 ring-green-400 bg-white ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    required
                    id="grade"
                    {...register("grade")}
                >
                    <option disabled={true} defaultChecked={true}>
                        学年
                    </option>
                    <option>1年生</option>
                    <option>2年生</option>
                    <option>3年生</option>
                    <option>4年生</option>
                </select>

                {/* 所属学科選択フォーム */}
                <label className="label mt-6 mb-2" htmlFor="subject">
                    <span className="text-lg">所属学科を選択</span>
                </label>
                <select
                    className="w-full select text-lg duration-150 ring-green-400 bg-white ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    required
                    id="subject"
                    {...register("subject")}
                >
                    <option disabled={true} defaultChecked={true}>
                        学科
                    </option>
                    <option>GM</option>
                    <option>こども</option>
                    <option>食健康</option>
                </select>

                {/* プロフィール画像登録フォーム */}
                <div className="mb-2 mt-8">
                    {errors.userImg && <ErrorMessage errorMessage={errors.userImg.message} />}
                </div>
                <label
                    className="label flex flex-col w-56 mx-auto hover:brightness-75 hover:cursor-pointer"
                    htmlFor="userImg"
                >
                    <span className="text-lg text-normal-btn">プロフィール用画像を選択</span>
                    <input
                        type="file"
                        id="userImg"
                        name="userImg"
                        accept="image/*"
                        className="hidden w-full p-2 text-lg duration-150 bg-white ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                        {...register("userImg", {
                            required: "画像を選択してください。",
                        })}
                    />
                    <Image
                        src={preview}
                        width={200}
                        height={200}
                        alt={"プロフィール画像プレビュー"}
                        className="object-cover rounded-full block"
                    />
                    <label className="label" htmlFor="userImg">
                        <span className="text-sm">※ログイン後に変更可能です</span>
                    </label>
                </label>

                {/* リンク(Instagram)入力フォーム */}
                <label className="label mt-4" htmlFor="instagram">
                    <span className="text-lg">InstagramアカウントURL(自由)</span>
                </label>
                <input
                    type="instagram"
                    id="instagram"
                    placeholder="https://instagram.com/~"
                    {...register("instagram")}
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                />
                <label className="label" htmlFor="instagram">
                    <span className="text-sm">※ログイン後に変更・追加可能です</span>
                </label>

                {/* 自己紹介文入力フォーム */}
                <label className="label mt-6" htmlFor="selfIntroduction">
                    <span className="text-lg">自己紹介(自由)</span>
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
                <label className="label" htmlFor="selfIntroduction">
                    <span className="text-sm">※ログイン後に変更・追加可能です</span>
                </label>

                {/* 登録用ボタン */}
                <div className="mt-10 mx-auto w-40">
                    <SubmitButton text={"登録"} />
                </div>
            </form>
        </>
    );
};
