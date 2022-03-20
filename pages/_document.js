import Document, { Html, Head, Main, NextScript } from "next/document";



class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta name="description" content="فروشگاه اینترنتی رابا" />
                </Head>
            </Html>
        )
    }
}