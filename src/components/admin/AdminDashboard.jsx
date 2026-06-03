import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseReady } from '../../lib/supabase'

import { seedDatabase } from '../../services/seedService'
import AdminModal from './AdminModal'

const TABS = [
  { id: 'profile', label: 'Profile', icon: 'fa-user' },
  { id: 'stats', label: 'Stats', icon: 'fa-chart-simple' },
  { id: 'competencies', label: 'Competencies', icon: 'fa-list-check' },
  { id: 'skills', label: 'Skills', icon: 'fa-code' },
  { id: 'services', label: 'Services', icon: 'fa-briefcase' },
  { id: 'projects', label: 'Projects', icon: 'fa-folder-open' },
  { id: 'philosophy', label: 'Philosophy', icon: 'fa-brain' },
  { id: 'highlights', label: 'Highlights', icon: 'fa-star' },
  { id: 'social', label: 'Social', icon: 'fa-share-nodes' },
  { id: 'contacts', label: 'Contacts', icon: 'fa-message' },
  { id: 'blogs', label: 'Blogs', icon: 'fa-newspaper' },
  { id: 'ai', label: 'AI Settings', icon: 'fa-robot' },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('profile')
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [sideOpen, setSideOpen] = useState(true)
  const [toasts, setToasts] = useState([])

  const toast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, msg, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000)
  }, [])

  useEffect(() => {
    if (!isSupabaseReady) { setLoading(false); toast('Supabase not configured', 'error'); return }
    loadAll()
  }, [])

  async function loadAll() {
    setLoading(true)
    const tables = ['profile', 'stats', 'competencies', 'skill_categories', 'services', 'projects', 'philosophy', 'objective', 'highlights', 'social_links', 'contacts', 'blogs']
    const result = {}
    for (const t of tables) {
      const { data: d } = await supabase.from(t).select('*').order('id')
      result[t] = d || []
    }
    const { data: skills } = await supabase.from('skills').select('*').order('id')
    result.skills = skills || []
    setData(result)
    setLoading(false)
  }

  async function dbInsert(table, payload) {
    const { error } = await supabase.from(table).insert(payload)
    if (error) throw error
  }

  async function dbUpdate(table, id, payload) {
    const { error } = await supabase.from(table).update(payload).eq('id', id)
    if (error) throw error
  }

  async function dbDelete(table, id) {
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) throw error
  }

  async function handleSave(table, payload, id = null) {
    try {
      if (id) await dbUpdate(table, id, payload)
      else await dbInsert(table, payload)
      toast(id ? 'Updated successfully' : 'Added successfully')
      await loadAll()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  async function handleDelete(table, id) {
    try {
      await dbDelete(table, id)
      toast('Deleted successfully')
      await loadAll()
    } catch (err) {
      toast(err.message, 'error')
    }
  }

  function renderContent() {
    if (!isSupabaseReady) return <EmptyState icon="fa-database" title="Supabase Not Configured" text="Add your Supabase credentials in the .env file to start managing your portfolio." />
    if (loading) return <LoadingSkeleton />

    switch (tab) {
      case 'profile': return <ProfileSection data={data.profile?.[0]} onSave={(p, id) => handleSave('profile', p, id)} toast={toast} />
      case 'stats': return <ListSection title="Statistics" items={data.stats || []} fields={['value', 'label', 'sublabel']} table="stats" onSave={handleSave} onDelete={handleDelete} />
      case 'competencies': return <ListSection title="Core Competencies" items={data.competencies || []} fields={['name']} table="competencies" onSave={handleSave} onDelete={handleDelete} />
      case 'skills': return <SkillsSection data={data} onSave={handleSave} onDelete={handleDelete} toast={toast} />
      case 'services': return <ServicesSection data={data.services || []} onSave={handleSave} onDelete={handleDelete} />
      case 'projects': return <ProjectsSection data={data} onSave={handleSave} onDelete={handleDelete} toast={toast} loadAll={loadAll} />
      case 'philosophy': return <PhilosophySection data={data} onSave={handleSave} toast={toast} />
      case 'highlights': return <ListSection title="Additional Highlights" items={data.highlights || []} fields={['text']} table="highlights" onSave={handleSave} onDelete={handleDelete} />
      case 'social': return <ListSection title="Social Links" items={data.social_links || []} fields={['url', 'icon']} table="social_links" onSave={handleSave} onDelete={handleDelete} />
      case 'contacts': return <ContactsSection items={data.contacts || []} />
      case 'blogs': return <BlogSection items={data.blogs || []} onSave={handleSave} onDelete={handleDelete} toast={toast} loadAll={loadAll} />
      case 'ai': return <AISection toast={toast} />
      default: return null
    }
  }

  return (
    <div className="admin-layout">
      {/* Toast container */}
      <div className="admin-toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`admin-toast ${t.type}`}>
            <i className={`fa-solid ${t.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            {t.msg}
          </div>
        ))}
      </div>

      {/* Mobile sidebar toggle */}
      <button className="admin-sidebar-toggle" onClick={() => setSideOpen(!sideOpen)}>
        <i className={`fa-solid ${sideOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sideOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-avatar">
            <i className="fa-solid fa-crown"></i>
          </div>
          <div className="admin-sidebar-user">
            <span className="admin-sidebar-name">Admin Panel</span>
            <span className="admin-sidebar-role">Portfolio Manager</span>
          </div>
        </div>
        <div className="admin-sidebar-nav">
          {TABS.map((t) => (
            <button key={t.id} className={`admin-nav-item ${tab === t.id ? 'active' : ''}`} onClick={() => { setTab(t.id); setSideOpen(false) }}>
              <i className={`fa-solid ${t.icon}`}></i>
              <span>{t.label}</span>
              {t.badge && <span className="admin-badge">{t.badge}</span>}
            </button>
          ))}
        </div>
        <button className="admin-nav-item logout"
          onClick={() => { sessionStorage.removeItem('admin_auth'); window.location.hash = ''; window.location.reload() }}>
          <i className="fa-solid fa-right-from-bracket"></i> <span>Logout</span>
        </button>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h2>{TABS.find((t) => t.id === tab)?.label}</h2>
            <p className="admin-header-sub">{getTabDesc(tab)}</p>
          </div>
          <button className="admin-btn-outline" onClick={() => { window.location.hash = ''; window.open('/', '_blank') }}>
            <i className="fa-solid fa-up-right-from-square"></i> View Site
          </button>
        </div>
        <div className="admin-content" key={tab}>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function getTabDesc(id) {
  const m = {
    profile: 'Manage your personal information and branding',
    stats: 'Edit your portfolio statistics and achievements',
    competencies: 'Manage your core professional competencies',
    skills: 'Organize your technical skills by category',
    services: 'Manage the services you offer',
    projects: 'Manage your project portfolio with contributions',
    philosophy: 'Edit your development philosophy and career objective',
    highlights: 'Manage your additional highlights and interests',
    social: 'Manage your social media links',
    contacts: 'View messages from your contact form',
    blogs: 'Write and manage your blog posts',
    ai: 'Configure Nzabana Assistant and settings',
  }
  return m[id] || ''
}

/* ===== Reusable components ===== */

function LoadingSkeleton() {
  return (
    <div className="admin-skeleton">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="admin-skeleton-row">
          <div className="admin-skeleton-line" style={{ width: '40%' }}></div>
          <div className="admin-skeleton-line" style={{ width: '25%' }}></div>
          <div className="admin-skeleton-line" style={{ width: '15%' }}></div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ icon, title, text, action }) {
  return (
    <div className="admin-empty">
      <i className={`fa-solid ${icon}`}></i>
      <h4>{title}</h4>
      <p>{text}</p>
      {action && <button className="admin-btn-primary" onClick={action.onClick}>{action.label}</button>}
    </div>
  )
}

function ConfirmDialog({ open, title, text, onConfirm, onCancel, loading }) {
  if (!open) return null
  return (
    <div className="admin-modal-overlay" onClick={onCancel}>
      <div className="admin-modal confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-body" style={{ textAlign: 'center', padding: '2rem' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: '2.5rem', color: '#ff499e', marginBottom: '1rem' }}></i>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>{title || 'Confirm Delete'}</h3>
          <p style={{ color: '#c9d9e8', marginBottom: '1.5rem' }}>{text}</p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
            <button className="admin-btn-secondary" onClick={onCancel} disabled={loading}>Cancel</button>
            <button className="admin-btn-danger" onClick={onConfirm} disabled={loading}>
              {loading ? <><span className="admin-spinner"></span> Deleting...</> : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {children}
    </div>
  )
}

/* ===== List Section ===== */
function ListSection({ title, items, fields, table, onSave, onDelete }) {
  const [modal, setModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({})
  const [confirm, setConfirm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = items.filter((item) =>
    fields.some((f) => String(item[f] || '').toLowerCase().includes(search.toLowerCase()))
  )

  function openAdd() { setEditItem(null); setForm({}); setModal(true) }

  function openEdit(item) {
    setEditItem(item)
    setForm({ ...item })
    setModal(true)
  }

  async function handleFormSave() {
    setSaving(true)
    await onSave(table, form, editItem?.id)
    setSaving(false)
    setModal(false)
  }

  return (
    <div className="admin-list-section">
      <div className="admin-list-toolbar">
        <div className="admin-search">
          <i className="fa-solid fa-search"></i>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${title.toLowerCase()}...`} />
        </div>
        <button className="admin-btn-primary" onClick={openAdd}><i className="fa-solid fa-plus"></i> Add New</button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="fa-database" title={search ? 'No matches' : `No ${title.toLowerCase()}`} text={search ? 'Try a different search term' : `Click "Add New" to create your first item.`} action={search ? null : { label: 'Add New', onClick: openAdd }} />
      ) : (
        <div className="admin-table">
          <div className="admin-table-header">
            {fields.map((f) => <div key={f} className="admin-th">{f}</div>)}
            <div className="admin-th" style={{ width: '80px' }}>Actions</div>
          </div>
          {filtered.map((item) => (
            <div key={item.id} className="admin-tr">
              {fields.map((f) => <div key={f} className="admin-td">{String(item[f] || '—').substring(0, 100)}</div>)}
              <div className="admin-td actions">
                <button className="admin-icon-btn edit" onClick={() => openEdit(item)} title="Edit"><i className="fa-solid fa-pen"></i></button>
                <button className="admin-icon-btn danger" onClick={() => setConfirm(item.id)} title="Delete"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal} onClose={() => setModal(false)} title={editItem ? `Edit ${title.slice(0, -1)}` : `Add ${title.slice(0, -1)}`}>
        <div className="admin-modal-form">
          {fields.map((f) => (
            <Field key={f} label={f}>
              <textarea value={form[f] || ''} onChange={(e) => setForm({ ...form, [f]: e.target.value })} placeholder={f} rows={f === 'description' || f === 'text' ? 3 : 1} />
            </Field>
          ))}
          <div className="admin-modal-form-actions">
            <button className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="admin-btn-primary" onClick={handleFormSave} disabled={saving}>
              {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> {editItem ? 'Update' : 'Save'}</>}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={confirm} title="Delete Item" text="This action cannot be undone." onConfirm={async () => { await onDelete(table, confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />
    </div>
  )
}

/* ===== Profile ===== */
function ProfileSection({ data, onSave, toast }) {
  const [form, setForm] = useState(data || {})
  const [saving, setSaving] = useState(false)

  useEffect(() => setForm(data || {}), [data])

  async function handleSave() {
    setSaving(true)
    try {
      if (form.id) await onSave(form, form.id)
      else {
        const { error } = await supabase.from('profile').insert(form)
        if (error) throw error
        toast('Profile created')
      }
      toast('Profile saved')
    } catch (err) { toast(err.message, 'error') }
    setSaving(false)
  }

  return (
    <div className="admin-profile-form">
      <div className="admin-form-card">
        <h4><i className="fa-solid fa-circle-info"></i> Basic Info</h4>
        <div className="admin-form-grid">
          <Field label="First Name"><input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Full Name"><input value={form.full_name || ''} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></Field>
          <Field label="Title"><input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Location"><input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} /></Field>
        </div>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-address-card"></i> Contact</h4>
        <div className="admin-form-grid">
          <Field label="Email"><input value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Phone"><input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="GitHub"><input value={form.github || ''} onChange={(e) => setForm({ ...form, github: e.target.value })} /></Field>
          <Field label="Image URL"><input value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} /></Field>
          <Field label="Resume URL"><input value={form.resume_url || ''} onChange={(e) => setForm({ ...form, resume_url: e.target.value })} /></Field>
        </div>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-quote-right"></i> Descriptions</h4>
        <Field label="Short Description"><textarea value={form.short_description || ''} onChange={(e) => setForm({ ...form, short_description: e.target.value })} rows={2} /></Field>
        <Field label="Full Description"><textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} /></Field>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-keyboard"></i> Typing Animation</h4>
        <Field label='Typing Texts (comma-separated, e.g. "Developer, Designer, Coder")'>
          <input value={(form.typing_texts || []).join(', ')} onChange={(e) => setForm({ ...form, typing_texts: e.target.value.split(',').map((s) => s.trim()) })} />
        </Field>
      </div>

      <button className="admin-btn-primary save-btn" onClick={handleSave} disabled={saving}>
        {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Profile</>}
      </button>
    </div>
  )
}

/* ===== Skills ===== */
function SkillsSection({ data, onSave, onDelete, toast }) {
  const cats = data.skill_categories || []
  const skills = data.skills || []
  const [newCat, setNewCat] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [selCat, setSelCat] = useState(cats[0]?.id || '')
  const [saving, setSaving] = useState(false)

  async function addCat() {
    if (!newCat.trim()) return
    setSaving(true)
    await onSave('skill_categories', { name: newCat.trim() })
    setNewCat('')
    setSaving(false)
  }

  async function addSkill() {
    if (!newSkill.trim() || !selCat) return
    setSaving(true)
    await onSave('skills', { category_id: selCat, name: newSkill.trim() })
    setNewSkill('')
    setSaving(false)
  }

  return (
    <div className="admin-skills-section">
      <div className="admin-form-card">
        <h4><i className="fa-solid fa-layer-group"></i> Add Category</h4>
        <div className="admin-inline-form">
          <input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="Category name (e.g. Frontend)" />
          <button className="admin-btn-primary" onClick={addCat} disabled={saving || !newCat.trim()}>
            {saving ? <span className="admin-spinner"></span> : <i className="fa-solid fa-plus"></i>} Add
          </button>
        </div>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-microchip"></i> Add Skill</h4>
        <div className="admin-inline-form">
          <select value={selCat} onChange={(e) => setSelCat(Number(e.target.value))}>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Skill name" />
          <button className="admin-btn-primary" onClick={addSkill} disabled={saving || !newSkill.trim()}>
            {saving ? <span className="admin-spinner"></span> : <i className="fa-solid fa-plus"></i>} Add
          </button>
        </div>
      </div>

      <div className="admin-skills-grid">
        {cats.length === 0 && <EmptyState icon="fa-code" title="No categories" text="Add a category to get started." />}
        {cats.map((c) => (
          <div key={c.id} className="admin-skill-cat-card">
            <div className="admin-skill-cat-header">
              <h5>{c.name}</h5>
              <button className="admin-icon-btn danger" onClick={() => onDelete('skill_categories', c.id)} title="Delete category"><i className="fa-solid fa-trash"></i></button>
            </div>
            <div className="admin-skill-tags">
              {skills.filter((s) => s.category_id === c.id).length === 0 && <span className="admin-empty-tag">No skills yet</span>}
              {skills.filter((s) => s.category_id === c.id).map((s) => (
                <span key={s.id} className="admin-skill-tag">
                  {s.name}
                  <button className="admin-tag-del" onClick={() => onDelete('skills', s.id)}>&times;</button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ===== Services ===== */
function ServicesSection({ data, onSave, onDelete }) {
  const [modal, setModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', icon: '' })
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState(null)

  function openAdd() { setEditItem(null); setForm({ title: '', description: '', icon: '' }); setModal(true) }
  function openEdit(item) { setEditItem(item); setForm({ ...item }); setModal(true) }

  async function handleSave() {
    setSaving(true)
    await onSave('services', form, editItem?.id)
    setSaving(false)
    setModal(false)
  }

  return (
    <div>
      <div className="admin-list-toolbar">
        <button className="admin-btn-primary" onClick={openAdd}><i className="fa-solid fa-plus"></i> Add Service</button>
      </div>
      {data.length === 0 ? (
        <EmptyState icon="fa-briefcase" title="No services" text="Add your first service." action={{ label: 'Add Service', onClick: openAdd }} />
      ) : (
        <div className="admin-cards-grid">
          {data.map((s) => (
            <div key={s.id} className="admin-card">
              <div className="admin-card-icon"><i className={s.icon}></i></div>
              <h5>{s.title}</h5>
              <p>{s.description}</p>
              <div className="admin-card-actions">
                <button className="admin-icon-btn edit" onClick={() => openEdit(s)}><i className="fa-solid fa-pen"></i></button>
                <button className="admin-icon-btn danger" onClick={() => setConfirm(s.id)}><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Service' : 'Add Service'}>
        <div className="admin-modal-form">
          <Field label="Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Description"><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} /></Field>
          <Field label="Icon (e.g. bi bi-code-slash)"><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></Field>
          <div className="admin-modal-form-actions">
            <button className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save</>}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={confirm} title="Delete Service" text="This will permanently delete this service." onConfirm={async () => { await onDelete('services', confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />
    </div>
  )
}

/* ===== Projects ===== */
function ProjectsSection({ data, onSave, onDelete, toast, loadAll }) {
  const projects = data.projects || []
  const [modal, setModal] = useState(false)
  const [form, setForm] = useState({ title: '', image: '', description: '' })
  const [contribs, setContribs] = useState('')
  const [techs, setTechs] = useState('')
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState(null)

  function openAdd() { setForm({ title: '', image: '', description: '' }); setContribs(''); setTechs(''); setModal(true) }

  async function handleSave() {
    setSaving(true)
    try {
      const { data: newProj } = await supabase.from('projects').insert({ title: form.title, image: form.image, description: form.description }).select()
      if (newProj?.[0]) {
        const pid = newProj[0].id
        for (const c of contribs.split('\n').filter(Boolean)) await supabase.from('project_contributions').insert({ project_id: pid, text: c })
        for (const t of techs.split(',').map((s) => s.trim()).filter(Boolean)) await supabase.from('project_techs').insert({ project_id: pid, name: t })
      }
      toast('Project added')
      await loadAll()
    } catch (err) { toast(err.message, 'error') }
    setSaving(false)
    setModal(false)
  }

  return (
    <div>
      <div className="admin-list-toolbar">
        <button className="admin-btn-primary" onClick={openAdd}><i className="fa-solid fa-plus"></i> Add Project</button>
      </div>
      {projects.length === 0 ? (
        <EmptyState icon="fa-folder-open" title="No projects" text="Add your first project." action={{ label: 'Add Project', onClick: openAdd }} />
      ) : (
        <div className="admin-projects-list">
          {projects.map((p) => (
            <div key={p.id} className="admin-project-card">
              <div className="admin-project-thumb" style={{ backgroundImage: `url(${p.image})` }}></div>
              <div className="admin-project-info">
                <h5>{p.title}</h5>
                <p>{p.description}</p>
              </div>
              <div className="admin-project-actions">
                <button className="admin-icon-btn danger" onClick={() => setConfirm(p.id)}><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal open={modal} onClose={() => setModal(false)} title="Add Project" wide>
        <div className="admin-modal-form">
          <Field label="Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Image URL"><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></Field>
          <Field label="Description"><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} /></Field>
          <Field label="Contributions (one per line)"><textarea value={contribs} onChange={(e) => setContribs(e.target.value)} rows={4} /></Field>
          <Field label="Technologies (comma-separated)"><input value={techs} onChange={(e) => setTechs(e.target.value)} /></Field>
          <div className="admin-modal-form-actions">
            <button className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Project</>}
            </button>
          </div>
        </div>
      </AdminModal>

      <ConfirmDialog open={confirm} title="Delete Project" text="This will permanently delete this project and all its contributions." onConfirm={async () => { await onDelete('projects', confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />
    </div>
  )
}

/* ===== Philosophy ===== */
function PhilosophySection({ data, onSave, toast }) {
  const phil = data.philosophy?.[0] || {}
  const obj = data.objective?.[0] || {}
  const [pText, setPText] = useState(phil.text || '')
  const [pPoints, setPPoints] = useState('')
  const [oText, setOText] = useState(obj.text || '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data.philosophy?.[0]) setPText(data.philosophy[0].text || '')
    if (data.objective?.[0]) setOText(data.objective[0].text || '')
  }, [data])

  async function savePhilosophy() {
    setSaving(true)
    try {
      if (phil.id) await onSave('philosophy', { text: pText }, phil.id)
      else {
        const { error } = await supabase.from('philosophy').insert({ heading: 'Development Philosophy', text: pText })
        if (error) throw error
      }
      if (pPoints.trim()) {
        const pid = phil.id || data.philosophy?.[0]?.id || 1
        for (const pt of pPoints.split('\n').filter(Boolean)) await supabase.from('philosophy_points').insert({ philosophy_id: pid, text: pt })
        setPPoints('')
      }
      toast('Philosophy saved')
    } catch (err) { toast(err.message, 'error') }
    setSaving(false)
  }

  async function saveObjective() {
    setSaving(true)
    try {
      if (obj.id) await onSave('objective', { text: oText }, obj.id)
      else {
        const { error } = await supabase.from('objective').insert({ heading: 'Career Objective', text: oText })
        if (error) throw error
      }
      toast('Objective saved')
    } catch (err) { toast(err.message, 'error') }
    setSaving(false)
  }

  return (
    <div className="admin-philosophy-section">
      <div className="admin-form-card">
        <h4><i className="fa-solid fa-brain"></i> Development Philosophy</h4>
        <Field label="Philosophy Text"><textarea value={pText} onChange={(e) => setPText(e.target.value)} rows={4} /></Field>
        <Field label="Add Philosophy Points (one per line)"><textarea value={pPoints} onChange={(e) => setPPoints(e.target.value)} rows={3} placeholder="Solve real-world problems&#10;Scale with business growth" /></Field>
        <button className="admin-btn-primary" onClick={savePhilosophy} disabled={saving}>
          {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Philosophy</>}
        </button>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-bullseye"></i> Career Objective</h4>
        <Field label="Objective Text"><textarea value={oText} onChange={(e) => setOText(e.target.value)} rows={4} /></Field>
        <button className="admin-btn-primary" onClick={saveObjective} disabled={saving}>
          {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Objective</>}
        </button>
      </div>
    </div>
  )
}

/* ===== Contacts ===== */
function ContactsSection({ items }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="admin-contacts-section">
      {items.length === 0 ? (
        <EmptyState icon="fa-message" title="No Messages" text="Contact form submissions will appear here." />
      ) : (
        items.map((c) => (
          <div key={c.id} className={`admin-contact-card ${expanded === c.id ? 'expanded' : ''}`} onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
            <div className="admin-contact-preview">
              <div className="admin-contact-avatar">{c.full_name?.charAt(0) || '?'}</div>
              <div className="admin-contact-meta">
                <strong>{c.full_name}</strong>
                <span>{c.email} · {new Date(c.created_at).toLocaleDateString()}</span>
              </div>
              <span className="admin-contact-subject">{c.subject}</span>
            </div>
            {expanded === c.id && (
              <div className="admin-contact-body">
                <div><i className="fa-solid fa-phone"></i> {c.phone || '—'}</div>
                <div><i className="fa-solid fa-tag"></i> {c.subject}</div>
                <div className="admin-contact-message"><i className="fa-solid fa-quote-left"></i> {c.message}</div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}

/* ===== Blogs ===== */
function BlogSection({ items, onSave, onDelete, toast, loadAll }) {
  const [modal, setModal] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', content: '', image: '', author: '', tags: '', published: true })
  const [saving, setSaving] = useState(false)
  const [confirm, setConfirm] = useState(null)

  function openAdd() {
    setEditItem(null)
    setForm({ title: '', slug: '', excerpt: '', content: '', image: '', author: 'NM Costa', tags: '', published: true })
    setModal(true)
  }
  function openEdit(item) {
    setEditItem(item)
    setForm({ ...item, tags: (item.tags || []).join(', ') })
    setModal(true)
  }
  async function handleSave() {
    setSaving(true)
    const payload = {
      title: form.title,
      slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: form.excerpt,
      content: form.content,
      image: form.image,
      author: form.author,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      published: form.published,
    }
    await onSave('blogs', payload, editItem?.id)
    setSaving(false)
    setModal(false)
  }
  return (
    <div className="admin-list-section">
      <div className="admin-list-toolbar">
        <button className="admin-btn-primary" onClick={openAdd}><i className="fa-solid fa-plus"></i> New Post</button>
      </div>
      {items.length === 0 ? (
        <EmptyState icon="fa-newspaper" title="No blog posts" text="Write your first blog post." action={{ label: 'New Post', onClick: openAdd }} />
      ) : (
        <div className="admin-blog-list">
          {items.map((b) => (
            <div key={b.id} className="admin-blog-card">
              {b.image && <div className="admin-blog-thumb" style={{ backgroundImage: `url(${b.image})` }} />}
              <div className="admin-blog-info">
                <div className="admin-blog-meta">
                  <span className={`admin-blog-status ${b.published ? 'published' : 'draft'}`}>{b.published ? 'Published' : 'Draft'}</span>
                  <span className="admin-blog-date">{new Date(b.created_at || b.createdAt).toLocaleDateString()}</span>
                </div>
                <h5>{b.title}</h5>
                <p>{b.excerpt}</p>
                {(b.tags || []).length > 0 && (
                  <div className="admin-blog-tags">
                    {(b.tags || []).map((t, i) => <span key={i} className="admin-blog-tag">{t}</span>)}
                  </div>
                )}
              </div>
              <div className="admin-blog-actions">
                <button className="admin-icon-btn edit" onClick={() => openEdit(b)} title="Edit"><i className="fa-solid fa-pen"></i></button>
                <button className="admin-icon-btn danger" onClick={() => setConfirm(b.id)} title="Delete"><i className="fa-solid fa-trash"></i></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <AdminModal open={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Post' : 'New Post'} wide>
        <div className="admin-modal-form">
          <div className="admin-form-grid">
            <Field label="Title"><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
            <Field label="Slug"><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated if empty" /></Field>
          </div>
          <Field label="Excerpt"><textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} /></Field>
          <Field label="Content (Markdown)"><textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} /></Field>
          <div className="admin-form-grid">
            <Field label="Image URL"><input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></Field>
            <Field label="Author"><input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></Field>
          </div>
          <Field label="Tags (comma-separated)"><input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="e.g. React, JavaScript, Web" /></Field>
          <label className="admin-checkbox">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Published
          </label>
          <div className="admin-modal-form-actions">
            <button className="admin-btn-secondary" onClick={() => setModal(false)}>Cancel</button>
            <button className="admin-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? <><span className="admin-spinner"></span> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> {editItem ? 'Update' : 'Publish'}</>}
            </button>
          </div>
        </div>
      </AdminModal>
      <ConfirmDialog open={confirm} title="Delete Post" text="This will permanently delete this blog post." onConfirm={async () => { await onDelete('blogs', confirm); setConfirm(null) }} onCancel={() => setConfirm(null)} />
    </div>
  )
}

/* ===== AI Settings ===== */
function AISection({ toast }) {
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [seeding, setSeeding] = useState(false)

  async function handleSeed() {
    if (!isSupabaseReady) { toast('Supabase not configured', 'error'); return }
    setSeeding(true)
    try {
      const steps = await seedDatabase()
      toast(`Database seeded: ${steps.join(', ')}`)
    } catch (err) {
      toast('Seed failed: ' + err.message, 'error')
    }
    setSeeding(false)
  }

  async function handlePasswordChange() {
    if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) {
      toast('Please fill all password fields', 'error'); return
    }
    const stored = localStorage.getItem('admin_password') || 'admin123'
    if (pwForm.current !== stored) {
      toast('Current password is incorrect', 'error'); return
    }
    if (pwForm.newPw.length < 4) {
      toast('New password must be at least 4 characters', 'error'); return
    }
    if (pwForm.newPw !== pwForm.confirm) {
      toast('New passwords do not match', 'error'); return
    }
    setPwSaving(true)
    localStorage.setItem('admin_password', pwForm.newPw)
    setPwForm({ current: '', newPw: '', confirm: '' })
    setPwSaving(false)
    toast('Password changed successfully')
  }

  return (
    <div className="admin-ai-section">
      <div className="admin-form-card">
        <h4><i className="fa-solid fa-lock"></i> Admin Password</h4>
        <div className="admin-pw-grid">
          <input value={pwForm.current} onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })} placeholder="Current password" type="password" />
          <input value={pwForm.newPw} onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })} placeholder="New password" type="password" />
          <input value={pwForm.confirm} onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })} placeholder="Confirm new password" type="password" />
          <button className="admin-btn-primary" onClick={handlePasswordChange} disabled={pwSaving}>
            {pwSaving ? <span className="admin-spinner"></span> : <i className="fa-solid fa-floppy-disk"></i>} Change Password
          </button>
        </div>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-flask"></i> Test Connection</h4>
        <button className="admin-btn-secondary" onClick={handleTest} disabled={testing || !status}>
          {testing ? <><span className="admin-spinner"></span> Testing...</> : <><i className="fa-solid fa-play"></i> Send Test Message</>}
        </button>
        {testResult && (
          <div className="admin-ai-test-result">
            <strong>Response:</strong>
            <p>{testResult.text || testResult.error}</p>
          </div>
        )}
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-database"></i> Database Tools</h4>
        <div className="admin-inline-form">
          <button className="admin-btn-primary" onClick={handleSeed} disabled={seeding}>
            {seeding ? <span className="admin-spinner"></span> : <i className="fa-solid fa-seedling"></i>} Seed Database
          </button>
          <span style={{ color: '#c9d9e8', fontSize: '0.82rem' }}>Populate all tables with the default portfolio data</span>
        </div>
      </div>

      <div className="admin-form-card">
        <h4><i className="fa-solid fa-shield-halved"></i> Assistant Behavior</h4>
        <p style={{ color: '#c9d9e8', fontSize: '0.9rem', lineHeight: 1.6 }}>
          Nzabana Assistant is configured to <strong>only answer questions related to NM Costa's portfolio</strong>.
          Any off-topic questions will be politely declined. The system prompt enforces this restriction.
        </p>
      </div>
    </div>
  )
}
