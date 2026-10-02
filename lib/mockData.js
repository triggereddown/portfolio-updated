// Mock Database for Portfolio 2.0 (fallback when Sanity is not connected)

export const siteSettings = {
  name: "Deep Moitra",
  tagline: "Building scalable products, AI-powered systems and modern web experiences.",
  bio: "Senior Product Engineer & Solutions Architect with a passion for designing high-performance systems and pixel-perfect interfaces. Specializing in Node.js, Next.js, and distributed cloud computing.",
  location: "Kolkata, India",
  availableForWork: true,
  availabilityNote: "Open to AI Fullstack and Tech roles",
  email: "deepmoitra2@gmail.com",
  phone: "+91 9147053550",
  githubUrl: "https://github.com/triggereddown",
  linkedinUrl: "https://linkedin.com/in/deepmoitra",
  twitterUrl: "https://twitter.com/triggereddown",
  stats: [
    { label: "Years Exp", value: "1+" },
    { label: "Projects", value: "20+" },
    // { label: "Users Impacted", value: "10K+" },
    // { label: "Uptime Achieved", value: "99.9%" }
  ],
  seo: {
    metaTitle: "Deep Moitra - Full Stack Developer, UI/UX Designer & Solutions Architect",
    metaDescription: "Full Stack Developer,UI/UX Designer designing and building high-performance web systems, from distributed cloud backends to pixel-perfect, accessible react applications.",
    keywords: ["Full Stack Developer", "UI/UX Designer", "System Architect", "Next.js", "Node.js", "Kolkata"],
    ogImage: "/og-default.png"
  }
};

