// Mock data for Imam Chowdhury's portfolio - ASTRA CORE style

export const identity = {
  name: "IMAM CHOWDHURY",
  handle: "IMAM_CH://SYS.ENG",
  role: "Senior Systems Engineer",
  tagline: "Architecting reliable automation & AI systems for production newsrooms.",
  location: "Dhaka, BD",
  sectorId: "091.XC-01",
  yearsExperience: 7,
  status: "ONLINE // NOMINAL",
  photo: "https://customer-assets.emergentagent.com/job_automation-hub-237/artifacts/cqr9wkbr_FADS4736-1.jpg",
  domain: "imamchowdhury.com",
  agency: {
    name: "AutomateBD",
    url: "https://automatebd.xyz",
    tagline: "Automation & AI Solutions — production-ready, not demos."
  },
  social: {
    linkedin: "https://linkedin.com/in/imamchowdhury",
    github: "https://github.com/imam0096361",
    email: "hello@imamchowdhury.com",
    website: "https://imamchowdhury.com"
  }
};

export const aboutStory = [
  "I am a Senior Systems Engineer with 7+ years of hands-on experience designing, securing, and automating production-scale systems in a real newsroom environment.",
  "Currently at The Daily Star, my role goes far beyond traditional infrastructure. I design and operate automation and AI-driven systems that power daily editorial and operational workflows — actively used, not experimental.",
  "My work sits at the intersection of infrastructure engineering, workflow automation, AI-assisted content systems, and editorial reliability."
];

export const focusDomains = [
  { code: "INF", label: "Infrastructure Engineering" },
  { code: "AUT", label: "Workflow Automation" },
  { code: "AI", label: "AI-Assisted Content Systems" },
  { code: "REL", label: "Editorial & Operational Reliability" }
];

export const systems = [
  {
    id: "SYS-01",
    title: "Audio Transcription Engine",
    category: "AI_CONTENT",
    summary: "High-accuracy transcription pipeline for interviews, roundtables and long-form audio — dual-language (EN / BN) aware.",
    metrics: [{ k: "ACCURACY", v: "97.4%" }, { k: "THROUGHPUT", v: "18h/day" }],
    stack: ["Whisper", "FFmpeg", "Python", "Redis Queue"]
  },
  {
    id: "SYS-02",
    title: "Transcript → Publish Workflow",
    category: "EDITORIAL",
    summary: "End-to-end editorial pipeline turning raw transcripts into publish-ready content in English and Bangla, aligned with house style.",
    metrics: [{ k: "TURNAROUND", v: "-72%" }, { k: "LANGUAGES", v: "EN / BN" }],
    stack: ["Python", "LLM Orchestration", "Postgres", "Docker"]
  },
  {
    id: "SYS-03",
    title: "AI-Assisted Subediting",
    category: "AI_CONTENT",
    summary: "Style-aware subediting layer enforcing newsroom standards — guardrailed, explainable, reviewed by humans.",
    metrics: [{ k: "STYLE_MATCH", v: "94%" }, { k: "MODE", v: "Guardrailed" }],
    stack: ["LLM", "Rule Engine", "Style Rubrics"]
  },
  {
    id: "SYS-04",
    title: "Editorial Translation System",
    category: "LANGUAGE",
    summary: "Translation pipeline preserving editorial tone and institutional context — not a generic translator, a context-aware engine.",
    metrics: [{ k: "TONE_FIDELITY", v: "High" }, { k: "PAIRS", v: "EN ⇄ BN" }],
    stack: ["LLM", "Custom Glossaries", "Python"]
  },
  {
    id: "SYS-05",
    title: "SEO & Metadata Automation",
    category: "PUBLISHING",
    summary: "Keyword generation, structured metadata and publish-ready SEO outputs — generated and validated against editorial rubrics.",
    metrics: [{ k: "COVERAGE", v: "Auto" }, { k: "VALIDATION", v: "Schema-locked" }],
    stack: ["Python", "Schema.org", "LLM"]
  },
  {
    id: "SYS-06",
    title: "Image Intelligence System",
    category: "MEDIA",
    summary: "Captioning, metadata embedding and archival-ready tagging for newsroom image libraries at scale.",
    metrics: [{ k: "ARCHIVAL", v: "Ready" }, { k: "EMBED", v: "IPTC / XMP" }],
    stack: ["Vision Model", "ExifTool", "Python"]
  },
  {
    id: "SYS-07",
    title: "Data → Visual Pipeline",
    category: "VISUAL",
    summary: "Automated infographic and data-to-visual generation for daily reporting and special features.",
    metrics: [{ k: "TEMPLATES", v: "Modular" }, { k: "OUTPUT", v: "SVG / PNG" }],
    stack: ["D3", "Python", "Headless Render"]
  },
  {
    id: "SYS-08",
    title: "Infra Reliability Layer",
    category: "INFRA",
    summary: "Monitoring, access control and automated remediation across VMware, Docker, Linux and Windows estates.",
    metrics: [{ k: "UPTIME", v: "99.95%" }, { k: "SCOPE", v: "Newsroom-wide" }],
    stack: ["VMware", "Docker", "Linux", "Firewalls"]
  }
];

