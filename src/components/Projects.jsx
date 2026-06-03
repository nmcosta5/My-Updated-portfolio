export default function Projects({ projects, onShowAll }) {
  if (!projects?.length) return null
  const featured = projects.slice(0, 4)

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <h2>Project <span className="highlight">Experience</span></h2>
        <p>Featured projects showcasing my skills and expertise</p>
      </div>

      <div className="projects-grid">
        {featured.map((project, i) => (
          <div
            key={project.id}
            className="project-card"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="project-card-image" style={{ backgroundImage: `url(${project.image})` }}>
              <div className="project-card-overlay">
                <div className="project-card-tech">
                  {project.tech?.slice(0, 4).map((t, ti) => (
                    <span key={ti} className="project-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-card-body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {projects.length > 4 && (
        <div className="projects-show-all">
          <button className="projects-show-all-btn" onClick={onShowAll}>
            <span>View All Projects</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </section>
  )
}