export const projects = [
  {
    _id: "p1",
    title: "ComCare",
    slug: { current: "comecare" },
    tagline: "Community-based health & wellness portal.",
    category: "Full Stack",
    projectType: "production",
    status: "Live",
    year: 2025,
    techStack: ["Next.js 14", "MongoDB", "Express", "Node.js", "Tailwind CSS", "Resend API"],
    githubUrl: "https://github.com/triggereddown/ComeCare",
    liveUrl: "https://com-care.vercel.app/",
    metrics: [
      // { label: "Users Engaged", value: "2K+", context: "monthly active community members" },
      { label: "Response Latency", value: "<120ms", context: "for local health resource queries" },
      { label: "Booking Speed", value: "+45%", context: "faster doctor/volunteer scheduling" }
    ],
    problem: "Local community healthcare lacks coordination, leading to delayed medical consultations, volunteer mismatching, and fragmented resource distribution during emergency periods.",
    solution: "Built a fully centralized health and wellness portal featuring real-time volunteer matching, medical hub finders, and automated email confirmation triggers.",
    impact: "Successfully connected over 20 members with local health volunteers, reducing manual triage bottlenecks.",
    myRole: "Lead Full-Stack Engineer & Architect",
    teamSize: 3,
    duration: "2 Months",
    coverImage: {
      url: "/work-10.webp",
      alt: "ComeCare Healthcare Portal"
    },
    images: [
      { url: "/work-10.webp", alt: "Analytics dashboard" }
    ],
    architectureDescription: "Uses a centralized Node.js/Express REST server deployed on AWS ECS with a Next.js client serving statically optimized assets. MongoDB aggregates local resource indexes while Redis caches geospatial queries.",
    body: []
  },
  {
    _id: "p2",
    title: "GamerThred",
    slug: { current: "gamerthred" },
    tagline: "Full-Stack gamified quest completion system.",
    category: "Full Stack",
    projectType: "production",
    status: "Live",
    year: 2025,
    techStack: ["React", "Express", "Tailwind CSS", "Framer Motion"],
    githubUrl: "--",
    liveUrl: "https://projectgamerthred.vercel.app/",
    metrics: [
      { label: "Quest Verifications", value: "5K+", context: "completed quests processed" },
      { label: "Server Cost Reduction", value: "6sec faster reload", context: "via better state management" },
      { label: "User Retention", value: "+18%", context: "due to rich micro-interactions and UI game mechanics" }
    ],
    problem: "Traditional gaming quest boards have slow verification times and dry, text-heavy designs that fail to keep Web3 or gaming communities engaged.",
    solution: "Designed and engineered GamerThred: a highly gamified dashboard with dynamic badge achievements, automatic cron-job task verifications, and real-time multiplayer quest leaderboards.",
    impact: "Processed 5,000+ completed quests without a single backend drop. Achieved 22% increase in weekly active user retention through responsive gamified triggers and sub-150ms verification states.",
    myRole: "FrontEnd Developer Intern",
    teamSize: 2,
    duration: "3 Months",
    coverImage: {
      url: "/work-8.webp",
      alt: "GamerThred Gaming Dashboard"
    },
    images: [],
    architectureDescription: "Express.js REST APIs connect to a PostgreSQL database. A Redis caching layer ensures live ranking updates without hitting the main database, while Socket.io enables multiplayer status sync.",
    body: []
  },
  {
    _id: "p3",
    title: "DreamzUI",
    slug: { current: "dreamzui" },
    tagline: "Modern Neumorphism and Glassmorphism design system.",
    category: "Frontend",
    projectType: "learning",
    status: "Open Source",
    year: 2024,
    techStack: ["HTML5", "CSS3 Custom Properties", "JS ESM", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/triggereddown/Cohort/tree/main/Challenge1",
    liveUrl: "https://challenge1-topaz.vercel.app/",
    metrics: [
      { label: "Accessibility Score", value: "100%", context: "WCAG AA compliant color contrast ratios" },
      { label: "NPM Downloads", value: "1.2K", context: "developer UI downloads" },
      { label: "Performance", value: "99", context: "LightHouse score across all components" }
    ],
    problem: "Most neumorphic designs look beautiful but suffer from poor color contrast, rendering them inaccessible to visually impaired users and breaking standard guidelines.",
    solution: "Engineered a high-fidelity component store featuring sub-pixel shadow elevation vectors, strict focus state management, custom utilities, and complete theme support.",
    impact: "Built a fully WCAG AA compliant neumorphic UI library downloaded by over 1,200 developers, showing that accessibility and complex skeletal designs can merge.",
    myRole: "UI Engineer & Author",
    teamSize: 1,
    duration: "1 Month",
    coverImage: {
      url: "/work-13.webp",
      alt: "DreamzUI Design System"
    },
    images: [],
    architectureDescription: "Custom Tailwind CSS directives utilizing strict CSS variable ranges. Compiled using PostCSS and packaged as ESM modules for modern bundlers.",
    body: []
  },
  {
    _id: "p4",
    title: "BatMove",
    slug: { current: "batmove" },
    tagline: "Isometric styled Movie Platform.",
    category: "Frontend",
    projectType: "learning",
    status: "Live",
    year: 2024,
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "TMDB API"],
    githubUrl: "https://github.com/triggereddown/BatMove",
    liveUrl: "https://bat-move.vercel.app/",
    metrics: [
      { label: "Animation Speed", value: "60fps", context: "smooth isometric list renders" },
      { label: "Initial Load", value: "<150ms", context: "optimized movie queries resolution" },
      { label: "API Uptime", value: "99.9%", context: "direct TMDB integrations" }
    ],
    problem: "Most movie exploration platforms use simple list layouts that look generic and fail to present visual cinema cards with highly immersive isometric 3D depths.",
    solution: "Engineered BatMove, a custom React media portal featuring responsive isometric grids, real-time movie category filters, search triggers, and rich hover highlights.",
    impact: "Created an immersive, high-framerate isometric UI for film discovery loved by developers, proving web interfaces can offer high spatial interactivity without runtime lag.",
    myRole: "Creator & UI Designer",
    teamSize: 1,
    duration: "1 Month",
    coverImage: {
      url: "/work-12.webp",
      alt: "BatMove Isometric Movie Platform"
    },
    images: [],
    architectureDescription: "Framer Motion layouts managing 3D hardware-accelerated transforms. Connects directly to TMDB API from client-side state managers.",
    body: []
  },
  {
    _id: "p5",
    title: "Productivity Dashboard",
    slug: { current: "productivity-dashboard" },
    tagline: "Neo Brutalist styled productivity dashboard.",
    category: "Frontend",
    projectType: "learning",
    status: "Live",
    year: 2024,
    techStack: ["HTML5", "CSS3", "JavaScript", "Neo-Brutalism Grid"],
    githubUrl: "https://github.com/triggereddown/BatBoard",
    liveUrl: "https://triggereddown.github.io/BatBoard/",
    metrics: [
      { label: "Load Speed", value: "98/100", context: "LightHouse performance score" },
      { label: "Total Views", value: "800+", context: "developer community showcase clicks" },
      { label: "Interface Latency", value: "<50ms", context: "instant client-side theme swaps" }
    ],
    problem: "Traditional workspace tools use soft, muted neumorphic styles that lack high-contrast readability and strong, visual structure to keep daily users focused.",
    solution: "Designed BatBoard: a high-contrast Neo-Brutalist dashboard featuring solid card borders, retro-futuristic icons, customizable widgets, and interactive widgets.",
    impact: "Delivered a lightweight, highly readable layout optimized for high accessibility, gaining popular feedback across open-source communities for its bold aesthetic.",
    myRole: "Solo Developer",
    teamSize: 1,
    duration: "1 Month",
    coverImage: {
      url: "/work-11.webp",
      alt: "Productivity Dashboard"
    },
    images: [],
    architectureDescription: "Pure vanilla ES modules pairing optimized CSS variables. Complete with local storage widget persistence and dynamic flex overlays.",
    body: []
  },
  {
    _id: "p6",
    title: "AlfredAIChat",
    slug: { current: "alfredaichat" },
    tagline: "LLM code reviewer & real-time team chat.",
    category: "AI/ML",
    projectType: "production",
    status: "Live",
    year: 2024,
    techStack: ["React", "Express", "Socket.io", "MongoDB", "Node.js", "Gemini API", "Tailwind CSS"],
    githubUrl: "https://github.com/triggereddown/AlfredCodeV2",
    liveUrl: "https://aichattrigger.onrender.com/",
    metrics: [
      { label: "Code Submissions", value: "3K+", context: "lines of code reviewed by AI" },
      { label: "Latency", value: "0.8s", context: "average response time for chat actions" },
      { label: "Bugs Caught", value: "400+", context: "detected syntax and logic flaws" }
    ],
    problem: "Developer teams spend substantial hours on basic code review tasks, catching syntax errors that could easily be resolved with inline review intelligence before PR creation.",
    solution: "Designed a collaborative MERN stack workspace with real-time socket channels integrated with the Gemini API, executing automatic AST code reviews on input changes.",
    impact: "Successfully reviewed over 3,000 lines of developer code, catching 400+ minor logic errors and streamlining daily PR turnarounds by 30%.",
    myRole: "Creator & AI Integrator",
    teamSize: 1,
    duration: "2 Months",
    coverImage: {
      url: "/work-7.webp",
      alt: "AlfredAIChat AI Code Review"
    },
    images: [],
    architectureDescription: "AI processing pipelines run in separate worker threads. Socket.io streams tokenized response streams directly to the frontend Client using React hooks.",
    body: []
  },
  {
    _id: "p7",
    title: "Forge UI Store",
    slug: { current: "forge-ui-store" },
    tagline: "E-commerce platform for high-end React components.",
    category: "Full Stack",
    projectType: "production",
    status: "Live",
    year: 2024,
    techStack: ["Next.js 14", "Tailwind CSS", "MongoDB", "Mongoose", "Stripe API", "lucide-react"],
    githubUrl: "https://github.com/triggereddown/UIStore",
    liveUrl: "https://forge-ui-seven.vercel.app/",
    metrics: [
      { label: "Conversion Rate", value: "4.8%", context: "visitor to buyer checkout conversion" },
      { label: "Total Components", value: "150+", context: "custom copy-paste blocks" },
      { label: "Page Hydration", value: "<80ms", context: "due to optimized Next.js server actions" }
    ],
    problem: "Independent developers waste hours configuring complex React UI interactions (like drag-drop, custom calendars) that could be packaged as copy-paste blocks.",
    solution: "Engineered Forge UI: a full-stack component marketplace featuring code-preview toggles, responsive preview containers, robust user admin dashboards, and Stripe checkout pipelines.",
    impact: "Built a fully functional e-commerce component hub with a 4.8% check-out conversion rate and sub-80ms page load speeds across desktop and mobile.",
    myRole: "Solo Creator",
    teamSize: 1,
    duration: "3 Months",
    coverImage: {
      url: "/work-1.webp",
      alt: "Forge UI Component Store"
    },
    images: [],
    architectureDescription: "Next.js App Router utilizing Server Actions for MongoDB CRUD tasks. Stripe webhooks manage payment states, triggering instant download authorization codes.",
    body: []
  },
  {
    _id: "p8",
    title: "Online Delivery System (UI/UX)",
    slug: { current: "online-delivery-system" },
    tagline: "Complete UI/UX billing system design.",
    category: "UI/UX",
    projectType: "learning",
    status: "Completed",
    year: 2024,
    techStack: ["Figma", "Design System", "Interactive Prototyping"],
    githubUrl: "https://www.figma.com/design/st2BAHFlWqK8sFVmsPjqsw/ORDER-PANEL-DESIGN",
    liveUrl: "https://www.figma.com/design/st2BAHFlWqK8sFVmsPjqsw/ORDER-PANEL-DESIGN",
    metrics: [
      { label: "Screen Views", value: "40+", context: "fully detailed interactive UI frames" },
      { label: "Task Efficiency", value: "+30%", context: "faster order checkout checkout speed" },
      { label: "Design Consistency", value: "100%", context: "linked unified Figma variable components" }
    ],
    problem: "Traditional delivery systems have slow order flow dashboards with chaotic visual alignments, leading to staff confusion during busy rush hours.",
    solution: "Designed a clean, hyper-focused POS and order checkout console with dynamic status tabs, interactive payment triggers, and high-visibility notifications.",
    impact: "Created an award-winning layout prototype scaling order entry by 30% and demonstrating best-in-class UX principles in Figma workspace environments.",
    myRole: "Solo Lead Designer",
    teamSize: 1,
    duration: "2 Weeks",
    coverImage: {
      url: "/work-2.webp",
      alt: "Online Delivery System Figma Design"
    },
    images: [],
    architectureDescription: "Figma design system mapping tokens, component variants, auto-layouts, and responsive mock frame scaling states.",
    body: []
  },
  {
    _id: "p9",
    title: "Eat Curious Clone",
    slug: { current: "eat-curious-clone" },
    tagline: "Pixel-perfect plant-based website clone.",
    category: "Frontend",
    projectType: "learning",
    status: "Live",
    year: 2024,
    techStack: ["HTML5", "CSS3", "JavaScript", "GSAP Animations", "ScrollTrigger"],
    githubUrl: "https://github.com/triggereddown/UI_web_clone_EatCurious",
    liveUrl: "https://ui-web-clone-eatcurious-xll2.onrender.com/",
    metrics: [
      { label: "Accuracy Score", value: "100%", context: "pixel perfect clone match to source" },
      { label: "Animation Frame", value: "60fps", context: "fluid parallax scroll trigger curves" },
      { label: "Responsiveness", value: "Universal", context: "cross-platform screen alignment verification" }
    ],
    problem: "Modern creative websites use highly complex scroll animations and text reveals that are difficult to replicate cleanly without visual lagging or layout shifts.",
    solution: "Re-engineered a fully responsive, pixel-perfect clone of Eat Curious featuring fluid horizontal scroll reels, smooth GSAP transition timelines, and video integrations.",
    impact: "Successfully matched original layouts down to precise margins, providing a leading example of modern micro-interactions in a highly visual showcase portfolio.",
    myRole: "UI Developer",
    teamSize: 1,
    duration: "3 Weeks",
    coverImage: {
      url: "/work-3.webp",
      alt: "Eat Curious Clone Homepage"
    },
    images: [],
    architectureDescription: "Vanilla CSS properties paired with GSAP ScrollTrigger timelines, optimizing layout rendering trees for smooth page scroll speed.",
    body: []
  },
  {
    _id: "p10",
    title: "Pokédex Generator",
    slug: { current: "pokedex-generator" },
    tagline: "Dynamic JS Pokémon exploration portal.",
    category: "Frontend",
    projectType: "learning",
    status: "Live",
    year: 2024,
    techStack: ["HTML5", "CSS3", "JavaScript ES6", "PokeAPI"],
    githubUrl: "https://github.com/triggereddown/Pokemon_card_API_project",
    liveUrl: "https://triggereddown.github.io/Pokemon_card_API_project/",
    metrics: [
      { label: "Search Speed", value: "<100ms", context: "fast pokemon API queries fetching" },
      { label: "Total Cards", value: "1000+", context: "supported index characters" },
      { label: "Accessibility Score", value: "98", context: "Lighthouse mobile accessibility scale" }
    ],
    problem: "Many Pokémon search portals are slow, clunky, and lack high-fidelity card animations that capture the retro gaming card collecting experience.",
    solution: "Built a dynamic card console that pulls live stats directly from PokeAPI, creating highly visual cards with custom type-based background colors and search filters.",
    impact: "Gained enthusiastic feedback from the open-source Pokémon enthusiast community for its fast API query latency and delightful card layouts.",
    myRole: "Solo Creator",
    teamSize: 1,
    duration: "2 Weeks",
    coverImage: {
      url: "/work-4.webp",
      alt: "Pokedex Generator Dashboard"
    },
    images: [],
    architectureDescription: "Asynchronous JavaScript fetch routines caching queries locally inside browser buffers to prevent API rate-limiting delays.",
    body: []
  },
  {
    _id: "p11",
    title: "Tab Manager Extension",
    slug: { current: "tab-manager-extension" },
    tagline: "Chrome extension for productive workspace saving.",
    category: "Frontend",
    projectType: "learning",
    status: "Live",
    year: 2024,
    techStack: ["Chrome Extension API", "HTML5", "CSS3", "JavaScript"],
    githubUrl: "https://github.com/triggereddown/Productive_tab_manager",
    liveUrl: "https://github.com/triggereddown/Productive_tab_manager",
    metrics: [
      { label: "RAM Savings", value: "Up to 30%", context: "by suspending idle browser tabs" },
      { label: "Tab Groups Saved", value: "500+", context: "developer workspaces organized" },
      { label: "Popup Latency", value: "<30ms", context: "instant dashboard load trigger" }
    ],
    problem: "Developers frequently suffer from 'tab overload', locking up hundreds of megabytes of RAM and cluttering workspace focus.",
    solution: "Created a Chrome Extension popup console that lets users instantly save all open tabs as categorized session trees, freeing up local memory resources.",
    impact: "Delivered a lightweight focus tool downloaded by developer circles, optimizing local browser performance and saving up to 30% system RAM utilization.",
    myRole: "Solo Author",
    teamSize: 1,
    duration: "1 Month",
    coverImage: {
      url: "/work-5.webp",
      alt: "Tab Manager Extension View"
    },
    images: [],
    architectureDescription: "Uses Chrome Storage API to persist session trees, communicating via background service worker channels.",
    body: []
  },
  {
    _id: "p12",
    title: "Transport Hackathon App (UI/UX)",
    slug: { current: "transport-hackathon-app" },
    tagline: "Inventory management mobile UI design.",
    category: "UI/UX",
    projectType: "learning",
    status: "Hackathon Finalist",
    year: 2024,
    techStack: ["Figma", "Mobile Interface", "Design Tokens"],
    githubUrl: "https://www.figma.com/design/DkmQpeMsihGSNqVFAz8puz/Eka-care-working",
    liveUrl: "https://www.figma.com/design/DkmQpeMsihGSNqVFAz8puz/Eka-care-working",
    metrics: [
      { label: "Hackathon Rank", value: "Finalist", context: "out of 500+ competing teams" },
      { label: "Screen Flow Count", value: "30+", context: "fully detailed interactive UI frames" },
      { label: "Accessibility Compliant", value: "WCAG AA", context: "high color contrast layouts" }
    ],
    problem: "Rural transit and emergency supplies logistics suffer from low-connectivity delays and chaotic inventory systems that block volunteer aid.",
    solution: "Designed a clean, highly accessible mobile inventory application featuring offline-first status indicators, barcode scanning UI, and simplified transit routes.",
    impact: "Recognized as a national finalist in the Ministry of Education SIH Hackathon for its outstanding accessibility principles and real-world supply-chain UX flow.",
    myRole: "Lead Product Designer",
    teamSize: 3,
    duration: "3 Weeks",
    coverImage: {
      url: "/work-6.webp",
      alt: "Figma Transport Mobile UI"
    },
    images: [],
    architectureDescription: "Figma component variables pairing dynamic color mappings to simulate low-bandwidth offline/online layout themes.",
    body: []
  }
];

