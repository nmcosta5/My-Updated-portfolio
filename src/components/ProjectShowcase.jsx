import React, { useState, useRef, useEffect, useCallback } from 'react'

export default function ProjectShowcase({ projects, onBack }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const carouselRef = useRef(null)
  const reflectionRef = useRef(null)
  const cardsRef = useRef([])
  const currentRot = useRef(0)
  const targetRot = useRef(0)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const startRot = useRef(0)
  const raf = useRef(null)
  const ready = useRef(false)

  if (!projects?.length) return null

  const count = projects.length
  const total = 12
  const radius = 650
  const step = 360 / total

  useEffect(() => {
    if (ready.current) return
    ready.current = true
    const carousel = carouselRef.current
    if (!carousel) return

    cardsRef.current = []
    carousel.innerHTML = ''

    for (let i = 0; i < total; i++) {
      const p = projects[i % count]
      const div = document.createElement('div')
      div.className = 'arc-card'
      div.innerHTML = `
        <img src="${p.image}" alt="${p.title}" />
        <div class="arc-card-info">
          <span class="arc-num">#${String(i % count + 1).padStart(2, '0')}</span>
          <span class="arc-title">${p.title}</span>
        </div>
      `
      const angle = i * step
      div.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`
      carousel.appendChild(div)
      cardsRef.current.push({ el: div, angle })
    }

    if (reflectionRef.current) {
      reflectionRef.current.innerHTML = carousel.innerHTML
    }

    function updateActive(rot) {
      const n = ((rot % 360) + 360) % 360
      let minD = Infinity
      let idx = 0

      cardsRef.current.forEach((c) => {
        let rel = ((c.angle - n) % 360 + 540) % 360 - 180
        if (Math.abs(rel) < 20) {
          c.el.classList.add('active')
          c.el.classList.remove('side')
          if (Math.abs(rel) < minD) {
            minD = Math.abs(rel)
            const ci = cardsRef.current.indexOf(c) % count
            idx = ci
          }
        } else {
          c.el.classList.remove('active')
          c.el.classList.add('side')
        }
      })

      setActiveIdx((prev) => (prev !== idx ? idx : prev))
    }

    function loop() {
      currentRot.current += (targetRot.current - currentRot.current) * 0.1
      const r = currentRot.current
      carousel.style.transform = `translateZ(${-radius}px) rotateY(${-r}deg)`
      if (reflectionRef.current) {
        reflectionRef.current.style.transform = `translateZ(${-radius}px) rotateY(${-r}deg) scaleY(-1)`
      }
      updateActive(r)
      raf.current = requestAnimationFrame(loop)
    }

    raf.current = requestAnimationFrame(loop)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
      carousel.innerHTML = ''
      if (reflectionRef.current) reflectionRef.current.innerHTML = ''
    }
  }, [])

  const snap = useCallback(() => {
    targetRot.current = Math.round(targetRot.current / step) * step
  }, [step])

  const handleMouseDown = useCallback((e) => {
    dragging.current = true
    dragStartX.current = e.clientX
    startRot.current = targetRot.current
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const dx = e.clientX - dragStartX.current
      targetRot.current = startRot.current - dx * 0.25
    }
    const onUp = () => {
      if (dragging.current) {
        dragging.current = false
        snap()
      }
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [snap])

  const handleTouchStart = useCallback((e) => {
    dragging.current = true
    dragStartX.current = e.touches[0].clientX
    startRot.current = targetRot.current
  }, [])

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      const dx = e.touches[0].clientX - dragStartX.current
      targetRot.current = startRot.current - dx * 0.25
    }
    const onEnd = () => {
      if (dragging.current) {
        dragging.current = false
        snap()
      }
    }
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }
  }, [snap])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') { targetRot.current += step; snap() }
      else if (e.key === 'ArrowRight') { targetRot.current -= step; snap() }
      else if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, onBack, snap])

  const activeProject = projects[activeIdx]

  return (
    <div className="showcase-3d-arc">
      <div className="arc-bg" />
      <div className="arc-vignette" />

      <div className="arc-topbar">
        <button className="arc-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <span className="arc-title-label">Featured Work</span>
        <span className="arc-counter">{activeIdx + 1} / {count}</span>
      </div>

      <div className="arc-stage">
        <div
          className="arc-carousel"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        />
        <div className="arc-reflection" ref={reflectionRef} />
      </div>

      <div className="arc-hint">Drag to rotate</div>

      {activeProject && (
        <div className="arc-info-panel" key={activeIdx}>
          <div className="arc-info-header">
            <span className="arc-info-overline">Project Overview</span>
            <h2 className="arc-info-title">{activeProject.title}</h2>
            {activeProject.tech?.length > 0 && (
              <div className="arc-info-tags">
                {activeProject.tech.map((t, i) => (
                  <span key={i} className="arc-tag">{t}</span>
                ))}
              </div>
            )}
          </div>
          <p className="arc-info-desc">{activeProject.description}</p>
          {activeProject.contributions?.length > 0 && (
            <div className="arc-info-contribs">
              <h4><i className="fa-solid fa-circle-check"></i> Key Deliverables & Contributions</h4>
              <ul>
                {activeProject.contributions.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="arc-dots">
        {projects.map((_, i) => {
          const curProj = activeIdx % count
          let diff = i - curProj
          if (diff > count / 2) diff -= count
          if (diff < -(count / 2)) diff += count
          return (
            <button
              key={i}
              className={`arc-dot ${i === curProj ? 'active' : ''}`}
              onClick={() => { targetRot.current -= diff * step; snap() }}
              aria-label={`Go to project ${i + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
