import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
        return await Document.getInitialProps(ctx);
    }

    render() {
        return (
            <Html lang="ja-JP" dir="ltr">
                <Head>
                    {/* windows */}
                    <meta name="msapplication-square70x70logo" content="/site-tile-70x70.png" />
                    <meta name="msapplication-square150x150logo" content="/site-tile-150x150.png" />
                    <meta name="msapplication-square310x310logo" content="/site-tile-310x310.png" />
                    <meta name="msapplication-TileColor" content="#000" />

                    {/* safari */}
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="#000" />
                    <meta name="apple-mobile-web-app-title" content="UN-WORK" />
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon-180x180.png"
                    />

                    {/* 一般 */}
                    <meta name="application-name" content="UN-WORK" />
                    <meta name="theme-color" content="#000" />
                    <meta
                        name="description"
                        content="長野県立大学の学生専用のアルバイト募集サービスです。学生間でアルバイト求人の募集をかけたり、投稿されている募集に応募することができます！！"
                    />

                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
