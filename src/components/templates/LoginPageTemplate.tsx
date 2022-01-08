import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

//apis
import { handleGuestLogin } from "@apis/user";

//components
import { LoginForm } from "@components/forms/LoginForm";

export const LoginPageTemplate: React.FC = () => {
    const router = useRouter();
    return (
        <>
            <div className="flex items-center justify-between bg-white w-full h-16 lg:h-20">
                <div className="md:ml-8">
                    <Image src="/service-logo.png" width={220} height={65} alt="ロゴ画像です。" />
                </div>
                <Link href="/signup">
                    <a className="rounded-full  mr-4 py-3 px-4 text-center text-white text-xs bg-green-400 hover:cursor-pointer  hover:bg-green-600 lg:px-8 lg:mr-20 lg:text-lg xl:mr-32">
                        新規登録
                    </a>
                </Link>
            </div>
            <main className="w-full min-h-screen pt-6 pb-6 border border-gray-300 bg-gray-50">
                <h1 className="w-4/5 mx-auto text-xl text-green-400 text-center font-bold lg:text-4xl lg:w-2/5">
                    ログイン
                </h1>
                <div className="form-control w-4/5 mx-auto md:w-7/12 lg:w-2/5">
                    <LoginForm />

                    <div className="mt-10">
                        <p
                            className="text-green-400 text-center underline inline-block w-sm h-full hover:cursor-pointer hover:text-green-300"
                            onClick={async () => {
                                await handleGuestLogin();
                                router.push("/");
                            }}
                        >
                            ゲストログインはこちら
                        </p>
                    </div>
                </div>
            </main>
        </>
    );
};
