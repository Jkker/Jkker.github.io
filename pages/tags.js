import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllTags } from '@/lib/tags'
import { kebabCase } from '@/lib/utils'
export async function getStaticProps() {
  const tags = await getAllTags('blog')

  return { props: { tags } }
}

export default function Tags({ tags }) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSeo
        title={`Tags - ${siteMetadata.author}`}
        description="Things I blog about"
        url={`${siteMetadata.siteUrl}/tags`}
      />
      {/*       <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24"> */}
      <PageTitle>Tags</PageTitle>
      <div className="flex justify-center flex-wrap items-center">
        {Object.keys(tags).length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <div key={t} className="m-3">
              <Tag text={t} />
              <Link
                href={`/tags/${kebabCase(t)}`}
                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
              >
                {` (${tags[t]})`}
              </Link>
            </div>
          )
        })}
      </div>
    </>
  )
}
