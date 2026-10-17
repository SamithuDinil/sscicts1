export type Arena = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  details: string[];
  color: string;
  date: string | null;
  status: string;
  icon: "gamepad" | "brain" | "palette" | "type" | "video" | "web" | "sparkles" | "pen";
  category: "inter" | "intra";
};

export const EVENT_DATE = "2027-02-12T08:00:00+05:30";

export const arenas: Arena[] = [
  // Inter-school
  {
    id: "inter-video",
    name: "Video Editing",
    short: "Video Edit",
    blurb:
      "Cut, grade and tell a story in motion. Inter-school video editing competition open to other schools.",
    details: ["Inter-school", "Storytelling & editing", "Original footage preferred"],
    color: "#ff5c5c",
    date: null,
    status: "Registration open soon",
    icon: "video",
    category: "inter",
  },
  {
    id: "inter-web",
    name: "Web Designing",
    short: "Web Design",
    blurb:
      "Build beautiful, responsive websites. Show your HTML, CSS and creativity on the inter-school stage.",
    details: ["Inter-school", "Responsive design", "Clean code & UX"],
    color: "#4da8ff",
    date: null,
    status: "Registration open soon",
    icon: "web",
    category: "inter",
  },
  {
    id: "inter-graphic",
    name: "Graphic Designing",
    short: "Graphic Design",
    blurb:
      "Turn a brief into posters, logos or layouts that stand out. Creativity and clean execution win.",
    details: ["Inter-school", "Original artwork", "Composition & colour"],
    color: "#ffb020",
    date: null,
    status: "Registration open soon",
    icon: "palette",
    category: "inter",
  },
  {
    id: "inter-minecraft",
    name: "Gaming — Minecraft",
    short: "Minecraft",
    blurb:
      "Come show your creativity by crafting in a world full of chaos and dreams. Build, survive and innovate in Minecraft.",
    details: [
      "Inter-school",
      "Creative builds & survival",
      "Show skill, imagination & teamwork",
    ],
    color: "#3ddc97",
    date: null,
    status: "Registration open soon",
    icon: "gamepad",
    category: "inter",
  },
  // Intra-school
  {
    id: "intra-video",
    name: "Video Editing",
    short: "Video Edit",
    blurb:
      "School-only video editing. Craft short films, trailers or ads with strong narrative and polish.",
    details: ["Intra-school", "Editing & effects", "School students only"],
    color: "#ff6b9d",
    date: null,
    status: "Registration open soon",
    icon: "video",
    category: "intra",
  },
  {
    id: "intra-word",
    name: "Word Advertisement Making",
    short: "Word Ad",
    blurb:
      "Create a persuasive advertisement in Microsoft Word. Layout, typography and message all count.",
    details: ["Intra-school", "Microsoft Word", "Layout & typography"],
    color: "#a78bfa",
    date: null,
    status: "Registration open soon",
    icon: "type",
    category: "intra",
  },
  {
    id: "intra-ai-ad",
    name: "AI Advertisement Making",
    short: "AI Ad",
    blurb:
      "Use AI tools to design compelling advertisements. Prompt, refine and present your best creative work.",
    details: ["Intra-school", "AI-assisted design", "Creative prompting"],
    color: "#22d3ee",
    date: null,
    status: "Registration open soon",
    icon: "sparkles",
    category: "intra",
  },
  {
    id: "intra-graphic",
    name: "Graphic Designing",
    short: "Graphic Design",
    blurb:
      "Intra-school graphic design challenge. Produce original posters, logos or social visuals.",
    details: ["Intra-school", "Original artwork", "Judged by committee"],
    color: "#f97316",
    date: null,
    status: "Registration open soon",
    icon: "palette",
    category: "intra",
  },
];

