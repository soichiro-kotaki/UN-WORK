//apis
import { uploadUserImage } from "@apis/image";

//libs
import firebase, { auth, db } from "@libs/firebaseConfig";

//types
import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";
import { UpdateUserProfileValuesType } from "src/types/user/UpdateUserProfileValuesType";

//新規アカウント登録、アカウント認証用メール送信
export const signupUserData = async (
    values: SignupFormValuesType,
    actionCodeSettings: any,
): Promise<void> => {
    const { name, email, password, grade, subject, userImg } = values;

    //Firebase Authに登録
    const user = await auth.createUserWithEmailAndPassword(email, password);

    alert(
        `${email}宛にアカウント認証用メールを送信しました。添付のリンクから認証を行った後にログインを行ってください。\n※受信トレイにメールが届いていない場合は、迷惑メールフォルダに振り分けられている可能性があります。`,
    );

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

//ユーザーのプロフィールデータ(画像）を更新
export const updateUserProfile = async (
    userImg: UpdateUserProfileValuesType,
    uid: string,
): Promise<void> => {
    const userDataRef = db.collection("users").doc(`${uid}`);
    const userData = (await userDataRef.get()).data();
    const email = userData.user_email;

    //画像の圧縮
    const userImgRef = await uploadUserImage(userImg.userImg[0], email);
    const url = await userImgRef.getDownloadURL();

    //Firebase AuthとFirestoreの画像URLを更新
    await auth.currentUser.updateProfile({
        photoURL: url,
    });
    await userDataRef.update({
        user_img: url,
    });
};
