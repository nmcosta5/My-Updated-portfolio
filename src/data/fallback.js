const fallback = {
  profile: {
    name: 'Merci',
    fullName: 'Nzabana Merci (NM Costa)',
    title: 'Full Stack Software Developer',
    hello: "Hello, I'm ",
    subtitle: "And I'm a ",
    typingTexts: ['Full Stack Developer', 'Software Engineer', 'UI/UX Enthusiast'],
    shortDescription:
      'A results-driven Full Stack Software Developer specializing in building scalable, high-performance digital solutions.',
    description: `A results-driven Full Stack Software Developer with a strong foundation in modern web technologies and a clear focus on building scalable, high-performance digital solutions. I specialize in designing and developing end-to-end applications that combine robust backend systems with intuitive, user-centric interfaces.

With hands-on experience across multiple real-world projects, I bring a structured, solution-oriented mindset to software development—transforming complex business requirements into efficient, maintainable, and visually compelling applications. My work reflects a commitment to clean architecture, performance optimization, and seamless user experience.`,
    email: 'nmcost5@gmail.com',
    phone: '+250 794 041 759',
    location: 'Rwanda',
    github: 'nmcosta5',
    image: 'https://i.ibb.co/DgKdp0rR/Gemini-Generated-Image-rtj9cirtj9cirtj9-2.png',
    resumeUrl: '#',
  },

  stats: [
    { id: 1, value: '2+', label: 'Years of', sublabel: 'experience' },
    { id: 2, value: '5+', label: 'Projects', sublabel: 'completed' },
    { id: 3, value: '7+', label: 'Technologies', sublabel: 'mastered' },
    { id: 4, value: '10+', label: 'Statisfied', sublabel: 'clients' },
  ],

  competencies: [
    'Full Stack Web Development (Frontend + Backend Integration)',
    'RESTful API Design & System Architecture',
    'Database Design & Management (Relational Systems)',
    'Authentication & Role-Based Access Control',
    'Scalable Application Development',
    'UI/UX Implementation with Modern Design Standards',
    'Debugging, Testing & Performance Optimization',
  ],

  skillCategories: [
    {
      id: 1,
      category: 'Frontend Development',
      skills: ['React.js', 'HTML5, CSS3, Bootstrap', 'JavaScript (ES6+)'],
    },
    {
      id: 2,
      category: 'Backend Development',
      skills: ['Node.js', 'PHP'],
    },
    {
      id: 3,
      category: 'Database Technologies',
      skills: ['MySQL'],
    },
    {
      id: 4,
      category: 'Programming & Tools',
      skills: ['TypeScript', 'Git & GitHub', 'XAMPP / Local Development Environments'],
    },
  ],

  services: [
    {
      id: 1,
      title: 'Web Development',
      description:
        'I offer high-quality web development services, creating responsive and interactive websites tailored to clients\' needs.',
      icon: 'bi bi-code-slash',
    },
    {
      id: 2,
      title: 'System Architecture',
      description:
        'I design scalable system architectures and RESTful APIs that transform complex business requirements into efficient, maintainable solutions.',
      icon: 'bi bi-diagram-3-fill',
    },
    {
      id: 3,
      title: 'Database Design',
      description:
        'I build robust relational database systems with optimized schemas, secure data handling, and seamless backend integration.',
      icon: 'bi bi-database-fill-gear',
    },
  ],

  projects: [
    {
      id: 1,
      title: 'XM Bakery Management System',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800',
      description:
        'A full-stack enterprise-style web application designed to streamline bakery operations.',
      contributions: [
        'Built a complete system using Node.js, React.js, and MySQL',
        'Implemented role-based dashboards (Admin, Staff, Customer)',
        'Designed inventory tracking, order management, and sales reporting modules',
        'Integrated authentication, session management, and secure data handling',
        'Delivered a modern UI inspired by social media platforms for improved usability',
      ],
      tech: ['Node.js', 'React.js', 'MySQL'],
    },
    {
      id: 2,
      title: 'TWIGIRE MUHINZI Cooperative Management System',
      image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800',
      description:
        'A comprehensive digital solution for cooperative management.',
      contributions: [
        'Developed a PHP & MySQL-based system with full CRUD operations',
        'Managed members, products, clients, and sales workflows',
        'Designed reporting features for business insights',
        'Implemented session-based authentication and role management',
        'Ensured consistent UI/UX across all modules',
      ],
      tech: ['PHP', 'MySQL'],
    },
    {
      id: 3,
      title: 'StockHub Inventory System',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800',
      description:
        'A digital inventory and warehouse tracking platform.',
      contributions: [
        'Replaced manual stock management with an automated system',
        'Structured product and warehouse data management workflows',
        'Improved operational efficiency through real-time tracking capabilities',
      ],
      tech: ['PHP', 'MySQL'],
    },
    {
      id: 4,
      title: 'E-Duka Digital Marketplace',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      description:
        'A scalable marketplace platform connecting suppliers and shopkeepers.',
      contributions: [
        'Designed system architecture and feature ecosystem',
        'Defined roles and capabilities for admins, suppliers, and shopkeepers',
        'Planned end-to-end business workflows and platform scalability',
      ],
      tech: ['System Architecture'],
    },
  ],

  philosophy: {
    heading: 'Development Philosophy',
    text: 'I approach software development with a balance of technical precision and business awareness. My focus is not just on writing code, but on delivering solutions that:',
    points: [
      'Solve real-world problems',
      'Scale with business growth',
      'Provide seamless user experiences',
      'Maintain long-term sustainability',
    ],
  },

  objective: {
    heading: 'Career Objective',
    text: 'To continuously evolve as a software engineer by contributing to innovative projects, leveraging modern technologies, and building systems that create measurable impact. I aim to collaborate in environments that value creativity, efficiency, and forward-thinking development practices.',
  },

  highlights: [
    'Strong interest in AI-powered systems and intelligent applications',
    'Passionate about building interactive and high-performance user interfaces',
    'Actively exploring advanced frameworks and emerging technologies',
    'Background in software development education with continuous self-learning',
  ],

  socialLinks: [
    { id: 1, url: 'https://github.com/nmcosta5', icon: 'fa-brands fa-github' },
    { id: 2, url: 'https://linkedin.com/in/nmcosta5', icon: 'fa-brands fa-linkedin' },
    { id: 3, url: 'https://twitter.com/nmcosta5', icon: 'fa-brands fa-square-twitter' },
    { id: 4, url: 'mailto:nmcost5@gmail.com', icon: 'fa-solid fa-envelope' },
  ],

  blogs: [
    {
      id: 1,
      title: 'Building Scalable Web Apps with Modern Architecture',
      slug: 'building-scalable-web-apps',
      excerpt: 'Learn how to design web applications that scale effortlessly as your user base grows.',
      content: `Building a scalable web application requires careful planning from day one. In this post, I break down the architectural patterns and design decisions that have served me well across multiple projects.

## Start with the Right Foundation

The most critical decision you'll make is choosing your tech stack. I recommend a modular approach where each component can be scaled independently. For example, separating your frontend from your backend allows you to scale them separately based on demand.

## Database Design Matters

A well-designed database schema can make or break your application's performance. Normalize your data structure, use proper indexing, and consider read replicas for high-traffic scenarios.

## API-First Development

Designing your API before building the frontend forces you to think about the data flow and ensures consistency across your application.

## Conclusion

Scalability isn't something you add later — it's built into the foundation of your application. Invest time in architecture early, and your future self will thank you.`,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      author: 'NM Costa',
      tags: ['Architecture', 'Web Development', 'Best Practices'],
      published: true,
      createdAt: '2025-12-15',
    },
    {
      id: 2,
      title: 'The Developer\'s Guide to Clean Code',
      slug: 'developers-guide-clean-code',
      excerpt: 'Practical tips for writing readable, maintainable code that your future self will thank you for.',
      content: `Clean code is not just about making your code work — it's about making it understandable for humans. Here are the principles I follow.

## Meaningful Names

Your variable and function names should reveal intent. A name like \`fetchUserData()\` is infinitely more valuable than \`getData()\`.

## Keep Functions Small

Each function should do one thing and do it well. If you find yourself writing a function that spans more than 20 lines, it's probably time to break it up.

## Comments as a Last Resort

Your code should be self-documenting. Use comments only to explain the "why" behind a decision, not the "what".

## Consistency is Key

Pick a style and stick with it. Whether it's naming conventions, file structure, or formatting — consistency reduces cognitive load for everyone reading your code.`,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      author: 'NM Costa',
      tags: ['Clean Code', 'Best Practices', 'Productivity'],
      published: true,
      createdAt: '2025-11-28',
    },
    {
      id: 3,
      title: 'Why Full-Stack Development Matters in 2026',
      slug: 'why-fullstack-matters-2026',
      excerpt: 'The lines between frontend and backend continue to blur. Here\'s why full-stack skills are more valuable than ever.',
      content: `The tech landscape in 2026 demands developers who can navigate the entire stack. Here's my take on why full-stack development is the future.

## The Age of the Generalist-Specialist

While "T-shaped" skills (deep expertise in one area with broad knowledge across others) have been the gold standard, I believe "comb-shaped" skills are becoming more valuable — deep knowledge across multiple areas of the stack.

## End-to-End Ownership

Companies increasingly value developers who can own a feature from database schema to UI pixels. This reduces handoff friction and leads to better-designed systems.

## Framework Convergence

With frameworks like Next.js, Remix, and SvelteKit blurring the line between client and server, understanding both sides of the wire is no longer optional.

## The Bottom Line

Full-stack developers bring a unique perspective that specialist roles often miss — the ability to see the system as a whole.`,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      author: 'NM Costa',
      tags: ['Full Stack', 'Career', 'Web Development'],
      published: true,
      createdAt: '2025-10-10',
    },
  ],
}

export default fallback
