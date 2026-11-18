/**
 * ┌─────────────────────────────────────────────────────────────┐
 * │  CENTRALIZED PORTFOLIO DATA                                │
 * │  Every piece of editable content lives in this file.       │
 * │  Replace placeholders with your real information.          │
 * └─────────────────────────────────────────────────────────────┘
 */

export const siteConfig = {
  name: 'Jay Ashok Rathod',
  firstName: 'Jay',
  logo: 'JAY',
  title: 'Software Engineer',
  email: 'jayr20297@gmail.com', // ⚠️ REPLACE with your real email
  resumeUrl: '/resume.pdf', // ⚠️ Place your resume at public/resume.pdf
  availability: {
    // Set to true only if you are actually available for work
    show: false,
    text: 'Open to opportunities',
  },
};

export const socialLinks = [
  {
    id: 'github',
    label: 'GitHub',
    url: 'https://github.com/jayy999412', // ⚠️ REPLACE
    icon: 'github',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jay-rathod-912009417/', // ⚠️ REPLACE
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'Email',
    url: 'mailto:jayr20297@gmail.com', // ⚠️ REPLACE
    icon: 'mail',
  },
];

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  greeting: "Hi, I'm",
  name: 'Jay Ashok Rathod.',
  role: 'Software Engineer',
  headline:
    'Building modern digital experiences through clean code, creative thinking and innovative technology.',
  description:
    "I'm a passionate Software Engineer focused on developing scalable, efficient and user-friendly applications. I enjoy solving complex problems, learning new technologies and transforming ideas into meaningful digital products.",
  ctaPrimary: { label: 'Explore My Work', href: '#projects' },
  ctaSecondary: { label: "Let's Connect", href: '#contact' },
  ctaTertiary: { label: 'Download Resume', href: siteConfig.resumeUrl },
  // Floating tech badges around the hero visual
  techStack: ['React', 'Node.js', 'Python', 'Java', 'Tailwind', 'Git'],
};

export const about = {
  heading: 'About Me',
  subtitle: 'A little more about my journey.',
  paragraphs: [
    "Hello! I'm Jay Ashok Rathod, a Software Engineer passionate about building reliable, scalable and meaningful software solutions.",
    'I enjoy working with modern technologies, exploring new development approaches and creating applications that solve real-world problems.',
    'My focus is on writing clean, maintainable code, continuously improving my technical skills and delivering excellent user experiences.',
  ],
  // Pillars shown next to the intro text
  pillars: [
    {
      title: 'Career Interests',
      description:
        'Full-stack development, building scalable web applications and exploring modern software architectures.',
    },
    {
      title: 'Problem-Solving Mindset',
      description:
        'Breaking complex challenges into small, practical and testable solutions.',
    },
    {
      title: 'Continuous Learning',
      description:
        'Staying curious about emerging tools, patterns and best practices in software engineering.',
    },
    {
      title: 'Development Philosophy',
      description:
        'Write code for humans first — readable, maintainable and honest about its trade-offs.',
    },
  ],
  highlightCards: [
    {
      title: 'Clean & Maintainable Code',
      description: 'Structured, readable code that is easy to extend and maintain.',
      icon: 'code',
    },
    {
      title: 'Problem Solving',
      description: 'Analytical thinking to turn complex problems into practical solutions.',
      icon: 'puzzle',
    },
    {
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and better ways to build.',
      icon: 'book',
    },
  ],
};

export const skills = {
  heading: 'My Technical Skills',
  subtitle: 'Technologies I work with and continue to grow in.',
  categories: [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: 'layout',
      items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
    },
    {
      id: 'programming',
      title: 'Programming',
      icon: 'terminal',
      // ⚠️ Only languages you have confirmed — edit this list freely
      items: ['Java', 'Python', 'C++'],
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: 'server',
      items: ['Node.js', 'Express.js', 'REST APIs'],
    },
    {
      id: 'database',
      title: 'Database',
      icon: 'database',
      items: ['MongoDB', 'MySQL', 'PostgreSQL'],
    },
    {
      id: 'tools',
      title: 'Developer Tools',
      icon: 'wrench',
      items: ['Git', 'GitHub', 'VS Code', 'Postman'],
    },
  ],
};

