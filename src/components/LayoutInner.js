import React, { useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './Loader'
import { AuthProvider } from './Auth'
import { useMediaQuery } from '@mantine/hooks'
import Navbar from './Navbar/Navbar'
import Header from './Header/Header'
import { shouldExcludeNavbar, shouldExcludeHeader } from './exclude-layout'
import { NAVBAR_BREAKPOINT } from './Navbar/Navbar.styles'
import useStyles from './Layout.styles'
import { useLocation } from 'react-router-dom'
import Footer from './Footer'

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))
const Notfound = lazy(() => import('../pages/Notfound'))
const PdfReview = lazy(() => import('../pages/PdfReview'))

const LayoutInner = ({ children }) => {
  let location = useLocation()
  const navbarCollapsed = useMediaQuery(`(max-width: ${NAVBAR_BREAKPOINT}px)`)
  const shouldRenderHeader = !shouldExcludeHeader(location.pathname)
  const shouldRenderNavbar =
    !shouldExcludeNavbar(location.pathname) || navbarCollapsed
  const { classes, cx } = useStyles({ shouldRenderHeader })
  const [navbarOpened, setNavbarState] = useState(false)
  return (
    <div
      className={cx({
        [classes.withNavbar]: shouldRenderNavbar,
        [classes.withoutHeader]: !shouldRenderHeader,
      })}
    >
      {shouldRenderHeader && (
        <Header
          navbarOpened={navbarOpened}
          toggleNavbar={() => setNavbarState((o) => !o)}
        />
      )}

      {shouldRenderNavbar && (
        <Navbar opened={navbarOpened} onClose={() => setNavbarState(false)} />
      )}

      <main className={classes.main}>
        <div className={classes.content}>
          {' '}
          <AuthProvider>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Home />} />
                <Route path='/pdf_Review' element={<PdfReview />} />
                <Route path='*' element={<Notfound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default LayoutInner
