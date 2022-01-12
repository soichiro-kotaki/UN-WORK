import React, { useContext } from "react";
import { useRouter } from "next/router";

//contextAPI
import { UserAuthContext } from "@pages/_app";

type Props = {
    text: string;
    postID: string;
};

export const DetailButton: React.FC<Props> = (props) => {
    const { text, postID } = props;
    const router = useRouter();
    const User = useContext(UserAuthContext);

    return (
        <>
            <button
                onClick={() => {
                    if (User.isTestUser) {
                        alert(
                            "詳細ページを見るには、ログインもしくはアカウント作成を行なってください。",
                        );
                    } else {
                        router.push(`/post/${postID}`);
                    }
                }}
                className="btn btn-accent inline-block w-full"
            >
                {text}
            </button>
        </>
    );
};
