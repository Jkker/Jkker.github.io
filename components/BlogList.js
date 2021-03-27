import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'

const postDateTemplate = { year: 'numeric', month: 'long', day: 'numeric' }

export default function BlogList({ posts }) {
  return (
    <ul>
      {!posts.length && 'No posts found.'}
      {posts.map((frontMatter) => {
        const { slug, date, title, summary, tags } = frontMatter
        return (
          <li key={slug} className="py-12">
            <Link href={`/blog/${slug}`}>
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline shadow-md hover:shadow-xl p-12">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                      </time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight  mb-1">
                          <div className="text-gray-900 dark:text-gray-100">{title}</div>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                        {summary}
                      </div>
                    </div>
                    <div className="text-base font-medium leading-6">
                      <div
                        href={`/blog/${slug}`}
                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}