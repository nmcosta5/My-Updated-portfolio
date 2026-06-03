import { supabase, isSupabaseReady } from '../lib/supabase'
import fallback from '../data/fallback'

export async function getProfile() {
  if (!isSupabaseReady) return fallback.profile

  const { data, error } = await supabase.from('profile').select('*').maybeSingle()
  if (error || !data) return fallback.profile

  return {
    ...fallback.profile,
    ...(data.name && { name: data.name }),
    ...(data.full_name && { fullName: data.full_name }),
    ...(data.title && { title: data.title }),
    ...(data.hello && { hello: data.hello }),
    ...(data.subtitle && { subtitle: data.subtitle }),
    ...(data.typing_texts && { typingTexts: data.typing_texts }),
    ...(data.short_description && { shortDescription: data.short_description }),
    ...(data.description && { description: data.description }),
    ...(data.email && { email: data.email }),
    ...(data.phone && { phone: data.phone }),
    ...(data.location && { location: data.location }),
    ...(data.github && { github: data.github }),
    ...(data.image && { image: data.image }),
    ...(data.resume_url && { resumeUrl: data.resume_url }),
    ...(data.about_title && { aboutTitle: data.about_title }),
    ...(data.about_subtitle && { aboutSubtitle: data.about_subtitle }),
    ...(data.about_description && { aboutDescription: data.about_description }),
  }
}

export async function getStats() {
  if (!isSupabaseReady) return fallback.stats

  const { data, error } = await supabase.from('stats').select('*').order('id')
  if (error || !data || data.length === 0) return fallback.stats

  return data.map((s) => ({
    id: s.id,
    value: s.value,
    label: s.label,
    sublabel: s.sublabel,
  }))
}

export async function getCompetencies() {
  if (!isSupabaseReady) return fallback.competencies

  const { data, error } = await supabase.from('competencies').select('*').order('id')
  if (error || !data || data.length === 0) return fallback.competencies

  return data.map((c) => c.name)
}

export async function getSkillCategories() {
  if (!isSupabaseReady) return fallback.skillCategories

  const { data: cats, error: catErr } = await supabase.from('skill_categories').select('*').order('id')
  if (catErr || !cats || cats.length === 0) return fallback.skillCategories

  const result = []
  for (const cat of cats) {
    const { data: skills } = await supabase
      .from('skills')
      .select('name')
      .eq('category_id', cat.id)
      .order('id')
    result.push({
      id: cat.id,
      category: cat.name,
      skills: skills ? skills.map((s) => s.name) : [],
    })
  }
  return result
}

export async function getServices() {
  if (!isSupabaseReady) return fallback.services

  const { data, error } = await supabase.from('services').select('*').order('id')
  if (error || !data || data.length === 0) return fallback.services

  return data.map((s) => ({
    id: s.id,
    title: s.title,
    description: s.description,
    icon: s.icon,
  }))
}

function correctProjectImage(title, image) {
  if (!image) return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  if (image.includes('imimg.com') || image.includes('gstatic.com')) {
    const t = (title || '').toLowerCase()
    if (t.includes('bakery')) {
      return 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800'
    }
    if (t.includes('cooperative') || t.includes('twigire')) {
      return 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800'
    }
    if (t.includes('inventory') || t.includes('stockhub')) {
      return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800'
    }
    if (t.includes('marketplace') || t.includes('duka')) {
      return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800'
    }
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800'
  }
  return image
}

export async function getProjects() {
  if (!isSupabaseReady) {
    return fallback.projects.map(p => ({
      ...p,
      image: correctProjectImage(p.title, p.image)
    }))
  }

  const { data, error } = await supabase.from('projects').select('*').order('id')
  if (error || !data || data.length === 0) {
    return fallback.projects.map(p => ({
      ...p,
      image: correctProjectImage(p.title, p.image)
    }))
  }

  const result = []
  for (const proj of data) {
    const { data: contributions } = await supabase
      .from('project_contributions')
      .select('text')
      .eq('project_id', proj.id)
      .order('id')

    const { data: techs } = await supabase
      .from('project_techs')
      .select('name')
      .eq('project_id', proj.id)
      .order('id')

    result.push({
      id: proj.id,
      title: proj.title,
      image: correctProjectImage(proj.title, proj.image),
      description: proj.description,
      contributions: contributions ? contributions.map((c) => c.text) : [],
      tech: techs ? techs.map((t) => t.name) : [],
    })
  }
  return result
}

export async function getPhilosophy() {
  if (!isSupabaseReady) return fallback.philosophy

  const { data, error } = await supabase.from('philosophy').select('*').maybeSingle()
  if (error || !data) return fallback.philosophy

  const { data: points } = await supabase
    .from('philosophy_points')
    .select('text')
    .order('id')

  return {
    heading: data.heading || fallback.philosophy.heading,
    text: data.text || fallback.philosophy.text,
    points: points ? points.map((p) => p.text) : fallback.philosophy.points,
  }
}

export async function getObjective() {
  if (!isSupabaseReady) return fallback.objective

  const { data, error } = await supabase.from('objective').select('*').maybeSingle()
  if (error || !data) return fallback.objective

  return {
    heading: data.heading || fallback.objective.heading,
    text: data.text || fallback.objective.text,
  }
}

export async function getHighlights() {
  if (!isSupabaseReady) return fallback.highlights

  const { data, error } = await supabase.from('highlights').select('text').order('id')
  if (error || !data || data.length === 0) return fallback.highlights

  return data.map((h) => h.text)
}

export async function getSocialLinks() {
  if (!isSupabaseReady) return fallback.socialLinks

  const { data, error } = await supabase.from('social_links').select('*').order('id')
  if (error || !data || data.length === 0) return fallback.socialLinks

  return data.map((l) => ({
    id: l.id,
    url: l.url,
    icon: l.icon,
  }))
}

export async function getBlogs() {
  if (!isSupabaseReady) return fallback.blogs

  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (error || !data || data.length === 0) return fallback.blogs

  return data.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    content: b.content,
    image: b.image,
    author: b.author,
    tags: b.tags || [],
    published: b.published,
    createdAt: b.created_at,
  }))
}

export async function submitContact(formData) {
  if (!isSupabaseReady) {
    console.log('Supabase not configured — contact saved locally:', formData)
    return { success: true, message: 'Demo mode: message received (not sent to server).' }
  }

  const { error } = await supabase.from('contacts').insert([
    {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    },
  ])

  if (error) {
    console.error('Supabase insert error:', error)
    return { success: false, message: 'Failed to send message. Please try again.' }
  }

  return { success: true, message: 'Message sent successfully!' }
}
