// import BlogList from '@/components/BlogList'
import ActiveLink from '@/components/ActiveLink'
import Link from '@/components/Link'
import MobileNav from '@/components/MobileNav'
import { PageSeo } from '@/components/SEO'
import ThemeSwitch from '@/components/ThemeSwitch'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { Input } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MAX_DISPLAY = 5
const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

// TODO: Integrate metasearch
export default function Home({ posts }) {
  const router = useRouter()
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
      />
      <div className="index-container">
        <div
          className="header-container fixed t-0 z-50 p-2 w-full bg-opacity-50 dark:bg-opacity-70 bg-white dark:bg-gray-900 "
          style={{ backdropFilter: 'blur(3px)' }}
        >
          <header className="flex items-center justify-between text-white">
            <div className="header-image">
              <Link href="/" aria-label="Tailwind CSS Blog">
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    <Logo />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <h1 className="hidden h-6 text-2xl font-semibold sm:block text-gray-900 dark:text-gray-100 ">
                      {siteMetadata.headerTitle}
                    </h1>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="nav-bar flex items-center text-base leading-5">
              {headerNavLinks.map((link) => (
                <ActiveLink
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 hidden sm:block custom-link relative"
                  activeClassName="active-link"
                >
                  <a className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100 hidden sm:block custom-link relative">
                    {link.title}
                  </a>
                </ActiveLink>
              ))}
              <ThemeSwitch />
              <MobileNav />
            </div>
          </header>
        </div>
        <div className="index-page">
          <div className="index-head">
            <Image
              className="logo-center"
              src="/static/images/index-logo.png"
              height={264 / 2}
              width={1004 / 2}
              alt=""
            ></Image>
          </div>
          <div className="search-bar">
            <Input.Search
              placeholder="蓦然回首，那人却在，灯火阑珊处"
              onSearch={(value) =>
                router.push({
                  pathname: 'search',
                  query: {
                    q: value,
                  },
                })
              }
              size="large"
              allowClear
              className="bg-transparent"
            />
          </div>
        </div>
      </div>
    </>
  )
}