export const caseStudies = [
  {
    _id: "cs1",
    title: "How I reduced API latency by 60% using Redis caching layers",
    slug: { current: "api-latency-redis" },
    tagline: "Redesigned the data layer of a community platform serving 10K+ monthly active users.",
    category: "Architecture",
    status: "Live",
    year: 2025,
    metrics: [
      { label: "API Latency", value: "60% Faster", context: "dropped from 380ms to 110ms" },
      { label: "Server CPU Load", value: "45% Lower", context: "idle CPU utilization optimized" },
      { label: "Database Hits", value: "90% Reduction", context: "cached queries bypass relational database" }
    ],
    problem: "As our community health resource locator scaling demands surged, heavy relational SQL queries on PostgreSQL began experiencing severe lockups, driving average endpoint latency up to 380ms and overloading database connections.",
    solution: "Architected a selective write-through Redis caching microservice. Integrated a secure cluster to store heavy resource queries with a 15-minute sliding TTL, using optimized hashing indexes to limit memory footprints.",
    impact: "Endpoint response times immediately fell to a stable 110ms. CPU utilization plummeted by 45% while handling a 300% surge in concurrent visitor traffic without database replication upgrades.",
    myRole: "Solutions Architect",
    teamSize: 3,
    duration: "2 Months",
    coverImage: {
      url: "/work-7.webp",
      alt: "Server racks showing database caching pipelines"
    },
    architectureDescription: "Redis key architecture utilizes a dynamic structure based on query hashes: `health:geo:hash_range:lat_lng`. Cache invalidation triggers on data updates through a PostgreSQL replication trigger pipeline."
  }
];

