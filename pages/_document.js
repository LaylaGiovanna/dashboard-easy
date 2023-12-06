import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
    return (
        <Html lang="pt-br">
            <Head>
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}