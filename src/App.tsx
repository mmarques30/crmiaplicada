import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Pipeline from './pages/Pipeline'
import Contacts from './pages/Contacts'
import ContactDetailPage from './pages/ContactDetail'
import DealDetailPage from './pages/DealDetail'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pipeline/:product" element={<Pipeline />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetailPage />} />
        <Route path="/deals/:id" element={<DealDetailPage />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
