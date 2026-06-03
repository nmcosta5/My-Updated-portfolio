export default function Philosophy({ philosophy, objective, highlights }) {
  return (
    <>
      {/* Development Philosophy */}
      <section className="container py-5">
        <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
          Development <span style={{ color: '#00D1FF' }}>Philosophy</span>
        </h2>
        <div
          className="p-4 rounded-3 mx-auto reveal-scale"
          style={{
            background: '#252729a1',
            border: '1px solid rgba(0, 209, 255, 0.15)',
            maxWidth: '800px',
          }}
        >
          <p style={{ color: '#c9d9e8', fontSize: '1rem', marginBottom: '1.5rem' }}>
            {philosophy?.text}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {philosophy?.points?.map((point, idx) => (
              <li
                key={idx}
                style={{
                  color: '#c9d9e8',
                  padding: '0.4rem 0',
                  fontSize: '0.95rem',
                }}
              >
                <i
                  className="bi bi-check-lg"
                  style={{ color: '#00FFA3', marginRight: '0.7rem' }}
                ></i>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Career Objective */}
      <section className="container py-5">
        <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
          Career <span style={{ color: '#00D1FF' }}>Objective</span>
        </h2>
        <div
          className="p-4 rounded-3 mx-auto reveal-scale"
          style={{
            background: '#252729a1',
            border: '1px solid rgba(0, 209, 255, 0.15)',
            maxWidth: '800px',
          }}
        >
          <p style={{ color: '#c9d9e8', fontSize: '1rem', lineHeight: 1.8 }}>
            {objective?.text}
          </p>
        </div>
      </section>

      {/* Additional Highlights */}
      <section className="container py-5">
        <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
          Additional <span style={{ color: '#00D1FF' }}>Highlights</span>
        </h2>
        <div className="row g-3 justify-content-center">
          {highlights?.map((item, idx) => (
            <div className="col-lg-6 reveal" key={idx}>
              <div
                className="d-flex align-items-center gap-3 p-3 rounded-3"
                style={{
                  background: '#252729a1',
                  border: '1px solid rgba(0, 209, 255, 0.15)',
                  height: '100%',
                }}
              >
                <i
                  className="bi bi-star-fill"
                  style={{ color: '#FFD700', fontSize: '1.2rem', flexShrink: 0 }}
                ></i>
                <span style={{ color: '#c9d9e8', fontSize: '0.95rem' }}>{item}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
