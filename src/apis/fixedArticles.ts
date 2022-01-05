import { client } from "@libs/microCMS";

//プライバシーポリシーのデータを取得
export const getPolicyData = async () => {
    const policyData = await client.get({
        endpoint: "fixed",
        contentId: "policy",
    });

    return policyData;
};

//免責事項のデータを取得
export const getDisclaimerData = async () => {
    const disclaimerData = await client.get({
        endpoint: "fixed",
        contentId: "disclaimer",
    });

    return disclaimerData;
};
