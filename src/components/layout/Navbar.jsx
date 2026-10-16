import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 border-b border-sky-300/50 bg-white/70 backdrop-blur-xl shadow-md">      <div className="container-pfm">
        <div className="flex items-center justify-center h-16">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 flex items-center justify-center shadow-lg animate-pulse-glow group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-white animate-bounce-icon" />
            </div>
            <span className="text-2xl font-black">
              <span className="text-cream-900">تحدّي</span>{' '}
              <span className="shimmer-text">العقول</span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar