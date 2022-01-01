import React from "react";

//components
import { FaPeopleCarry } from "react-icons/fa";

export const ServiceLogo: React.FC = () => {
    return (
        <>
            <p
                className="font-serif
                text-green-400 font-bold text-2xl lg:text-4xl"
            >
                <FaPeopleCarry className="inline-block" /> UN-WORK
            </p>
        </>
    );
};
