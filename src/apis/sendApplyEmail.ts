//types
import { UserDataType } from "src/types/user/UserDataType";

//apis
import { getUserProfileData } from "./user";

export const handleApplyEmailForm = async (
    recruiterData: UserDataType,
    uid: string,
    subject: string,
    message: string,
): Promise<void> => {
    const applicantData = await getUserProfileData(uid);

    await fetch("/api/sendApplyEmail", {
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
};
