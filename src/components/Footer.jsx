export default function Footer({ profile, socialLinks }) {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            {profile?.name?.split(' ')[0] || 'Merci'}<span>folio</span>
          </a>
          <p>
            Full Stack Software Developer crafting scalable, high-performance digital solutions with clean architecture and seamless user experiences.
          </p>
          <div className="footer-social">
            {socialLinks?.map((link) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Social link ${link.id}`}>
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' }) }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h5>Services</h5>
          <ul>
            <li><a href="#services">Web Development</a></li>
            <li><a href="#services">System Architecture</a></li>
            <li><a href="#services">Database Design</a></li>
            <li><a href="#services">API Development</a></li>
            <li><a href="#services">UI/UX Implementation</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col">
          <h5>Contact</h5>
          <ul className="footer-contact">
            <li><i className="fa-solid fa-location-dot"></i> {profile?.location || 'Rwanda'}</li>
            <li><i className="fa-solid fa-envelope"></i> {profile?.email || 'nmcost5@gmail.com'}</li>
            <li><i className="fa-solid fa-phone"></i> {profile?.phone || '+250 794 041 759'}</li>
            <li><i className="fa-brands fa-github"></i> {profile?.github || 'nmcosta5'}</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} {profile?.fullName || 'Nzabana Merci'}. All rights reserved.</p>
        <a href="#home" className="back-to-top" onClick={(e) => { e.preventDefault(); scrollToTop() }} aria-label="Back to top">
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>
    </footer>
  )
}
