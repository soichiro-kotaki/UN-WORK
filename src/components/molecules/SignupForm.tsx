import React from "react";

export const SignupForm: React.FC = (props) => {
    return (
        <>
            <label className="label mt-6" htmlFor="name">
                <span className="text-lg label-text">氏名（本名）</span>
            </label>
            <input
                type="text"
                id="name"
                placeholder="長野 太郎"
                className="p-2 pl-3 text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 focus:bg-green-50"
                required
            />
            <label className="label mt-6" htmlFor="email">
                <span className="text-lg  label-text">メールアドレス</span>
            </label>
            <input
                type="email"
                id="email"
                placeholder="19G000@u-nagano.ac.jp"
                className="p-2 pl-3 text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 focus:bg-green-50"
                required
            />
            <label className="label " htmlFor="email">
                <span className="text-sm label-text">※大学のOutlookのみ利用可</span>
            </label>
            <label className="label mt-6" htmlFor="password">
                <span className="text-lg label-text">パスワード</span>
            </label>
            <input
                type="password"
                id="password"
                placeholder="英数字8文字
        "
                className="p-2 pl-3 text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4 focus:bg-green-50"
                required
            />
            <label className="label mt-6" htmlFor="grade">
                <span className="text-lg label-text">現在の学年を選択</span>
            </label>
            <select
                className="select text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                required
                id="grade"
            >
                <option disabled={true} defaultChecked={true}>
                    学年
                </option>
                <option>1年生</option>
                <option>2年生</option>
                <option>3年生</option>
                <option>4年生</option>
            </select>
            <label className="label mt-6" htmlFor="subject">
                <span className="text-lg label-text">所属学科を選択</span>
            </label>
            <select
                className="select text-lg duration-150 ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
                required
                id="subject"
            >
                <option disabled={true} defaultChecked={true}>
                    学科
                </option>
                <option>GM</option>
                <option>こども</option>
                <option>食健康</option>
            </select>
            <label className="label mt-6" htmlFor="avatar">
                <span className="text-lg label-text">プロフィール用画像を選択</span>
            </label>
            <input
                type="file"
                id="avatar"
                name="avator"
                accept="image/*"
                className="p-2 text-lg duration-150 bg-white ring-green-400 ring-1 rounded-md focus:outline-none focus:ring-green-200 focus:ring-4"
            />
        </>
    );
};
