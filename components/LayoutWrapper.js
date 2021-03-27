import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import siteMetadata from '@/data/siteMetadata'
import ActiveLink from './ActiveLink'
import Footer from './Footer'
import Link from './Link'
import MobileNav from './MobileNav'
import SectionContainer from './SectionContainer'
import ThemeSwitch from './ThemeSwitch'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between py-10">
          <div className="header-image">
            <Link href="/" aria-label="Tailwind CSS Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
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
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
