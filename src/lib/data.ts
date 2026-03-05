import {
  Briefcase,
  Code,
  Layers,
  Puzzle,
  Monitor,
  Server,
  Brain,
  Wrench,
} from "lucide-react";

// ─── Personal Info ───
export const personalInfo = {
  name: "Thamizhanban",
  email: "thamizhanban666@gmail.com",
  phone: "+91 90874 05536",
  location: "Chennai, India",
  linkedin: "https://www.linkedin.com/in/thamizhanban666/",
  github: "https://github.com/thamizhanban666",
  telegram: "https://t.me/T_h_a_m_i_z_h_a_n_b_a_n",
  resume: "#",
};

// ─── Navigation ───
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

// ─── Hero ───
export const heroData = {
  roles: [
    "Full Stack Developer",
    "Frontend Architect",
    "React / Next.js Engineer",
    "UI/UX Builder",
  ],
  heading: "Hi, I'm Thamizhanban",
  subtext:
    "I build production SaaS products from scratch — frontend architecture, UI/UX design, and AI integrations.",
  statusBadge: "Available for new opportunities",
};

// ─── About ───
export const aboutData = {
  paragraphs: [
    "I transitioned from Commerce (B.Com + CA-CPT) to software development through an intensive MERN stack bootcamp. What started as curiosity quickly became a passion — I found my strength in crafting intuitive, production-grade user interfaces.",
    "For the past 3+ years at Arrow Labs, I've been the core frontend developer — taking on the most technically challenging work across multiple SaaS products. From building entire product frontends from scratch to designing complex systems like email builders and AI agent interfaces.",
    "I'm a designer-developer hybrid. I code designs directly without Figma, referencing products like Notion, Potion, Mailmodo, and Encharge for inspiration. Every UI I ship is intentionally crafted for clarity, usability, and visual polish.",
  ],
  stats: [
    { value: "3+", label: "Years Experience", icon: Briefcase },
    { value: "500+", label: "Files Shipped", icon: Code },
    { value: "90+", label: "Page Routes Built", icon: Layers },
    { value: "50+", label: "Custom Extensions", icon: Puzzle },
  ],
};

// ─── Experience ───
export const experienceData = [
  {
    company: "Arrow Labs Pte Ltd",
    role: "Full Stack Developer (MERN)",
    products: "Swipe Pages / SwipeOne / Swipe Agents",
    period: "April 2023 — Present",
    startDate: "2023-04-01",
    duration: null, // calculated dynamically
    isCurrent: true,
    highlights: [
      "Built SwipeOne's entire frontend from scratch — Next.js 14, 90+ routes, 140+ components, 500+ TypeScript files",
      "Designed and developed a Notion-like email builder with 50+ custom TipTap extensions and cross-client HTML rendering",
      "Built Swipe Agents frontend (Next.js 16, React 19) — autonomous AI agent platform with 40+ tool UI components and SSE streaming",
      "Architected shared Git submodule system, 30+ custom React hooks, and 45+ shared UI components",
      "Self-designed UIs without a dedicated designer by referencing Notion, Potion, Mailmodo, and Encharge",
    ],
    techTags: [
      "Next.js 14/16",
      "React 18/19",
      "TypeScript",
      "TanStack Query",
      "TipTap",
      "Tailwind CSS",
      "Radix UI",
      "Vercel AI SDK",
      "React Flow",
      "Framer Motion",
    ],
  },
  {
    company: "Moii AI",
    role: "Frontend Engineer",
    products: "Vision AI Analytics Platform",
    period: "Dec 2022 — Mar 2023",
    startDate: "2022-12-01",
    duration: "4 months",
    isCurrent: false,
    highlights: [
      "Built UI for a vision AI analytics platform that transforms CCTV systems into intelligent analytics",
      "Worked with React and Ant Design in a startup backed by Google Cloud",
    ],
    techTags: ["React", "Ant Design", "JavaScript"],
  },
];