export const projects = {
  heading: 'Featured Projects',
  subtitle: "Some things I've built and worked on.",
  items: [
    {
      id: 'project-01',
      // ⚠️ REPLACE with your real project details — never fabricate links
      title: 'Academic EventPlanner Management System',
      description: 'Our project is designed to manage college events in one place,Students can view and register for events, organizers can manage events and participants, and administrators can monitor the overall activities.',
      techStack: ['React', 'Tailwind CSS', 'JavaScript', 'Java Spring Boot', 'PostgreSQL'],
      github: 'https://github.com/jayy999412/Academic-Event-Planner-Management-System',
      live: '',
      image: '/images/project-placeholder-1.svg',
      featured: true,
    },
    {
      id: 'project-02',
      title: 'TaskPilot',
      description: 'Developed TaskPilot, an AI-powered task and workflow automation assistant using Python, Streamlit, and Gemini AI to manage tasks, generate intelligent suggestions, and automate workflows.',
      techStack: ['Python', 'Streamlit', 'Gemini AI'],
      github: 'https://github.com/jayy999412/TaskPilotMiniProject',
      live: '',
      image: '/images/project-placeholder-2.svg',
      featured: true,
    },
    {
      id: 'project-03',
      title: 'PDF Rag Chatbot',
      description: 'Developed an AI-powered chatbot that allows users to upload PDF documents and ask questions based on their content. It uses Retrieval-Augmented Generation (RAG) to retrieve relevant information from documents and generate context-aware answers using AI, making document searching and information extraction easier.',
      techStack: ['Python', 'Streamlit', 'Ollama', 'LangChain', 'PyPDF'],
      github: 'https://github.com/jayy999412/PDF-RAG-Chatbot',
      live: '',
      image: '/images/project-placeholder-3.svg',
      featured: true,
    },
  ],
};

export const experience = {
  heading: 'My Journey',
  subtitle: 'Education, experience and certifications.',
  // ⚠️ Editable placeholders — add your real entries, remove what does not apply.
  // type: 'education' | 'internship' | 'work' | 'certification'
  items: [
    {
      id: 'journey-01',
      type: 'education',
      title: 'Bachelor of Science / Information Technology',
      organization: 'Jai Hind College',
      period: '2024 — 2027',
      description:
        'Pursuing a Bachelor of Science in Information Technology at Jai Hind College, with a strong foundation in programming, software development, database management, and web technologies. Relevant coursework includes Java, Python, C, C++, SQL, Web Development, Software Engineering, Data Analytics, Cybersecurity, and Cloud Computing. Gaining practical experience through academic projects and hands-on development.',
    },
    {
      id: 'journey-02',
      type: 'internship',
      title: 'Full Stack Developer',
      organization: 'ATEION PVT LTD',
      period: '19 MAY 2026 — 19 AUGUST 2026',
      description:
        'Worked as a Web Developer Intern at Ateion Pvt. Ltd., contributing to frontend and backend development and API integration. Received the Best Employee Award for June in recognition of my performance and contributions.',
    },
    {
      id: 'journey-03',
      type: 'certification',
      title: 'PROGRAMMING LANGUAGES',
      organization: 'AICPE',
      period: '2024',
      description: 'Earned certification from AICPE in C and C++, gaining foundational knowledge of programming concepts, data structures, problem-solving, and object-oriented programming.',
    },
  ],
};

export const whyMe = {
  heading: 'What I Bring to the Table',
  subtitle: 'The values behind how I work and build.',
  cards: [
    {
      id: 'problem-solver',
      title: 'Problem Solver',
      description: 'I enjoy breaking down complex problems into practical solutions.',
      icon: 'puzzle',
    },
    {
      id: 'clean-code',
      title: 'Clean Code',
      description: 'I value maintainable, structured and efficient code.',
      icon: 'code',
    },
    {
      id: 'adaptability',
      title: 'Adaptability',
      description: 'I continuously learn and adapt to emerging technologies.',
      icon: 'refresh',
    },
    {
      id: 'user-focus',
      title: 'User Focus',
      description: 'I believe great software should provide meaningful user experiences.',
      icon: 'heart',
    },
  ],
};

export const contact = {
  heading: "Let's Build Something Great Together.",
  description:
    "Have an interesting opportunity, project or idea? I'd love to hear from you.",
  // ⚠️ REPLACE with your real contact details
  details: [
    {
      id: 'email',
      label: 'Email',
      value: 'jayr20297@gmail.com',
      href: 'mailto:jayr20297@gmail.com',
      icon: 'mail',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: 'https://github.com/jayy999412',
      href: 'https://github.com/jayy999412',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/jay-rathod-912009417/',
      href: 'https://www.linkedin.com/in/jay-rathod-912009417/',
      icon: 'linkedin',
    },
    
  ],
  /**
   * FORM SUBMISSION
   * ---------------
   * The form validates your input, then sends it through Formspree —
   * it never fakes a successful send.
   *
   * SETUP (2 minutes, free):
   *   1. Sign up at https://formspree.io  (free tier = 50 submissions/month)
   *   2. Create a form → you get an ID like "xrgvwkqb"
   *   3. Paste that ID into formId below. Done — emails arrive in your inbox.
   *
   * Alternatively set formEndpoint to any full URL that accepts
   * POST JSON (your own API, Web3Forms, etc.).
   */
  formId: 'mgakkbjw', // Formspree form ID
  formEndpoint: '', // or a full URL, e.g. 'https://formspree.io/f/xxxxxxx'
  formSuccessMessage: 'Thanks! Your message has been sent — I will get back to you soon.',
  formDemoMessage:
    'Form is validated and ready, but no backend is configured yet. Get a free form ID at formspree.io and set contact.formId in src/data/portfolio.js to enable real submissions.',
};

export const footer = {
  tagline: 'Designed & Developed by Jay Ashok Rathod.',
  description: 'Building modern digital experiences with clean code and creative thinking.',
};
