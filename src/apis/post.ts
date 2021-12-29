//apis
import { uploadPostImage } from "@apis/image";
import { deletePostImage } from "@apis/image";

//libs
import firebase, { db } from "@libs/firebaseConfig";

//types
import { PostFormValuesType } from "src/types/form/PostFormValuesType";
import { UserAuthContextType } from "src/types/user/UserAuthContextType";

//新規の求人を投稿
export const addJobPost = async (values: PostFormValuesType, uid: string) => {
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
    const allPostsData = await db.collection("posts").orderBy("created_at", "desc").limit(20).get();
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
export const getPostEachUser = async (uid: string | string[] | UserAuthContextType) => {
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
export const getPostDetail = async (id: string) => {
    const postData = (await db.collection("posts").doc(id).get()).data();
    postData.created_at = postData.created_at.toDate().toLocaleDateString();

    return postData;
};

//求人投稿を削除
export const deleteJobPost = async (postID: string, post_img: string) => {
    await db.collection("posts").doc(`${postID}`).delete();
    console.log(postID);

    await deletePostImage(post_img);
};
