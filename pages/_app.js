import MDXComponents from '@/components/MDXComponents'
import { SEO } from '@/components/SEO'
import '@/css/tailwind.css'
import LayoutWrapper from '@/layouts/LayoutWrapper'
import { MDXProvider } from '@mdx-js/react'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageView(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...SEO} />
        <LayoutWrapper path={router.pathname}>
          <Component {...pageProps} />
        </LayoutWrapper>
      </MDXProvider>
    </ThemeProvider>
  )
}
