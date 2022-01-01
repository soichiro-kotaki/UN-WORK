import React from "react";

//libs
import ReactLoading from "react-loading";

export const LoadingIcon: React.FC = () => {
    return (
        <>
            <div className="text-center w-1/4 h-full mx-auto">
                <ReactLoading type="spokes" width={"30%"} height={"30%"} color="#37cdbe" />
            </div>
        </>
    );
};
