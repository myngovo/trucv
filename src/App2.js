import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import { AuthProvider } from './components/Auth'
import { AppShell, Box, useMantineTheme } from '@mantine/core'
import Appbar from './components/Appbar'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Notfound = lazy(() => import('./pages/Notfound'))
const PdfReview = lazy(() => import('./pages/PdfReview'))

const App = () => {
  const theme = useMantineTheme()
  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
        navbar={<Navbar />}
        footer={<Footer />}
        header={<Appbar />}
      >
        <Box
          sx={(theme) => ({
            position: 'relative',
            zIndex: 1,
            boxShadow: theme.shadows.sm,
          })}
        >
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
        </Box>
      </AppShell>
    </>
  )
}

export default App
