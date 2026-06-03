export default function Services({ services }) {
  if (!services || services.length === 0) return null

  return (
    <section id="services" className="my-services py-5">
      <div className="container">
        <h2 className="text-center mb-5 reveal">My <span className="highlight">Services</span></h2>
        <div className="row">
          {services.map((service) => (
            <div className="col-lg-4 col-md-6 mb-4 reveal" key={service.id}>
              <div className="service-card text-center p-4">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <a href="#" className="btn btn-primary btn-shadow">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
