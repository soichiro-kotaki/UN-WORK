import React from "react";

//libs
import ReactLoading from "react-loading";

export const LoadingIcon: React.FC = () => {
    return (
        <>
            <ReactLoading
                type="spinningBubbles"
                width={"5%"}
                height={"5%"}
                className="fixed text-green-300 top-1/2 -left-1/2 lg:w-1/6 lg:h-1/6"
            />
        </>
    );
};