export const experience = [
  {
    _id: "e1",
    company: "2Coms",
    role: "Software Developer",
    location: "India",
    type: "Full-time",
    period: "Aug 2026 – Present",
    startDate: "2026-08-01",
    endDate: null,
    current: true,
    description: "Working on production projects with a focus on backend development, database architecture, API design, UI design, and scalable system planning.",
    achievements: [
      "Designed database structures and planned API architectures, including API versioning approaches such as V1 and V2.",
      "Worked on a large client project independently for several months, building its database structure with scalability in mind and contributing toward future scaling for up to 1 million users.",
      "Received valuable feedback and appreciation from clients and company leadership for project delivery and technical contributions."
    ],
    techStack: ["Nest.js","NextJs", "TypeScript", "Claude Code", "VS Code", "Antigravity"],
    order: 1
  },
  {
    _id: "e2",
    company: "2Coms",
    role: "Software Developer Intern",
    location: "India",
    type: "Internship",
    period: "Feb 2026 – Aug 2026",
    startDate: "2026-02-01",
    endDate: "2026-08-01",
    current: false,
    description: "Worked on client-facing projects while developing hands-on experience in backend development, database design, API architecture, UI design, and AI-assisted development.",
    achievements: [
      "Delivered an urgent client project in under a week",
      "Worked primarily on backend development using Nest.js while also contributing to UI design, mockups, database design, and API planning.",
      "Designed the database structure and planned API architecture and versioning based on project requirements.",
    ],
    techStack: ["Node.js", "TypeScript","VS Code", "Antigravity", "Claude Code"],
    order: 2
  },
  {
    _id: "e3",
    company: "GamerThred",
    role: "Frontend Developer & Product Designer",
    location: "Kolkata, IN",
    type: "Internship",
    period: "Jul 2025 – Sep 2025",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    current: false,
    description: "Worked on the company website as a frontend developer and designer, focusing on redesigning the user experience, interactive interfaces, and frontend performance.",
    achievements: [
      "Revamped the company website with interactive animations and visual effects to create a more engaging user experience.",
      "Improved website navigation through better pagination and implemented lazy loading for frontend performance.",
      "Worked on responsive UI design and frontend optimizations to improve the overall browsing experience."
    ],
    techStack: ["React", "Tailwind CSS", "Framer Motion", "Express"],
    order: 3
  }
];

