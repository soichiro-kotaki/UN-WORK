import React from "react";
import { useRouter } from "next/router";

type Props = {
    text: string;
    postID: string;
};

export const DetailButton: React.FC<Props> = (props) => {
    const { text, postID } = props;
    const router = useRouter();

    return (
        <>
            <button
                onClick={() => {
                    router.push(`/post/${postID}`);
                }}
                className="btn btn-accent inline-block w-full"
            >
                {text}
            </button>
        </>
    );
};
