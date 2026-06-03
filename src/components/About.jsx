export default function About({ profile, socialLinks }) {
  const paragraphs = profile?.description?.split('\n\n') || []

  return (
    <section id="about" className="hero-container" style={{ backgroundColor: '#006da011', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="hero-content hero-content-animation reveal-left">
        <h1 style={{ '--i': 2 }}>{profile?.aboutTitle || 'About Me'}</h1>
        <h2 style={{ '--i': 3 }}>
          {profile?.aboutSubtitle || profile?.title || 'Full Stack Software Developer'}
        </h2>
        {paragraphs.map((para, idx) => (
          <p key={idx} style={{ '--i': 4, marginBottom: idx < paragraphs.length - 1 ? '1.5rem' : '2rem' }}>
            {para}
          </p>
        ))}
        <div className="social-icons" style={{ '--i': 5 }}>
          {socialLinks?.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <div className="hero-btn" style={{ '--i': 6 }}>
          <a href={profile?.resumeUrl || '#'} className="btn">Resume</a>
        </div>
      </div>
      <div className="hero-image hero-image-animation reveal-right">
        <img src={profile?.image || 'https://i.ibb.co/DgKdp0rR/Gemini-Generated-Image-rtj9cirtj9cirtj9-2.png'} alt="image" />
      </div>
    </section>
  )
}
