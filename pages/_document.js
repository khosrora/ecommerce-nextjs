import Document, { Html, Head, Main, NextScript } from "next/document";



class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" dir="rtl">
                <Head>
                    <meta name="description" content="فروشگاه اینترنتی رابا" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;