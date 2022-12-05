import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
    return (
        <Html lang="en">
            <Head />
            <body className="bg-[#121212] text-white antialiased select-none">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default Document;
