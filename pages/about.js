import PageTitle from '@/components/PageTitle'
import { PageSeo } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image'

export default function About() {
  return (
    <>
      <PageSeo
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <PageTitle>About</PageTitle>
      {/* <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0"> */}
      <div className="flex flex-col items-center pt-8 space-x-2">
        <Image
          src={siteMetadata.image}
          alt="avatar"
          width="168"
          height="168"
          className="rounded-full"
        />
        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight dark:text-white">
          {siteMetadata.author}
        </h3>
        <div className="text-gray-500 dark:text-gray-400 text-center">
          {siteMetadata.occupation}
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-center font-medium">
          {siteMetadata.school}
        </div>
        {/* <div className="flex pt-6 space-x-3">
            <SocialIcon kind="github" href={siteMetadata.github} />
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
            <SocialIcon kind="twitter" href={siteMetadata.twitter} />
          </div> */}
        <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2 text-center">
          {siteMetadata.headline}
        </div>
      </div>
      {/* </div> */}
    </>
  )
}
