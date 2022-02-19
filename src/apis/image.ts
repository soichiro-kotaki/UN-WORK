//libs
import imageCompression from "browser-image-compression";
import firebase, { storage } from "@libs/firebaseConfig";

// 画像の圧縮用モジュール
export const compressFile = async (file: File): Promise<File> => {
    return await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1400,
    });
};

//storageにユーザー画像を圧縮してアップロード
export const uploadUserImage = async (
    userImg: File,
    email: string,
): Promise<firebase.storage.Reference> => {
    const compressedFile = await compressFile(userImg);
    const blob = new Blob([compressedFile], { type: userImg.type });

    const userImgRef = storage.ref().child(`images/users/${email}/${userImg.name}`);

    const result = await userImgRef.put(blob);
    return result.ref;
};

//storageに投稿画像を圧縮してアップロード
export const uploadPostImage = async (
    postImg: File,
    uid: string,
): Promise<firebase.storage.Reference> => {
    const compressedFile = await compressFile(postImg);
    const blob = new Blob([compressedFile], { type: postImg.type });

    const postImgRef = storage.ref().child(`images/posts/${uid}/${postImg.name}`);

    const result = await postImgRef.put(blob);
    return result.ref;
};

//選択された求人投稿の画像を削除
export const deletePostImage = async (post_img: string): Promise<void> => {
    await storage.refFromURL(post_img).delete();
};
