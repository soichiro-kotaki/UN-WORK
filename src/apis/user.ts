//apis
import { deletePostImage, uploadUserImage } from "@apis/image";

//libs
import firebase, { auth, db } from "@libs/firebaseConfig";

//types
import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";
import { UpdateUserProfileValuesType } from "src/types/user/UpdateUserProfileValuesType";
import { UserDataType } from "src/types/user/UserDataType";

//新規アカウント登録、アカウント認証用メール送信
export const signupUserData = async (
    values: SignupFormValuesType,
    actionCodeSettings: any,
): Promise<void> => {
    const { name, email, password, grade, subject, userImg, instagram, selfIntroduction } = values;

    alert(
        `${email}宛にアカウント認証用メールを送信しました。添付のリンクから認証を行った後にログインを行ってください。\n※受信トレイにメールが届いていない場合は、迷惑メールフォルダに振り分けられている可能性があります。`,
    );

    //Firebase Authに登録
    const user = await auth.createUserWithEmailAndPassword(email, password);

    //画像を圧縮、AuthとStorageに登録
    const userImgRef = await uploadUserImage(userImg[0], email);
    const url = await userImgRef.getDownloadURL();
    await user.user.updateProfile({
        photoURL: url,
    });

    await db.collection("users").doc(`${user.user.uid}`).set({
        user_name: name,
        user_email: email,
        user_grade: grade,
        user_subject: subject,
        user_img: url,
        instagram: instagram,
        selfIntroduction: selfIntroduction,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
    });

    //アカウント作成時に入力されたメールアドレスにアカウント認証を行うためのメールを送信
    await auth.currentUser.sendEmailVerification(actionCodeSettings);
};

//ゲストログイン
export const handleGuestLogin = async (): Promise<void> => {
    await auth.signInAnonymously();
};

//ログアウト
export const handleLogOut = async (): Promise<void> => {
    await auth.signOut();
};

//ユーザーのプロフィールデータを取得
export const getUserProfileData = async (uid: string): Promise<firebase.firestore.DocumentData> => {
    let userData = (await db.collection("users").doc(`${uid}`).get()).data();
    if (userData) {
        userData.created_at = userData.created_at.toDate().toLocaleDateString();
    }

    return userData;
};

//テストユーザー用のプロフィールデータを取得
export const getTestUserProfileData = async (): Promise<firebase.firestore.DocumentData> => {
    let testUserData = (await db.collection("users").doc("test-user").get()).data();
    testUserData.created_at = testUserData.created_at.toDate().toLocaleDateString();

    return testUserData;
};

//ユーザーのプロフィールデータ(画像・Instagramリンク・自己紹介文）を更新
export const updateUserProfile = async (
    values: UpdateUserProfileValuesType,
    uid: string,
    userData: UserDataType,
): Promise<void> => {
    const { userImg, instagram, selfIntroduction } = values;
    let url = userData.user_img;

    if (userImg) {
        //Storageにフォームから取得したプロフィール用画像ファイルを圧縮して保存
        const userImgRef = await uploadUserImage(userImg[0], userData.user_email);
        url = await userImgRef.getDownloadURL();

        //Firebase Authの画像URLを更新
        await auth.currentUser.updateProfile({
            photoURL: url,
        });

        //Storageから既存のプロフィール画像を削除
        await deletePostImage(userData.user_img);
    }

    await db.collection("users").doc(`${uid}`).update({
        user_img: url,
        instagram: instagram,
        selfIntroduction: selfIntroduction,
    });
};
