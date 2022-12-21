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
import { RequireAuth } from './RequireAuth'

const HomePage = lazy(() => import('../pages/HomePage/HomePage'))
const Login = lazy(() => import('../pages/Login'))
const Signin = lazy(() => import('../pages/Signin.js'))
const Notfound = lazy(() => import('../pages/Notfound'))
const PdfReview = lazy(() => import('../pages/PdfReview'))
const Report = lazy(() => import('../pages/CvReview/Report/Report'))
const LandingPage = lazy(() => import('../pages/CvReview/LandingPage'))
const LandingPageBuilder = lazy(() =>
  import('../pages/CvBuilder/LandingPageBuilder.js')
)
const LandingPageSamples = lazy(() =>
  import('../pages/CvSamples/LandingPageSamples')
)
const LandingPageWriteAndEarn = lazy(() =>
  import('../pages/WriteAndEarn/LandingPageWriteAndEarn')
)
const Apply = lazy(() => import('../pages/WriteAndEarn/Apply/Apply'))

const Home = lazy(() => import('../pages/Home'))
const Sample = lazy(() => import('../pages/CvSamples/Samples/Sample'))

const Dashboard = lazy(() => import('../pages/Dashboard/Dashboard'))

const TransactionList = lazy(() => import('../pages/Dashboard/TransactionList'))

const Login2 = lazy(() => import('../pages/Login2.js'))

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
                <Route path='/login2' element={<Login2 />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/pdf_Review' element={<PdfReview />} />
                <Route path='*' element={<Notfound />} />
                <Route path='/products/review' element={<LandingPage />} />
                <Route
                  path='/products/review/report'
                  element={
                    <RequireAuth>
                      <Report />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/products/builder'
                  element={<LandingPageBuilder />}
                />
                <Route path='/products/builder/build' element={<Home />} />
                <Route
                  path='/products/samples'
                  element={<LandingPageSamples />}
                />
                <Route
                  path='/products/samples/library'
                  element={
                    <RequireAuth>
                      <Sample />
                    </RequireAuth>
                  }
                />
                <Route
                  path='/products/write-n-earn'
                  element={<LandingPageWriteAndEarn />}
                />
                <Route path='/products/write-n-earn/join' element={<Apply />} />

                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route
                  path='/admin/transactions'
                  element={<TransactionList />}
                />
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
