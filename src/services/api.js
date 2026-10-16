// ═══════════════════════════════════════════
// PFM Platform - إعداد Axios الأساسي
// ═══════════════════════════════════════════

import axios from 'axios'
import { MESSAGES } from '../utils/constants'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── اعتراض الطلبات ───
api.interceptors.request.use(
  (config) => {
    // يمكن إضافة token هنا لاحقًا
    return config
  },
  (error) => Promise.reject(error)
)

// ─── اعتراض الاستجابات ───
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = MESSAGES.ERROR_GENERIC

    if (error.code === 'ECONNABORTED') {
      message = 'انتهت مهلة الاتصال. تحقق من الإنترنت.'
    } else if (error.response) {
      message = error.response.data?.message || `خطأ ${error.response.status}`
    } else if (error.request) {
      message = 'لا يمكن الوصول للسيرفر. تأكد أنه يعمل.'
    }

    return Promise.reject(new Error(message))
  }
)

export default api