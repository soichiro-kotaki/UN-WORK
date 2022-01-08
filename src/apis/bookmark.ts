//libs
import firebase, { db } from "@libs/firebaseConfig";

//types
import { PostDataType } from "src/types/post/PostDataType";

//ブックマークリストに求人投稿を追加
export const addPostToBookmarkList = async (uid: string, postData: PostDataType) => {
    await db
        .collection("users")
        .doc(`${uid}`)
        .update({ bookmarks: firebase.firestore.FieldValue.arrayUnion(`${postData.postID}`) });
};

//リストから削除
export const deletePostToBookmarkList = async (uid: string, id: string) => {
    await db
        .collection("users")
        .doc(`${uid}`)
        .update({
            bookmarks: firebase.firestore.FieldValue.arrayRemove(`${id}`),
        });
};
