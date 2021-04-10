import Document, { Head, Html, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global site tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicons/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <link rel="alternate" type="application/rss+xml" href="/rss.xml" />
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            media="print"
            onLoad="this.media='all'"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
            rel="stylesheet"
            media="print"
            onLoad="this.media='all'"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800&display=swap"
            rel="preload"
            as="style"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="preload"
            as="style"
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
            rel="stylesheet"
          />
          <noscript>
            {/*   <link
              rel="preload"
              href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC&display=swap"
            /> */}
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Lexend&display=swap"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
              rel="stylesheet"
            />
          </noscript>
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Main-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Math-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Size2-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/fonts/KaTeX_Size4-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css"
            integrity="sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="antialiased text-black bg-white dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
