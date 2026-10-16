import { Link } from 'react-router-dom'
import Container from '../components/layout/Container'
import Button from '../components/common/Button'

function NotFoundPage() {
  return (
    <Container>
      <div className="text-center py-20">
        <h1 className="text-8xl font-black text-gradient-human mb-4">404</h1>
        <p className="text-2xl text-white mb-8">الصفحة غير موجودة</p>
        <Link to="/">
          <Button variant="primary">العودة للرئيسية</Button>
        </Link>
      </div>
    </Container>
  )
}

export default NotFoundPage