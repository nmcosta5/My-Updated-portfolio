-- ============================================================
-- Portfolio Database Schema — run this in Supabase SQL Editor
-- ============================================================

-- Disable RLS on all tables (portfolio is public data)
ALTER TABLE IF EXISTS profile DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS stats DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS competencies DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS skill_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS skills DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS services DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project_contributions DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS project_techs DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS philosophy DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS philosophy_points DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS objective DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS highlights DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS social_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS blogs DISABLE ROW LEVEL SECURITY;

-- 1. PROFILE
CREATE TABLE profile (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text,
  full_name text,
  title text,
  hello text,
  subtitle text,
  typing_texts text[],
  short_description text,
  description text,
  email text,
  phone text,
  location text,
  github text,
  image text,
  resume_url text,
  about_title text,
  about_subtitle text,
  about_description text,
  created_at timestamptz DEFAULT now()
);

-- 2. STATS
CREATE TABLE stats (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  value text,
  label text,
  sublabel text
);

-- 3. COMPETENCIES
CREATE TABLE competencies (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

-- 4. SKILL CATEGORIES
CREATE TABLE skill_categories (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text
);

-- 5. SKILLS
CREATE TABLE skills (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_id bigint REFERENCES skill_categories(id) ON DELETE CASCADE,
  name text
);

-- 6. SERVICES
CREATE TABLE services (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text,
  description text,
  icon text
);

-- 7. PROJECTS
CREATE TABLE projects (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text,
  image text,
  description text
);

-- 8. PROJECT CONTRIBUTIONS
CREATE TABLE project_contributions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id bigint REFERENCES projects(id) ON DELETE CASCADE,
  text text
);

-- 9. PROJECT TECHS
CREATE TABLE project_techs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id bigint REFERENCES projects(id) ON DELETE CASCADE,
  name text
);

-- 10. PHILOSOPHY
CREATE TABLE philosophy (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  heading text,
  text text
);

-- 11. PHILOSOPHY POINTS
CREATE TABLE philosophy_points (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  philosophy_id bigint REFERENCES philosophy(id) ON DELETE CASCADE,
  text text
);

-- 12. OBJECTIVE
CREATE TABLE objective (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  heading text,
  text text
);

-- 13. HIGHLIGHTS
CREATE TABLE highlights (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text text
);

-- 14. SOCIAL LINKS
CREATE TABLE social_links (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url text,
  icon text
);

-- 15. CONTACTS
CREATE TABLE contacts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name text,
  email text,
  phone text,
  subject text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- 16. BLOGS
CREATE TABLE blogs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title text,
  slug text,
  excerpt text,
  content text,
  image text,
  author text,
  tags text[],
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ============================================================
-- SEED DATA — NM Costa Portfolio
-- ============================================================

-- PROFILE
INSERT INTO profile (name, full_name, title, hello, subtitle, typing_texts, short_description, description, email, phone, location, github, image, resume_url, about_title, about_subtitle, about_description)
VALUES (
  'Merci',
  'Nzabana Merci (NM Costa)',
  'Full Stack Software Developer',
  'Hello, I''m ',
  'And I''m a ',
  ARRAY['Full Stack Developer', 'Software Engineer', 'UI/UX Enthusiast'],
  'A results-driven Full Stack Software Developer specializing in building scalable, high-performance digital solutions.',
  E'A results-driven Full Stack Software Developer with a strong foundation in modern web technologies and a clear focus on building scalable, high-performance digital solutions. I specialize in designing and developing end-to-end applications that combine robust backend systems with intuitive, user-centric interfaces.\n\nWith hands-on experience across multiple real-world projects, I bring a structured, solution-oriented mindset to software development—transforming complex business requirements into efficient, maintainable, and visually compelling applications. My work reflects a commitment to clean architecture, performance optimization, and seamless user experience.',
  'nmcost5@gmail.com',
  '+250 794 041 759',
  'Rwanda',
  'nmcosta5',
  'https://i.ibb.co/DgKdp0rR/Gemini-Generated-Image-rtj9cirtj9cirtj9-2.png',
  '#',
  'About Me',
  'Full Stack Software Developer',
  'I specialize in designing and developing end-to-end applications that combine robust backend systems with intuitive, user-centric interfaces.'
);

