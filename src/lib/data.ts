export type Arena = {
  id: string;
  name: string;
  short: string;
  blurb: string;
  details: string[];
  color: string;
  date: string | null;
  status: string;
  icon: "gamepad" | "brain" | "palette" | "type";
};

export const EVENT_DATE = "2026-10-24T08:00:00+05:30";

export const arenas: Arena[] = [
  {
    id: "gaming",
    name: "Gaming Zone",
    short: "Gaming",
    blurb:
      "A place to relax, have fun and enjoy friendly games. Play responsibly and respect school rules.",
    details: ["Friendly matches", "Open to all grades", "School rules apply"],
    color: "#3ddc97",
    date: "Oct 24, 2026",
    status: "Upcoming",
    icon: "gamepad",
  },
  {
    id: "quiz",
    name: "Quiz Competition",
    short: "Quiz",
    blurb:
      "Test what you know about ICT, technology and the digital world against the rest of the school.",
    details: ["ICT and technology", "Fast rounds", "Live scoring"],
    color: "#4da8ff",
    date: null,
    status: "Date announced soon",
    icon: "brain",
  },
  {
    id: "design",
    name: "Graphic Design Competition",
    short: "Graphic Design",
    blurb:
      "Turn a brief into a poster, logo or layout that stands out. Creativity, composition and clean execution win.",
    details: ["Original artwork", "Composition and colour", "Judged by committee"],
    color: "#ffb020",
    date: null,
    status: "Date announced soon",
    icon: "palette",
  },
  {
    id: "word-ad",
    name: "Word Advertisement Making",
    short: "Word Ad",
    blurb:
      "Create a persuasive advertisement in Microsoft Word. Layout, typography and message all count.",
    details: ["Microsoft Word", "Layout and typography", "Clear message"],
    color: "#a78bfa",
    date: null,
    status: "Date announced soon",
    icon: "type",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Members" },
  { value: 5, suffix: "", label: "Projects" },
  { value: 100, suffix: "+", label: "Active members" },
  { value: 8, suffix: "", label: "Events" },
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

export const team = [
  { name: "Samithu Dinil", role: "President" },
  { name: "Jalitha Pankaja", role: "Vice President" },
  { name: "Malaka Fernando", role: "Secretary" },
  { name: "Senitha Withanage", role: "Vice Secretary" },
];

export const gallery = [
  { src: "/images/gallery-1.jpg", alt: "Society members at an ICT event", w: 1600, h: 1200 },
  { src: "/images/gallery-2.jpg", alt: "AI workshop session", w: 1600, h: 1066 },
  { src: "/images/gallery-3.jpg", alt: "Committee group photo", w: 720, h: 720 },
  { src: "/images/gallery-4.jpg", alt: "Students during a society activity", w: 1600, h: 1066 },
];

export const contact = {
  email: "contact@sscits.com",
  address: "Sri Sumangala College, Wakada, Panadura",
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { href: "#arenas", label: "Competitions" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];
