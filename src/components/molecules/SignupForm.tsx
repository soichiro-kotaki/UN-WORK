import React from "react";

// libraries
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";

//components
import { SubmitButton } from "@components/atoms/SubmitButton";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

//types
import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";

export const SignupForm: React.FC = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            grade: "1年生",
            subject: "GM",
        },
    });

    const handleOnSubmit: SubmitHandler<SignupFormValuesType> = (values) => {
        console.log(values);
        reset();
    };

    const handleOnError: SubmitErrorHandler<SignupFormValuesType> = (errors) => {
        console.log(errors);
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
                <label className="label mt-6" htmlFor="name">
                    <span className="text-lg label-text">氏名（本名）</span>
                </label>
                <div className="mb-2">
                    {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
                </div>
                <input
                    type="text"
                    id="name"
                    placeholder="長野 太郎"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("name", {
                        required: "入力必須項目です。",
                    })}
                />
                <label className="label mt-6" htmlFor="email">
                    <span className="text-lg  label-text">メールアドレス</span>
                </label>
                <div className="mb-2">
                    {errors.email && <ErrorMessage errorMessage={errors.email.message} />}
                </div>
                <input
                    type="email"
                    id="email"
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
                <label className="label " htmlFor="email">
                    <span className="text-sm label-text">
                        ※大学のOutlookのみ利用可、アカウント作成後に入力されたアドレスに確認メールが届きます。
                    </span>
                </label>
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
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50 focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("password", {
                        required: "入力必須項目です。",
                        pattern: {
                            value: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8}$/,
                            message: "パスワードの形式が正しくありません。",
                        },
                    })}
                />
                <label className="label" htmlFor="password">
                    <span className="text-sm label-text">※ログイン時に使用します</span>
                </label>
                <label className="label mt-6 mb-2" htmlFor="grade">
                    <span className="text-lg label-text">現在の学年を選択</span>
                </label>
                <select
                    className="w-full select text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    required
                    id="grade"
                    {...register("grade", {})}
                >
                    <option disabled={true} defaultChecked={true}>
                        学年
                    </option>
                    <option>1年生</option>
                    <option>2年生</option>
                    <option>3年生</option>
                    <option>4年生</option>
                </select>
                <label className="label mt-6 mb-2" htmlFor="subject">
                    <span className="text-lg label-text">所属学科を選択</span>
                </label>
                <select
                    className="w-full select text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    required
                    id="subject"
                    {...register("subject", {})}
                >
                    <option disabled={true} defaultChecked={true}>
                        学科
                    </option>
                    <option>GM</option>
                    <option>こども</option>
                    <option>食健康</option>
                </select>
                <label className="label mt-6" htmlFor="userImg">
                    <span className="text-lg label-text">プロフィール用画像を選択</span>
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
                <div className="mt-10 mx-auto w-40">
                    <SubmitButton text={"登録"} />
                </div>
            </form>
        </>
    );
};
