import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { PageWrapper } from './components/layout/Container'
import AppRouter from './router'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-pfm-dark" dir="rtl">
      <Navbar />
      <PageWrapper>
        <AppRouter />
      </PageWrapper>
      <Footer />
    </div>
  )
}

export default App