export const stack = [
  { group: "VIRTUALIZATION", items: ["VMware vSphere", "ESXi", "Docker", "Docker Compose"] },
  { group: "AUTOMATION", items: ["Python", "Bash", "Ansible", "Cron / Systemd", "Orchestrators"] },
  { group: "AI / ML", items: ["LLM Orchestration", "Whisper", "Vision Models", "Guardrails", "RAG"] },
  { group: "SYSTEMS", items: ["Linux", "Windows Server", "Active Directory", "Networking"] },
  { group: "SECURITY", items: ["Firewalls", "Endpoint Security", "Access Control", "Hardening"] },
  { group: "DATA", items: ["PostgreSQL", "Redis", "MongoDB", "Object Storage"] }
];

export const timeline = [
  {
    year: "2021 — PRESENT",
    role: "Senior Systems Engineer",
    org: "The Daily Star",
    body: "Designing and operating automation and AI-driven systems powering editorial and operational workflows at newsroom scale."
  },
  {
    year: "2024 — PRESENT",
    role: "Founder / Architect",
    org: "AutomateBD",
    body: "Building an automation & AI solutions initiative focused on practical, production-ready systems rather than demos."
  },
  {
    year: "2018 — 2021",
    role: "Systems Engineer",
    org: "Enterprise / Media",
    body: "Virtualization, networking, endpoint security and infrastructure reliability across mixed Linux/Windows environments."
  },
  {
    year: "2017",
    role: "IT Engineer",
    org: "Early Career",
    body: "Hands-on server, network, and endpoint operations — the foundation for everything that followed."
  }
];

export const awards = [
  { id: "AWD-01", title: "Best in IT", org: "The Daily Star", note: "Multi-year recognition for engineering impact." },
  { id: "AWD-02", title: "Pandemic Ops Recognition", org: "The Daily Star", note: "Critical operational support during COVID-19 disruption." },
  { id: "AWD-03", title: "AI Systems in Production", org: "Internal", note: "Recognized for taking AI from demo to daily workflow." }
];

export const principles = [
  { k: "01", t: "Reliability first", d: "Systems are judged in production, not in demos." },
  { k: "02", t: "Guardrailed AI", d: "AI should behave like a skilled human team — not a black-box chatbot." },
  { k: "03", t: "Infra-aware design", d: "Every model lives on a machine. Design for both." },
  { k: "04", t: "Long-term systems", d: "Maintainable over clever. Boring over brittle." }
];

export const telemetry = {
  luminescence: 0.74,
  dimensionality: 0.5,
  fluidVel: "0.024 MS/S",
  sector: "091.XC-01",
  uptime: "99.95%"
};
