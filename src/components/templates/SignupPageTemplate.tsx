import React from "react";
import Link from "next/link";

//components
import { SignupForm } from "@components/forms/SignupForm";
import { ServiceLogo } from "@components/atoms/ServiceLogo";

export const SignupPageTemplate: React.FC = () => {
    return (
        <>
            <div className="flex items-center justify-between w-full h-16 pl-4 lg:h-20 lg:pl-12 xl:pl-32">
                <ServiceLogo />
                <Link href="/login">
                    <a className="rounded-full mr-4 py-2 px-3 text-white text-sm bg-green-400 hover:cursor-pointer hover:bg-green-600 lg:mr-20 lg:px-8 lg:text-lg xl:mr-32">
                        ログイン
                    </a>
                </Link>
            </div>
            <main className="w-full min-h-screen py-8 border border-gray-300  bg-gray-50 ">
                <h1 className="w-4/5 mx-auto text-xl text-green-400 text-center font-bold lg:text-4xl lg:w-2/5">
                    新規アカウント作成（登録）
                </h1>
                <div className="form-control w-4/5 mx-auto md:w-7/12 lg:w-2/5">
                    <SignupForm />
                </div>
            </main>
        </>
    );
};
