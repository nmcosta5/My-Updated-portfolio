import { useState, useEffect } from 'react'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 12,
}))

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    const stored = localStorage.getItem('admin_password')
    if (password === (stored || 'admin123')) {
      sessionStorage.setItem('admin_auth', 'true')
      onLogin()
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="admin-login">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="admin-login-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size + 'px',
            height: p.size + 'px',
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
          }}
        />
      ))}

      <div className={`admin-login-card ${show ? 'show' : ''}`}>
        <div className="admin-login-icon">
          <i className="fa-solid fa-crown"></i>
        </div>
        <h2>Admin Panel</h2>
        <p className="admin-login-sub">Enter password to manage portfolio content</p>

        {error && (
          <div className="admin-login-error">
            <i className="fa-solid fa-circle-exclamation"></i> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-login-input-wrap">
            <i className="fa-solid fa-lock input-icon"></i>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
            />
          </div>
          <button className="admin-login-btn" type="submit" disabled={loading || !password}>
            {loading ? (
              <><span className="admin-spinner"></span> Verifying...</>
            ) : (
              <><i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In</>
            )}
          </button>
        </form>

        <a
          href="/"
          onClick={(e) => { e.preventDefault(); window.location.hash = ''; window.location.reload() }}
          className="admin-login-back"
        >
          <i className="fa-solid fa-arrow-left"></i> Back to Portfolio
        </a>
      </div>
    </div>
  )
}
