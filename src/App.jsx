import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import BookNotes from './pages/BookNotes'
import PocPlayground from './pages/PocPlayground'
import DailyBrief from './pages/DailyBrief'
import ReactRadar from './pages/ReactRadar'
import SreDigest from './pages/SreDigest'
import AuthFlows from './pages/AuthFlows'
import ForgeRockDemo from './pages/ForgeRockDemo'
import Changelog from './pages/Changelog'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookNotes />} />
        <Route path="/poc-playground" element={<PocPlayground />} />
        <Route path="/daily-brief" element={<DailyBrief />} />
        <Route path="/react-radar" element={<ReactRadar />} />
        <Route path="/sre-digest" element={<SreDigest />} />
        <Route path="/auth-flows" element={<AuthFlows />} />
        <Route path="/iam-demo" element={<ForgeRockDemo />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </Layout>
  )
}
