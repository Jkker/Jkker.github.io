import BlogList from '@/components/BlogList'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Input } from 'antd'
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
      <Image
        alt="background"
        src="/static/images/alena-aenami-aenami-lunar.jpg"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="bg-img"
      />
      <div className="index-container h-screen relative">
        <button className="absolute z-20 bottom-0 bg-transparent w-full outline-none">
          <i className="fas fa-angle-down fa-2x text-white pb-2"></i>
        </button>
        <div className="meta-search-index-page bg-transparent w-full h-full flex-center flex-col">
          <Image
            className="logo-center mb-4 opacity-90"
            src="/static/images/index-logo.png"
            height={264 / 2}
            width={1004 / 2}
            alt=""
          ></Image>
          <div className="meta-search-bar">
            <Input.Search
              placeholder="蓦然回首，那人却在，灯火阑珊处"
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
        </div>
      </div>
      <div className="blog-posts-container max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 mt-16 mb-auto">
        <BlogList posts={posts} title="All Posts" />
      </div>
      <Footer />
    </>
  )
}
