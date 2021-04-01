import SocialIcon from '@/components/social-icons'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import ActiveLink from './ActiveLink'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children, path }) => {
  const section = !['/search', '/'].includes(path)
  return (
    <div className="flex flex-col justify-between h-screen">
      {section ? (
        <SectionContainer>
          <header className="flex items-center justify-between py-10">
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
            {path}
            <div className="flex items-center text-base leading-5">
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

          <main className="mb-auto">{children}</main>

          <footer>
            <div className="flex flex-col items-center mt-16">
              <div className="flex mb-3 space-x-4">
                <SocialIcon kind="github" href={siteMetadata.github} />
                <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} />
                <SocialIcon kind="instagram" href={siteMetadata.instagram} />
                <SocialIcon kind="youtube" href={siteMetadata.youtube} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} />
                <SocialIcon kind="twitter" href={siteMetadata.twitter} />
              </div>
              <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <div>{siteMetadata.author}</div>
                <div>{` • `}</div>
                <div>{`© ${new Date().getFullYear()}`}</div>
                <div>{` • `}</div>
                <Link href="/">{siteMetadata.title}</Link>
              </div>
              <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
                <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
                  Tailwind Nextjs Theme
                </Link>
              </div>
            </div>
          </footer>
        </SectionContainer>
      ) : (
        <main className="mb-auto">{children}</main>
      )}
    </div>
  )
}

export default LayoutWrapper
