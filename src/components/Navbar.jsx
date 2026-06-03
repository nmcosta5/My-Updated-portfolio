import { useState, useEffect } from 'react'

export default function Navbar({ profile, activeSection, onNavClick }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleClick = (id) => {
    onNavClick(id)
    setMenuOpen(false)
  }

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleClick('home') }}>
          {profile?.name?.split(' ')[0] || 'Merci'}<span>folio</span>
        </a>

        <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </div>

        <ul className={menuOpen ? 'open' : ''}>
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); handleClick(link.id) }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={profile?.resumeUrl || '#'} className="cvbtn" onClick={(e) => { if (profile?.resumeUrl === '#') e.preventDefault() }}>
          Download CV <i className="fa-solid fa-download"></i>
        </a>
      </nav>
    </header>
  )
}
