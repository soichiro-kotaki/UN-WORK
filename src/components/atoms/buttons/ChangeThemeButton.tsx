import React from "react";

//libs
import { useTheme } from "next-themes";

export const ChangeThemeButton: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <input
                type="checkbox"
                defaultChecked={true}
                className="toggle mr-6 lg:mr-12 bg-gray-300 dark:bg-gray-300"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
        </>
    );
};
