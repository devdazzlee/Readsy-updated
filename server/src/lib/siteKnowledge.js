// A compact copy of the real service/pricing/site data shown on the public
// site (Readsy/lib/content.ts + Readsy/lib/serviceDetails.ts), so the
// chatbot can answer with real facts instead of refusing or guessing.
//
// The frontend and this backend are two separate deployables with no shared
// package, so this is a deliberate, manually-synced copy — if a service,
// price, or deliverable changes on the site, update it here too.
export const SERVICES = [
  {
    title: "Ghost Writing",
    price: "$2,999 / manuscript",
    turnaround: "8-16 weeks",
    summary:
      "A dedicated ghostwriter turns your ideas, notes, or interviews into a polished, publish-ready manuscript in your voice.",
    includes:
      "full-length manuscript, chapter-by-chapter outline, unlimited revision rounds, signed NDA, dedicated project manager",
  },
  {
    title: "Book Writing",
    price: "$2,499 / manuscript",
    turnaround: "8-16 weeks",
    summary:
      "Full manuscript development from a concept or rough notes to a finished draft ready for editing.",
    includes:
      "complete manuscript draft, chapter-by-chapter outline, genre-specific style guide, two rounds of structural feedback, dedicated writing coach",
  },
  {
    title: "Book Editing",
    price: "$599 / manuscript",
    turnaround: "2-4 weeks",
    summary:
      "Developmental, line, and copy editing that tightens structure, strengthens voice, and catches errors before print.",
    includes:
      "fully edited manuscript with tracked changes, editorial letter, style sheet, two rounds of revisions, formatting consistency check",
  },
  {
    title: "Book Proofreading",
    price: "$299 / manuscript",
    turnaround: "5-7 business days",
    summary:
      "A meticulous final pass that catches typos, formatting slips, and inconsistencies before launch.",
    includes:
      "fully proofed manuscript, summary error report, formatting consistency check, print-ready final file",
  },
  {
    title: "Book Publishing",
    price: "$499 / title",
    turnaround: "2-3 weeks",
    summary:
      "Full-service publishing across Amazon KDP, IngramSpark, and major retail/print-on-demand platforms.",
    includes:
      "formatted print and e-book files, ISBN registration, Amazon/KDP/IngramSpark listings, physical proof copy review, launch-day checklist",
  },
  {
    title: "Book Marketing",
    price: "$699 / campaign",
    turnaround: "start 8-12 weeks before launch",
    summary:
      "A launch strategy, Amazon ad campaigns, and outreach plan built around the author's genre and audience.",
    includes:
      "custom launch strategy document, Amazon ad campaign setup, dedicated author landing page, reviewer/influencer outreach list, monthly performance report",
  },
  {
    title: "Book Promotion",
    price: "$399 / campaign",
    turnaround: "placements booked within 1-2 weeks",
    summary:
      "Targeted promotional pushes — bestseller campaigns, newsletter placements, social kits — to build momentum.",
    includes:
      "bestseller campaign submission, newsletter & promo site placements, social media promo kit, post-campaign performance report",
  },
  {
    title: "Digital Marketing",
    price: "$599 / month",
    turnaround: "ongoing, month to month, no long-term contract",
    summary:
      "Ongoing social, email, and paid-ad management that grows an author's brand between book releases.",
    includes:
      "monthly content calendar, managed social media accounts, email newsletter campaigns, ad campaign management, monthly performance dashboard",
  },
  {
    title: "Children's Book Publication",
    price: "$899 / title",
    turnaround: "varies by page count, confirmed at consultation",
    summary:
      "End-to-end publishing for picture books and early readers, formatted and paced for the right age range.",
    includes:
      "formatted picture-book interior, ISBN registration, print and e-book files, Amazon retail listing, parent/educator-friendly back cover copy",
  },
  {
    title: "Children's Book Illustrations",
    price: "$799 / book",
    turnaround: "varies by page count, confirmed at consultation",
    summary:
      "Custom character design and full-book illustrations matched to the story's tone.",
    includes:
      "character design sheet, full set of page illustrations, two rounds of revisions, print and digital-ready files, custom cover illustration",
  },
  {
    title: "Article Publication",
    price: "$199 / article",
    turnaround: "3-5 business days",
    summary:
      "SEO-optimized articles and blog posts written and published to build an author's brand between books.",
    includes:
      "SEO-optimized article, publish-ready formatting, one revision round, headline options, meta description",
  },
  {
    title: "E-Book Writing",
    price: "$1,499 / manuscript",
    turnaround: "typical length 8,000-20,000 words",
    summary:
      "A structured, professionally written e-book formatted cleanly for Kindle, EPUB, and PDF.",
    includes:
      "full e-book manuscript, EPUB and PDF files, structured chapter outline, device-tested formatting, one revision round",
  },
];

export function formatServicesForPrompt() {
  return SERVICES.map(
    (s) =>
      `- ${s.title} — starting at ${s.price} (turnaround: ${s.turnaround}): ${s.summary} Includes: ${s.includes}.`,
  ).join("\n");
}

export const SITE_FACTS = `- 2,400+ books published to date across memoir, fiction, business, self-help, and children's genres. Real examples are browsable at thereadsypublishers.com/portfolio.
- Every project starts with a free, no-obligation consultation (call, email, live chat, or the quote form on the site).
- Serves authors in the United States and United Kingdom.
- Free tools on the site (mention these if relevant, e.g. someone asks about a cover or wants to test an idea):
  - AI Book Cover Generator (thereadsypublishers.com/cover-generator): generates 3 original cover concepts from a title, genre, and style; a free account is required to reveal the results, and the concepts are refined into a final cover by the design team once a project starts.
  - AI Book Concierge and AI Book Blueprint (on the homepage): free tools that analyze a book idea and suggest a structure and next steps.
- The full pricing and service list is public at thereadsypublishers.com/pricing.`;