export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#book-blueprint", label: "AI Blueprint" },
  { href: "#ai-concierge", label: "AI Concierge" },
  { href: "#process", label: "Process" },
  { href: "#why-us", label: "Why Us" },
] as const;

export const SERVICES = [
  {
    id: "book-editing",
    title: "Book Editing",
    description:
      "Expert developmental, line, and proofreading polish so every page reads clean and compelling.",
  },
  {
    id: "book-writing",
    title: "Book Writing",
    description:
      "Riveting manuscripts in your voice, from first outline to a finished draft ready for readers.",
  },
  {
    id: "book-publishing",
    title: "Book Publishing Services",
    description:
      "Seamless publishing across Amazon, print-on-demand, and major retail platforms.",
  },
  {
    id: "article-publication",
    title: "Article Publication",
    description:
      "Blogs and articles written, published, and shared to build traction for your brand.",
  },
  {
    id: "childrens-book-publication",
    title: "Children's Book Publication",
    description:
      "Age-right stories shaped with clear messaging kids love and parents trust.",
  },
  {
    id: "ebook-writing",
    title: "E-Book Writing",
    description:
      "Download-ready e-books with strong structure and formatting for every device.",
  },
  {
    id: "childrens-book-illustrations",
    title: "Children's Book Illustrations",
    description:
      "Illustrations and designs that make young readers eager to turn every page.",
  },
  {
    id: "book-marketing",
    title: "Book Marketing",
    description:
      "Ads, launches, and promotion that move your book from the shelf to bestseller lists.",
  },
] as const;

export const PAIN_POINTS = [
  "You have a story but struggle to put it into words",
  "Your manuscript sits unfinished on your hard drive",
  "You don't know where to start with publishing",
  "Cover design and marketing feel overwhelming",
  "You've tried DIY and the results fell short",
] as const;

export const WHY_POINTS = [
  {
    title: "Author-first process",
    text: "We shape every draft around your voice, goals, and audience. Never a template.",
  },
  {
    title: "End-to-end expertise",
    text: "Writing, editing, design, publishing, and marketing under one coordinated team.",
  },
  {
    title: "On-time delivery",
    text: "Clear milestones and transparent timelines so your launch stays on track.",
  },
  {
    title: "Confidential and secure",
    text: "Your manuscript and ideas stay private with NDAs available on request.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    role: "Memoir Author",
    quote:
      "Readsy took my scattered notes and turned them into a book I'm proud to share. The editing and cover alone felt like a professional studio.",
  },
  {
    name: "James Okonkwo",
    role: "Business Author",
    quote:
      "From ghostwriting to Amazon launch, the team handled every detail. My book hit bestseller status in its category within weeks.",
  },
  {
    name: "Elena Vargas",
    role: "Fiction Author",
    quote:
      "I finally stopped second-guessing myself. Their marketing plan and cover redesign completely changed how readers found my novel.",
  },
] as const;

export const TRUST_NAMES = [
  "Amazon",
  "Forbes",
  "Google",
  "Barnes & Noble",
  "Apple Books",
  "IngramSpark",
] as const;

export const BOOK_COVERS = [
  {
    slug: "unleash",
    title: "Unleash",
    front: "/images/book-covers-front/unleash.jpg",
    back: "/images/book-covers-back/unleash.jpg",
  },
  {
    slug: "my-walk",
    title: "My Walk",
    front: "/images/book-covers-front/my-walk.jpg",
    back: "/images/book-covers-back/my-walk.jpg",
  },
  {
    slug: "the-adventures",
    title: "The Adventures",
    front: "/images/book-covers-front/the-adventures.jpg",
    back: "/images/book-covers-back/the-adventures.jpg",
  },
  {
    slug: "pregnant-15",
    title: "Pregnant at 15",
    front: "/images/book-covers-front/pregnant-15.jpg",
    back: "/images/book-covers-back/pregnant-15.jpg",
  },
  {
    slug: "the-desire-from",
    title: "The Desire From",
    front: "/images/book-covers-front/The-desire-from.jpg",
    back: "/images/book-covers-back/The-desire-from.jpg",
  },
  {
    slug: "the-lamb",
    title: "The Lamb",
    front: "/images/book-covers-front/the-lamb.jpg",
    back: "/images/book-covers-back/the-lamb.jpg",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Share your vision",
    text: "Tell us about your idea, genre, and goals in a free consultation.",
  },
  {
    step: "02",
    title: "Build the blueprint",
    text: "We craft a custom plan covering writing, editing, design, and launch.",
  },
  {
    step: "03",
    title: "Create the manuscript",
    text: "Dedicated specialists draft, refine, and design until it feels right.",
  },
  {
    step: "04",
    title: "Publish and promote",
    text: "We get your book live and help readers discover it.",
  },
] as const;

export const STATS = [
  { value: "2,400+", label: "Books delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "15+", label: "Years combined experience" },
  { value: "50+", label: "Genres covered" },
] as const;
