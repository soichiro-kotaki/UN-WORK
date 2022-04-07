//apis
import { uploadPostImage } from "@apis/image";
import { deletePostImage } from "@apis/image";

//libs
import firebase, { db } from "@libs/firebaseConfig";
import { EditPostFormValuesType } from "src/types/form/EditPostFormValuesType";

//types
import { PostFormValuesType } from "src/types/form/PostFormValuesType";
import { PostDataType } from "src/types/post/PostDataType";

//新規の求人を投稿
export const addJobPost = async (values: PostFormValuesType, uid: string): Promise<void> => {
    const {
        title,
        location,
        job_description,
        salary,
        job_time,
        submission_shift_request,
        category,
        introduction,
        post_img,
        instagram,
        twitter,
        homepage,
    } = values;

    //Storageにフォームから取得した投稿画像を圧縮して保存
    const postImagesUrlList = await uploadPostImage(post_img, uid);
    // const url = await postImgRef.getDownloadURL();

    await db
        .collection("posts")
        .doc()
        .set({
            uid: uid,
            title: title,
            location: location,
            job_description: job_description,
            salary: salary,
            job_time: job_time,
            submission_shift_request: submission_shift_request,
            category: category,
            introduction: introduction,
            post_img: postImagesUrlList,
            links: {
                instagram: instagram,
                twitter: twitter,
                homepage: homepage,
            },
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
        });
};

//全ユーザーの投稿一覧を取得
export const getAllPostsData = async (): Promise<[] | firebase.firestore.DocumentData[]> => {
    const allPostsData = await db.collection("posts").orderBy("created_at", "desc").limit(30).get();
    let allPostsDataList = [];

    allPostsData.forEach((postData) => {
        const postID = postData.id;
        const result = postData.data();
        result.postID = postID;
        result.created_at = result.created_at.toDate().toLocaleDateString();
        allPostsDataList.push(result);
    });

    return allPostsDataList;
};

//全ユーザーの投稿のうち、自身が投稿した求人を取得
export const getPostEachUser = async (
    uid: string,
): Promise<[] | firebase.firestore.DocumentData[]> => {
    const userPostsData = await db
        .collection("posts")
        .where("uid", "==", `${uid}`)
        .orderBy("created_at", "desc")
        .get();
    let postsDataList = [];

    userPostsData.forEach((userPostData) => {
        const postID = userPostData.id;
        const result = userPostData.data();
        result.postID = postID;
        result.created_at = result.created_at.toDate().toLocaleDateString();
        postsDataList.push(result);
    });

    return postsDataList;
};

//詳細を見るボタンを押された求人を取得
export const getPostDetail = async (id: string): Promise<firebase.firestore.DocumentData> => {
    const postData = (await db.collection("posts").doc(id).get()).data();
    if (postData) {
        postData.created_at = postData.created_at.toDate().toLocaleDateString();
        postData.postID = id;
    }

    return postData;
};

//カテゴリーに該当する求人投稿の一覧を取得
export const getPostsDataByCategory = async (
    categoryID: string,
): Promise<{ categoryPostsList: [] | PostDataType[]; categoryName: string }> => {
    const categoryPostsList = [];
    const categoryData = (await db.collection("categories").doc(`${categoryID}`).get()).data();

    const categoryPostsData = await db
        .collection("posts")
        .where("category", "==", `${categoryData.name}`)
        .orderBy("created_at", "desc")
        .get();

    categoryPostsData.forEach((postData) => {
        const result = postData.data();
        result.postID = postData.id;
        result.created_at = result.created_at.toDate().toLocaleDateString();
        categoryPostsList.push(result);
    });

    return { categoryPostsList: categoryPostsList, categoryName: categoryData.name };
};

//ブックマークされた求人投稿を取得
export const getBookmarkedPosts = async (uid: string): Promise<PostDataType[]> => {
    let bookmarkedDataList = [];
    const userData = (await db.collection("users").doc(`${uid}`).get()).data();

    if (userData.bookmarks) {
        for (const postID of userData.bookmarks) {
            const resultDoc = await db.collection("posts").doc(`${postID}`).get();
            const result = resultDoc.data();
            result.postID = resultDoc.id;
            result.created_at = result.created_at.toDate().toLocaleDateString();
            bookmarkedDataList.push(result);
        }
    }

    return bookmarkedDataList;
};

//求人投稿を削除
export const deleteJobPost = async (postID: string, post_img: string[]): Promise<void> => {
    await db.collection("posts").doc(`${postID}`).delete();

    await deletePostImage(post_img);
};

//求人投稿（画像・関連リンク）を変更
export const editJobPost = async (
    values: EditPostFormValuesType,
    uid: string,
    postData: PostDataType,
): Promise<void> => {
    const { post_img, instagram, twitter, homepage } = values;
    let postImagesUrlList = postData.post_img;

    if (post_img) {
        //Storageから既存の投稿画像を削除
        await deletePostImage(postData.post_img);

        //Storageにフォームから取得した画像ファイルを圧縮して保存
        postImagesUrlList = await uploadPostImage(post_img, uid);
    }

    await db
        .collection("posts")
        .doc(`${postData.postID}`)
        .set(
            {
                post_img: postImagesUrlList,
                links: {
                    instagram: instagram,
                    twitter: twitter,
                    homepage: homepage,
                },
            },
            { merge: true },
        );
};