// ─── Featured Work ───
export const featuredWorkData = [
  {
    title: "SwipeOne",
    subtitle: "AI-Powered CRM & Marketing Automation",
    role: "Sole Frontend Architect",
    description:
      "Built the entire frontend architecture from zero for a SaaS platform that combines CRM, email marketing, workflow automation, and AI agents. Serving real paying customers launched on AppSumo.",
    // TODO: Replace with actual screenshot path, e.g. "/images/swipeone.png"
    image: null as string | null,
    gradient: "from-orange-500/30 via-amber-500/15 to-orange-900/5",
    metrics: [
      { value: "90+", label: "Page Routes" },
      { value: "140+", label: "Components" },
      { value: "500+", label: "TypeScript Files" },
      { value: "30+", label: "Custom Hooks" },
    ],
    techTags: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "TanStack Query v5",
      "Radix UI",
      "Tailwind CSS",
      "TipTap 2.4",
      "React Flow",
      "@dnd-kit",
      "Zod",
    ],
    url: "https://app.swipeone.com/",
  },
  {
    title: "Swipe Agents",
    subtitle: "Autonomous AI Agent Platform",
    role: "Sole Frontend Developer + Partial Backend",
    description:
      "Built the complete frontend and partial backend for an autonomous AI agent platform using cutting-edge Vercel AI SDK v6 ToolLoopAgent architecture. Features real-time SSE streaming, 3 execution modes, and resumable conversations.",
    image: null as string | null,
    gradient: "from-blue-500/30 via-cyan-500/15 to-blue-900/5",
    metrics: [
      { value: "40+", label: "Tool UI Components" },
      { value: "22+", label: "Agent Tools" },
      { value: "160+", label: "Files" },
      { value: "3", label: "Execution Modes" },
    ],
    techTags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Vercel AI SDK v6",
      "Tailwind CSS 4",
      "SSE Streaming",
      "Redis",
      "MongoDB",
    ],
    url: "https://agents.swipepages.com/",
  },
  {
    title: "Email Builder",
    subtitle: "Notion-like Rich Text Email Editor",
    role: "Sole Developer & Designer",
    description:
      "Designed and built a production email builder from scratch inside SwipeOne. Features a slash command menu, multi-column layouts, liquid tag personalization, and a recursive JSON-to-HTML converter for cross-email-client rendering.",
    image: null as string | null,
    gradient: "from-purple-500/30 via-pink-500/15 to-purple-900/5",
    metrics: [
      { value: "50+", label: "TipTap Extensions" },
      { value: "1200+", label: "Line Core Component" },
      { value: "✓", label: "Cross-Client Rendering" },
      { value: "✓", label: "Self-Designed UI" },
    ],
    techTags: [
      "TipTap 2.4",
      "ProseMirror",
      "React Email",
      "CodeMirror",
      "Tippy.js",
      "Custom JSON→HTML",
    ],
    url: "https://app.swipeone.com/",
  },
];

// ─── Skills ───
export const skillsData = [
  {
    category: "Frontend",
    icon: Monitor,
    skills: [
      "React 18/19",
      "Next.js 14/16",
      "TypeScript",
      "Tailwind CSS",
      "TipTap / ProseMirror",
      "TanStack Query",
      "Radix UI",
      "Framer Motion",
      "React Flow",
      "@dnd-kit",
      "Vercel AI SDK",
      "React Email",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js 5",
      "MongoDB",
      "Redis",
      "REST APIs",
      "SSE Streaming",
      "JWT Auth",
      "AWS S3",
    ],
  },
  {
    category: "AI & Integration",
    icon: Brain,
    skills: [
      "Vercel AI SDK v6",
      "Google GenAI / Gemini",
      "ToolLoopAgent Pattern",
      "AI Streaming (useChat)",
      "Context Compaction",
      "Resumable Streams",
    ],
  },
  {
    category: "Tools & DevOps",
    icon: Wrench,
    skills: [
      "Git / GitHub",
      "Vercel",
      "DigitalOcean",
      "GitHub CI/CD",
      "Cursor",
      "Claude Code",
      "Mixpanel",
      "npm",
    ],
  },
];

// ─── Testimonials ───
export const testimonialsData = [
  {
    name: "Thanga Balaji S",
    role: "VP of Engineering at Swipe Pages",
    initials: "TB",
    image: null,
    highlight:
      "He doesn't just build features, he builds them thoughtfully and with the end user in mind.",
    text: "I had the pleasure of working with Thamizh for the past three years, and I can confidently say he's a strong full stack developer who genuinely takes pride in his work. What consistently stood out to me was his attention to detail and his eye for design. He doesn't just build features, he builds them thoughtfully and with the end user in mind. His code is clean, maintainable, and well tested. He's especially good at debugging and takes ownership from start to finish. When he says something is done, it's polished, stable, and ready to release. I've personally relied on him for critical deliveries, and he has always delivered with quality and consistency. He's dependable, easy to collaborate with, and brings a calm confidence to the team. I'm confident he'll continue to do great work in his next role.",
  },
  {
    name: "Adithya Santhosh",
    role: "Senior Application Developer",
    initials: "AS",
    image: null,
    highlight:
      "He takes full ownership of shipping high-quality frontend solutions to production.",
    text: "I highly recommend Thamizhanban as a go-to expert for building outstanding frontend UI/UX interfaces. His meticulous attention to detail ensures every product he works on is not only visually refined but also intuitive and user-friendly. His strong expertise in React enables him to transform complex requirements into seamless, high-performing applications. Beyond his technical skills, he takes full ownership of shipping high-quality frontend solutions to production, ensuring stability, performance, and a polished user experience. I've always appreciated his commitment to quality and user experience, and I'm confident he will continue to add tremendous value wherever he goes.",
  },
];

// ─── Contact ───
export const contactData = {
  heading: "Let's Work Together",
  subtext: "Available for full-time frontend-focused roles",
  cta: "I'm currently looking for new opportunities where I can contribute as a frontend-focused full stack developer. If you're looking for someone who builds entire product frontends from scratch, let's connect.",
};
