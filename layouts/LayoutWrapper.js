import Footer from '@/layouts/Footer'
import Header from '@/layouts/Header'

const LayoutWrapper = ({ children, path }) => {
  const section = !['/search', '/'].includes(path)
  return (
    <>
      {section ? (
        <div className="flex flex-col justify-between h-screen">
          <Header />
          <main className="section-container w-11/12 sm:w-8/12 mx-auto sm:px-6 xl:px-0 mt-16 mb-auto">
            {children}
          </main>
          <Footer />
        </div>
      ) : (
        <main className="mb-auto">{children}</main>
      )}
    </>
  )
}

export default LayoutWrapper
