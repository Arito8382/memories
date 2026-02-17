import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/layout/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ClassmatesPage from './pages/ClassmatesPage.jsx'
import TimelinePage from './pages/TimelinePage.jsx'
import FarewellPage from './pages/FarewellPage.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

function CurtainOverlay() {
  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'var(--color-navy)',
          transformOrigin: 'bottom',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'var(--color-navy)',
          transformOrigin: 'top',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 0, opacity: 0 }}
        exit={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', top: '50%', left: 0, right: 0,
          height: 2, zIndex: 10000,
          background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
          transformOrigin: 'left',
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <>
      <AnimatePresence mode="wait">
        <CurtainOverlay key={location.pathname + '-curtain'} />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/"           element={<HomePage />} />
            <Route path="/gallery"    element={<GalleryPage />} />
            <Route path="/classmates" element={<ClassmatesPage />} />
            <Route path="/timeline"   element={<TimelinePage />} />
            <Route path="/farewell"   element={<FarewellPage />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  )
}
