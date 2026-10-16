// ═══════════════════════════════════════════
// PFM Platform - مكون النافذة المنبثقة
// ═══════════════════════════════════════════

import { useEffect } from 'react'
import { X } from 'lucide-react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
}) => {
  // منع التمرير عند الفتح
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // إغلاق بـ Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isOpen) onClose?.()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const SIZES = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className={`bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full ${SIZES[size]} max-h-[90vh] overflow-y-auto animate-scaleIn`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* الرأس */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            {title && (
              <h2 className="text-2xl font-bold text-white">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* المحتوى */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal