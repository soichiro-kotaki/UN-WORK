//libs
import { db } from "@libs/firebaseConfig";

//ブックマークリストに求人投稿を追加
export const addPostToBookmarkList = async (uid: string, bookmarkedPost) => {
    const bookmarkedRef = db
        .collection("users")
        .doc(`${uid}`)
        .collection("bookmarks")
        .doc(bookmarkedPost.postID);
    await bookmarkedRef.set(bookmarkedPost);
};

//リストから削除
export const deletePostToBookmarkList = async (uid: string, id: string) => {
    const bookmarkedRef = db.collection("users").doc(`${uid}`).collection("bookmarks").doc(`${id}`);
    await bookmarkedRef.delete();
};
