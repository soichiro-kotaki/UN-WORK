//libs
import firebase, { auth, db, storage } from "@libs/firebaseConfig";

//types
import { UserAuthContextType } from "src/types/user/UserAuthContextType";
// import { SignupFormValuesType } from "src/types/form/SignupFormValuesType";

//新規アカウント登録、アカウント認証用メール送信(現在エラーが発生しており、解決できていないので未使用)
// export const signupUserData = async (
//     values: SignupFormValuesType,
//     userImgRef: firebase.storage.Reference,
//     actionCodeSettings: any,
// ) => {
//     const { name, email, password, grade, subject, userImg } = values;
//     console.log(userImg[0]);
//     const user = await auth.createUserWithEmailAndPassword(email, password);

//     //Storageにフォームから取得した画像ファイルを保存・参照用パスを生成
//     // const userImgRef = storage.ref(`images/users/${email}`).child(`${userImg[0].name}`);

//     //Storageに保存した画像を参照、AuthのphotoURLに追加
//     await userImgRef.put(userImg[0]);
//     const url = await userImgRef.getDownloadURL();
//     console.log(url);
//     await user.user.updateProfile({
//         photoURL: url,
//     });

//     await db.collection("users").doc(`${user.user.uid}`).set({
//         user_name: name,
//         user_email: email,
//         user_grade: grade,
//         user_subject: subject,
//         user_img: url,
//         created_at: firebase.firestore.FieldValue.serverTimestamp(),
//     });

//     //アカウント作成時に入力されたメールアドレスにアカウント認証を行うためのメールを送信
//     await auth.currentUser.sendEmailVerification(actionCodeSettings);
//     alert(
//         `${email}宛にアカウント認証用メールを送信しました。添付のリンクから認証を行った後にログインを行ってください。\n※受信トレイにメールが届いていない場合は、迷惑メールフォルダに振り分けられている可能性があります。`,
//     );
// };

//ユーザーのプロフィールデータを取得
export const getUserProfileData = async (uid: string | string[] | UserAuthContextType) => {
    let userData = (await db.collection("users").doc(`${uid}`).get()).data();
    userData.created_at = userData.created_at.toDate().toLocaleDateString();

    return userData;
};
