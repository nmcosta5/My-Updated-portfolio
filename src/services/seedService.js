import { supabase, isSupabaseReady } from '../lib/supabase'
import fallback from '../data/fallback'

export async function seedDatabase() {
  if (!isSupabaseReady) throw new Error('Supabase not configured')

  const steps = []

  // 1. Profile
  const { error: profileErr } = await supabase.from('profile').upsert({
    name: fallback.profile.name,
    full_name: fallback.profile.fullName,
    title: fallback.profile.title,
    hello: fallback.profile.hello,
    subtitle: fallback.profile.subtitle,
    typing_texts: fallback.profile.typingTexts,
    short_description: fallback.profile.shortDescription,
    description: fallback.profile.description,
    email: fallback.profile.email,
    phone: fallback.profile.phone,
    location: fallback.profile.location,
    github: fallback.profile.github,
    image: fallback.profile.image,
    resume_url: fallback.profile.resumeUrl,
  }, { onConflict: 'id' })
  if (profileErr) throw new Error('Profile: ' + profileErr.message)
  steps.push('Profile')

  // 2. Stats
  const { error: statsDelErr } = await supabase.from('stats').delete().neq('id', 0)
  if (statsDelErr) throw new Error('Stats delete: ' + statsDelErr.message)
  const { error: statsErr } = await supabase.from('stats').insert(
    fallback.stats.map(s => ({ value: s.value, label: s.label, sublabel: s.sublabel }))
  )
  if (statsErr) throw new Error('Stats: ' + statsErr.message)
  steps.push('Stats')

  // 3. Competencies
  const { error: compDelErr } = await supabase.from('competencies').delete().neq('id', 0)
  if (compDelErr) throw new Error('Competencies delete: ' + compDelErr.message)
  const { error: compErr } = await supabase.from('competencies').insert(
    fallback.competencies.map(c => ({ name: c }))
  )
  if (compErr) throw new Error('Competencies: ' + compErr.message)
  steps.push('Competencies')

  // 4. Skill categories + skills
  const { error: catDelErr } = await supabase.from('skill_categories').delete().neq('id', 0)
  if (catDelErr) throw new Error('Categories delete: ' + catDelErr.message)
  for (const cat of fallback.skillCategories) {
    const { data: newCat, error: catErr } = await supabase.from('skill_categories').insert({ name: cat.category }).select()
    if (catErr) throw new Error('Category: ' + catErr.message)
    if (newCat?.[0] && cat.skills.length) {
      const { error: skillErr } = await supabase.from('skills').insert(
        cat.skills.map(s => ({ category_id: newCat[0].id, name: s }))
      )
      if (skillErr) throw new Error('Skills: ' + skillErr.message)
    }
  }
  steps.push('Skill Categories & Skills')

  // 5. Services
  const { error: svcDelErr } = await supabase.from('services').delete().neq('id', 0)
  if (svcDelErr) throw new Error('Services delete: ' + svcDelErr.message)
  const { error: svcErr } = await supabase.from('services').insert(
    fallback.services.map(s => ({ title: s.title, description: s.description, icon: s.icon }))
  )
  if (svcErr) throw new Error('Services: ' + svcErr.message)
  steps.push('Services')

  // 6. Projects
  const { error: projDelErr } = await supabase.from('projects').delete().neq('id', 0)
  if (projDelErr) throw new Error('Projects delete: ' + projDelErr.message)
  for (const proj of fallback.projects) {
    const { data: newProj, error: projErr } = await supabase.from('projects').insert({
      title: proj.title, image: proj.image, description: proj.description
    }).select()
    if (projErr) throw new Error('Project: ' + projErr.message)
    if (newProj?.[0]) {
      if (proj.contributions.length) {
        const { error: contribErr } = await supabase.from('project_contributions').insert(
          proj.contributions.map(c => ({ project_id: newProj[0].id, text: c }))
        )
        if (contribErr) throw new Error('Contributions: ' + contribErr.message)
      }
      if (proj.tech.length) {
        const { error: techErr } = await supabase.from('project_techs').insert(
          proj.tech.map(t => ({ project_id: newProj[0].id, name: t }))
        )
        if (techErr) throw new Error('Techs: ' + techErr.message)
      }
    }
  }
  steps.push('Projects')

  // 7. Philosophy
  const { error: philDelErr } = await supabase.from('philosophy').delete().neq('id', 0)
  if (philDelErr) throw new Error('Philosophy delete: ' + philDelErr.message)
  const { data: newPhil, error: philErr } = await supabase.from('philosophy').insert({
    heading: fallback.philosophy.heading, text: fallback.philosophy.text
  }).select()
  if (philErr) throw new Error('Philosophy: ' + philErr.message)
  if (newPhil?.[0]) {
    const { error: ptErr } = await supabase.from('philosophy_points').insert(
      fallback.philosophy.points.map(p => ({ philosophy_id: newPhil[0].id, text: p }))
    )
    if (ptErr) throw new Error('Philosophy points: ' + ptErr.message)
  }
  steps.push('Philosophy')

  // 8. Objective
  const { error: objDelErr } = await supabase.from('objective').delete().neq('id', 0)
  if (objDelErr) throw new Error('Objective delete: ' + objDelErr.message)
  const { error: objErr } = await supabase.from('objective').insert({
    heading: fallback.objective.heading, text: fallback.objective.text
  })
  if (objErr) throw new Error('Objective: ' + objErr.message)
  steps.push('Objective')

  // 9. Highlights
  const { error: hlDelErr } = await supabase.from('highlights').delete().neq('id', 0)
  if (hlDelErr) throw new Error('Highlights delete: ' + hlDelErr.message)
  const { error: hlErr } = await supabase.from('highlights').insert(
    fallback.highlights.map(h => ({ text: h }))
  )
  if (hlErr) throw new Error('Highlights: ' + hlErr.message)
  steps.push('Highlights')

  // 10. Blogs
  const { error: blogDelErr } = await supabase.from('blogs').delete().neq('id', 0)
  if (blogDelErr) throw new Error('Blogs delete: ' + blogDelErr.message)
  const { error: blogErr } = await supabase.from('blogs').insert(
    fallback.blogs.map(b => ({
      title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content,
      image: b.image, author: b.author, tags: b.tags, published: b.published,
    }))
  )
  if (blogErr) throw new Error('Blogs: ' + blogErr.message)
  steps.push('Blogs')

  // 11. Social links
  const { error: socDelErr } = await supabase.from('social_links').delete().neq('id', 0)
  if (socDelErr) throw new Error('Social delete: ' + socDelErr.message)
  const { error: socErr } = await supabase.from('social_links').insert(
    fallback.socialLinks.map(l => ({ url: l.url, icon: l.icon }))
  )
  if (socErr) throw new Error('Social: ' + socErr.message)
  steps.push('Social Links')

  return steps
}
