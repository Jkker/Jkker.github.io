import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import { PageSeo } from '@/components/SEO'
import projectsData from '@/data/projectsData'
import siteMetadata from '@/data/siteMetadata'

export default function Projects() {
  return (
    <>
      <PageSeo
        title={`Projects - ${siteMetadata.author}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/projects`}
      />
      <header>
        <PageTitle>Projects</PageTitle>
      </header>
      <div className="mt-4 flex flex-wrap -m-4">
        {projectsData.map((d) => (
          <Card
            key={d.title}
            title={d.title}
            description={d.description}
            imgSrc={d.imgSrc}
            href={d.href}
          />
        ))}
      </div>
    </>
  )
}