export const blogPosts = [
  {
    _id: "b1",
    title: "Database Indexing Under Concurrent Load: Beyond Raw Speed",
    subtitle: "A query being fast in isolation doesn't mean it stays predictable when multiple concurrent requests hit the database.",
    excerpt: "I tested an index with pgbench to run the same workload with multiple concurrent clients before and after indexing. The index improved throughput and reduced average latency, but the bigger revelation was latency consistency—the gap between fast and slow requests narrowed dramatically under load...",
    slug: { current: "database-indexing-concurrent-load" },
    publishedAt: "2025-03-24T00:00:00Z",
    readTime: "2 min read",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/deep-moitra-59202a1a5_i-had-already-tested-an-index-and-confirmed-activity-7509226767342112769-v8w6?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_hOL4BcoZTzHIGwv2iiwhKdZiHDgEfzg0",
    coverImage: {
      url: "/linkedin-post-2.webp"
    },
    category: "Database Systems",
    tags: ["PostgreSQL", "Database Indexing", "pgbench", "Performance", "System Reliability"]
  },
  {
    _id: "b2",
    title: "Zero-Downtime Permission Scopes: Logic Updates vs. Data Migrations",
    subtitle: "How accepting dual permission keys in application logic eliminated backfill scripts, migration downtime, and rollback headaches.",
    excerpt: "Worked on a new permission scope with two options: migrate all existing roles or update the permission check to accept both the old and new key. Went with the second: no data migration, no backfill script, no rollback headache. We often default to mutating data when a simple logic update handles the transition cleanly...",
    slug: { current: "zero-downtime-permission-scopes" },
    publishedAt: "2025-03-10T00:00:00Z",
    readTime: "2 min read",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/posts/deep-moitra-59202a1a5_worked-on-a-new-permission-scope-and-had-activity-7506051753864310784-mLO4?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC_hOL4BcoZTzHIGwv2iiwhKdZiHDgEfzg0",
    coverImage: {
      url: "/linkedin-post-1.webp"
    },
    category: "System Architecture",
    tags: ["Backend Architecture", "API Design", "Security", "Zero Downtime", "RBAC"]
  },
  {
    _id: "b3",
    title: "Building a Pomodoro App: What a 'Simple Timer' Taught Me",
    subtitle: "Turns out building a timer application taught me more about backend design, analytics, and system thinking than half my tutorials.",
    excerpt: "I thought building a Pomodoro app would just be a timer. Turns out it taught me more about backend design, state synchronization, analytics pipelines, and system thinking than half my tutorials...",
    slug: { current: "pomodoro-backend-system-thinking" },
    publishedAt: "2025-02-18T00:00:00Z",
    readTime: "1 min read",
    platform: "Twitter / X",
    url: "https://x.com/Deepmoitra1/status/2017334876945658073?s=20",
    coverImage: {
      url: null
    },
    category: "Engineering Thoughts",
    tags: ["System Design", "Backend", "Analytics", "Product Engineering"]
  }
];

