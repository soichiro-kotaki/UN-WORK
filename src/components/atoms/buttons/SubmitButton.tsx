import React from "react";

type Props = {
    text: string;
    textInProcess: string;
    isDisabled: boolean;
};

export const SubmitButton: React.FC<Props> = (props) => {
    const { text, textInProcess, isDisabled } = props;

    return (
        <>
            <button
                type="submit"
                className="btn btn-accent inline-block disabled:bg-gray-400 disabled:border-gray-400 w-full shadow-lg hover:shadow-xl"
                disabled={isDisabled}
            >
                {isDisabled ? textInProcess : text}
            </button>
        </>
    );
};
