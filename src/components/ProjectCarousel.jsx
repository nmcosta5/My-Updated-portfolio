import { useRef, useEffect, useState } from 'react'

export default function ProjectCarousel({ projects }) {
  const containerRef = useRef(null)
  const [angle, setAngle] = useState(0)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !projects?.length) return

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      setAngle(progress * Math.PI * 2)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [projects])

  if (!projects?.length) return null
  const count = projects.length
  const radius = 320

  return (
    <section id="projects" className="carousel-section">
      <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
        Project <span style={{ color: '#00D1FF' }}>Experience</span>
      </h2>

      <div className="carousel-scene" ref={containerRef}>
        <div className="carousel-track" style={{ transform: `rotateY(${angle}rad)` }}>
          {projects.map((project, i) => {
            const theta = (i / count) * Math.PI * 2
            const isHovered = hovered === i

            return (
              <div
                key={project.id}
                className={`carousel-card ${isHovered ? 'hovered' : ''}`}
                style={{
                  transform: `rotateY(${theta}rad) translateZ(${radius}px)`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setHovered(isHovered ? null : i)}
              >
                <div className="carousel-card-inner">
                  <img src={project.image} alt={project.title} className="carousel-card-img" />
                  <div className="carousel-card-overlay">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="carousel-card-tech">
                      {project.tech?.map((t, ti) => (
                        <span key={ti} className="tech-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="carousel-indicators">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${Math.abs((angle / (Math.PI * 2)) * count - i) % count < 0.5 ? 'active' : ''}`}
            onClick={() => setAngle((i / count) * Math.PI * 2)}
          />
        ))}
      </div>
    </section>
  )
}
