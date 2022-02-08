//types
import { UserDataType } from "src/types/user/UserDataType";

//apis
import { getUserProfileData } from "./user";

export const handleApplyEmailForm = async (
    recruiterData: UserDataType,
    uid: string,
    subject: string,
    message: string,
) => {
    const applicantData = await getUserProfileData(uid);

    const res = await fetch("/api/sendApplyEmail", {
        body: JSON.stringify({
            recruiterData: recruiterData,
            applicantData: applicantData,
            subject: subject,
            message: message,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });

    const result = await res.json();
    console.log(result);
};
