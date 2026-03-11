import {
  Briefcase,
  Code,
  Layers,
  Package,
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
  resume: "https://drive.google.com/file/d/1lZm5xALWidvmzipVMbHxT25o0Gq-lFt7/view?usp=sharing",
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
    "Design-Driven Developer",
  ],
  heading: "I'm Thamizhanban",
  subtext:
    "I don't just build features — I build entire products. I design in code, obsess over details, and ship interfaces that feel as good as they work.",
};

// ─── About ───
export const aboutData = {
  paragraphs: [
    "I'm a frontend developer at Swipe Pages with 3+ years of experience building production SaaS products from the ground up. As the sole developer, I built entire product frontends from scratch across SwipeOne and Swipe Agents — both serving real paying customers launched on AppSumo.",
    "I'm a designer-developer hybrid who codes designs directly without Figma. I study best-in-class SaaS products for inspiration, then design and build directly in code. Every UI I ship is intentionally crafted for clarity, usability, and visual polish — with a keen eye on both design and code architecture.",
    "I took an unconventional path from Commerce (B.Com + CA-CPT) to software development through self-driven learning. That journey shaped me into a self-starter who thrives on ownership and learning fast.",
  ],
  stats: [
    { value: "3+", label: "Years Experience", icon: Briefcase },
    { value: "500+", label: "Files Shipped", icon: Code },
    { value: "90+", label: "Page Routes Built", icon: Layers },
    { value: "3", label: "Products Built", icon: Package },
  ],
};

// ─── Experience ───
export const experienceData = [
  {
    company: "Swipe Pages",
    role: "Full Stack Developer (MERN)",
    products: "SwipeOne / Swipe Agents / Swipe Pages",
    period: "April 2023 — March 2026",
    startDate: "2023-04-01",
    duration: "3 years",
    isCurrent: false,
    highlights: [
      "Built SwipeOne's <hl>entire frontend from scratch</hl> — Next.js 14, <b>90+ routes</b>, <b>140+ components</b>, <b>500+ TypeScript files</b>",
      "Designed and developed a <hl>Notion-like email builder</hl> with <b>50+ custom TipTap extensions</b> and cross-client HTML rendering",
      "Built Swipe Agents frontend (Next.js 16, React 19) — <hl>autonomous AI agent platform</hl> with <b>40+ tool UI components</b> and SSE streaming",
      "Architected shared Git submodule system, <b>30+ custom React hooks</b>, and <b>45+ shared UI components</b>",
      "<hl>Self-designed UIs without a dedicated designer</hl> by referencing Notion, Potion, Mailmodo, and Encharge",
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
      "Built UI for a <hl>vision AI analytics platform</hl> that transforms CCTV systems into intelligent analytics",
      "Worked with React and Ant Design in a startup <b>backed by Google Cloud</b>",
    ],
    techTags: ["React", "Ant Design", "JavaScript"],
  },
];

// ─── Featured Work ───
export type FeaturedModule = {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  video: { light: string; dark: string } | null;
  gradient: string;
  metrics: { value: string; label: string }[];
  techTags: string[];
};

export type FeaturedProject = {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  image: { light: string; dark: string } | null;
  video: { light: string; dark: string } | null;
  gradient: string;
  metrics: { value: string; label: string }[];
  techTags: string[];
  url: string;
  modules?: FeaturedModule[];
};

