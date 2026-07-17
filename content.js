/* ============================================================
   CONTENT — the only file you need to edit day to day.
   Add work, change contact details, swap the brand name here.
   ============================================================ */

const SITE = {
  /* ---- Brand ------------------------------------------------
     PLACEHOLDER. Change this one string and it updates
     everywhere: nav, footer, copyright, page titles.
  ------------------------------------------------------------ */
  brand: "PILLAR",
  tagline: "We make sure every asset answers one question.",

  /* ---- Contact — replace the placeholders ---- */
  contact: {
    email: "hello@example.com",       // ← replace
    phone: "+973 0000 0000",          // ← replace
    location: "Manama, Bahrain",      // ← confirm
    hours: "Sun–Thu, 9:00–18:00 AST",
    /* Get a free endpoint at formspree.io, paste the URL here.
       Until then the form runs in demo mode and won't send. */
    formEndpoint: ""
  },

  socials: [
    { label: "Instagram", url: "#" },  // ← replace
    { label: "LinkedIn",  url: "#" },
    { label: "YouTube",   url: "#" },
    { label: "WhatsApp",  url: "#" }
  ],

  /* ---- Work -------------------------------------------------
     type:  "video" | "image"
     size:  "" (1/3 width) | "wide" (1/2) | "full"
     thumb: path e.g. "assets/img/case-01.jpg" — leave "" for placeholder
     embed: YouTube/Vimeo EMBED url (video only), e.g.
            "https://www.youtube.com/embed/XXXX"
     pillar: the one pillar this asset was built to communicate
  ------------------------------------------------------------ */
  work: [
    {
      id: "w1", type: "video", size: "wide",
      title: "Bean & Brass", client: "Specialty coffee roaster",
      pillar: "Quality", year: "2025",
      blurb: "A 45-second origin story cut to land one idea: they roast it themselves.",
      thumb: "", embed: ""
    },
    {
      id: "w2", type: "image", size: "",
      title: "Third Floor", client: "Co-working space",
      pillar: "Reliability", year: "2025",
      blurb: "Poster set for lifts and stairwells. One promise, six placements.",
      thumb: "", embed: ""
    },
    {
      id: "w3", type: "video", size: "",
      title: "Ground Work", client: "Independent gym",
      pillar: "Atmosphere", year: "2025",
      blurb: "Motion graphics explaining a six-week programme without a single stock shot.",
      thumb: "", embed: ""
    },
    {
      id: "w4", type: "image", size: "wide",
      title: "Salt & Stone", client: "Restaurant",
      pillar: "Quality", year: "2024",
      blurb: "Menu photography built to survive being cropped to a square.",
      thumb: "", embed: ""
    },
    {
      id: "w5", type: "video", size: "",
      title: "In Their Words", client: "Dental clinic",
      pillar: "Reliability", year: "2024",
      blurb: "Interview series. Real patients, no script, one recurring answer.",
      thumb: "", embed: ""
    },
    {
      id: "w6", type: "image", size: "",
      title: "Open Late", client: "Bookshop",
      pillar: "Atmosphere", year: "2024",
      blurb: "A window campaign that reads at walking speed from across the street.",
      thumb: "", embed: ""
    }
  ],

  /* ---- Services ---- */
  services: [
    {
      code: "S/01", name: "Video", dot: "var(--cyan)",
      lede: "Moving pictures do the heavy lifting. They carry tone, pace and proof in a way a still frame can't.",
      items: [
        ["Motion graphics", "Turning a process, an offer or a number into something watchable."],
        ["Storytelling", "Short films with a beginning, a turn and a reason to care."],
        ["Engaging short reels", "Cut for the feed — vertical, fast, built to survive the thumb."],
        ["Professional interviews", "Founders, staff and customers, lit and directed so they sound like themselves."]
      ]
    },
    {
      code: "S/02", name: "Posters & Pictures", dot: "var(--magenta)",
      lede: "Stills go where video can't — a wall, a window, a printed menu, a feed on mute.",
      items: [
        ["High visual impact", "Work that holds up both offline and online, at any size."],
        ["Consistent identity", "Every piece reinforces the same brand, not a new one each week."],
        ["Ideas at a glance", "Complex propositions made legible in the two seconds you actually get."],
        ["Multi-channel proof", "Showing you can communicate anywhere signals a business worth trusting."]
      ]
    }
  ],

  /* ---- Ethics ---- */
  refusals: [
    ["Alcohol", "Harm to society"],
    ["Tobacco", "Harm to society"],
    ["Drugs", "Harm to society"],
    ["Extreme-sugar food", "Donuts, pancakes, fast food"]
  ],

  /* ---- Nav ---- */
  nav: [
    { label: "Work",     href: "work.html" },
    { label: "Services", href: "services.html" },
    { label: "Contact",  href: "contact.html" }
  ]
};

if (typeof module !== "undefined") module.exports = SITE;
