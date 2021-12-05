import React from "react";

export const LoginForm: React.FC = (props) => {
    return (
        <>
            <label className="label mt-6" htmlFor="email">
                <span className="text-lg label-text">メールアドレス</span>
            </label>
            <input
                id="email"
                type="email"
                placeholder="19G000@u-nagano.ac.jp"
                className="p-2 pl-3 text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 focus:bg-green-50"
                required={true}
            />
            <label className="label mt-6" htmlFor="password">
                <span className="text-lg label-text">パスワード</span>
            </label>
            <input
                type="password"
                id="password"
                placeholder="英数字8文字
        "
                className="p-2 pl-3 text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 focus:bg-green-50"
                required={true}
            />
        </>
    );
};
