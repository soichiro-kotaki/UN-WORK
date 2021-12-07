import React from "react";
import Link from "next/link";

//components
import { SignupForm } from "@components/molecules/SignupForm";

export const SignupPageTemplate: React.FC = (props) => {
    return (
        <>
            <main className="w-full mt-16 mb-16  pt-8 pb-8 border-2 bg-gray-50 lg:mt-20">
                <h1 className="w-4/5 mx-auto text-xl text-green-400 text-center font-bold lg:text-4xl lg:w-2/5">
                    新規アカウント作成（登録）
                </h1>
                <div className="form-control w-4/5 mx-auto md:w-7/12 lg:w-2/5">
                    <SignupForm />
                    <Link href="/login">
                        <a className="mt-10 text-green-400 underline hover:cursor-pointer hover:text-green-300">
                            ログインはこちら
                        </a>
                    </Link>
                </div>
            </main>
        </>
    );
};