-- STATS
INSERT INTO stats (value, label, sublabel) VALUES
  ('2+', 'Years of', 'experience'),
  ('5+', 'Projects', 'completed'),
  ('7+', 'Technologies', 'mastered'),
  ('10+', 'Statisfied', 'clients');

-- COMPETENCIES
INSERT INTO competencies (name) VALUES
  ('Full Stack Web Development (Frontend + Backend Integration)'),
  ('RESTful API Design & System Architecture'),
  ('Database Design & Management (Relational Systems)'),
  ('Authentication & Role-Based Access Control'),
  ('Scalable Application Development'),
  ('UI/UX Implementation with Modern Design Standards'),
  ('Debugging, Testing & Performance Optimization');

-- SKILL CATEGORIES
INSERT INTO skill_categories (name) VALUES
  ('Frontend Development'),
  ('Backend Development'),
  ('Database Technologies'),
  ('Programming & Tools');

-- SKILLS
INSERT INTO skills (category_id, name) VALUES
  (1, 'React.js'),
  (1, 'HTML5, CSS3, Bootstrap'),
  (1, 'JavaScript (ES6+)'),
  (2, 'Node.js'),
  (2, 'PHP'),
  (3, 'MySQL'),
  (4, 'TypeScript'),
  (4, 'Git & GitHub'),
  (4, 'XAMPP / Local Development Environments');

-- SERVICES
INSERT INTO services (title, description, icon) VALUES
  ('Web Development', 'I offer high-quality web development services, creating responsive and interactive websites tailored to clients'' needs.', 'bi bi-code-slash'),
  ('System Architecture', 'I design scalable system architectures and RESTful APIs that transform complex business requirements into efficient, maintainable solutions.', 'bi bi-diagram-3-fill'),
  ('Database Design', 'I build robust relational database systems with optimized schemas, secure data handling, and seamless backend integration.', 'bi bi-database-fill-gear');

