//libs
import firebase, { db } from "@libs/firebaseConfig";
import { CommentDataType } from "src/types/comment/CommentDataType";

//投稿にコメントを追加
export const addCommentOnPost = async (
    message: string,
    postID: string,
    uid: string,
): Promise<void> => {
    await db.collection("posts").doc(`${postID}`).collection("comments").doc().set({
        comment: message,
        uid: uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

//コメントに対する返信を追加
export const addReplyOnComment = async (
    message: string,
    postID: string,
    uid: string,
    commentDocID: string,
): Promise<void> => {
    await db
        .collection("posts")
        .doc(`${postID}`)
        .collection("comments")
        .doc(`${commentDocID}`)
        .set(
            {
                replies: firebase.firestore.FieldValue.arrayUnion({
                    comment: message,
                    uid: uid,
                    created_at: new Date(),
                }),
            },
            { merge: true },
        );
};

//投稿のコメント一覧を取得
export const getCommentsOnPost = async (postID: string): Promise<[] | CommentDataType[]> => {
    let commentsDataList = [];
    const commentsData = await db
        .collection("posts")
        .doc(`${postID}`)
        .collection("comments")
        .orderBy("created_at")
        .get();

    if (commentsData) {
        commentsData.forEach((commentData) => {
            const result = commentData.data();
            result.id = commentData.id;
            result.created_at = result.created_at.toDate().toLocaleDateString();
            commentsDataList.push(result);
        });
    }

    return commentsDataList;
};
