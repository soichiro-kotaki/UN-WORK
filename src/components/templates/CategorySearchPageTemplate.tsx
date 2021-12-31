import React from "react";
import Link from "next/link";

//components
import { BaseLayout } from "@components/layouts/BaseLayout";

//types
import { CategoryDataType } from "src/types/category/CategoryDataType";

type Props = {
    categoriesData: CategoryDataType[];
};

export const CategorySearchPageTemplate: React.FC<Props> = (props) => {
    const { categoriesData } = props;

    return (
        <>
            <BaseLayout>
                <main className="w-full min-h-screen py-6 bg-background-main lg:w-3/5 lg:mx-auto">
                    <h1 className="text-2xl text-center text-green-400 font-bold mb-4 lg:text-4xl lg:mb-8">
                        カテゴリー検索
                    </h1>
                    <div className="flex p-2 w-11/12 mx-auto flex-wrap  border border-background-sub rounded-lg">
                        {categoriesData.map((categoryData) => {
                            return (
                                <div key={categoryData.categoryID} className="inline-block m-2">
                                    <Link href={`/category/${categoryData.categoryID}`}>
                                        <a className="w-15 duration-300 text-sm py-2 px-4 rounded-full inline-block bg-white text-gray-900 mb-4 border border-background-sub lg:text-base hover:bg-background-sub hover:text-white">
                                            {categoryData.name}
                                        </a>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </BaseLayout>
        </>
    );
};
