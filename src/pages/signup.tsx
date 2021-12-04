import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const signup: NextPage = () => {
    return (
        <div>
            <Head>
                <title>新規アカウント作成</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full mt-16 mb-16  pt-8 pb-8 border-2 bg-gray-50 lg:mt-20 ">
                <h1 className="w-4/5 mx-auto text-lg text-green-400 text-center font-bold lg:text-4xl lg:w-2/5">
                    新規アカウント作成（登録）
                </h1>
                <div className="form-control w-4/5 mx-auto md:w-7/12 lg:w-2/5">
                    <label className="label mt-6" htmlFor="name">
                        <span className="label-text">氏名（本名）</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        placeholder="長野 太郎"
                        className="input input-accent input-bordered w-full"
                        required
                    />
                    <label className="label mt-6" htmlFor="email">
                        <span className="label-text">メールアドレス（大学のOutlookのみ利用可)</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="19G000@u-nagano.ac.jp"
                        className="input input-accent input-bordered w-full"
                        required
                    />
                    <label className="label mt-6" htmlFor="password">
                        <span className="label-text">パスワード</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="英数字8文字
                        "
                        className="input input-accent input-bordered w-full"
                        required
                    />
                    <label className="label mt-6">
                        <span className="label-text">現在の学年を選択</span>
                    </label>
                    <select className="select select-bordered select-accent w-full" required>
                        <option disabled={true} defaultChecked={true}>
                            学年
                        </option>
                        <option>1年生</option>
                        <option>2年生</option>
                        <option>3年生</option>
                        <option>4年生</option>
                    </select>
                    <label className="label mt-6">
                        <span className="label-text">所属学科を選択</span>
                    </label>
                    <select className="select select-bordered select-accent w-full" required>
                        <option disabled={true} defaultChecked={true}>
                            学科
                        </option>
                        <option>GM</option>
                        <option>こども</option>
                        <option>食健康</option>
                    </select>

                    <div className="mt-10 mx-auto w-40">
                        <button className="btn btn-accent inline-block w-full">登録</button>
                    </div>
                    <Link href="/signin">
                        <a className="mt-10 text-green-400 underline hover:cursor-pointer hover:text-green-300">
                            ログインはこちら
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default signup;
