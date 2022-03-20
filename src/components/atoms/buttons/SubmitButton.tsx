import React from "react";

type Props = {
    text: string;
};

export const SubmitButton: React.FC<Props> = (props) => {
    const { text } = props;

    return (
        <>
            <button
                type="submit"
                className="btn btn-accent inline-block w-full shadow-lg hover:shadow-xl"
            >
                {text}
            </button>
        </>
    );
};