-- PROJECTS
INSERT INTO projects (title, image, description) VALUES
  ('XM Bakery Management System', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800', 'A full-stack enterprise-style web application designed to streamline bakery operations.'),
  ('TWIGIRE MUHINZI Cooperative Management System', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800', 'A comprehensive digital solution for cooperative management.'),
  ('StockHub Inventory System', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800', 'A digital inventory and warehouse tracking platform.'),
  ('E-Duka Digital Marketplace', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800', 'A scalable marketplace platform connecting suppliers and shopkeepers.');

-- PROJECT CONTRIBUTIONS
INSERT INTO project_contributions (project_id, text) VALUES
  (1, 'Built a complete system using Node.js, React.js, and MySQL'),
  (1, 'Implemented role-based dashboards (Admin, Staff, Customer)'),
  (1, 'Designed inventory tracking, order management, and sales reporting modules'),
  (1, 'Integrated authentication, session management, and secure data handling'),
  (1, 'Delivered a modern UI inspired by social media platforms for improved usability'),
  (2, 'Developed a PHP & MySQL-based system with full CRUD operations'),
  (2, 'Managed members, products, clients, and sales workflows'),
  (2, 'Designed reporting features for business insights'),
  (2, 'Implemented session-based authentication and role management'),
  (2, 'Ensured consistent UI/UX across all modules'),
  (3, 'Replaced manual stock management with an automated system'),
  (3, 'Structured product and warehouse data management workflows'),
  (3, 'Improved operational efficiency through real-time tracking capabilities'),
  (4, 'Designed system architecture and feature ecosystem'),
  (4, 'Defined roles and capabilities for admins, suppliers, and shopkeepers'),
  (4, 'Planned end-to-end business workflows and platform scalability');

-- PROJECT TECHS
INSERT INTO project_techs (project_id, name) VALUES
  (1, 'Node.js'),
  (1, 'React.js'),
  (1, 'MySQL'),
  (2, 'PHP'),
  (2, 'MySQL'),
  (3, 'PHP'),
  (3, 'MySQL'),
  (4, 'System Architecture');

-- PHILOSOPHY
INSERT INTO philosophy (heading, text) VALUES
  ('Development Philosophy', 'I approach software development with a balance of technical precision and business awareness. My focus is not just on writing code, but on delivering solutions that:');

INSERT INTO philosophy_points (philosophy_id, text) VALUES
  (1, 'Solve real-world problems'),
  (1, 'Scale with business growth'),
  (1, 'Provide seamless user experiences'),
  (1, 'Maintain long-term sustainability');

-- OBJECTIVE
INSERT INTO objective (heading, text) VALUES
  ('Career Objective', 'To continuously evolve as a software engineer by contributing to innovative projects, leveraging modern technologies, and building systems that create measurable impact. I aim to collaborate in environments that value creativity, efficiency, and forward-thinking development practices.');

-- HIGHLIGHTS
INSERT INTO highlights (text) VALUES
  ('Strong interest in AI-powered systems and intelligent applications'),
  ('Passionate about building interactive and high-performance user interfaces'),
  ('Actively exploring advanced frameworks and emerging technologies'),
  ('Background in software development education with continuous self-learning');

-- SOCIAL LINKS
INSERT INTO social_links (url, icon) VALUES
  ('https://github.com/nmcosta5', 'fa-brands fa-github'),
  ('https://linkedin.com/in/nmcosta5', 'fa-brands fa-linkedin'),
  ('https://twitter.com/nmcosta5', 'fa-brands fa-square-twitter'),
  ('mailto:nmcost5@gmail.com', 'fa-solid fa-envelope');

-- BLOGS
INSERT INTO blogs (title, slug, excerpt, content, image, author, tags, published) VALUES
  ('Building Scalable Web Apps with Modern Architecture', 'building-scalable-web-apps', 'Learn how to design web applications that scale effortlessly as your user base grows.', E'Building a scalable web application requires careful planning from day one. In this post, I break down the architectural patterns and design decisions that have served me well across multiple projects.\n\n## Start with the Right Foundation\n\nThe most critical decision you''ll make is choosing your tech stack. I recommend a modular approach where each component can be scaled independently. For example, separating your frontend from your backend allows you to scale them separately based on demand.\n\n## Database Design Matters\n\nA well-designed database schema can make or break your application''s performance. Normalize your data structure, use proper indexing, and consider read replicas for high-traffic scenarios.\n\n## API-First Development\n\nDesigning your API before building the frontend forces you to think about the data flow and ensures consistency across your application.\n\n## Conclusion\n\nScalability isn''t something you add later — it''s built into the foundation of your application. Invest time in architecture early, and your future self will thank you.', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 'NM Costa', ARRAY['Architecture', 'Web Development', 'Best Practices'], true),
  ('The Developer''s Guide to Clean Code', 'developers-guide-clean-code', 'Practical tips for writing readable, maintainable code that your future self will thank you for.', E'Clean code is not just about making your code work — it''s about making it understandable for humans. Here are the principles I follow.\n\n## Meaningful Names\n\nYour variable and function names should reveal intent. A name like `fetchUserData()` is infinitely more valuable than `getData()`.\n\n## Keep Functions Small\n\nEach function should do one thing and do it well. If you find yourself writing a function that spans more than 20 lines, it''s probably time to break it up.\n\n## Comments as a Last Resort\n\nYour code should be self-documenting. Use comments only to explain the "why" behind a decision, not the "what".\n\n## Consistency is Key\n\nPick a style and stick with it. Whether it''s naming conventions, file structure, or formatting — consistency reduces cognitive load for everyone reading your code.', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800', 'NM Costa', ARRAY['Clean Code', 'Best Practices', 'Productivity'], true),
  ('Why Full-Stack Development Matters in 2026', 'why-fullstack-matters-2026', 'The lines between frontend and backend continue to blur. Here''s why full-stack skills are more valuable than ever.', E'The tech landscape in 2026 demands developers who can navigate the entire stack. Here''s my take on why full-stack development is the future.\n\n## The Age of the Generalist-Specialist\n\nWhile "T-shaped" skills (deep expertise in one area with broad knowledge across others) have been the gold standard, I believe "comb-shaped" skills are becoming more valuable — deep knowledge across multiple areas of the stack.\n\n## End-to-End Ownership\n\nCompanies increasingly value developers who can own a feature from database schema to UI pixels. This reduces handoff friction and leads to better-designed systems.\n\n## Framework Convergence\n\nWith frameworks like Next.js, Remix, and SvelteKit blurring the line between client and server, understanding both sides of the wire is no longer optional.\n\n## The Bottom Line\n\nFull-stack developers bring a unique perspective that specialist roles often miss — the ability to see the system as a whole.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 'NM Costa', ARRAY['Full Stack', 'Career', 'Web Development'], true);
