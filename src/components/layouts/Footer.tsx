import React from "react";
import Link from "next/link";

//apis
import { handleLogOut } from "@apis/user";

export const Footer: React.FC = () => {
    return (
        <>
            <div className="h-80 border-gray-300 bg-white text-gray-900 border-t w-full lg:z-10 lg:fixed lg:right-0 lg:top-0 lg:w-1/5 lg:h-full lg:border-l lg:border-t-0 dark:bg-dark-screen dark:text-white">
                <div className="lg:w-4/5 pt-4 lg:mx-auto lg:mt-72">
                    <Link href="/login">
                        <a
                            onClick={async () => {
                                await handleLogOut();
                            }}
                            className="text-gray-50 w-2/5 ml-3 py-1 text-center text-sm block bg-green-400 hover:bg-green-700 transition-colors rounded-full lg:p-3 lg:w-40"
                        >
                            ログインページへ
                        </a>
                    </Link>
                    <a
                        className=" block my-4 pl-3 font-bold text-left text-green-400 hover:text-green-600 hover:underline "
                        target="_blank"
                        rel="noreferrer"
                        href="https://forms.gle/ojVVLT5WVxQ25S2U7"
                    >
                        お問い合わせはこちら
                    </a>
                    <div>
                        {/* <Link href="/"> */}
                        <a
                            onClick={() => {
                                alert("現在準備中です🙇‍♂️");
                            }}
                            className="block w-10 pl-3 mb-4 hover:underline"
                        >
                            FAQ
                        </a>
                        {/* </Link> */}
                        <Link href="/policy">
                            <a className="block w-44 pl-3 mb-4 hover:underline">
                                プライバシーポリシー
                            </a>
                        </Link>

                        <Link href="/disclaimer">
                            <a
                                className="block w-20 pl-3 mb-4 hover:underline
                            "
                            >
                                免責事項
                            </a>
                        </Link>
                    </div>
                </div>
                <p className="my-8 lg:my-20 text-center text-sm lg:text-base">©️2021 UN-WORK </p>
            </div>
        </>
    );
};
