import React, { useState, useRef, useEffect } from 'react'

export default function ProjectShowcase({ projects, onBack }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  if (!projects?.length) return null
  const count = projects.length

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, onBack])

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev + 1) % count)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev - 1 + count) % count)
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Touch swiping
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      handleNext()
    } else if (isRightSwipe) {
      handlePrev()
    }
  }

  // Mouse dragging
  const dragStart = useRef(null)
  const onMouseDown = (e) => {
    dragStart.current = e.clientX
  }
  const onMouseUp = (e) => {
    if (dragStart.current === null) return
    const distance = dragStart.current - e.clientX
    if (distance > minSwipeDistance) {
      handleNext()
    } else if (distance < -minSwipeDistance) {
      handlePrev()
    }
    dragStart.current = null
  }

  const activeProject = projects[activeIndex]

  return (
    <div className="showcase-container glass-carousel-theme">
      {/* Top Header */}
      <div className="showcase-topbar">
        <button className="showcase-back" onClick={onBack}>
          <i className="fa-solid fa-arrow-left"></i> Back
        </button>
        <span className="showcase-title">Featured Work</span>
        <span className="showcase-count">{activeIndex + 1} / {count}</span>
      </div>

      {/* Carousel Area */}
      <div 
        className="carousel-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        {/* Nav Arrows */}
        <button className="carousel-arrow left" onClick={handlePrev} aria-label="Previous Project">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="carousel-arrow right" onClick={handleNext} aria-label="Next Project">
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Coverflow Cards Stack */}
        <div className="carousel-cards-container">
          {projects.map((project, index) => {
            let positionClass = 'inactive'
            let offset = index - activeIndex

            // Handle circular loop offset calculation
            if (offset < -1) {
              if (activeIndex === count - 1 && index === 0) offset = 1
              else offset = -2
            }
            if (offset > 1) {
              if (activeIndex === 0 && index === count - 1) offset = -1
              else offset = 2
            }

            if (offset === 0) positionClass = 'active'
            else if (offset === 1) positionClass = 'next'
            else if (offset === -1) positionClass = 'prev'
            else if (offset < -1) positionClass = 'far-prev'
            else if (offset > 1) positionClass = 'far-next'

            return (
              <div
                key={project.id}
                className={`carousel-card-wrapper ${positionClass}`}
                onClick={() => {
                  if (positionClass === 'next') handleNext()
                  if (positionClass === 'prev') handlePrev()
                }}
              >
                <div className="carousel-card-inner">
                  <img src={project.image} alt={project.title} className="carousel-card-img" />
                  <div className="carousel-card-overlay">
                    <span className="carousel-card-index">0{index + 1}</span>
                    <h3 className="carousel-card-title-overlay">{project.title}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Info & Contributions Panel */}
      <div className="carousel-info-panel-wrapper">
        <div className="carousel-info-panel">
          <div className="carousel-info-header">
            <div className="carousel-info-title-group">
              <span className="info-overline">Project Overview</span>
              <h2 className="info-title">{activeProject.title}</h2>
            </div>
            {activeProject.tech?.length > 0 && (
              <div className="info-tech-tags">
                {activeProject.tech.map((t, i) => (
                  <span key={i} className="info-tag">{t}</span>
                ))}
              </div>
            )}
          </div>

          <p className="info-description">{activeProject.description}</p>

          {activeProject.contributions?.length > 0 && (
            <div className="info-contributions-section">
              <h4 className="contributions-heading">
                <i className="fa-solid fa-circle-check"></i> Key Deliverables & Contributions
              </h4>
              <ul className="contributions-list">
                {activeProject.contributions.map((c, i) => (
                  <li key={i} className="contribution-item">
                    <span className="bullet-glow"></span>
                    <p>{c}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Carousel Footer Pagination */}
      <div className="carousel-footer-nav">
        <div className="carousel-dots-indicator">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot-btn ${index === activeIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true)
                  setActiveIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
        <span className="carousel-swipe-hint">
          <i className="fa-solid fa-arrows-left-right"></i> Drag or use arrow keys to navigate
        </span>
      </div>
    </div>
  )
}