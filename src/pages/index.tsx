import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <div>
            <main className="w-full mt-16  mb-16 pt-6 pb-6 border-2   lg:mt-20 ">
                <h1 className="text-4xl text-center text-green-400">
                    ここに求人投稿の一覧を表示する
                </h1>
                <Link href="/login">
                    <a className="p-3 rounded-md ml-4 bg-green-400">ログイン画面へ</a>
                </Link>
            </main>
        </div>
    );
};

export default Home;
