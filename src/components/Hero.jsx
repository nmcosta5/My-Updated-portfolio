export default function Hero({ profile, socialLinks, onViewProjects }) {
  return (
    <section id="home" className="hero-container">
      <div className="hero-image hero-image-animation reveal-left">
        <img src={profile?.image || 'https://i.ibb.co/DgKdp0rR/Gemini-Generated-Image-rtj9cirtj9cirtj9-2.png'} alt="image" />
      </div>
      <div className="hero-content hero-content-animation reveal-right">
        <h3 style={{ '--i': 1 }}>{profile?.hello || "Hello, I'm "}</h3>
        <h1 style={{ '--i': 2 }}>{profile?.fullName || 'Nzabana Merci (NM Costa)'}</h1>
        <h2 style={{ '--i': 3 }}>
          {profile?.subtitle || "And I'm a "}<span className="typing-text"></span>
        </h2>
        <p style={{ '--i': 4 }}>{profile?.shortDescription || profile?.description}</p>

        <div
          className="hero-contact"
          style={{
            '--i': 5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.2rem',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            color: 'var(--light-text-clr)',
          }}
        >
          <span><i className="fa-solid fa-location-dot" style={{ color: 'var(--global-clr)' }}></i> {profile?.location || 'Rwanda'}</span>
          <span><i className="fa-solid fa-envelope" style={{ color: 'var(--global-clr)' }}></i> {profile?.email || 'nmcost5@gmail.com'}</span>
          <span><i className="fa-solid fa-phone" style={{ color: 'var(--global-clr)' }}></i> {profile?.phone || '+250 794 041 759'}</span>
          <span><i className="fa-brands fa-github" style={{ color: 'var(--global-clr)' }}></i> {profile?.github || 'nmcosta5'}</span>
        </div>

        <div className="social-icons" style={{ '--i': 6 }}>
          {socialLinks?.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer">
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
        <div className="hero-btn" style={{ '--i': 7 }}>
          <a href={`mailto:${profile?.email || 'nmcost5@gmail.com'}`} className="btn">Hire Me</a>
          <a href={profile?.resumeUrl || '#'} className="btn">Download CV</a>
          <button className="btn btn-outline" onClick={onViewProjects}>
            <i className="fa-solid fa-eye"></i> View My Projects
          </button>
        </div>
      </div>
    </section>
  )
}
