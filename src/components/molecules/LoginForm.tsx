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
                className="p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
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
                className="p-2 pl-3 text-lg duration-150 border border-green-400 rounded-md focus:bg-green-50  focus:outline-none lg:border-0 lg:ring-green-400 lg:ring-1 lg:focus:ring-green-200 lg:focus:ring-4"
                required={true}
            />
        </>
    );
};
