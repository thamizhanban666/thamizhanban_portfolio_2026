import {
  Monitor,
  Server,
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
  resume: "https://drive.google.com/file/d/1PpiONYwRrUhn21E1ydD7vDdRI_YCdBEe/view?usp=sharing",
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

// ─── Helpers ───
function getYearsOfExperience(): string {
  const start = new Date("2022-12-01"); // First professional role (Moii AI)
  const now = new Date();
  const years = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365.25)
  );
  return `${years}+`;
}

// ─── About ───
export const aboutData = {
  paragraphs: [
    "I build entire product frontends from scratch — from the first route to hundreds of components serving real users. I thrive on ownership, taking on the most technically complex challenges and shipping them solo.",
    "I'm a designer-developer hybrid. I design directly in code without Figma, studying best-in-class products for inspiration. Every interface I ship is intentionally crafted — clean architecture under the hood, pixel-perfect polish on the surface.",
    "I took an unconventional path from Commerce to software development through self-driven learning. That journey shaped how I work — I learn fast, figure things out independently, and take full ownership of what I build.",
  ],
  highlights: [
    "Builds complete product frontends, from first route to production",
    "Designs directly in code, pixel-perfect with or without Figma",
    "Clean, maintainable architecture that scales",
    "Fast learner who figures things out independently",
  ],
};

// ─── Experience ───
export const experienceData = [
  {
    company: "Swipe Pages (Brand Exponents Creatives Pvt Ltd)",
    role: "Full Stack Developer",
    products: "SwipeOne / Swipe Agents / Swipe Pages",
    period: "April 2023 — March 2026",
    startDate: "2023-04-01",
    duration: "3 years",
    isCurrent: false,
    highlights: [
      "Built <hl>SwipeOne's entire frontend from scratch</hl> as the sole developer — <b>90+ routes</b>, <b>140+ components</b>, <b>500+ TypeScript files</b>, serving real paying customers via AppSumo",
      "Designed and developed a <hl>Notion-like email builder</hl> with <b>50+ custom TipTap extensions</b> and a recursive JSON-to-HTML converter for cross-email-client rendering",
      "Shipped the <hl>Pipelines & Deals Kanban board in 1 week</hl> to meet a product launch deadline — dual-state sync architecture bridging <b>@dnd-kit with TanStack Query</b> for optimistic drag updates",
      "Core contributor to the <hl>Workflow Automation builder</hl> — visual drag-and-drop interface using <b>xyflow</b>, <b>Dagre</b>, and <b>Redux</b> for workflow state, with <b>50+ industry-specific templates</b>",
      "Built the <hl>Swipe Agents frontend and partial backend</hl> — autonomous AI agent platform with real-time SSE streaming, <b>40+ tool UI components</b>, and resumable conversations",
      "Built the <hl>Funnel Analytics feature</hl> for Swipe Pages and resolved bugs across the landing page builder platform",
      "Implemented <hl>optimistic update architecture</hl> across SwipeOne and Swipe Agents using <b>TanStack Query</b> — instant UI feedback on every mutation with server state reconciliation",
      "Architected shared Git submodule system, <b>30+ custom React hooks</b>, and <b>45+ shared UI components</b> used across multiple products",
      "Self-designed most UIs <hl>directly in code without a dedicated designer</hl> — pixel-perfect, production-ready interfaces",
    ],
    techTags: [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "TipTap",
      "Tailwind CSS",
      "Radix UI",
      "Vercel AI SDK",
      "xyflow",
      "@dnd-kit",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
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
      "Built <hl>dashboards and analytical charts</hl> for a vision AI platform that transforms CCTV systems into intelligent analytics",
      "Developed data visualization interfaces using <b>Recharts</b> for real-time analytics display",
      "Worked with <b>React</b>, <b>Redux</b>, <b>TypeScript</b>, and <b>Ant Design</b> in a startup backed by Google Cloud",
    ],
    techTags: ["React", "Redux", "TypeScript", "Ant Design", "Recharts"],
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
    role: "Core Frontend Architect",
    description:
      "A full-featured SaaS platform combining CRM, email marketing, pipeline management, workflow automation, and AI agents — competing with tools like HubSpot and ActiveCampaign. Built the entire frontend from zero as the core architect with optimistic update architecture using TanStack Query. Launched on AppSumo and serving real paying customers.",
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
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Radix UI",
      "Tailwind CSS",
      "TipTap",
      "ProseMirror",
      "xyflow",
      "@dnd-kit",
      "Zod",
      "CodeMirror",
      "Recharts",
    ],
    url: "https://app.swipeone.com/",
    modules: [
      {
        title: "Email Builder",
        subtitle: "Notion-like Rich Text Email Editor",
        role: "Sole Developer & Designer",
        description:
          "Designed and built from scratch inside SwipeOne. Features a slash command menu, multi-column layouts, liquid tag personalization, and a recursive JSON-to-HTML converter for cross-email-client rendering. Self-designed UI — no designer involved.",
        video: {
          light: "/videos/work/emailBuilder_light.mp4",
          dark: "/videos/work/emailBuilder_dark.mp4",
        },
        gradient: "from-purple-500/30 via-pink-500/15 to-purple-900/5",
        metrics: [
          { value: "50+", label: "TipTap Extensions" },
          { value: "1200+", label: "Line Core Component" },
        ],
        techTags: [
          "TipTap",
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
          "Built a drag-and-drop Kanban pipeline board for managing deals across stages. Features a dual-state sync architecture bridging @dnd-kit with TanStack Query — optimistic drag updates with server state reconciliation.",
        video: {
          light: "/videos/work/pipelines_light.mp4",
          dark: "/videos/work/pipelines_dark.mp4",
        },
        gradient: "from-emerald-500/30 via-green-500/15 to-emerald-900/5",
        metrics: [
          { value: "✓", label: "Drag & Drop Kanban" },
          { value: "✓", label: "Optimistic Updates" },
          { value: "✓", label: "DnD + Query Sync" },
        ],
        techTags: [
          "@dnd-kit",
          "TanStack Query",
          "React",
          "TypeScript",
          "Lodash",
        ],
      },
      {
        title: "Workflow Automation",
        subtitle: "Visual Workflow Builder",
        role: "Core Frontend Developer",
        description:
          "Built the frontend for a visual workflow builder that lets users automate marketing sequences with a drag-and-drop canvas. Supports auto-layout, 50+ ready-made templates for different industries, and lifecycle management with draft, active, and inactive states.",
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
          "xyflow",
          "Dagre",
          "Redux",
          "React",
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
      "Built the complete frontend and partial backend for an autonomous AI agent platform. Agents execute multi-step tasks using 22+ tools with real-time SSE streaming, 3 execution modes, and resumable conversations.",
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
      "Next.js",
      "React",
      "TypeScript",
      "Vercel AI SDK",
      "Tailwind CSS",
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
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Sass",
      "TipTap / ProseMirror",
      "TanStack Query",
      "Radix UI",
      "shadcn/ui",
      "Framer Motion",
      "xyflow",
      "@dnd-kit",
      "Vercel AI SDK",
      "React Email",
      "Redux",
      "Recharts",
      "Zod",
      "Tippy.js",
    ],
  },
  {
    category: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redis",
      "REST APIs",
      "SSE Streaming",
      "JWT Auth",
      "AWS S3",
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
  heading: "Let's Build Something Together",
  subtext: "Got a product that needs a frontend? Let's talk.",
  cta: "I'm a frontend-focused full stack developer who builds entire product frontends from scratch — clean architecture, pixel-perfect UI, full ownership. If that sounds like what you need, I'd love to hear from you.",
};
