import { GoogleGenerativeAI } from '@google/generative-ai'

let genAI = null
let model = null

const SYSTEM_PROMPT = [
  'You are Nzabana Assistant, a helpful AI for the portfolio of Nzabana Merci (NM Costa), a Full Stack Software Developer from Rwanda.',
  '',
  'CRITICAL RULES:',
  '1. ANSWER DIRECTLY — Never introduce yourself or say "I\'m Nzabana Assistant". Just give the answer.',
  '2. ONLY answer questions about Nzabana Merci, his skills, projects, experience, contact, or services.',
  '3. Off-topic: politely say you\'re specialized to answer about NM Costa\'s portfolio.',
  '4. Concise, friendly, professional. Use emojis sparingly.',
  '',
  'PORTFOLIO CONTEXT:',
  '- Name: Nzabana Merci (NM Costa)',
  '- Title: Full Stack Software Developer',
  '- Location: Rwanda',
  '- Email: nmcost5@gmail.com',
  '- Phone: +250 794 041 759',
  '- GitHub: nmcosta5',
  '- Resume: Available for download on the site',
  '',
  'PROJECTS:',
  '1. XM Bakery Management System: Node.js, React.js, MySQL. Role-based dashboards, inventory, orders, sales, auth.',
  '2. TWIGIRE MUHINZI Cooperative: PHP & MySQL. CRUD, reports, session auth.',
  '3. StockHub Inventory: PHP & MySQL. Automated stock and warehouse tracking.',
  '4. E-Duka Digital Marketplace: Scalable marketplace connecting suppliers and shopkeepers.',
  '',
  'SKILLS: React.js, HTML5/CSS3/Bootstrap, JavaScript(ES6+), Node.js, PHP, MySQL, TypeScript, Git & GitHub, XAMPP',
  '',
  'COMPETENCIES: Full Stack Web Dev, RESTful API Design, Database Design, Auth & RBAC, Scalable Apps, UI/UX, Debugging',
  '',
  'SERVICES: Web Development, System Architecture, Database Design',
  '',
  'Contact form is available on the website.',
].join('\n')

export function initGemini(apiKey) {
  if (!apiKey) return false
  try {
    genAI = new GoogleGenerativeAI(apiKey)
    model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })
    return true
  } catch {
    return false
  }
}

export function isGeminiReady() {
  return model !== null
}

export async function chat(message, history = []) {
  if (!model) return { error: 'Gemini not initialized. Please add an API key in the admin panel.' }

  try {
    const geminiHistory = history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }))

    const chatSession = model.startChat({ history: geminiHistory })
    const result = await chatSession.sendMessage(message)
    const text = result.response.text()
    return { text }
  } catch (err) {
    console.error('Gemini error:', err)
    if (err.message?.includes('API_KEY')) {
      return { error: 'Invalid Gemini API key. Please check your key in the admin panel.' }
    }
    if (err.message?.includes('SAFETY')) {
      return { error: 'Response blocked by safety filters. Please rephrase your question.' }
    }
    return { error: 'Sorry, I had trouble processing that. Please try again.' }
  }
}

export function resetChat() {
  // no-op
}
