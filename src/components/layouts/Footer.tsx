import React from "react";
import Link from "next/link";

//components

export const Footer: React.FC = () => {
    return (
        <>
            <div className="h-72 border-gray-300 border-t w-full lg:z-10 lg:fixed lg:right-0 lg:top-0 lg:w-1/5 lg:h-full lg:border-l lg:border-t-0">
                <div className="lg:w-4/5 lg:mx-auto lg:mt-96">
                    <a
                        className=" block my-4 pl-3 font-bold text-left text-green-400 hover:text-green-600 hover:underline "
                        target="_blank"
                        rel="noreferrer"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeVxHvJuBYXeyfA6D3cV99OaFIwNKzV8Yw8G6W-ZYrDHluehA/viewform"
                    >
                        アンケートはこちら
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
                        <Link href="/">
                            <a className="block w-44 pl-3 mb-4 hover:underline">
                                プライバシーポリシー
                            </a>
                        </Link>

                        <Link href="/">
                            <a
                                className="block w-20 pl-3 mb-4 hover:underline
                            "
                            >
                                免責事項
                            </a>
                        </Link>
                    </div>
                </div>
                <p className="my-10 lg:my-20 text-center text-sm lg:text-base">©️2021 UN-WORK </p>
            </div>
        </>
    );
};
