// ═══════════════════════════════════════════
// PFM Platform - خدمة الذكاء الاصطناعي
// ═══════════════════════════════════════════

import { AI_PROVIDERS } from '../utils/constants'

const AI_PROVIDER = import.meta.env.VITE_AI_PROVIDER || AI_PROVIDERS.MOCK
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY
const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY

console.log('🤖 AI Provider:', AI_PROVIDER)
console.log('🔑 Gemini Key موجود؟', !!GEMINI_KEY)

/**
 * توليد حل من الذكاء الاصطناعي
 */
export const generateAISolution = async (problem, customDomain = null) => {
  switch (AI_PROVIDER) {
    case AI_PROVIDERS.OPENAI:
      if (!OPENAI_KEY) {
        console.warn('⚠️ OpenAI key مفقود — استخدام Mock')
        return generateMockSolution(problem)
      }
      return generateWithOpenAI(problem, customDomain)

    case AI_PROVIDERS.GEMINI:
      if (!GEMINI_KEY) {
        console.warn('⚠️ Gemini key مفقود — استخدام Mock')
        return generateMockSolution(problem)
      }
      return generateWithGemini(problem, customDomain)

    case AI_PROVIDERS.MOCK:
    default:
      return generateMockSolution(problem)
  }
}

/**
 * بناء Prompt موحد
 */
const buildPrompt = (problem, customDomain = null) => {
  const domainContext = customDomain
    ? `\n🎨 **المجال:** ${customDomain}\n`
    : ''

  return `أنت مشارك في مسابقة إبداعية. لديك المشكلة التالية:
${domainContext}
📌 **العنوان:** ${problem.title}

📝 **الوصف:** ${problem.description}

🌍 **السياق:** ${problem.context || 'غير محدد'}

⚠️ **القيود:**
${(problem.constraints || []).map((c) => `- ${c}`).join('\n') || '- لا توجد قيود'}

🎯 **الفئة المستهدفة:** ${problem.targetAudience || 'غير محدد'}

المطلوب: اقترح حلًا إبداعيًا وعمليًا لهذه المشكلة.
كن مبتكرًا، محددًا، وواقعيًا. تجنّب الحلول العامة.

أعد الإجابة بتنسيق JSON فقط، بدون أي نص إضافي، بهذا الشكل:
{
  "title": "اسم المشروع (قصير وجذاب، 3-6 كلمات)",
  "description": "وصف الحل (3-5 جمل واضحة)",
  "targetAudience": "الفئة المستهدفة بدقة",
  "features": ["ميزة 1", "ميزة 2", "ميزة 3", "ميزة 4"],
  "implementation": "كيفية التنفيذ (2-3 جمل عملية)"
}`
}

/**
 * Gemini Provider (مجاني)
 */
const generateWithGemini = async (problem, customDomain = null) => {
  const prompt = buildPrompt(problem, customDomain)

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      }),
    }
  )

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Gemini error:', errorText)
    throw new Error(`فشل الاتصال بـ Gemini (${response.status})`)
  }

  const data = await response.json()

  if (!data.candidates || !data.candidates[0]) {
    console.error('❌ لا يوجد رد من Gemini:', data)
    throw new Error('لم يصل رد من Gemini')
  }

  const text = data.candidates[0].content.parts[0].text
  console.log('📥 Gemini raw response:', text)

  // استخراج JSON
  let content
  try {
    content = JSON.parse(text)
  } catch (e) {
    // محاولة استخراج JSON من نص
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('لم يتم العثور على JSON في الرد')
    content = JSON.parse(jsonMatch[0])
  }

  return {
    ...content,
    source: 'Gemini',
    model: 'gemini-2.0-flash',
    generatedAt: new Date().toISOString(),
  }
}

/**
 * OpenAI Provider
 */
const generateWithOpenAI = async (problem, customDomain = null) => {
  const prompt = buildPrompt(problem, customDomain)

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'أنت مساعد خبير يقدم حلولًا إبداعية بصيغة JSON فقط.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ OpenAI error:', errorText)
    throw new Error(`فشل الاتصال بـ OpenAI (${response.status})`)
  }

  const data = await response.json()
  const content = JSON.parse(data.choices[0].message.content)

  return {
    ...content,
    source: 'OpenAI',
    model: 'gpt-4o-mini',
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Mock Solution - للتطوير (احتياطي)
 */
const generateMockSolution = async (problem) => {
  await new Promise((r) => setTimeout(r, 1500))

  const mockSolutions = {
    university: {
      title: 'دليل الطالب الذكي',
      description:
        'تطبيق جوال بسيط يستخدم الذكاء الاصطناعي لتوجيه الطالب الجديد خلال أسبوعه الأول. يوفر خريطة تفاعلية، جدولًا شخصيًا، وروبوت محادثة يجيب على الأسئلة الشائعة.',
      targetAudience: 'طلبة السنة الأولى',
      features: [
        'خريطة تفاعلية للحرم الجامعي',
        'جدول شخصي مبني على التخصص',
        'روبوت محادثة باللغة العربية',
        'نظام إرشاد من طلبة سنة أعلى',
      ],
      implementation:
        'تطوير تطبيق Flutter، ربطه بـ API جامعي مفتوح، وتدريب نموذج محادثة على أسئلة الطلبة.',
    },
    technology: {
      title: 'حارس الرقم',
      description:
        'تطبيق بسيط جدًا لكبار السن يكشف الرسائل المشبوهة تلقائيًا، ويحذرهم بصوت واضح، ويتصل بأحد أفراد العائلة عند الحاجة.',
      targetAudience: 'كبار السن وأسرهم',
      features: [
        'كشف الرسائل الاحتيالية',
        'تنبيه صوتي واضح',
        'زر طوارئ للاتصال بالعائلة',
        'واجهة مبسطة جدًا',
      ],
      implementation:
        'تطوير تطبيق أندرويد بسيط، استخدام API لكشف الاحتيال، شراكة مع البنوك.',
    },
  }

  const solution = mockSolutions[problem.domain] || {
    title: 'حل مبدع',
    description: 'حل مقترح للمشكلة المطروحة باستخدام أدوات بسيطة ومتاحة.',
    targetAudience: 'الفئة المستهدفة',
    features: ['ميزة 1', 'ميزة 2', 'ميزة 3'],
    implementation: 'تنفيذ تدريجي على مراحل.',
  }

  return {
    ...solution,
    source: 'Mock AI',
    model: 'mock-v1',
    generatedAt: new Date().toISOString(),
  }
}