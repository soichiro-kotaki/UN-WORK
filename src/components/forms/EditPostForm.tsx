import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

//apis
import { editJobPost } from "@apis/post";

//libs
import { useForm, SubmitHandler } from "react-hook-form";

//types
import { EditPostFormValuesType } from "src/types/form/EditPostFormValuesType";
import { PostDataType } from "src/types/post/PostDataType";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    postData: PostDataType;
};

export const EditPostForm: React.FC<Props> = (props) => {
    const { postData } = props;
    const [preview, setPreview] = useState(postData.post_img);
    const router = useRouter();
    const User = useContext(UserAuthContext);

    const {
        register,
        getValues,
        handleSubmit,
        reset,
        formState: { isSubmitting },
        watch,
    } = useForm<EditPostFormValuesType>({
        mode: "onSubmit",
        reValidateMode: "onSubmit",
        defaultValues: {
            post_img: null,
            instagram: postData.links ? postData.links.instagram : "",
            twitter: postData.links ? postData.links.twitter : "",
            homepage: postData.links ? postData.links.homepage : "",
        },
    });

    const handleOnEditPost: SubmitHandler<EditPostFormValuesType> = async (
        values: EditPostFormValuesType,
    ): Promise<void> => {
        try {
            await editJobPost(values, User.uid, postData);
            alert("変更内容が保存されました。反映に1分程かかる場合があります。");
            reset();
            router.push("/");
        } catch {
            alert("変更の反映に失敗しました");
        }
    };

    //投稿画像が変更された時にプレビュー用の画像URLを生成し、表示
    const watchPostImg = watch("post_img");
    useEffect(() => {
        const imgFile = getValues("post_img");

        if (!imgFile) {
            return;
        }

        if (imgFile.length > 0) {
            setPreview(window.URL.createObjectURL(imgFile[0]));
        }
    }, [getValues, watchPostImg]);

    return (
        <>
            <form action="" className="w-full" onSubmit={handleSubmit(handleOnEditPost)}>
                <label
                    className="label mt-2 flex flex-col w-28 mx-auto hover:brightness-75 hover:cursor-pointer"
                    htmlFor="post_img"
                >
                    <span className="text-lg text-normal-btn">画像を変更</span>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="post_img"
                        {...register("post_img")}
                    />
                    <Image
                        src={preview}
                        width={100}
                        height={100}
                        alt={"求人画像プレビュー"}
                        className="object-cover block"
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
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50 focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                />

                {/* リンク(Twitter)入力フォーム */}
                <label className="label mt-4" htmlFor="twitter">
                    <span className="text-lg">TwitterアカウントURL</span>
                </label>
                <input
                    type="twitter"
                    id="twitter"
                    placeholder=" https://twitter.com/~"
                    {...register("twitter")}
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                />

                {/* リンク(ホームページ)入力フォーム */}
                <label className="label mt-4" htmlFor="homepage">
                    <span className="text-lg">ホームページURL</span>
                </label>
                <input
                    type="homepage"
                    id="homepage"
                    placeholder=" https://~"
                    {...register("homepage")}
                    className="w-full p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4 dark:bg-dark-content dark:focus:bg-green-50"
                />

                <div className="modal-action">
                    <label htmlFor="modal-post-edit" className="btn btn-accent lg:w-1/3 mx-auto">
                        <button type="submit" className="font-bold" disabled={isSubmitting}>
                            {isSubmitting ? "送信中" : "編集内容を反映"}
                        </button>
                    </label>
                    <label htmlFor="modal-post-edit" className="btn lg:w-1/3 mx-auto">
                        キャンセル
                    </label>
                </div>
            </form>
        </>
    );
};