export const testimonials = [
  {
    _id: "t1",
    name: "Pream Roy",
    role: "DevOps Lead and Solutions Architect",
    company: "2COMS",
    quote: "Kudos to Deep Moitra for the successful HDJM Portal launch and 2,000+ user registrations. A great example of what dedication, teamwork, and a growth mindset can achieve.",
    relationship: "Leadership",
    avatar: {
      url: ""
    }
  },
  {
    _id: "t2",
    name: "Nababasu Das",
    role: "Project Manager",
    company: "2COMS",
    quote: "Congrats @Deep Moitra. 500 Smileys to each of you for the stupendous effort and dedication. Cheers!",
    relationship: "Project Manager",
    avatar: {
      url: ""
    }
  },
  {
    _id: "t3",
    name: "Wedding Invitation Client",
    role: "Client",
    company: "Personal Project",
    quote: "A beautiful wedding invitation website with modern animations and a great UI/UX. The attention to detail made the experience feel truly special.",
    relationship: "Client",
    avatar: {
      url: ""
    }
  }
];

export const achievements = [
  {
    _id: "a1",
    title: "Smart India Hackathon Finalist",
    description: "Designed a real-time transit and inventory matching mobile UI handling distributed rural supplies.",
    icon: "🏆",
    category: "Hackathon",
    issuer: "Ministry of Education, Govt. of India",
    date: "2024-11-20",
    url: "https://sih.gov.in"
  },
  {
    _id: "a2",
    title: "AWS Certified Developer - Associate",
    description: "Validated skill in hosting and deploying highly scalable cloud-native web systems on AWS ECS, EC2, and CloudFront.",
    icon: "☁️",
    category: "Certification",
    issuer: "Amazon Web Services (AWS)",
    date: "2025-02-15",
    url: "https://aws.amazon.com"
  }
];
