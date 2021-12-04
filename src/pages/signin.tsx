import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const signin: NextPage = () => {
    return (
        <div>
            <Head>
                <title>ログイン</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full mt-16 mb-16 pt-6 pb-6 border-2  bg-gray-50 lg:mt-20 ">
                <h1 className="w-4/5 mx-auto text-lg text-green-400 text-center font-bold lg:text-4xl lg:w-2/5">
                    ログイン
                </h1>
                <div className="form-control w-4/5 mx-auto md:w-7/12 lg:w-2/5">
                    <label className="label mt-6" htmlFor="email">
                        <span className="label-text">メールアドレス</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="19G000@u-nagano.ac.jp"
                        className="input input-accent input-bordered w-full"
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
                    />
                    <Link href="/">
                        <a className="mt-6 text-green-400 text-xs underline hover:cursor-pointer hover:text-green-300">
                            パスワードを忘れた場合はこちら
                        </a>
                    </Link>
                    <div className="mt-10 mx-auto w-40 ">
                        <button className="btn btn-accent inline-block w-full">ログイン</button>
                    </div>
                    <Link href="/signup">
                        <a className="mt-10 text-green-400 underline hover:cursor-pointer hover:text-green-300">
                            新規アカウント作成はこちら
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default signin;
