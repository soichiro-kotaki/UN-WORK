import React from "react";
import { useRouter } from "next/router";

//apis
import { createPostPagePath } from "@apis/post";

type Props = {
    text: string;
    uid: string;
};

export const DetailButton: React.FC<Props> = (props) => {
    const { text, uid } = props;
    const router = useRouter();

    return (
        <>
            <button
                onClick={async () => {
                    const dataList = await createPostPagePath(uid);
                    router.push(`/post/${dataList}`);
                }}
                className="btn btn-accent inline-block w-full"
            >
                {text}
            </button>
        </>
    );
};
