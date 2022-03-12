import { ReplyDataType } from "../reply/ReplyDataType";

export type CommentDataType = {
    comment: string;
    uid: string;
    displayName: string;
    id: string;
    created_at: string;
    replies?: ReplyDataType[];
};
