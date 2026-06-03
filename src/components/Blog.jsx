import { useState } from 'react'

export default function Blog({ blogs }) {
  const [selected, setSelected] = useState(null)

  if (!blogs || blogs.length === 0) return null

  return (
    <section id="blog" className="blog-section">
      <div className="section-header">
        <h2>Latest <span className="highlight">Articles</span></h2>
        <p>Thoughts on software development, architecture, and best practices</p>
      </div>

      <div className="blog-grid">
        {blogs.filter((b) => b.published !== false).map((post) => (
          <article key={post.id} className="blog-card" onClick={() => setSelected(selected === post.id ? null : post.id)}>
            <div className="blog-card-image" style={{ backgroundImage: `url(${post.image})` }} />
            <div className="blog-card-body">
              <div className="blog-card-meta">
                <span className="blog-card-date">{new Date(post.createdAt || post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                <span className="blog-card-author">{post.author}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              {post.tags && (
                <div className="blog-card-tags">
                  {post.tags.map((t, i) => <span key={i} className="blog-tag">{t}</span>)}
                </div>
              )}
            </div>

            {selected === post.id && (
              <div className="blog-expanded">
                <div className="blog-expanded-content">
                  {post.content.split('\n').map((line, i) => {
                    if (line.startsWith('## ')) return <h3 key={i}>{line.slice(3)}</h3>
                    if (line.startsWith('##')) return <h3 key={i}>{line.slice(2)}</h3>
                    if (line.trim() === '') return <br key={i} />
                    if (line.startsWith('> ')) return <blockquote key={i}>{line.slice(2)}</blockquote>
                    return <p key={i}>{line}</p>
                  })}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {selected && (
        <button className="blog-close" onClick={() => setSelected(null)}>
          <i className="fa-solid fa-xmark"></i> Close
        </button>
      )}
    </section>
  )
}