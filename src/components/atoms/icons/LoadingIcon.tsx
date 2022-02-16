import React from "react";

//libs
import { Oval } from "react-loader-spinner";

export const LoadingIcon: React.FC = () => {
    return (
        <>
            <div className="flex justify-center mx-auto w-1/4">
                <Oval
                    ariaLabel="loading-indicator"
                    height={80}
                    width={80}
                    strokeWidth={3}
                    color="#37cdbe"
                    secondaryColor="light-gray"
                />
            </div>
        </>
    );
};
