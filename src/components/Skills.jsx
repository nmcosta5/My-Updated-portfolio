export default function Skills({ competencies, skillCategories }) {
  return (
    <>
      {/* Core Competencies */}
      <section id="skills" className="container py-5">
        <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
          Core <span style={{ color: '#00D1FF' }}>Competencies</span>
        </h2>
        <div className="row g-3 justify-content-center">
          {competencies?.map((item, idx) => (
            <div className="col-lg-4 col-md-6 reveal" key={idx}>
              <div
                className="d-flex align-items-center gap-3 p-3 rounded-3"
                style={{
                  background: '#252729a1',
                  border: '1px solid rgba(0, 209, 255, 0.15)',
                  height: '100%',
                }}
              >
                <i
                  className="bi bi-check-circle-fill"
                  style={{ color: '#00D1FF', fontSize: '1.3rem', flexShrink: 0 }}
                ></i>
                <span style={{ color: '#c9d9e8', fontSize: '0.95rem' }}>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section className="container py-5">
        <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
          Technical <span style={{ color: '#00D1FF' }}>Skills</span>
        </h2>
        <div className="row g-4">
          {skillCategories?.map((cat) => (
            <div className="col-lg-3 col-md-6 reveal" key={cat.id} style={{ transitionDelay: `${cat.id * 0.1}s` }}>
              <div
                className="p-4 rounded-3 h-100"
                style={{
                  background: '#252729a1',
                  border: '1px solid rgba(0, 209, 255, 0.15)',
                }}
              >
                <h5
                  className="mb-3"
                  style={{
                    color: '#00D1FF',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderBottom: '2px solid rgba(0, 209, 255, 0.3)',
                    paddingBottom: '0.6rem',
                  }}
                >
                  {cat.category}
                </h5>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {cat.skills?.map((skill, idx) => (
                    <li
                      key={idx}
                      style={{
                        color: '#c9d9e8',
                        padding: '0.3rem 0',
                        fontSize: '0.95rem',
                      }}
                    >
                      <i
                        className="bi bi-chevron-right"
                        style={{ color: '#00D1FF', marginRight: '0.5rem', fontSize: '0.8rem' }}
                      ></i>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
