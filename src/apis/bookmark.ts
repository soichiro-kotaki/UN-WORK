//libs
import { db } from "@libs/firebaseConfig";

//types
import { PostDataType } from "src/types/post/PostDataType";

//ブックマークリストに求人投稿を追加
export const addPostToBookmarkList = async (uid: string, postData: PostDataType) => {
    const bookmarkedRef = db
        .collection("users")
        .doc(`${uid}`)
        .collection("bookmarks")
        .doc(postData.postID);
    await bookmarkedRef.set(postData);
};

//リストから削除
export const deletePostToBookmarkList = async (uid: string, id: string) => {
    const bookmarkedRef = db.collection("users").doc(`${uid}`).collection("bookmarks").doc(`${id}`);
    await bookmarkedRef.delete();
};
