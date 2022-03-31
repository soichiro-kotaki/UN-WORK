//libs
import imageCompression from "browser-image-compression";
import firebase, { storage } from "@libs/firebaseConfig";

// 画像の圧縮用モジュール
export const compressFile = async (file: File): Promise<File> => {
    return await imageCompression(file, {
        maxSizeMB: 0.8,
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
export const uploadPostImage = async (postImages: FileList, uid: string): Promise<string[]> => {
    let postImagesList = [];

    for (const postImg of postImages) {
        const compressedFile = await compressFile(postImg);
        const blob = new Blob([compressedFile], { type: postImg.type });

        const postImgRef = storage.ref().child(`images/posts/${uid}/${postImg.name}`);

        const storageSnapshot = await postImgRef.put(blob);
        const url = await storageSnapshot.ref.getDownloadURL();
        postImagesList.push(url);
    }

    return postImagesList;
};

//選択された求人投稿の画像を削除
export const deletePostImage = async (postImages: string[]): Promise<void> => {
    for (const postImg of postImages) {
        await storage.refFromURL(postImg).delete();
    }
};

//選択されたプロフィール画像を削除
export const deleteUserImage = async (userImg: string): Promise<void> => {
    await storage.refFromURL(userImg).delete();
};
