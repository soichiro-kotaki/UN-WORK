import firebase from "firebase";

export type ReplyDataType = {
    comment: string;
    displayName: string;
    uid: string;
    created_at: firebase.firestore.Timestamp;
};
