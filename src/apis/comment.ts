//libs
import firebase, { db } from "@libs/firebaseConfig";

//投稿にコメントを追加
export const addCommentOnPost = async (comment: string, postID: string, uid: string) => {
    await db.collection("posts").doc(`${postID}`).collection("comments").doc().set({
        comment: comment,
        uid: uid,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

//投稿のコメントを取得
export const getCommentsOnPost = async (postID: string) => {
    let commentsDataList = [];
    const commentsData = await db.collection("posts").doc(`${postID}`).collection("comments").get();
    if (commentsData) {
        commentsData.forEach((commentData) => {
            const result = commentData.data();
            result.created_at = result.created_at.toDate().toLocaleDateString();
            commentsDataList.push(result);
        });
    }

    return commentsDataList;
};
