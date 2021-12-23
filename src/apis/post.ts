//apis
import { uploadPostImage } from "./image";

//libs
import firebase, { db } from "@libs/firebaseConfig";

//types
import { PostFormValuesType } from "src/types/form/PostFormValuesType";
import { UserAuthContextType } from "src/types/user/UserAuthContextType";

//新規の求人を投稿
export const addJobPost = async (values: PostFormValuesType, uid: UserAuthContextType) => {
    const { title, salary, category, body, post_img } = values;

    alert("求人が投稿されました！");

    //Storageにフォームから取得した画像ファイルを保存
    const postImgRef = await uploadPostImage(post_img[0], uid);
    const url = await postImgRef.getDownloadURL();

    await db.collection("posts").doc().set({
        uid: uid,
        title: title,
        salary: salary,
        category: category,
        body: body,
        post_img: url,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

//全ユーザーの投稿一覧を取得
export const getAllPostsData = async () => {
    let allPostsData = await db.collection("posts").get();
    let allPostsDataList = [];
    allPostsData.forEach((postData) => {
        let result = postData.data();
        result.created_at = result.created_at.toDate().toLocaleDateString();
        allPostsDataList.push(result);
    });
    return allPostsDataList;
};

//全ユーザーの投稿のうち、自身が投稿した求人を取得
export const getPostEachUser = async (uid: string | string[] | UserAuthContextType) => {
    let userPostsData = await db.collection("posts").where("uid", "==", `${uid}`).get();
    let postsDataList = [];
    userPostsData.forEach((userPostData) => {
        let result = userPostData.data();
        result.created_at = result.created_at.toDate().toLocaleDateString();
        postsDataList.push(result);
    });
    return postsDataList;
};

//詳細を見るボタンを押された求人を取得
export const getPostDetail = async (id: string) => {
    const postData = await db.collection("posts").doc(id).get();

    return postData;
};

//各投稿詳細ページのパスを生成
export const createPostPagePath = async (uid: string) => {
    let dataList = [];
    const postId = await db.collection("posts").where("uid", "==", `${uid}`).get();
    postId.forEach((data) => {
        dataList.push(data.id);
    });

    return dataList;
};
