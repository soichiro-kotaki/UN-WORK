import React from "react";
import { useRouter } from "next/router";

//apis
// import { signupUserData } from "src/apis/user";

//libs
import { useForm, SubmitHandler } from "react-hook-form";
import firebase, { auth, db, storage } from "@libs/firebaseConfig";

//components
import { SubmitButton } from "@components/atoms/SubmitButton";
import { ErrorMessage } from "@components/atoms/ErrorMessage";

//types
import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";

export const SignupForm: React.FC = () => {
    const router = useRouter();

    const actionCodeSettings = {
        url: process.env.NEXT_PUBLIC_BASE_URL + "/login",
    };

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
            userImg: null,
        },
    });

    const handleOnSignup: SubmitHandler<SignupFormValuesType> = async (values) => {
        const { name, email, password, grade, subject, userImg } = values;

        //Storageにフォームから取得した画像ファイルを保存・参照用パスを生成
        const userImgRef = storage
            .ref()
            .child(`images/users/${values.email}/${values.userImg[0].name}`);

        try {
            //新規アカウント登録、アカウント認証メールの送信
            // signupUserData(values, userImgRef, actionCodeSettings);（現在、エラーが発生しており解決できていないので、未使用。）

            const user = await auth.createUserWithEmailAndPassword(email, password);

            //Storageに保存した画像を参照、AuthのphotoURLに追加
            await userImgRef.put(userImg[0]);
            const url = await userImgRef.getDownloadURL();
            await user.user.updateProfile({
                photoURL: url,
            });

            await db.collection("users").doc(`${user.user.uid}`).set({
                user_name: name,
                user_email: email,
                user_grade: grade,
                user_subject: subject,
                user_img: url,
                created_at: firebase.firestore.FieldValue.serverTimestamp(),
            });

            //アカウント作成時に入力されたメールアドレスにアカウント認証を行うためのメールを送信
            await auth.currentUser.sendEmailVerification(actionCodeSettings);
            alert(
                `${email}宛にアカウント認証用メールを送信しました。添付のリンクから認証を行った後にログインを行ってください。\n※受信トレイにメールが届いていない場合は、迷惑メールフォルダに振り分けられている可能性があります。`,
            );

            //フォームの値を空にしてログインページへ遷移
            reset();
            router.push("/login");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnSignup)}>
                {/* 氏名（ユーザー名）登録フォーム */}
                <label className="label mt-6" htmlFor="name">
                    <span className="text-lg label-text">氏名（本名）</span>
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
                    <span className="text-lg  label-text">メールアドレス</span>
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
                    <span className="text-sm label-text">
                        ※大学のOutlookのみ利用可、アカウント作成後に入力されたアドレスにアカウント認証用メールが届きます
                    </span>
                </label>

                {/* パスワード登録フォーム */}
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

                {/* 学年選択フォーム */}
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

                {/* 所属学科選択フォーム */}
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

                {/* プロフィール画像登録フォーム */}
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
                <label className="label" htmlFor="userImg">
                    <span className="text-sm label-text">※ログイン後に変更可能です</span>
                </label>

                {/* 登録用ボタン */}
                <div className="mt-10 mx-auto w-40">
                    <SubmitButton text={"登録"} />
                </div>
            </form>
        </>
    );
};
