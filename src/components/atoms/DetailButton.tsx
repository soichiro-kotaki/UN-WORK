import React from "react";

type Props = {
    text: string;
};

export const DetailButton: React.FC<Props> = (props) => {
    const { text } = props;

    return (
        <>
            <button
                onClick={() => {
                    alert("申し訳ありません🙇‍♂️ 詳細ページは現在作成中です。");
                }}
                className="btn btn-accent inline-block w-full"
            >
                {text}
            </button>
        </>
    );
};