export const featuredWorkData: FeaturedProject[] = [
  {
    title: "SwipeOne",
    subtitle: "AI-Powered CRM & Marketing Automation",
    role: "Sole Frontend Developer",
    description:
      "Built the entire frontend architecture from zero for a complete SaaS platform with multiple major modules — CRM, email marketing, workflow automation, and AI agents. Serving real paying customers launched on AppSumo.",
    image: null,
    video: {
      light: "/videos/work/swipeone_light.mp4",
      dark: "/videos/work/swipeone_dark.mp4",
    },
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
    modules: [
      {
        title: "Email Builder",
        subtitle: "Notion-like Rich Text Email Editor",
        role: "Sole Developer & Designer",
        description:
          "Designed and built from scratch inside SwipeOne. Features a slash command menu, multi-column layouts, liquid tag personalization, and a recursive JSON-to-HTML converter for cross-email-client rendering.",
        video: {
          light: "/videos/work/emailBuilder_light.mp4",
          dark: "/videos/work/emailBuilder_dark.mp4",
        },
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
      },
      {
        title: "Pipelines & Deals",
        subtitle: "Kanban-style Deal Management Board",
        role: "Sole Developer",
        description:
          "Built a drag-and-drop Kanban pipeline board for managing deals across stages. Features a dual-state sync architecture bridging @dnd-kit with React Query — optimistic drag updates with server state reconciliation.",
        video: {
          light: "/videos/work/pipelines_light.mp4",
          dark: "/videos/work/pipelines_dark.mp4",
        },
        gradient: "from-emerald-500/30 via-green-500/15 to-emerald-900/5",
        metrics: [
          { value: "✓", label: "Drag & Drop Kanban" },
          { value: "✓", label: "Optimistic Updates" },
          { value: "✓", label: "DnD + Query Sync" },
          { value: "1 week", label: "Built In" },
        ],
        techTags: [
          "@dnd-kit",
          "TanStack Query v5",
          "React 18",
          "TypeScript",
          "Lodash",
        ],
      },
      {
        title: "Workflow Automation",
        subtitle: "Visual Workflow Builder",
        role: "Core Frontend Developer",
        description:
          "Visual drag-and-drop workflow builder with auto-layout using Dagre, a template library with industry-specific workflow templates, and workflow status tracking with draft/active/inactive states.",
        video: {
          light: "/videos/work/workflow_light.mp4",
          dark: "/videos/work/workflow_dark.mp4",
        },
        gradient: "from-sky-500/30 via-blue-500/15 to-sky-900/5",
        metrics: [
          { value: "✓", label: "Visual Node Builder" },
          { value: "✓", label: "Auto-Layout (Dagre)" },
          { value: "✓", label: "Template Library" },
          { value: "✓", label: "Status Tracking" },
        ],
        techTags: [
          "@xyflow/react",
          "Dagre",
          "React 18",
          "TypeScript",
          "Tailwind CSS",
        ],
      },
    ],
  },
  {
    title: "Swipe Agents",
    subtitle: "Autonomous AI Agent Platform",
    role: "Sole Frontend Developer + Partial Backend",
    description:
      "Built the complete frontend and partial backend for an autonomous AI agent platform using cutting-edge Vercel AI SDK v6 ToolLoopAgent architecture. Features real-time SSE streaming, 3 execution modes, and resumable conversations.",
    image: null,
    video: {
      light: "/videos/work/swipeagents_light.mp4",
      dark: "/videos/work/swipeagents_dark.mp4",
    },
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
    role: "VP of Engineering",
    company: "Swipe Pages",
    linkedin: "https://www.linkedin.com/in/thangabalajis/",
    companyLinkedin: "https://www.linkedin.com/company/swipepages/",
    initials: "TB",
    image: "/images/testimonials/balaji.jpeg",
    highlight:
      "He doesn't just build features, he builds them thoughtfully and with the end user in mind.",
    text: "I had the pleasure of working with Thamizh for the past three years, and I can confidently say he's a strong full stack developer who genuinely takes pride in his work. What consistently stood out to me was his attention to detail and his eye for design. He doesn't just build features, he builds them thoughtfully and with the end user in mind. His code is clean, maintainable, and well tested. He's especially good at debugging and takes ownership from start to finish. When he says something is done, it's polished, stable, and ready to release. I've personally relied on him for critical deliveries, and he has always delivered with quality and consistency. He's dependable, easy to collaborate with, and brings a calm confidence to the team. I'm confident he'll continue to do great work in his next role.",
  },
  {
    name: "Adithya Santhosh",
    role: "Senior Application Developer",
    company: "Swipe Pages",
    linkedin: "https://www.linkedin.com/in/adithya-santhosh/",
    companyLinkedin: "https://www.linkedin.com/company/swipepages/",
    initials: "AS",
    image: "/images/testimonials/adithyaSanthosh.jpeg",
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
