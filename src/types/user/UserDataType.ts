export type UserDataType = {
    bookmarks?: string[] | [];
    created_at: string;
    user_name: string;
    user_email: string;
    user_grade: "1年生" | "2年生" | "3年生" | "4年生";
    user_subject: "GM" | "こども" | "食健康";
    user_img: string;
    selfIntroduction?: string;
    instagram?: string;
};
