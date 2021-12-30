//libs
import { db } from "@libs/firebaseConfig";

//types
import { CategoryDataType } from "src/types/category/CategoryDataType";

export const getAllCategories = async (): Promise<CategoryDataType[]> => {
    let categoriesList = [];

    const allCategoriesData = await db.collection("categories").get();

    allCategoriesData.forEach((categoryData) => {
        const categoryID = categoryData.id;
        const result = categoryData.data();
        result.categoryID = categoryID;
        categoriesList.push(result);
    });

    return categoriesList;
};
