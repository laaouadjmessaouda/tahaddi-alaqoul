// ═══════════════════════════════════════════
// PFM Platform - المجالات
// ═══════════════════════════════════════════

export const DOMAINS = [
  // ─── المجالات الأصلية ───
  {
    id: 'university',
    name: 'الجامعة',
    nameEn: 'University',
    icon: 'GraduationCap',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-700',
    description: 'مشاكل تتعلق بالتعليم الجامعي، البحث العلمي، حياة الطلبة، والأساتذة.',
    examples: [
      'كيف نحسّن تجربة الطلبة الجدد في الأسبوع الأول؟',
      'كيف نقلل التسرب الجامعي في السنة الأولى؟',
      'كيف نربط البحث العلمي باحتياجات السوق؟',
    ],
  },
  {
    id: 'environment',
    name: 'البيئة',
    nameEn: 'Environment',
    icon: 'Leaf',
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-700',
    description: 'مشاكل بيئية: التلوث، إعادة التدوير، الطاقة النظيفة، والمياه.',
    examples: [
      'كيف نقلل النفايات البلاستيكية في المدن؟',
      'كيف نشجع استخدام الطاقة الشمسية في الأحياء؟',
      'كيف نعالج ندرة المياه في المناطق الجافة؟',
    ],
  },
  {
    id: 'tourism',
    name: 'السياحة',
    nameEn: 'Tourism',
    icon: 'MapPin',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-700',
    description: 'مشاكل القطاع السياحي: الجذب، التجربة، التسويق، والبنية التحتية.',
    examples: [
      'كيف نجذب السياح إلى المناطق الداخلية؟',
      'كيف نحسّن تجربة السائح الأجنبي في المطار؟',
      'كيف نوثّق التراث المحلي رقميًا؟',
    ],
  },
  {
    id: 'technology',
    name: 'التكنولوجيا',
    nameEn: 'Technology',
    icon: 'Cpu',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-700',
    description: 'مشاكل تقنية: التحول الرقمي، الأمن السيبراني، الذكاء الاصطناعي، والتطبيقات.',
    examples: [
      'كيف نحمي كبار السن من الاحتيال الرقمي؟',
      'كيف نستخدم AI لتحسين الخدمات الحكومية؟',
      'كيف نسدّ الفجوة الرقمية في المدارس؟',
    ],
  },
  {
    id: 'entrepreneurship',
    name: 'المقاولاتية',
    nameEn: 'Entrepreneurship',
    icon: 'Rocket',
    color: '#ef4444',
    gradient: 'from-red-500 to-rose-700',
    description: 'مشاكل ريادة الأعمال: التمويل، التسويق، النمو، والفشل.',
    examples: [
      'كيف يسوّق رائد الأعمال الشاب لفكرته بدون ميزانية؟',
      'كيف نحمي الشركات الناشئة من الفشل المبكر؟',
      'كيف نجذب الكفاءات للبقاء في البلد؟',
    ],
  },

  // ─── المجالات الجديدة للطالب المبتكر ───
  {
    id: 'arts',
    name: 'الفنون والإبداع',
    nameEn: 'Arts & Creativity',
    icon: 'Palette',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-600',
    description: 'تصميم، موسيقى، رسم، كتابة، محتوى إبداعي، وهوية بصرية.',
    examples: [
      'كيف يسوّق الفنان الشاب لأعماله بدون جمهور؟',
      'كيف نجعل الفن المحلي يصل للعالمية؟',
      'كيف نحوّل المواهب الفنية إلى مصدر دخل؟',
    ],
  },
  {
    id: 'health',
    name: 'الصحة',
    nameEn: 'Health',
    icon: 'HeartPulse',
    color: '#06b6d4',
    gradient: 'from-cyan-500 to-teal-600',
    description: 'صحة نفسية، تغذية، لياقة، عادات صحية، ووعي طبي.',
    examples: [
      'كيف نشجع الشباب على الاهتمام بصحتهم النفسية؟',
      'كيف نحارب الإدمان الرقمي عند المراهقين؟',
      'كيف نجعل الغذاء الصحي أرخص من الوجبات السريعة؟',
    ],
  },
  {
    id: 'selfLearning',
    name: 'التعليم الذاتي',
    nameEn: 'Self Learning',
    icon: 'BookOpen',
    color: '#84cc16',
    gradient: 'from-lime-500 to-green-600',
    description: 'تعلّم مهارات جديدة، لغات، دورات، تطوير ذات، وإدارة الوقت.',
    examples: [
      'كيف يتعلم الطالب مهارة جديدة في 30 يومًا؟',
      'كيف نتغلب على التسويف عند الدراسة؟',
      'كيف نختار الدورة المناسبة من بين آلاف الخيارات؟',
    ],
  },
  {
    id: 'money',
    name: 'المال والأعمال',
    nameEn: 'Money & Business',
    icon: 'Wallet',
    color: '#eab308',
    gradient: 'from-yellow-500 to-amber-600',
    description: 'دخل إضافي، استثمار، تسويق رقمي، تجارة إلكترونية، وحرية مالية.',
    examples: [
      'كيف يبدأ الطالب مصدر دخل إضافي من مهاراته؟',
      'كيف نتجنب النصب المالي الإلكتروني؟',
      'كيف نبدأ التجارة الإلكترونية بميزانية صفر؟',
    ],
  },
  {
    id: 'entertainment',
    name: 'الترفيه والمحتوى',
    nameEn: 'Entertainment',
    icon: 'Gamepad2',
    color: '#f97316',
    gradient: 'from-orange-500 to-red-600',
    description: 'صناعة محتوى، ألعاب، بودكاست، يوتيوب، فعاليات، وترفيه رقمي.',
    examples: [
      'كيف يصنع الطالب محتوى فيروسي بدون كاميرا غالية؟',
      'كيف نبني مجتمعًا حول قناة صغيرة؟',
      'كيف نحول الشغف إلى محتوى احترافي؟',
    ],
  },
]

// ─── خيار مخصص ───
export const CUSTOM_DOMAIN_ID = 'custom'

// ─── دوال مساعدة ───
export const getDomainById = (id) => DOMAINS.find((d) => d.id === id)

export const getRandomDomain = () =>
  DOMAINS[Math.floor(Math.random() * DOMAINS.length)]

export const getDomainNames = () => DOMAINS.map((d) => d.name)