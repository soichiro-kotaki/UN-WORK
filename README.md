# 長野県立大学生専用の投稿型バイト掲示板サービス

## 技術構成

| 技術領域                      | 仕様技術・ツール                  |
| ----------------------------- | --------------------------------- |
| デザイン                      | Figma/Storybook                   |
| フロントエンド                | React(Next.js)/TypeScript         |
| スタイリング                  | Tailwind CSS/daisy UI/Headless UI |
| バックエンド                  | Firebase/microCMS                 |
| ホスティング                  | Vercel                            |
| ユーザー認証                  | Firebase Authentication           |
| データベース                  | Firebase Firestore/microCMS       |
| ストレージ                    | Firebase Storage                  |
| リンター/コードフォーマッター | ESlint/Prettier                   |
| テスト                        | Cypress                           |

## 実装済みの機能

-   アカウント新規作成
-   ログイン
-   新規登録後のアカウント認証用メール送信機能
-   ログイン用パスワードの再設定（メールで新たなパスワード設定用リンクを送る）
-   ユーザー情報取得(グローバルなユーザー情報の状態管理)
-   フォームのバリデーション

## 今後実装する機能

-   匿名ログイン（テストユーザー）
-   新規投稿（画像もアップロード可能）
-   投稿の編集、削除
-   投稿一覧を閲覧
-   カテゴリー検索
-   ブックマーク
-   ユーザープロフィール編集
-   投稿毎に匿名のコメント
-   フィードバック・問い合わせ用の forms 設置
-   個別チャット
-   PWA 化
