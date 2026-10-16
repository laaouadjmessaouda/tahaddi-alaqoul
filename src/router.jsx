import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChallengePage from './pages/ChallengePage'
import ResultsPage from './pages/ResultsPage'
import NotFoundPage from './pages/NotFoundPage'
import { ROUTES } from './utils/constants'

const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.CHALLENGE} element={<ChallengePage />} />
      <Route path={ROUTES.RESULTS} element={<ResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter