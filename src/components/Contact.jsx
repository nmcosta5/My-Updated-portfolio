import { useState } from 'react'

const fields = [
  { name: 'fullName', type: 'text', placeholder: 'Full Name', icon: 'fa-solid fa-user', col: 'col-md-6' },
  { name: 'email', type: 'email', placeholder: 'Email Address', icon: 'fa-solid fa-envelope', col: 'col-md-6' },
  { name: 'phone', type: 'text', placeholder: 'Phone Number', icon: 'fa-solid fa-phone', col: 'col-md-6' },
  { name: 'subject', type: 'text', placeholder: 'Subject', icon: 'fa-solid fa-tag', col: 'col-md-6' },
]

export default function Contact({ onSubmit }) {
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    const form = e.target
    const formData = {
      fullName: form.fullName.value,
      email: form.email.value,
      phone: form.phone.value,
      subject: form.subject.value,
      message: form.message.value,
    }

    const result = await onSubmit(formData)
    setStatus(result)
    if (result.success) form.reset()
    setSending(false)
  }

  return (
    <section id="contact" className="container py-5">
      <h2 className="text-center mb-5 reveal" style={{ color: '#fff', fontSize: '2.5rem' }}>
        Get In <span style={{ color: '#00D1FF' }}>Touch</span>
      </h2>

      {status && (
        <div
          className={`alert ${status.success ? 'alert-success' : 'alert-danger'} text-center mx-auto fade show`}
          style={{ maxWidth: '600px', background: status.success ? 'rgba(0,255,163,0.08)' : 'rgba(255,73,158,0.08)', border: `1px solid ${status.success ? 'rgba(0,255,163,0.3)' : 'rgba(255,73,158,0.3)'}`, color: status.success ? '#00ffa3' : '#ff499e' }}
        >
          <i className={`fa-solid ${status.success ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
          {status.message}
        </div>
      )}

      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="row g-0">
            {fields.map((f) => (
              <div className={`${f.col} px-1`} key={f.name}>
                <div className="input-group-custom">
                  <i className={`${f.icon} input-icon`}></i>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="input-group-custom textarea-group">
            <i className="fa-solid fa-message input-icon"></i>
            <textarea name="message" placeholder="Your Message" required></textarea>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? (
                <><span className="spinner"></span> Sending...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Send Message</>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
