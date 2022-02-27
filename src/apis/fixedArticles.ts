import { client } from "@libs/microCMS";
import { Article } from "src/types/fixed/Article";

//プライバシーポリシーのデータを取得
export const getPolicyData = async (): Promise<Article> => {
    const policyData = await client.get({
        endpoint: "fixed",
        contentId: "policy",
    });

    return policyData;
};

//免責事項のデータを取得
export const getDisclaimerData = async (): Promise<Article> => {
    const disclaimerData = await client.get({
        endpoint: "fixed",
        contentId: "disclaimer",
    });

    return disclaimerData;
};

//FAQのデータを取得
export const getFAQData = async (): Promise<Article> => {
    const faqData = await client.get({
        endpoint: "fixed",
        contentId: "faq",
    });

    return faqData;
};
