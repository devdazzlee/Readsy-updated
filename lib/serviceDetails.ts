export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  price: string;
  unit: string;
  heroSubtext: string;
  stat: { value: string; label: string };
  benefits: { icon: string; title: string; text: string }[];
  subServices: { title: string; text: string }[];
  process: { step: string; title: string; text: string }[];
  deliverables: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: "ghost-writing",
    title: "Ghost Writing",
    tagline: "Your story, professionally written",
    price: "$2,999",
    unit: "/ manuscript",
    heroSubtext:
      "Share your ideas, voice notes, or rough chapters — our ghostwriters turn them into a polished, publish-ready manuscript that sounds exactly like you.",
    stat: { value: "150+", label: "manuscripts ghostwritten" },
    benefits: [
      {
        icon: "feather",
        title: "One dedicated ghostwriter",
        text: "A single writer stays with your project start to finish, learning your voice and story inside out.",
      },
      {
        icon: "map",
        title: "A structured process",
        text: "Outline, drafts, and milestones so you always know exactly what's next.",
      },
      {
        icon: "refresh",
        title: "Unlimited revisions",
        text: "We keep refining chapters until every page sounds exactly like you.",
      },
      {
        icon: "shield",
        title: "Total confidentiality",
        text: "An NDA-backed process — your name stays on the cover, your process stays private.",
      },
    ],
    subServices: [
      { title: "Memoir Ghostwriting", text: "Your life story, shaped into a compelling, publishable memoir written in your authentic voice." },
      { title: "Business & Thought Leadership", text: "Books that establish your expertise, built from interviews, existing content, and your professional insight." },
      { title: "Fiction Ghostwriting", text: "A full-length novel developed from your concept, characters, and outline, written in a genre-matched voice." },
      { title: "Self-Help & How-To Books", text: "A practical, structured guide that turns your expertise into a book readers can actually act on." },
      { title: "Autobiography Collaboration", text: "A deeply personal, chronological account of your life, developed through in-depth recorded interviews." },
      { title: "Speech-to-Book Development", text: "We turn your recorded talks, voice memos, or interviews into a fully structured, cohesive manuscript." },
    ],
    process: [
      { step: "01", title: "Discovery call", text: "We learn your story, goals, and voice in a free consultation." },
      { step: "02", title: "Outline & structure", text: "A chapter-by-chapter map you approve before writing begins." },
      { step: "03", title: "Drafting", text: "Your ghostwriter drafts chapters in batches for your feedback." },
      { step: "04", title: "Final manuscript", text: "A polished, publish-ready manuscript delivered in your voice." },
    ],
    deliverables: [
      "Full-length manuscript written in your voice",
      "Chapter-by-chapter outline",
      "Unlimited revision rounds",
      "Signed NDA and confidential process",
      "A dedicated project manager",
    ],
    faqs: [
      {
        q: "Will the book really sound like me?",
        a: "Yes. We start with an in-depth voice interview and revise every chapter until it reads the way you'd actually say it.",
      },
      {
        q: "How long does ghostwriting take?",
        a: "Most manuscripts take 8-16 weeks depending on length and how quickly you review drafts.",
      },
      {
        q: "Do I own the copyright?",
        a: "Yes. Full copyright transfers to you. Your ghostwriter signs an NDA and receives no author credit unless you choose to share it.",
      },
      {
        q: "What if I don't like the direction after a few chapters?",
        a: "That's what the outline and early drafts are for — we course-correct before the full manuscript is written, so nothing drifts too far off track before you've seen it.",
      },
      {
        q: "How involved do I need to be during writing?",
        a: "As much or as little as you'd like. Most clients do a few interviews upfront, then review chapters as they arrive — usually a few hours of your time per month.",
      },
      {
        q: "Can you write in a genre you haven't ghostwritten before?",
        a: "Our team covers memoir, business, self-help, and fiction. If your project is outside that range, we'll tell you upfront during the consultation.",
      },
    ],
  },
  {
    slug: "book-writing",
    title: "Book Writing",
    tagline: "From concept to finished draft",
    price: "$2,499",
    unit: "/ manuscript",
    heroSubtext:
      "Whether you have a rough idea or a stack of notes, our writers help you develop it into a complete, well-structured manuscript ready for editing.",
    stat: { value: "8-16", label: "weeks to a finished draft" },
    benefits: [
      {
        icon: "lightbulb",
        title: "Concept development",
        text: "We shape a loose idea into a clear premise, structure, and chapter plan before a word is drafted.",
      },
      {
        icon: "layout",
        title: "Structural editing built in",
        text: "Every draft is checked for pacing and flow as it's written, not left for later.",
      },
      {
        icon: "mic",
        title: "Genre-matched voice",
        text: "A writer experienced in your genre, so tone and pacing feel native, not generic.",
      },
      {
        icon: "calendar",
        title: "Weekly check-ins",
        text: "Regular progress updates so you're never left wondering where your book stands.",
      },
    ],
    subServices: [
      { title: "Fiction Manuscript Development", text: "A complete novel developed from your concept, characters, and outline." },
      { title: "Memoir & Personal Story Writing", text: "Your own experiences shaped into a structured, readable narrative." },
      { title: "Business Book Writing", text: "A book that builds authority, developed from your expertise and material." },
      { title: "Self-Help & Non-Fiction Writing", text: "A practical, well-organized guide built around your method or framework." },
      { title: "Co-Writing & Collaboration", text: "You draft, we shape — a hands-on partnership for authors who want to write alongside a pro." },
      { title: "Outline-to-Draft Development", text: "Already have an outline? We turn it into a complete, polished first draft." },
    ],
    process: [
      { step: "01", title: "Concept workshop", text: "We refine your idea into a clear premise and reader promise." },
      { step: "02", title: "Outline & sample chapter", text: "A full outline plus one sample chapter for your approval." },
      { step: "03", title: "Full draft", text: "Chapters delivered in batches with room for your feedback." },
      { step: "04", title: "Structural review", text: "A pacing and structure pass before handoff to editing." },
    ],
    deliverables: [
      "Complete manuscript draft",
      "Chapter-by-chapter outline",
      "Genre-specific style guide",
      "Two rounds of structural feedback",
      "A dedicated writing coach",
    ],
    faqs: [
      {
        q: "Do you write the whole book, or help me write it?",
        a: "Both options are available — full-service writing or a collaborative coaching model where you draft and we shape it. Tell us your preference in the consultation.",
      },
      {
        q: "What if I only have a rough idea?",
        a: "That's the most common starting point. Our concept workshop turns a loose idea into a structured, writable plan.",
      },
      {
        q: "Is editing included?",
        a: "This service covers writing and structural review. Line editing and proofreading are separate services, often bundled at a discount.",
      },
      {
        q: "How much of the writing will actually be mine?",
        a: "As much as you want. We work from your notes, voice, and feedback — the goal is a book that reads like you, not a template.",
      },
      {
        q: "What happens if I miss a feedback deadline?",
        a: "Your writing coach adjusts the schedule with you. We'd rather wait for real feedback than rush chapters you're not happy with.",
      },
    ],
  },
  {
    slug: "book-editing",
    title: "Book Editing",
    tagline: "Every page, sharpened",
    price: "$599",
    unit: "/ manuscript",
    heroSubtext:
      "Developmental, line, and copy editing that tightens your structure, strengthens your voice, and catches every error before print.",
    stat: { value: "3", label: "editing passes per manuscript" },
    benefits: [
      {
        icon: "layers",
        title: "Developmental edit",
        text: "Big-picture feedback on structure, pacing, and plot or argument before line-level work begins.",
      },
      {
        icon: "penTool",
        title: "Line edit for voice",
        text: "Sentence-level polish that sharpens rhythm and tone without losing your voice.",
      },
      {
        icon: "search",
        title: "Copyedit for grammar",
        text: "Grammar, punctuation, and consistency checked line by line.",
      },
      {
        icon: "fileCheck",
        title: "Editor's style memo",
        text: "A written summary of decisions and patterns so future chapters stay consistent.",
      },
    ],
    subServices: [
      { title: "Manuscript Critique", text: "An honest, thorough read that highlights the strengths and weaknesses of your draft." },
      { title: "Editorial Assessment", text: "A comprehensive evaluation of your manuscript with detailed, actionable feedback." },
      { title: "Developmental Editing", text: "Structure, pacing, character, and argument reworked at the big-picture level." },
      { title: "Line Editing", text: "Sentence-by-sentence polish that sharpens rhythm, clarity, and voice." },
      { title: "Copyediting", text: "Grammar, punctuation, and consistency corrected throughout the manuscript." },
      { title: "Query Letter Polish", text: "A tightened, professional query letter built to catch a literary agent's attention." },
    ],
    process: [
      { step: "01", title: "Manuscript assessment", text: "Your editor reads the full manuscript and maps priorities." },
      { step: "02", title: "Developmental edit", text: "Structural and content feedback on the big picture." },
      { step: "03", title: "Line & copy edit", text: "Sentence-level polish and grammar correction throughout." },
      { step: "04", title: "Final polish", text: "A last pass to confirm consistency before you move to print." },
    ],
    deliverables: [
      "Fully edited manuscript with tracked changes",
      "Editorial letter with structural notes",
      "Style sheet for consistency",
      "Two rounds of revisions",
      "Formatting consistency check",
    ],
    faqs: [
      {
        q: "What's the difference between developmental, line, and copy editing?",
        a: "Developmental editing addresses structure and content, line editing polishes voice and flow, and copyediting fixes grammar and consistency. Most manuscripts need all three.",
      },
      {
        q: "How long does editing take?",
        a: "Typically 2-4 weeks depending on manuscript length and how many editing passes are needed.",
      },
      {
        q: "Do you edit manuscripts you didn't write?",
        a: "Yes. Most of our editing clients bring their own drafts. We work with any completed manuscript.",
      },
      {
        q: "Will I lose my voice in the edit?",
        a: "No. Our editors work to sharpen your voice, not replace it. Every structural or line-level suggestion respects the way you write.",
      },
      {
        q: "Can you edit a manuscript that still needs a lot of work?",
        a: "Yes. That's exactly what developmental editing is for. We'll flag the scope honestly during your manuscript assessment.",
      },
    ],
  },
  {
    slug: "book-proofreading",
    title: "Book Proofreading",
    tagline: "The last read before print",
    price: "$299",
    unit: "/ manuscript",
    heroSubtext:
      "A meticulous final pass that catches typos, formatting slips, and inconsistencies your manuscript can't launch without fixing.",
    stat: { value: "500+", label: "errors caught on average" },
    benefits: [
      {
        icon: "search",
        title: "Grammar & spelling sweep",
        text: "Every sentence checked for typos, punctuation, and grammar errors.",
      },
      {
        icon: "layout",
        title: "Formatting consistency",
        text: "Chapter headings, spacing, and layout checked for consistency throughout.",
      },
      {
        icon: "refresh",
        title: "Two review passes",
        text: "A first proofing pass plus a second independent verification pass.",
      },
      {
        icon: "timer",
        title: "Fast turnaround",
        text: "Most manuscripts are returned within 5-7 business days.",
      },
    ],
    subServices: [
      { title: "Manuscript Proofreading", text: "A full-manuscript pass catching typos, grammar slips, and inconsistencies." },
      { title: "Print-File Proofing", text: "A final check on formatted print files before they go to the printer." },
      { title: "E-Book Formatting Check", text: "Verifying your EPUB or Kindle file displays cleanly across devices." },
      { title: "Grammar & Punctuation Pass", text: "Line-by-line correction of grammar, punctuation, and spelling errors." },
      { title: "Consistency & Style Check", text: "Names, timelines, and formatting checked for consistency start to finish." },
      { title: "Final Pre-Launch Read", text: "One last read-through immediately before you hit publish." },
    ],
    process: [
      { step: "01", title: "Manuscript intake", text: "We confirm formatting requirements and target platforms." },
      { step: "02", title: "First proofing pass", text: "A full read-through catching errors line by line." },
      { step: "03", title: "Second verification pass", text: "A different proofreader reviews the corrected file." },
      { step: "04", title: "Clean final file", text: "A print-ready manuscript, free of errors and inconsistencies." },
    ],
    deliverables: [
      "Fully proofed manuscript",
      "Summary error report",
      "Formatting consistency check",
      "Print-ready final file",
      "5-7 business day turnaround",
    ],
    faqs: [
      {
        q: "Is proofreading the same as editing?",
        a: "No. Proofreading is the final error-catching pass after editing is complete — it doesn't address structure or style.",
      },
      {
        q: "Can you proofread an already-formatted PDF?",
        a: "Yes, we can proofread manuscripts in Word, Google Docs, or formatted PDF files.",
      },
      {
        q: "What if you find a lot of errors?",
        a: "We flag patterns in a summary report so you understand what to watch for in future writing, not just a marked-up file.",
      },
      {
        q: "Do you proofread children's books and short manuscripts?",
        a: "Yes. Turnaround is even faster for shorter manuscripts — we'll confirm an exact timeline once we see the file.",
      },
      {
        q: "Can proofreading catch factual or continuity errors?",
        a: "We flag anything we notice, but proofreading focuses on language and formatting. Continuity checks are part of developmental editing.",
      },
    ],
  },
  {
    slug: "book-publishing",
    title: "Book Publishing",
    tagline: "From manuscript to marketplace",
    price: "$499",
    unit: "/ title",
    heroSubtext:
      "We handle formatting, ISBNs, and distribution so your book goes live on Amazon, IngramSpark, and major retailers correctly the first time.",
    stat: { value: "2,400+", label: "titles published" },
    benefits: [
      {
        icon: "layout",
        title: "Interior & cover formatting",
        text: "Print and e-book files formatted to each platform's exact specifications.",
      },
      {
        icon: "fileCheck",
        title: "ISBN & metadata setup",
        text: "Registration and metadata handled so your book is discoverable and correctly categorized.",
      },
      {
        icon: "globe",
        title: "Multi-platform distribution",
        text: "Listed on Amazon, KDP, IngramSpark, and other major retail and print-on-demand platforms.",
      },
      {
        icon: "bookOpen",
        title: "Author dashboard access",
        text: "You keep full visibility and control of your published title's accounts.",
      },
    ],
    subServices: [
      { title: "Amazon KDP Publishing", text: "Full setup and listing on Amazon's Kindle Direct Publishing platform." },
      { title: "IngramSpark Wide Distribution", text: "Listing across thousands of retailers and libraries worldwide." },
      { title: "Print-on-Demand Setup", text: "No inventory required — copies print only when a reader orders one." },
      { title: "E-Book Formatting & Publishing", text: "A clean, device-tested digital edition ready for every major store." },
      { title: "ISBN & Metadata Registration", text: "Proper registration and categorization so your book is discoverable." },
      { title: "Audiobook Distribution Setup", text: "Guidance and setup to get a produced audiobook listed and selling." },
    ],
    process: [
      { step: "01", title: "Format & prep", text: "Interior and cover files prepared for print and digital." },
      { step: "02", title: "ISBN & metadata", text: "Registration, categories, and keywords set up for discoverability." },
      { step: "03", title: "Platform submission", text: "Your book is submitted to Amazon, KDP, and IngramSpark." },
      { step: "04", title: "Launch verification", text: "We confirm your listing is live and displaying correctly." },
    ],
    deliverables: [
      "Formatted print and e-book files",
      "ISBN registration",
      "Amazon, KDP & IngramSpark listings",
      "Physical proof copy review",
      "Launch-day checklist",
    ],
    faqs: [
      {
        q: "Do I keep the rights to my book?",
        a: "Yes, you retain full rights and royalties. We handle the publishing process on your behalf using your own author accounts.",
      },
      {
        q: "How long does publishing take?",
        a: "Typically 2-3 weeks from a finished, formatted manuscript to a live listing, depending on platform review times.",
      },
      {
        q: "Can you publish a book I already wrote and edited?",
        a: "Yes. Many clients come to us with a finished manuscript and just need the publishing process handled correctly.",
      },
      {
        q: "What's the difference between KDP and IngramSpark?",
        a: "KDP covers Amazon specifically. IngramSpark distributes to a much wider network of retailers, libraries, and bookstores. Many authors use both.",
      },
      {
        q: "Do you handle print copies I can hold and sell myself?",
        a: "Yes. Print-on-demand ordering lets you buy author copies at cost for events, gifts, or in-person sales.",
      },
    ],
  },
  {
    slug: "book-marketing",
    title: "Book Marketing",
    tagline: "Get discovered by the right readers",
    price: "$699",
    unit: "/ campaign",
    heroSubtext:
      "A launch strategy, ad campaigns, and outreach plan built around your genre and audience — not a generic template.",
    stat: { value: "3x", label: "average launch-week reach" },
    benefits: [
      {
        icon: "target",
        title: "Launch strategy & timeline",
        text: "A week-by-week plan covering pre-launch, launch day, and the weeks after.",
      },
      {
        icon: "trending",
        title: "Amazon ad management",
        text: "Campaigns built, launched, and optimized to reach readers actively searching your genre.",
      },
      {
        icon: "globe",
        title: "Author landing page",
        text: "A dedicated page to convert visitors into readers and email subscribers.",
      },
      {
        icon: "users",
        title: "Review & influencer outreach",
        text: "Outreach to reviewers and bookstagrammers matched to your genre.",
      },
    ],
    subServices: [
      { title: "Launch Strategy & Timeline", text: "A week-by-week plan covering pre-launch, launch day, and the weeks after." },
      { title: "Amazon Ad Campaigns", text: "Ads built and optimized to reach readers actively searching your genre." },
      { title: "Author Website & Landing Pages", text: "A dedicated page built to convert visitors into readers and subscribers." },
      { title: "Email List Building", text: "Lead magnets and sign-up flows that grow your reader list before and after launch." },
      { title: "Reviewer & Media Outreach", text: "Outreach to reviewers, podcasts, and press matched to your genre." },
      { title: "Social Media Launch Content", text: "A content plan and creative assets to carry your launch across social channels." },
    ],
    process: [
      { step: "01", title: "Audience research", text: "We identify who your readers are and where they discover books." },
      { step: "02", title: "Launch plan", text: "A full pre-launch to post-launch strategy and content calendar." },
      { step: "03", title: "Campaign execution", text: "Ads, outreach, and content go live on schedule." },
      { step: "04", title: "Performance reporting", text: "Clear reporting on reach, clicks, and campaign results." },
    ],
    deliverables: [
      "Custom launch strategy document",
      "Amazon ad campaign setup",
      "Dedicated author landing page",
      "Reviewer & influencer outreach list",
      "Monthly performance report",
    ],
    faqs: [
      {
        q: "When should I start marketing?",
        a: "Ideally 8-12 weeks before your launch date, so outreach and pre-orders can build momentum.",
      },
      {
        q: "Do you guarantee bestseller status?",
        a: "No one can honestly guarantee that. We build a real strategy around your genre and budget to maximize your chances.",
      },
      {
        q: "Can this work for an already-published book?",
        a: "Yes. Re-launch and backlist marketing campaigns follow the same strategic process.",
      },
      {
        q: "What's my role during the campaign?",
        a: "We handle execution — you approve strategy and creative direction along the way. Expect a few check-ins, not a full-time job.",
      },
      {
        q: "What budget do I need for ads?",
        a: "Ad spend is separate from the service fee and scales to your goals. We recommend a starting budget during your strategy session.",
      },
    ],
  },
  {
    slug: "book-promotion",
    title: "Book Promotion",
    tagline: "Momentum that outlasts launch day",
    price: "$399",
    unit: "/ campaign",
    heroSubtext:
      "Bestseller pushes, newsletter placements, and social campaigns that keep your book in front of readers long after release week.",
    stat: { value: "6", label: "promo channels per campaign" },
    benefits: [
      {
        icon: "trending",
        title: "Bestseller campaign push",
        text: "A coordinated push designed to spike sales rank during a focused window.",
      },
      {
        icon: "mail",
        title: "Newsletter placements",
        text: "Your book featured in reader newsletters matched to your genre.",
      },
      {
        icon: "megaphone",
        title: "Social promo kit",
        text: "Ready-to-post graphics and copy for your own social channels.",
      },
      {
        icon: "barChart",
        title: "Performance tracking",
        text: "A clear report showing reach and results from every channel used.",
      },
    ],
    subServices: [
      { title: "Bestseller Campaign Push", text: "A coordinated push designed to spike sales rank during a focused window." },
      { title: "BookBub & Newsletter Placements", text: "Your book featured in reader newsletters matched to your genre." },
      { title: "Goodreads & Reader Community Outreach", text: "Building buzz and reviews in the communities where readers already gather." },
      { title: "Social Media Promo Kits", text: "Ready-to-post graphics and copy for your own social channels." },
      { title: "Blog Tour Coordination", text: "Placements and features booked across genre-relevant book blogs." },
      { title: "Giveaway & Contest Campaigns", text: "Reader giveaways designed to build mailing lists and word of mouth." },
    ],
    process: [
      { step: "01", title: "Campaign planning", text: "We choose the right channels and timing for your genre and goal." },
      { step: "02", title: "Placement booking", text: "Newsletter and promo site placements are booked in advance." },
      { step: "03", title: "Promo push", text: "Coordinated promotion runs across every booked channel." },
      { step: "04", title: "Results review", text: "A wrap-up report showing what worked and what to repeat." },
    ],
    deliverables: [
      "Bestseller campaign submission",
      "Newsletter & promo site placements",
      "Social media promo kit",
      "Coordinated promotion schedule",
      "Post-campaign performance report",
    ],
    faqs: [
      {
        q: "How is this different from Book Marketing?",
        a: "Marketing builds your overall strategy and ad campaigns. Promotion is a focused push through specific paid placements and outreach channels for a short window.",
      },
      {
        q: "Can I run this alongside a launch?",
        a: "Yes, promotion campaigns are commonly paired with a launch, or used later to re-energize sales on an existing title.",
      },
      {
        q: "What genres does this work best for?",
        a: "Promo channels vary by genre — we match the placement list to fiction, memoir, business, or children's books accordingly.",
      },
      {
        q: "How fast can a campaign start?",
        a: "Most placements can be booked within 1-2 weeks. Popular newsletter slots sometimes need a longer lead time — we'll confirm during planning.",
      },
      {
        q: "Do you provide the graphics, or do I?",
        a: "We design the social promo kit for you. If you have existing brand assets, we'll work them into the campaign.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    tagline: "Build your author brand, not just a launch",
    price: "$599",
    unit: "/ month",
    heroSubtext:
      "Ongoing social, email, and paid ad management that grows your audience between books, not just around one release.",
    stat: { value: "Monthly", label: "strategy calls & reporting" },
    benefits: [
      {
        icon: "megaphone",
        title: "Social media management",
        text: "Consistent, on-brand posting across your author's social channels.",
      },
      {
        icon: "mail",
        title: "Email newsletter campaigns",
        text: "Regular newsletters that keep your reader list warm between releases.",
      },
      {
        icon: "trending",
        title: "Paid ad management",
        text: "Ongoing ad campaigns managed and optimized month over month.",
      },
      {
        icon: "barChart",
        title: "Monthly analytics report",
        text: "Clear reporting on growth, engagement, and what's working.",
      },
    ],
    subServices: [
      { title: "Social Media Management", text: "Consistent, on-brand posting across your author's social channels." },
      { title: "Email Newsletter Campaigns", text: "Regular newsletters that keep your reader list warm between releases." },
      { title: "Paid Ad Management", text: "Ongoing ad campaigns managed and optimized month over month." },
      { title: "Content Calendar Strategy", text: "A month-ahead plan so content stays consistent instead of reactive." },
      { title: "Author Brand Website Management", text: "Updates, maintenance, and improvements to your author website." },
      { title: "Analytics & Growth Reporting", text: "Clear monthly reporting on what's working and what to adjust." },
    ],
    process: [
      { step: "01", title: "Brand audit", text: "We review your current presence and identify quick wins." },
      { step: "02", title: "Content calendar", text: "A month-ahead plan for social, email, and ad content." },
      { step: "03", title: "Ongoing execution", text: "Content, campaigns, and newsletters go live on schedule." },
      { step: "04", title: "Monthly optimization", text: "Performance is reviewed and the plan adjusted each month." },
    ],
    deliverables: [
      "Monthly content calendar",
      "Managed social media accounts",
      "Email newsletter campaigns",
      "Ongoing ad campaign management",
      "Monthly performance dashboard",
    ],
    faqs: [
      {
        q: "Is this a long-term commitment?",
        a: "It runs month to month. Most authors see the strongest results after 3+ months of consistent presence.",
      },
      {
        q: "Do you write the content, or do I?",
        a: "Our team drafts content aligned to your voice; you review and approve before anything goes live.",
      },
      {
        q: "Can this pair with a book launch campaign?",
        a: "Yes — many authors start Digital Marketing a few months before launch and continue after to sustain momentum.",
      },
      {
        q: "Which platforms do you manage?",
        a: "Instagram, Facebook, TikTok, and email are the most common for authors. We'll recommend the mix that fits your genre and audience.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes, it's month to month with no long-term contract required.",
      },
    ],
  },
  {
    slug: "childrens-book-publication",
    title: "Children's Book Publication",
    tagline: "Stories young readers remember",
    price: "$899",
    unit: "/ title",
    heroSubtext:
      "Age-right formatting, print-ready layouts, and retail listings sized specifically for picture books and early readers.",
    stat: { value: "40+", label: "children's titles published" },
    benefits: [
      {
        icon: "layout",
        title: "Age-right formatting",
        text: "Layouts sized and paced correctly for picture books and early readers.",
      },
      {
        icon: "fileCheck",
        title: "Print-ready layout",
        text: "Text and illustrations combined into a clean, print-ready interior.",
      },
      {
        icon: "globe",
        title: "ISBN & retail listing",
        text: "Registered and listed correctly on Amazon and children's book retail categories.",
      },
      {
        icon: "users",
        title: "Parent & educator-friendly",
        text: "Back cover copy and metadata written to appeal to parents, teachers, and librarians.",
      },
    ],
    subServices: [
      { title: "Picture Book Publishing", text: "Full-color picture books formatted and published to retail-ready standards." },
      { title: "Board Book Formatting", text: "Durable, simplified layouts formatted for the youngest readers." },
      { title: "Early Reader Publishing", text: "Chapter-book formatting paced right for kids reading independently." },
      { title: "School & Library Distribution", text: "Metadata and categories set up to support library and classroom orders." },
      { title: "ISBN & Retail Listing", text: "Registration and a properly categorized listing on major retail platforms." },
      { title: "Print & Digital Packaging", text: "Consistent formatting across print, e-book, and library-friendly formats." },
    ],
    process: [
      { step: "01", title: "Manuscript & art review", text: "We check text and illustrations for pacing and consistency." },
      { step: "02", title: "Layout design", text: "Text and art are combined into a polished picture-book layout." },
      { step: "03", title: "Print & digital prep", text: "Files prepared for print-on-demand and e-book formats." },
      { step: "04", title: "Retail launch", text: "Your book goes live with parent- and educator-friendly listing copy." },
    ],
    deliverables: [
      "Formatted picture-book interior",
      "ISBN registration",
      "Print and e-book files",
      "Amazon retail listing",
      "Parent & educator-friendly back cover copy",
    ],
    faqs: [
      {
        q: "Do you provide the illustrations too?",
        a: "Illustrations are a separate service — pair this with Children's Book Illustrations for a complete package.",
      },
      {
        q: "What age ranges do you format for?",
        a: "Board books, picture books, and early readers, each formatted to the pacing and page-count conventions of that age range.",
      },
      {
        q: "Can this go into school and library catalogs?",
        a: "Yes, we set up metadata and categories to support library and educational distribution channels.",
      },
      {
        q: "How long is a typical children's book?",
        a: "Picture books usually run 24-32 pages. We'll help pace your story to fit standard conventions if it runs long or short.",
      },
      {
        q: "Can you help with a series?",
        a: "Yes, we can set up consistent formatting and branding across multiple books so a series feels cohesive.",
      },
    ],
  },
  {
    slug: "childrens-book-illustrations",
    title: "Children's Book Illustrations",
    tagline: "Art that brings the story to life",
    price: "$799",
    unit: "/ book",
    heroSubtext:
      "Custom character design and full-book illustrations created to match your story's tone, from playful to heartfelt.",
    stat: { value: "100%", label: "custom, original artwork" },
    benefits: [
      {
        icon: "palette",
        title: "Custom character design",
        text: "Original characters designed to match the personality of your story.",
      },
      {
        icon: "brush",
        title: "Full-book illustration set",
        text: "Every page illustrated in a consistent style from cover to close.",
      },
      {
        icon: "refresh",
        title: "Two rounds of revisions",
        text: "Feedback rounds built in so the art matches your vision.",
      },
      {
        icon: "fileCheck",
        title: "Print & digital-ready files",
        text: "High-resolution files delivered ready for print and e-book formats.",
      },
    ],
    subServices: [
      { title: "Character Design", text: "Original characters designed to match your story's tone and personality." },
      { title: "Full-Book Illustration", text: "Every page illustrated in a consistent style from cover to close." },
      { title: "Cover Illustration", text: "A standout cover illustration built to catch a browsing reader's eye." },
      { title: "Digital & Print-Ready Art Files", text: "High-resolution files delivered ready for both print and e-book formats." },
      { title: "Style Development", text: "Exploring 2-3 art directions early so you choose the right fit before full production." },
      { title: "Coloring & Activity Page Art", text: "Bonus coloring or activity pages designed to match your book's world." },
    ],
    process: [
      { step: "01", title: "Style & character sketches", text: "Initial sketches to lock in style and main characters." },
      { step: "02", title: "Full illustration draft", text: "Every page illustrated in rough form for your review." },
      { step: "03", title: "Revisions", text: "Two rounds of feedback refine color, detail, and composition." },
      { step: "04", title: "Final print-ready art", text: "High-resolution final files ready for layout and print." },
    ],
    deliverables: [
      "Character design sheet",
      "Full set of page illustrations",
      "Two rounds of revisions",
      "Print and digital-ready files",
      "Custom cover illustration",
    ],
    faqs: [
      {
        q: "Can I choose the art style?",
        a: "Yes. We develop 2-3 style directions in the sketch phase so you choose the one that fits your story before full illustration begins.",
      },
      {
        q: "How many illustrations are included?",
        a: "Pricing scales with page count — a typical 24-32 page picture book is the standard starting package.",
      },
      {
        q: "Do you also handle the book layout?",
        a: "Pair this with Children's Book Publication for a complete illustrated, formatted, print-ready book.",
      },
      {
        q: "Can I provide reference images or a mood board?",
        a: "Yes, references are very helpful. Send anything that captures the look and feel you're imagining during onboarding.",
      },
      {
        q: "Who owns the final artwork?",
        a: "You do. Full rights to the finished illustrations transfer to you upon final delivery.",
      },
    ],
  },
  {
    slug: "article-publication",
    title: "Article Publication",
    tagline: "Consistent content, without the grind",
    price: "$199",
    unit: "/ article",
    heroSubtext:
      "SEO-optimized articles and blog posts written and published to keep your author brand visible between book releases.",
    stat: { value: "3-5", label: "day turnaround per article" },
    benefits: [
      {
        icon: "search",
        title: "SEO-optimized writing",
        text: "Articles researched and written to rank and attract organic readers.",
      },
      {
        icon: "layout",
        title: "Publish-ready formatting",
        text: "Delivered formatted and ready to drop straight into your blog or platform.",
      },
      {
        icon: "refresh",
        title: "One revision round",
        text: "A feedback round included so the piece matches your voice and goals.",
      },
      {
        icon: "timer",
        title: "Fast turnaround",
        text: "Most articles are delivered within 3-5 business days.",
      },
    ],
    subServices: [
      { title: "Blog Post Writing", text: "Regular blog content that keeps your author site active and discoverable." },
      { title: "SEO Article Writing", text: "Articles researched and structured to rank for topics your readers search." },
      { title: "Guest Post Placement", text: "Articles pitched and placed on relevant outside publications and blogs." },
      { title: "Press Release Writing", text: "A professional release for launches, milestones, or media announcements." },
      { title: "Author Bio & Byline Articles", text: "Thought-leadership pieces published under your name to build authority." },
      { title: "Content Calendar Management", text: "An ongoing schedule of topics so content publishes consistently." },
    ],
    process: [
      { step: "01", title: "Topic & keyword brief", text: "We agree on topic, angle, and target keywords." },
      { step: "02", title: "Draft", text: "A full draft delivered for your review." },
      { step: "03", title: "Revision", text: "One round of edits to match your voice and feedback." },
      { step: "04", title: "Publish", text: "The final article is formatted and ready to publish." },
    ],
    deliverables: [
      "SEO-optimized article",
      "Publish-ready formatting",
      "One revision round",
      "Performance-friendly headline options",
      "Meta description for search",
    ],
    faqs: [
      {
        q: "What topics do you write about?",
        a: "Anything tied to your author brand — writing tips, industry commentary, or topics related to your book's subject matter.",
      },
      {
        q: "Can you publish directly to my blog?",
        a: "If you provide access, yes. Otherwise we deliver a formatted, publish-ready file for you to post.",
      },
      {
        q: "Do you offer ongoing article packages?",
        a: "Yes, ask about multi-article bundles for a discounted rate on a recurring content schedule.",
      },
      {
        q: "Do you handle images for the article?",
        a: "We can recommend royalty-free images or leave placeholder notes — licensed stock photos are outside the base package.",
      },
      {
        q: "How do you match my writing voice?",
        a: "We review any existing content you have — blog posts, social captions, or notes — before drafting, so tone stays consistent.",
      },
    ],
  },
  {
    slug: "ebook-writing",
    title: "E-Book Writing",
    tagline: "Download-ready, on every device",
    price: "$1,499",
    unit: "/ manuscript",
    heroSubtext:
      "A structured, professionally written e-book formatted cleanly for Kindle, EPUB, and PDF from day one.",
    stat: { value: "EPUB + PDF", label: "delivered ready to publish" },
    benefits: [
      {
        icon: "layout",
        title: "Structured chapter outline",
        text: "A clear outline built before writing so your e-book reads with purpose.",
      },
      {
        icon: "feather",
        title: "Full e-book manuscript",
        text: "A complete, professionally written manuscript matched to your topic and audience.",
      },
      {
        icon: "tablet",
        title: "EPUB & PDF formatting",
        text: "Formatted cleanly for Kindle, Apple Books, and direct PDF download.",
      },
      {
        icon: "fileCheck",
        title: "Device-ready layout",
        text: "Tested across devices so formatting holds up on phone, tablet, and e-reader.",
      },
    ],
    subServices: [
      { title: "Lead Magnet E-Books", text: "A short, high-value e-book built to grow your email list." },
      { title: "Educational & How-To E-Books", text: "A structured guide that teaches a skill or process step by step." },
      { title: "Fiction E-Books", text: "A digital-first novel or novella written and formatted for e-readers." },
      { title: "EPUB & Kindle Formatting", text: "Clean, device-tested formatting for every major e-reader platform." },
      { title: "PDF Workbook Development", text: "An interactive, printable companion workbook to pair with your e-book." },
      { title: "Series & Multi-Part E-Book Planning", text: "Structure and consistent formatting across a multi-book digital series." },
    ],
    process: [
      { step: "01", title: "Outline & structure", text: "We map chapters around your topic and reader goal." },
      { step: "02", title: "Drafting", text: "Chapters written and delivered for your feedback." },
      { step: "03", title: "Formatting", text: "The manuscript is formatted for EPUB, PDF, and Kindle." },
      { step: "04", title: "Final delivery", text: "Device-tested files, ready to publish or distribute." },
    ],
    deliverables: [
      "Full e-book manuscript",
      "EPUB and PDF files",
      "Structured chapter outline",
      "Device-tested formatting",
      "One revision round",
    ],
    faqs: [
      {
        q: "What length are typical e-books?",
        a: "Most run 8,000-20,000 words — long enough to deliver real value, short enough to read in one or two sittings.",
      },
      {
        q: "Can you turn my e-book into a print book later?",
        a: "Yes, our Book Publishing service can format and distribute the same manuscript for print.",
      },
      {
        q: "Do you help with the lead-magnet or sales angle?",
        a: "We can shape structure and hooks for a lead magnet or paid e-book — just tell us the goal during onboarding.",
      },
      {
        q: "Will it work on Kindle, Apple Books, and everything else?",
        a: "Yes, we test formatting across major e-reader apps and devices before final delivery.",
      },
      {
        q: "Can you design the cover too?",
        a: "Cover design is handled through our Children's Book Illustrations or general cover design service — ask your specialist to bundle it in.",
      },
    ],
  },
];

export function getServiceDetail(slug: string) {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}

// Topically related services per page, used to cross-link the 12 service
// pages into a coherent internal-linking cluster (each links to 3 others
// a reader in that service would plausibly need next).
export const RELATED_SERVICES: Record<string, string[]> = {
  "ghost-writing": ["book-editing", "book-publishing", "book-marketing"],
  "book-writing": ["ghost-writing", "book-editing", "book-publishing"],
  "book-editing": ["book-proofreading", "book-writing", "book-publishing"],
  "book-proofreading": ["book-editing", "book-publishing", "book-writing"],
  "book-publishing": ["book-marketing", "book-promotion", "book-editing"],
  "book-marketing": ["book-promotion", "digital-marketing", "book-publishing"],
  "book-promotion": ["book-marketing", "digital-marketing", "book-publishing"],
  "digital-marketing": ["book-marketing", "book-promotion", "article-publication"],
  "childrens-book-publication": [
    "childrens-book-illustrations",
    "book-publishing",
    "book-editing",
  ],
  "childrens-book-illustrations": [
    "childrens-book-publication",
    "book-publishing",
    "ghost-writing",
  ],
  "article-publication": ["digital-marketing", "ebook-writing", "book-marketing"],
  "ebook-writing": ["book-writing", "book-editing", "article-publication"],
};

export function getRelatedServices(slug: string): ServiceDetail[] {
  const slugs = RELATED_SERVICES[slug] || [];
  return slugs
    .map((s) => getServiceDetail(s))
    .filter((s): s is ServiceDetail => Boolean(s));
}
