import BlogList from '@/components/BlogList'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const [searchKey, setSearchKey] = useState('')
  const router = useRouter()
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleSearch = () => {
    router.push({
      pathname: 'search',
      query: {
        q: searchKey,
      },
    })
  }
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <Header override={scrollPosition === 0 ? 'bg-transparent text-white' : false} />
      <div className="index-container h-screen relative z-30  bg-gray-700 bg-cover bg-no-repeat bg-center image shadow-2xl">
        <div className="meta-search-index-page bg-transparent w-full h-full flex-center flex-col">
          <Image
            className="logo-center mb-4 opacity-90"
            src="/static/images/index-logo.png"
            height={264 / 2}
            width={1004 / 2}
            alt="Metasearch Logo"
          ></Image>
          <div className="meta-search-bar w-4/5 sm:max-w-lg relative ">
            <input
              aria-label="Metasearch"
              placeholder="搜你所想"
              type="text"
              onChange={(e) => setSearchKey(e.target.value)}
              className="w-full  text-gray-100 shadow focus:shadow-2xl bg-gray-100 dark:bg-gray-800 acrylic bg-opacity-40 dark:bg-opacity-50 rounded placeholder-gray-200 dark:placeholder-gray-500"
              value={searchKey}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <button
              onClick={() => handleSearch()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            >
              <svg
                className="absolute w-5 h-5 text-gray-100 right-3 top-2.5 text-opacity-70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <button
          className="absolute z-20 bottom-0 bg-transparent w-full outline-none"
          onClick={() => window.scroll(0, window.innerHeight)}
        >
          <i className="fas fa-angle-down fa-2x text-white pb-2 animate-bounce"></i>
        </button>
      </div>

      <div className="blog-posts-container max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 mt-16 mb-auto">
        <BlogList posts={posts} title="All Posts" />
      </div>
      <Footer />
    </>
  )
}
