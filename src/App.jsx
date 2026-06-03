import React, { useEffect, useState, useCallback } from 'react'
import Typed from 'typed.js'

import {
  getProfile,
  getStats,
  getCompetencies,
  getSkillCategories,
  getServices,
  getProjects,
  getPhilosophy,
  getObjective,
  getHighlights,
  getSocialLinks,
  getBlogs,
  submitContact,
} from './services/portfolioService'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Philosophy from './components/Philosophy'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import Loader from './components/Loader'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

export default function App() {
  const [page, setPage] = useState('portfolio')
  const [data, setData] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'nzabana') {
      const authed = sessionStorage.getItem('admin_auth') === 'true'
      setPage(authed ? 'admin' : 'login')
    }


  }, [])

  useEffect(() => {
    if (page !== 'portfolio') return

    async function loadData() {
      const [profile, stats, competencies, skillCategories, services, projects, philosophy, objective, highlights, socialLinks, blogs] =
        await Promise.all([
          getProfile(),
          getStats(),
          getCompetencies(),
          getSkillCategories(),
          getServices(),
          getProjects(),
          getPhilosophy(),
          getObjective(),
          getHighlights(),
          getSocialLinks(),
          getBlogs(),
        ])
      setData({ profile, stats, competencies, skillCategories, services, projects, philosophy, objective, highlights, socialLinks, blogs })
      setLoaded(true)
    }
    loadData()
  }, [page])

  useEffect(() => {
    if (!loaded || page !== 'portfolio') return

    const typed = new Typed('.typing-text', {
      strings: data.profile.typingTexts,
      typeSpeed: 70,
      backSpeed: 70,
      backDelay: 1000,
      loop: true,
    })
    return () => typed.destroy()
  }, [loaded, data.profile, page])

  useEffect(() => {
    if (!loaded || page !== 'portfolio') return

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => revealObserver.observe(el))

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-80px 0px 0px 0px' }
    )
      ;['home', 'about', 'skills', 'services', 'projects', 'blog', 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver.observe(el)
    })

    return () => { revealObserver.disconnect(); sectionObserver.disconnect() }
  }, [loaded, page])

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const goToAdmin = () => {
    window.location.hash = 'nzabana'
    setPage(sessionStorage.getItem('admin_auth') === 'true' ? 'admin' : 'login')
  }

  if (page === 'login') {
    return <AdminLogin onLogin={() => { window.location.hash = 'nzabana'; setPage('admin') }} />
  }

  if (page === 'admin') {
    return <AdminDashboard />
  }

  if (page === 'showcase') {
    const Showcase = React.lazy(() => import('./components/ProjectShowcase'))
    return (
      <React.Suspense fallback={<Loader />}>
        <Showcase projects={data.projects} onBack={() => setPage('portfolio')} />
      </React.Suspense>
    )
  }

  if (!loaded) {
    return <Loader />
  }

  return (
    <>
      <Navbar profile={data.profile} activeSection={activeSection} onNavClick={scrollToSection} />
      <Hero profile={data.profile} socialLinks={data.socialLinks} onViewProjects={() => setPage('showcase')} />
      <Stats stats={data.stats} />
      <About profile={data.profile} socialLinks={data.socialLinks} />
      <Skills competencies={data.competencies} skillCategories={data.skillCategories} />
      <Services services={data.services} />
      <Projects projects={data.projects} onShowAll={() => setPage('showcase')} />
      {data.blogs && data.blogs.length > 0 && <Blog blogs={data.blogs} />}
      <Philosophy philosophy={data.philosophy} objective={data.objective} highlights={data.highlights} />
      <Contact onSubmit={submitContact} />
      <Footer profile={data.profile} socialLinks={data.socialLinks} />
      <AIAssistant profile={data.profile} />

      <button
        onClick={goToAdmin}
        style={{
          position: 'fixed', bottom: '90px', right: '90px', zIndex: 100,
          width: '36px', height: '36px', borderRadius: '8px', border: 'none',
          background: 'rgba(15,187,255,0.1)', color: '#0fbbff', fontSize: '0.9rem',
          cursor: 'pointer', opacity: 0.3, transition: 'opacity 0.3s',
        }}
        title="Admin Panel"
        onMouseEnter={(e) => e.target.style.opacity = '1'}
        onMouseLeave={(e) => e.target.style.opacity = '0.3'}
      >
        <i className="fa-solid fa-crown"></i>
      </button>
    </>
  )
}
