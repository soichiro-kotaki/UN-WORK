### 長野県立大学生専用の投稿型アルバイト掲示板サービス　　 UN-WORK 　

[こちらのページからゲストユーザーとしてログインできます](https://un-work.vercel.app/login)
<br />
<br />

## 概要

-   制作期間: 約 2 ヶ月（企画から本番リリースまでの期間）
-   30 名程のテスト運用を終え、本番リリース後の現在の利用ユーザー数は**100 名以上**
    <br />
    <br />

## サービスの目的

-   長野県立大学の学生が、学生発信の情報から安心してアルバイトを探せるようになること
-   Web 上から常に見れる求人媒体を作ることで、いつでも新鮮な求人からアルバイトを探せるようになること
-   学年や学部に関わらず、情報共有などのコミュニケーションが活発に行われるようになること
    <br />
    <br />

## 利用者ターゲット

-   アルバイトを探している、もしくは募集したい長野県立大学の学生
    <br />
    <br />

## 開発の経緯

### 開発者自身と周囲の友人、後輩が、学生のアルバイト探しに関して、以下の点で課題を感じていた。

-   コロナ禍による授業のオンライン化などの影響で、学生間の情報共有が十分に行われていない
-   情報の安心感（自分の大学生がいること）を、既存の求人媒体が確保できていない
-   大学関係者が関わっている、常に見れる求人媒体がない
-   学生発信の求人募集はインスタグラムのストーリー機能が中心であるが、24 時間で閲覧できなくなる上、特定のフォロワーにしか届かない可能性がある

これらの考えられる課題は、Web サービスによって解決できるのではないかと考えた。

サービス自体の需要を確認するため、実際に学内の学生に対して、「学生間で求人を閲覧・投稿できるサービスがあったら、使いたいか」という趣旨のアンケートを Google フォームで行った。

結果として、回答者のうち約 95%の学生が「使いたい」と回答し、ニーズが大きいことアンケートを通して確認したため、サービス開発に至った。
<br />
<br />

## 技術構成

| 技術領域                      | 仕様技術・ツール                  |
| ----------------------------- | --------------------------------- |
| デザイン                      | Figma                             |
| フロントエンド                | React(Next.js)/TypeScript         |
| スタイリング                  | Tailwind CSS/daisy UI/Headless UI |
| バックエンド                  | Firebase/microCMS                 |
| ホスティング                  | Vercel                            |
| ユーザー認証                  | Firebase Authentication           |
| データベース                  | Firebase Firestore/microCMS       |
| ストレージ                    | Firebase Storage                  |
| メール送信                    | SendGrid                          |
| リンター/コードフォーマッター | ESlint/Prettier                   |
| テスト                        | Cypress                           |

<br />
<br />

## 実装済みの機能

-   アカウント作成
-   ログイン
-   新規登録後のアカウント認証用メール送信
-   パスワードの再設定（メールで新たなパスワード設定用リンクを送信）
-   ユーザー情報管理
-   フォームのバリデーション
-   新規投稿（画像のアップロード含む）
-   投稿一覧表示
-   プロフィール画像編集
-   ゲストログイン
-   投稿削除
-   カテゴリー検索
-   ブックマーク
-   フィードバック・問い合わせ用 Google form の設置
-   応募フォームからのメール送信
-   新規求人投稿時の紹介文下書き保存
-   投稿毎に匿名のコメント・返信
-   ダークモード

## 今後実装予定の機能

-   コメント投稿時の実名表示選択機能
-   PWA 化
-   通知機能
-   求人投稿時のプレビュー
-   住所検索
-   地図表示
-   画像複数投稿
-   個別チャット

<br />
<br />

## 開発の中で苦労した点

-   高いパフォーマンス性と読み取り回数削減を両立するための最適な Firestore のデータ取得設計
-   ISR での各ページの適切なページ再ビルドのタイミング
-   コメント機能における各ユーザー毎の挙動制御
