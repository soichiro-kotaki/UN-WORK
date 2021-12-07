export type SignupFormValuesType = {
    name: string;
    email: string;
    password: string;
    grade: "1年生" | "2年生" | "3年生" | "4年生";
    subject: "GM" | "こども" | "食健康";
    userImg: File;
};
