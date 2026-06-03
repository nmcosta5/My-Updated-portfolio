import { useState, useEffect, useRef } from 'react'

const WELCOME_MSG = {
  role: 'assistant',
  text: "Hi! I'm your AI assistant. Feel free to ask me anything about NM Costa's skills, projects, or experience. I'm here to help!",
}

const SUGGESTIONS = [
  'What technologies does he use?',
  'Tell me about XM Bakery project',
  'What are his core competencies?',
  'How can I contact him?',
]

export default function AIAssistant({ profile }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, open])

  async function handleSend(text) {
    const msg = text || input
    if (!msg.trim() || thinking) return

    const userMsg = { role: 'user', text: msg.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setThinking(true)

    await new Promise((r) => setTimeout(r, 600))
    const reply = getAutoReply(msg.trim(), profile)
    setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    setThinking(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleToggle() {
    const next = !open
    setOpen(next)
    if (!next) {
      setTimeout(() => setMessages([WELCOME_MSG]), 300)
    }
  }

  return (
    <>
      <button className={`ai-bubble ${open ? 'open' : ''}`} onClick={handleToggle} aria-label="AI Assistant">
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-robot'}`}></i>
      </button>

      <div className={`ai-panel ${open ? 'open' : ''}`}>
        <div className="ai-header">
          <i className="fa-solid fa-robot" style={{ color: '#0fbbff', fontSize: '1.2rem' }}></i>
          <div>
            <strong style={{ color: '#fff', fontSize: '0.95rem' }}>AI Assistant</strong>
            <span style={{ color: '#ffd700', fontSize: '0.75rem', display: 'block' }}>
              ● Local AI
            </span>
          </div>
          <button className="ai-close" onClick={handleToggle}>
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>

        <div className="ai-chat" ref={chatRef}>
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              {m.role === 'assistant' && (
                <div className="ai-avatar"><i className="fa-solid fa-robot"></i></div>
              )}
              <div className="ai-bubble-msg">{m.text}</div>
              {m.role === 'user' && (
                <div className="ai-avatar user-avatar"><i className="fa-solid fa-user"></i></div>
              )}
            </div>
          ))}
          {thinking && (
            <div className="ai-msg assistant">
              <div className="ai-avatar"><i className="fa-solid fa-robot"></i></div>
              <div className="ai-bubble-msg thinking-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          {messages.length === 1 && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map((s, i) => (
                <button key={i} className="ai-chip" onClick={() => handleSend(s)}>{s}</button>
              ))}
            </div>
          )}
        </div>

        <div className="ai-input-row">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={thinking}
          />
          <button className="ai-send" onClick={() => handleSend()} disabled={thinking || !input.trim()}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </>
  )
}

function getAutoReply(text, profile) {
  const lower = text.toLowerCase()
  const name = profile?.name || 'Merci'
  const fullName = profile?.fullName || 'Nzabana Merci'
  const title = profile?.title || 'Full Stack Software Developer'

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return `Hello! 👋 I'm the AI assistant for ${fullName}. How can I help you today?`

  if (lower.includes('technology') || lower.includes('tech') || lower.includes('stack') || lower.includes('skill'))
    return `${name} works with: React.js, Node.js, PHP, MySQL, TypeScript, HTML5/CSS3/Bootstrap, and tools like Git & XAMPP.`

  if (lower.includes('xm') || lower.includes('bakery'))
    return `XM Bakery Management System is a full-stack app built with Node.js, React.js & MySQL. It features role-based dashboards (Admin, Staff, Customer), inventory tracking, order management, sales reporting, and secure authentication.`

  if (lower.includes('twigire') || lower.includes('muhinzi') || lower.includes('cooperative'))
    return `TWIGIRE MUHINZI is a PHP & MySQL cooperative management system with full CRUD for members, products, clients and sales, plus session-based auth and reporting features.`

  if (lower.includes('stock') || lower.includes('inventory'))
    return `StockHub is a digital inventory and warehouse tracking platform built with PHP & MySQL that replaced manual stock management with automated workflows and real-time tracking.`

  if (lower.includes('eduka') || lower.includes('marketplace') || lower.includes('e-duka'))
    return `E-Duka is a scalable marketplace concept connecting suppliers and shopkeepers, with designed system architecture, role definitions, and planned end-to-end workflows.`

  if (lower.includes('competenc') || lower.includes('expertise') || lower.includes('good at'))
    return `${name}'s core competencies include: Full Stack Web Development, RESTful API Design, Database Design, Authentication & RBAC, Scalable Applications, UI/UX Implementation, and Debugging & Optimization.`

  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('hire'))
    return `You can reach ${fullName} at:\n📧 ${profile?.email || 'nmcost5@gmail.com'}\n📞 ${profile?.phone || '+250 794 041 759'}\n📍 ${profile?.location || 'Rwanda'}\n💻 GitHub: ${profile?.github || 'nmcosta5'}`

  if (lower.includes('philosophy') || lower.includes('approach'))
    return `${name}'s development philosophy: Solve real-world problems, scale with business growth, provide seamless user experiences, and maintain long-term sustainability.`

  if (lower.includes('objective') || lower.includes('goal') || lower.includes('career'))
    return `${name}'s career objective is to continuously evolve as a software engineer by contributing to innovative projects and building systems that create measurable impact.`

  if (lower.includes('resume') || lower.includes('cv'))
    return `You can download ${name}'s CV from the navbar or the hero section — just click the "Download CV" button!`

  if (lower.includes('service') || lower.includes('offer'))
    return `${name} offers: Web Development, System Architecture Design, Database Design & Management, API Development, and UI/UX Implementation.`

  if (lower.includes('highlight') || lower.includes('interest'))
    return `Additional highlights: Strong interest in AI-powered systems, passionate about interactive UIs, actively exploring emerging technologies, and continuous self-learning.`

  return `Thanks for your question! I'm a demo AI assistant for this portfolio. ${fullName} is a ${title} based in ${profile?.location || 'Rwanda'}. You can ask me about his skills, projects, services, or how to get in touch!`
}