export const timeline = [
  { date: "October 20", title: "Road to A/L — Phase 1", detail: "Kick-off session for A/L students" },
  { date: "October 30", title: "Road to A/L — Phase 2", detail: "Follow-up workshops & guidance" },
  {
    date: "November 1–10",
    title: "T-shirt & Wrist Band Pre-orders",
    detail: "Submit via Google Form",
  },
  { date: "November 25–30", title: "T-shirt Launch", detail: "Official merch drop" },
  { date: "November 29–30", title: "Wrist Band Launch", detail: "Collect your bands" },
  {
    date: "November 30",
    title: "Ice Cream Stalls / Movie Festival",
    detail: "Fun day on campus",
  },
  {
    date: "November 30 – December 11",
    title: "Competition Registrations",
    detail: "Register for all Intra & Inter competitions via this website",
  },
  {
    date: "December 1st week",
    title: "Intra-School Registration Window",
    detail: "Register on the website",
  },
  {
    date: "December 2nd week",
    title: "Inter-School Registration Window",
    detail: "Open to other schools via website",
  },
  {
    date: "December last week – January",
    title: "Competitions",
    detail: "Intra-school and Inter-school events run",
  },
  {
    date: "January last week – February 12/19",
    title: "Cypher ’27",
    detail: "Grand finale & celebration",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Members" },
  { value: 8, suffix: "", label: "Competitions" },
  { value: 100, suffix: "+", label: "Active members" },
  { value: 12, suffix: "", label: "Events" },
];

export const mission = [
  "Empower students with cutting-edge skills.",
  "Foster a culture of open source collaboration.",
  "Provide mentorship from industry experts.",
];

export const projects = [
  {
    title: "Lumina AI",
    tag: "AI platform",
    text: "A powerful AI module we designed to answer our students' technical questions.",
    image: "/images/lumina.jpg",
    stack: ["Python", "Flask", "React"],
    featured: true,
  },
  {
    title: "AI Workshop",
    tag: "Workshop",
    text: "An interactive session introducing students to artificial intelligence, practical AI tools and future technology skills.",
    image: "/images/gallery-2.jpg",
    stack: [],
    featured: false,
  },
  {
    title: "Open Source Dashboard",
    tag: "Dashboard",
    text: "Analytics dashboard for monitoring society server health and traffic.",
    image: "/images/dashboard.jpg",
    stack: [],
    featured: false,
  },
];

export type BoardMember = {
  name: string;
  role: string;
  phone?: string;
};

export type Board = {
  id: string;
  year: string;
  label: string;
  current?: boolean;
  members: BoardMember[];
};

/** Current board shows first; older boards available via tabs */
export const boards: Board[] = [
  {
    id: "2026-27",
    year: "2026/27",
    label: "Current board",
    current: true,
    members: [
      { name: "M. D. Venura Dewdun", role: "President" },
      { name: "P. Uthula Induwara", role: "Vice President" },
      { name: "Shamain Bodiabadu", role: "Secretary" },
      { name: "K. W. Malindu De Silva", role: "Vice Secretary" },
      { name: "H. Ronal Fernando", role: "Treasurer" },
      { name: "K. Praveen Hansana", role: "Vice Treasurer" },
      { name: "S. L. Sihath Samarawickrama", role: "Chief Organizer / Project Coordinator" },
      { name: "Binuk Kasthuriarachchi", role: "Project Coordinator" },
      { name: "Dineth Denuwan", role: "Project Coordinator" },
      { name: "Pamitha Pasandul", role: "Media Coordinator" },
      { name: "Okith Randinu", role: "Media Coordinator" },
      { name: "Vethum Kithyuga", role: "Technical Officer" },
    ],
  },
  {
    id: "2025-26",
    year: "2025/26",
    label: "Previous board",
    members: [
      { name: "Samithu Dinil", role: "President", phone: "077-0613478" },
      { name: "Jalitha Pankaja", role: "Vice President", phone: "070-3376570" },
      { name: "Malaka Fernando", role: "Secretary", phone: "072-5080540" },
      { name: "Senitha Withanage", role: "Vice Secretary", phone: "077-7618075" },
      { name: "Nipun Nadunka", role: "Treasurer", phone: "076-8623342" },
      { name: "Anjana Sunera", role: "Vice Treasurer", phone: "074-3403596" },
    ],
  },
  {
    id: "2024-25",
    year: "2024/25",
    label: "Previous board",
    members: [
      { name: "Yashith Kularathna", role: "President", phone: "071-6943255" },
      { name: "Tharusha Navod", role: "Vice President", phone: "070-6013329" },
      { name: "Nimuth Fernando", role: "Secretary", phone: "071-5909801" },
      { name: "Sulochana Sandamayaka", role: "Vice Secretary", phone: "077-7834901" },
      { name: "Senitha Geesilu", role: "Treasurer", phone: "071-3728727" },
      { name: "Dilakshia Semal", role: "Vice Treasurer", phone: "071-1972016" },
    ],
  },
];

/** @deprecated use boards — kept for any leftover imports */
export const team = boards[0].members;

export const gallery = [
  { src: "/images/gallery-1.jpg", alt: "Society members at an ICT event", w: 1600, h: 1200 },
  { src: "/images/gallery-2.jpg", alt: "AI workshop session", w: 1600, h: 1066 },
  { src: "/images/gallery-3.jpg", alt: "Committee group photo", w: 720, h: 720 },
  { src: "/images/gallery-4.jpg", alt: "Students during a society activity", w: 1600, h: 1066 },
];

export const contact = {
  email: "contact@sscits.com",
  address: "Sri Sumangala College, Wakada, Panadura",
  socials: [
    { label: "Instagram", href: "https://instagram.com/sscicts", icon: "instagram" as const },
    { label: "Facebook", href: "https://facebook.com/sscicts", icon: "facebook" as const },
    { label: "YouTube", href: "https://youtube.com/@sscicts", icon: "youtube" as const },
    { label: "WhatsApp", href: "https://wa.me/94770000000", icon: "whatsapp" as const },
  ],
};

export const nav = [
  { href: "#arenas", label: "Competitions" },
  { href: "#timeline", label: "Timeline" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];
