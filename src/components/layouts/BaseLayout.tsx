import React from "react";

//components
import { AddPostPlusButton } from "@components/atoms/AddPostPlusButton";
import { MenuBar } from "./MenuBar";
import { Footer } from "./Footer";

type Props = {
    children: React.ReactNode;
};

export const BaseLayout: React.FC<Props> = (props) => {
    const { children } = props;

    return (
        <>
            <MenuBar />
            {children}
            <Footer />
            <AddPostPlusButton />
        </>
    );
};
