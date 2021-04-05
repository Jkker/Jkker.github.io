import BlogList from '@/components/BlogList'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Input } from 'antd'
import mobile from 'ismobilejs'
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
  const isMobile = mobile().any
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

  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <Header override={scrollPosition === 0 ? 'bg-transparent text-white' : false} />
      {/* <Image
          alt="background"
          src="/static/images/alena-aenami-aenami-lunar.jpg"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="bg-img"
        /> */}
      {/* {!isMobile ? (
        <img
          alt="background"
          src="https://ftp.bmp.ovh/imgs/2021/04/a6aee4cfa257e370.webp"
          className="block object-cover overflow-hidden absolute t-0 b-0 l-0 b-0 m-0 w-screen h-screen z-10"
        />
      ) : (
        <img
          alt="background"
          src="https://ftp.bmp.ovh/imgs/2021/04/04a93a5ed32d1758.webp"
          className="block object-cover overflow-hidden absolute t-0 b-0 l-0 b-0 m-0 w-screen h-screen z-10"
        />
      )} */}
      <div className="index-container h-screen relative z-30  bg-gray-700 bg-cover bg-no-repeat bg-center image">
        <div className="meta-search-index-page bg-transparent w-full h-full flex-center flex-col">
          <Image
            className="logo-center mb-4 opacity-90"
            src="/static/images/index-logo.png"
            height={264 / 2}
            width={1004 / 2}
            alt="Metasearch Logo"
          ></Image>
          <div className="meta-search-bar">
            <Input.Search
              placeholder="搜你所想"
              size="large"
              allowClear
              onSearch={(value) =>
                router.push({
                  pathname: 'search',
                  query: {
                    q: value,
                  },
                })
              }
            />
          </div>
          {/* <div className="meta-search-bar">
            <input
              placeholder="搜你所想"
              className="w-36 max-w-4/5"
              type="search"
              onSearch={(value) =>
                router.push({
                  pathname: 'search',
                  query: {
                    q: value,
                  },
                })
              }
            />
          </div> */}
        </div>
        <button
          className="absolute z-20 bottom-0 bg-transparent w-full outline-none hover:shadow-xl"
          onClick={() => window.scroll(0, window.innerHeight)}
        >
          <i className="fas fa-angle-down fa-2x text-white pb-2 animate-bounce"></i>
        </button>
      </div>

      <div className="blog-posts-container max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 mt-16 mb-auto">
        {/* <PageTitle>Recent Blogs</PageTitle>
        <div className="py-2 flex justify-center items-center space-x-6">
          <Image
            src={siteMetadata.image}
            alt="avatar"
            height={40}
            width={40}
            className="rounded-full"
          />
          <dl className="text-sm font-medium leading-5 whitespace-nowrap">
            <dt className="sr-only">Author Name</dt>
            <dd className="text-gray-900 dark:text-gray-100">{siteMetadata.author}</dd>
          </dl>
        </div> */}
        <BlogList posts={posts} title="All Posts" />
      </div>
      <Footer />
    </>
  )
}
