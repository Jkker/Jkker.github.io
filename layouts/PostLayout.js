import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { BlogSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `${siteMetadata.siteUrl}/blog/${slug}`
  )}`

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : Math.sign(num) * Math.abs(num)
}

export default function PostLayout({ children, frontMatter, next, prev }) {
  const { slug, fileName, date, title, tags, readingTime } = frontMatter
  return (
    <article>
      <BlogSeo url={`${siteMetadata.siteUrl}/blog/${frontMatter.slug}`} {...frontMatter} />
      <div>
        <header className="pt-6 pb-2">
          <div className="space-y-1 text-center">
            <div>
              <PageTitle>{title}</PageTitle>
            </div>
            <dl className="article-info flex justify-evenly space-x-2 flex-wrap">
              <div className="whitespace-nowrap">
                <dt className="dt-inline">
                  <i className="fa-fw far fa-calendar-alt mr-1"></i>Published on:
                </dt>
                <dd className="dd-inline">
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                  </time>
                </dd>
              </div>
              <div className="whitespace-nowrap">
                <dt className="dt-inline">
                  <i className="far fa-file-word fa-fw mr-1"></i>Word count:
                </dt>
                <dd className="dd-inline">{kFormatter(readingTime.words)}</dd>
              </div>
              <div className="whitespace-nowrap">
                <dt className="dt-inline">
                  <i className="far fa-clock fa-fw mr-1"></i>
                  Reading time:
                </dt>
                <dd className="dd-inline">{Math.ceil(readingTime.minutes)} min</dd>
              </div>
            </dl>
          </div>
        </header>
        <div
          className=" divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6"
          style={{ gridTemplateRows: 'auto 1fr' }}
        >
          <div className="divide-y divide-gray-200  dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2">
            <div className="py-6 sm:px-6 prose dark:prose-dark max-w-none">{children}</div>
          </div>
          <footer>
            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              {/* <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `} */}
              <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
            </div>
            <div className="text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2">
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400 mb-1.5">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
              )}
              {(next || prev) && (
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  {prev && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400 mb-1.5">
                        Previous Article
                      </h2>
                      <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                      </div>
                    </div>
                  )}
                  {next && (
                    <div>
                      <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400 mb-1.5">
                        Next Article
                      </h2>
                      <div className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
                        <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="pt-4 xl:pt-8">
              <Link
                href="/blog"
                className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
              >
                &larr; Back to the blog
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </article>
  )
}
