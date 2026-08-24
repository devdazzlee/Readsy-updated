export const NAV_LINKS = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/cover-generator", label: "Cover Generator" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
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
    avatar: "/images/testimonials/sarah-mitchell.jpg",
    quote:
      "The Readsy Publishers took my scattered notes and turned them into a book I'm proud to share. The editing and cover alone felt like a professional studio.",
  },
  {
    name: "James Okonkwo",
    role: "Business Author",
    avatar: "/images/testimonials/james-okonkwo.jpg",
    quote:
      "From ghostwriting to Amazon launch, the team handled every detail. My book hit bestseller status in its category within weeks.",
  },
  {
    name: "Elena Vargas",
    role: "Fiction Author",
    avatar: "/images/testimonials/elena-vargas.jpg",
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

export const BOOK_CATEGORIES = [
  "Memoir & Nonfiction",
  "Children's Books",
  "Fiction",
] as const;

export const BOOK_COVERS = [
  {
    slug: "unleash",
    title: "Unleash",
    category: "Memoir & Nonfiction",
    front: "/images/book-covers-front/unleash.jpg",
    back: "/images/book-covers-back/unleash.jpg",
  },
  {
    slug: "my-walk",
    title: "My Walk",
    category: "Memoir & Nonfiction",
    front: "/images/book-covers-front/my-walk.jpg",
    back: "/images/book-covers-back/my-walk.jpg",
  },
  {
    slug: "the-adventures",
    title: "The Adventures",
    category: "Children's Books",
    front: "/images/book-covers-front/the-adventures.jpg",
    back: "/images/book-covers-back/the-adventures.jpg",
  },
  {
    slug: "pregnant-15",
    title: "Pregnant at 15",
    category: "Memoir & Nonfiction",
    front: "/images/book-covers-front/pregnant-15.jpg",
    back: "/images/book-covers-back/pregnant-15.jpg",
  },
  {
    slug: "the-desire-from",
    title: "The Desire From",
    category: "Fiction",
    front: "/images/book-covers-front/The-desire-from.jpg",
    back: "/images/book-covers-back/The-desire-from.jpg",
  },
  {
    slug: "the-lamb",
    title: "The Lamb",
    category: "Children's Books",
    front: "/images/book-covers-front/the-lamb1.jpg",
    back: "/images/book-covers-back/the-lamb.jpg",
  },
] as const;

export const MORE_BOOK_COVERS = [
  {
    slug: "shattered-lives",
    title: "Shattered Lives",
    author: "Alex",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/shattered-lives.jpg",
  },
  {
    slug: "the-long-road-home",
    title: "The Long Road Home",
    author: "West Hand",
    category: "Fiction",
    front: "/images/more-book-covers/the-long-road-home.jpg",
  },
  {
    slug: "into-enlightenment-we-go",
    title: "Into Enlightenment We Go",
    author: "Charles Balter",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/into-enlightenment-we-go.jpg",
  },
  {
    slug: "highly-sensitive",
    title: "Highly Sensitive in a Highly Social World",
    author: "Dr. Amy Hanes",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/highly-sensitive.jpg",
  },
  {
    slug: "will-survive",
    title: "Will Survive",
    author: "Amaya Konoma",
    category: "Fiction",
    front: "/images/more-book-covers/will-survive.jpg",
  },
  {
    slug: "dope-days-1",
    title: "Don't Remember Any Good Dope Days",
    author: "Robert Durst",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/dope-days-1.jpg",
  },
  {
    slug: "green-card-lottery-1",
    title: "Green Card Lottery and American Dream",
    author: "John K Kananda",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/green-card-lottery-1.jpg",
  },
  {
    slug: "worth-the-wait",
    title: "Worth the Wait",
    author: "Richard Emerson Williams",
    category: "Fiction",
    front: "/images/more-book-covers/worth-the-wait.jpg",
  },
  {
    slug: "dope-days-2",
    title: "Don't Remember Any Good Dope Days",
    author: "Robert Durst",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/dope-days-2.jpg",
  },
  {
    slug: "heroes-of-repocity",
    title: "Heroes of Repocity",
    author: "Alison Saul",
    category: "Fiction",
    front: "/images/more-book-covers/heroes-of-repocity.jpg",
  },
  {
    slug: "modern-history-of-people",
    title: "Modern History of People",
    author: null,
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/modern-history-of-people.jpg",
  },
  {
    slug: "ton-giao-dong-phuong",
    title: "Tôn Giáo Đông Phương",
    author: "Phan Hòa Hiệp & Đặng Hùng Sơn",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/ton-giao-dong-phuong.jpg",
  },
  {
    slug: "green-card-lottery-2",
    title: "Green Card Lottery and American Dream",
    author: "John K Kananda",
    category: "Memoir & Nonfiction",
    front: "/images/more-book-covers/green-card-lottery-2.jpg",
  },
  {
    slug: "musings-of-marcus",
    title: "Musings of Marcus",
    author: "P. Rosemary French",
    category: "Children's Books",
    front: "/images/more-book-covers/musings-of-marcus.jpg",
  },
  {
    slug: "sleeping-with-the-beast",
    title: "Sleeping with the Beast",
    author: "Susan Papalia",
    category: "Fiction",
    front: "/images/more-book-covers/sleeping-with-the-beast.jpg",
  },
] as const;

export const ALL_BOOK_COVERS = [
  ...BOOK_COVERS.map((book) => ({
    slug: book.slug,
    title: book.title,
    author: null as string | null,
    category: book.category,
    front: book.front,
    back: book.back,
  })),
  ...MORE_BOOK_COVERS.map((book) => ({
    slug: book.slug,
    title: book.title,
    author: book.author,
    category: book.category,
    front: book.front,
    back: book.front,
  })),
];

export const PRICING_PLANS = [
  {
    id: "ghost-writing",
    title: "Ghost Writing",
    price: "$2,999",
    unit: "/ manuscript",
    description:
      "A dedicated ghostwriter turns your ideas, notes, or interviews into a polished, publish-ready manuscript in your voice.",
    features: [
      "Dedicated writer & project lead",
      "Outline + chapter-by-chapter drafts",
      "Unlimited revision rounds",
      "Confidential, NDA-backed process",
    ],
    popular: true,
  },
  {
    id: "book-writing",
    title: "Book Writing",
    price: "$2,499",
    unit: "/ manuscript",
    description:
      "Full manuscript development from your concept to a finished draft ready for editing.",
    features: [
      "Concept & outline development",
      "Full first draft",
      "Structural feedback pass",
      "Genre-specific voice coaching",
    ],
    popular: false,
  },
  {
    id: "book-editing",
    title: "Book Editing",
    price: "$599",
    unit: "/ manuscript",
    description:
      "Developmental, line, and copy editing that sharpens structure, voice, and grammar.",
    features: [
      "Developmental + line edit",
      "Copyedit & proofreading pass",
      "Editor's style memo",
      "Track-changes manuscript",
    ],
    popular: false,
  },
  {
    id: "book-proofreading",
    title: "Book Proofreading",
    price: "$299",
    unit: "/ manuscript",
    description:
      "A final polish pass that catches typos, formatting slips, and consistency errors before launch.",
    features: [
      "Grammar & spelling pass",
      "Formatting consistency check",
      "Two rounds of review",
      "5-7 business day turnaround",
    ],
    popular: false,
  },
  {
    id: "book-publishing",
    title: "Book Publishing",
    price: "$499",
    unit: "/ title",
    description:
      "Full-service publishing across Amazon KDP, IngramSpark, and major retail platforms.",
    features: [
      "Interior & cover formatting",
      "ISBN & metadata setup",
      "Amazon, KDP & IngramSpark listing",
      "Print & e-book distribution",
    ],
    popular: true,
  },
  {
    id: "book-marketing",
    title: "Book Marketing",
    price: "$699",
    unit: "/ campaign",
    description:
      "Launch strategy and ongoing promotion to help readers actually find your book.",
    features: [
      "Launch strategy & timeline",
      "Amazon ad campaign setup",
      "Author landing page",
      "Review & influencer outreach",
    ],
    popular: false,
  },
  {
    id: "book-promotion",
    title: "Book Promotion",
    price: "$399",
    unit: "/ campaign",
    description:
      "Targeted promotional pushes to build momentum and get your book in front of readers.",
    features: [
      "Bestseller campaign push",
      "Newsletter & promo placements",
      "Social media promo kit",
      "Performance report",
    ],
    popular: false,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    price: "$599",
    unit: "/ month",
    description:
      "Ongoing social, email, and ad management to grow your author brand beyond the launch.",
    features: [
      "Social media management",
      "Email newsletter campaigns",
      "Paid ad management",
      "Monthly performance report",
    ],
    popular: false,
  },
  {
    id: "childrens-book-publication",
    title: "Children's Book Publication",
    price: "$899",
    unit: "/ title",
    description:
      "End-to-end publishing for picture books and early readers, sized and formatted right.",
    features: [
      "Age-right interior formatting",
      "Print-ready layout",
      "ISBN & retail listing",
      "Parent & educator-friendly packaging",
    ],
    popular: false,
  },
  {
    id: "childrens-book-illustrations",
    title: "Children's Book Illustrations",
    price: "$799",
    unit: "/ book",
    description:
      "Custom illustrations that bring your story to life for young readers.",
    features: [
      "Custom character design",
      "Full-book illustration set",
      "Two rounds of revisions",
      "Print & digital-ready files",
    ],
    popular: false,
  },
  {
    id: "article-publication",
    title: "Article Publication",
    price: "$199",
    unit: "/ article",
    description:
      "Blogs and articles written, optimized, and published to build traction for your brand.",
    features: [
      "SEO-optimized writing",
      "Publish-ready formatting",
      "One round of revisions",
      "3-5 business day turnaround",
    ],
    popular: false,
  },
  {
    id: "ebook-writing",
    title: "E-Book Writing",
    price: "$1,499",
    unit: "/ manuscript",
    description:
      "Download-ready e-books with strong structure and formatting for every device.",
    features: [
      "Structured chapter outline",
      "Full e-book manuscript",
      "EPUB & PDF formatting",
      "Device-ready layout",
    ],
    popular: false,
  },
] as const;

export const PRICING_FAQS = [
  {
    q: "Are these prices fixed, or do they vary by project?",
    a: "These are starting prices. Your exact quote depends on manuscript length, genre, and how much support you need — a specialist will give you an exact number after a free consultation.",
  },
  {
    q: "Can I bundle multiple services for a better rate?",
    a: "Yes. Most authors combine writing, editing, design, and marketing into one package. Bundling multiple services together typically comes with a discount off the individual prices shown here.",
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes, flexible milestone-based payment plans are available on most services so you're never paying the full project cost upfront.",
  },
  {
    q: "How long does a typical project take?",
    a: "Editing and proofreading usually take 1-3 weeks. Ghostwriting and full book writing typically run 8-16 weeks depending on length. Publishing and marketing timelines are scoped during your consultation.",
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
