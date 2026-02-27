import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = React.lazy(() => import('./pages/Home'))
const BookNotes = React.lazy(() => import('./pages/BookNotes'))
const PocPlayground = React.lazy(() => import('./pages/PocPlayground'))
const DailyBrief = React.lazy(() => import('./pages/DailyBrief'))
const ReactRadar = React.lazy(() => import('./pages/ReactRadar'))
const SreDigest = React.lazy(() => import('./pages/SreDigest'))
const AuthFlows = React.lazy(() => import('./pages/AuthFlows'))
const ForgeRockDemo = React.lazy(() => import('./pages/ForgeRockDemo'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="content"><p>Loading...</p></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookNotes />} />
          <Route path="/poc-playground" element={<PocPlayground />} />
          <Route path="/daily-brief" element={<DailyBrief />} />
          <Route path="/react-radar" element={<ReactRadar />} />
          <Route path="/sre-digest" element={<SreDigest />} />
          <Route path="/auth-flows" element={<AuthFlows />} />
          <Route path="/iam-demo" element={<ForgeRockDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
