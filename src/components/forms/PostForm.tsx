import React, { useContext } from "react";
import { useRouter } from "next/router";

//apis
import { addJobPost } from "src/apis/post";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//components
import { SubmitButton } from "@components/atoms/buttons/SubmitButton";
import { ErrorMessage } from "@components/atoms/buttons/ErrorMessage";

//types
import { PostFormValuesType } from "src/types/form/PostFormValuesType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

export const PostForm: React.FC = () => {
    const router = useRouter();
    const User = useContext(UserAuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PostFormValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            title: "",
            salary: "",
            category: "飲食(居酒屋)",
            body: "",
            post_img: null,
        },
    });

    const handleOnAddPost: SubmitHandler<PostFormValuesType> = async (
        values: PostFormValuesType,
    ) => {
        if (User.isTestUser) {
            alert("求人投稿を行うには、ログインもしくはアカウント作成を行ってください。");
            reset();
        } else {
            try {
                alert("求人が投稿されました。投稿の反映に1分程かかる場合があります。");
                await addJobPost(values, User.uid);
                reset();
                router.push("/");
            } catch {
                alert("投稿に失敗しました。");
            }
        }
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit(handleOnAddPost)} className="text-gray-900">
                {/* 求人タイトル入力フォーム */}
                <label className="label mt-6" htmlFor="title">
                    <span className="text-lg">求人タイトル</span>
                </label>
                <div className="mb-2">
                    {errors.title && <ErrorMessage errorMessage={errors.title.message} />}
                </div>
                <input
                    id="title"
                    type="title"
                    placeholder="例: 〇〇ホテルの給仕スタッフ募集！！"
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("title", {
                        required: "入力必須項目です。",
                    })}
                />

                {/* 時給入力フォーム */}
                <label className="label mt-6" htmlFor="salary">
                    <span className="text-lg">時給</span>
                </label>
                <div className="mb-2">
                    {errors.salary && <ErrorMessage errorMessage={errors.salary.message} />}
                </div>
                <input
                    type="salary"
                    id="salary"
                    placeholder="例: 1,000円~ (詳細は紹介文に記入)
            "
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("salary", {
                        required: "入力必須項目です。",
                    })}
                />

                {/* 求人のカテゴリー選択フォーム */}
                <label className="label mt-6 mb-2" htmlFor="category">
                    <span className="text-lg">求人のカテゴリー</span>
                </label>
                <select
                    className="w-full select text-lg duration-150 ring-green-400 bg-white ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    required
                    id="category"
                    {...register("category")}
                >
                    <option defaultChecked={true}>飲食(居酒屋)</option>
                    <option>飲食(ファストフード系)</option>
                    <option>飲食(その他)</option>
                    <option>パン・ケーキ屋</option>
                    <option>カフェ</option>
                    <option>ホテル・婚礼</option>
                    <option>本屋</option>
                    <option>エンタメ系(カラオケなど)</option>
                    <option>フィットネス・ジム</option>
                    <option>雑貨屋</option>
                    <option>スーパー・コンビニ</option>
                    <option>塾講師</option>
                    <option>ファッション</option>
                    <option>配送・デリバリー</option>
                    <option>単発バイト・日雇い</option>
                    <option>事務系</option>
                    <option>美容系</option>
                    <option>その他</option>
                </select>

                {/* 求人紹介文入力フォーム */}
                <label className="label mt-6" htmlFor="body">
                    <span className="text-lg">紹介文</span>
                </label>
                <div className="mb-2">
                    {errors.body && <ErrorMessage errorMessage={errors.body.message} />}
                </div>
                <textarea
                    id="body"
                    placeholder={`※最大800文字（項目毎に改行を入れてください。） \n県大生の比率、店舗の雰囲気、時給詳細、福利厚生、その他意外と知られていないことなど自由に記入してください😁`}
                    className="w-full h-60 p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                    {...register("body", {
                        required: "入力必須項目です。",
                        maxLength: 800,
                    })}
                />

                {/* 画像アップロードフォーム */}
                <label className="label mt-6" htmlFor="userImg">
                    <span className="text-lg">画像をアップロード</span>
                </label>
                <div className="mb-2">
                    {errors.post_img && <ErrorMessage errorMessage={errors.post_img.message} />}
                </div>
                <input
                    type="file"
                    id="userImg"
                    name="userImg"
                    accept="image/*"
                    className="w-full p-2 text-lg duration-150 bg-white ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                    {...register("post_img", {
                        required: "画像を選択してください。",
                    })}
                />

                {/* ログインボタン */}
                <div className="mt-10 mb-4 mx-auto w-40">
                    <SubmitButton text={"投稿"} />
                </div>
            </form>
        </>
    );
};
