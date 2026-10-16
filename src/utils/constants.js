// ═══════════════════════════════════════════
// PFM Platform - الثوابت العامة
// ═══════════════════════════════════════════

// ─── مدة التحدي (بالثواني) ───
export const CHALLENGE_DURATION = 60  // 60 ثانية

// ─── مستويات الصعوبة ───
export const DIFFICULTY_LEVELS = {
  easy:   { label: 'سهل',    color: '#10b981', timeBonus: 60 },
  medium: { label: 'متوسط',  color: '#f59e0b', timeBonus: 0  },
  hard:   { label: 'صعب',    color: '#ef4444', timeBonus: -60 },
}

// ─── حالة التحدي ───
export const CHALLENGE_STATUS = {
  IDLE:        'idle',
  SELECTING:   'selecting',
  LOADING:     'loading',
  WRITING:     'writing',
  SUBMITTED:   'submitted',
  EVALUATING:  'evaluating',
  COMPLETED:   'completed',
  ERROR:       'error',
}

// ─── الفائز ───
export const WINNER = {
  HUMAN: 'human',
  AI:    'ai',
  TIE:   'tie',
}

// ─── مزود الذكاء الاصطناعي ───
export const AI_PROVIDERS = {
  MOCK:   'mock',
  OPENAI: 'openai',
  GEMINI: 'gemini',
}

// ─── مفاتيح التخزين المحلي ───
export const STORAGE_KEYS = {
  CHALLENGE_HISTORY: 'pfm_challenge_history',
  USER_PREFERENCES:  'pfm_user_preferences',
  DRAFT_SOLUTION:    'pfm_draft_solution',
}

// ─── حدود الإدخال ───
export const INPUT_LIMITS = {
  SOLUTION_MIN: 50,
  SOLUTION_MAX: 2000,
  TITLE_MAX:    100,
}

// ─── روابط ───
export const ROUTES = {
  HOME:      '/',
  CHALLENGE: '/challenge',
  RESULTS:   '/results',
}

// ─── رسائل ───
export const MESSAGES = {
  WELCOME:        'أهلًا بك في PFM! اختر مجالك وابدأ التحدي.',
  THINKING:       'الذكاء الاصطناعي يفكر...',
  EVALUATING:     'جارٍ تقييم الحلّين...',
  TIME_UP:        'انتهى الوقت! سيتم إرسال حلك تلقائيًا.',
  SOLUTION_SHORT: 'الحل قصير جدًا. أضف تفاصيل أكثر.',
  ERROR_GENERIC:  'حدث خطأ. حاول مرة أخرى.',
}

// ─── معلومات التطبيق ───
export const APP_INFO = {
  NAME:        'تحدّي العقول',
  VERSION:     '1.0.0',
  TAGLINE:     'أنت تملك الفكرة، والذكاء الاصطناعي هو منافسك.',
  DESCRIPTION: 'منصة تُنظّم مسابقات قصيرة بين الإنسان والذكاء الاصطناعي.',
  SHORT:       'تحدّي',
}