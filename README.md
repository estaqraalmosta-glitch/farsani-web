# PILLAR — media & marketing site

Static site. No build step, no dependencies, no framework.
Concept: **Registration** — many plates (channels), one image (the pillar).

## Deploy

1. Push this folder to a GitHub repo.
2. On Vercel: **Add New → Project → Import** the repo.
3. Framework Preset: **Other**. Build Command: *(leave empty)*. Output Directory: *(leave empty)*.
4. Deploy. Add your domain under Settings → Domains.

## Editing

Almost everything lives in **`assets/js/content.js`**:

| Want to change | Edit |
|---|---|
| Brand name (currently `PILLAR`, a placeholder) | `SITE.brand` |
| Email / phone / location / hours | `SITE.contact` |
| Social links | `SITE.socials` |
| Portfolio pieces | `SITE.work` |
| Service lists | `SITE.services` |
| Ethics list | `SITE.refusals` |

### Adding work

Drop files in `assets/img/`, then add an entry:

```js
{
  id: "w7",
  type: "video",            // "video" | "image"
  size: "wide",             // "" = 1/3 col · "wide" = 1/2 · "full" = full bleed
  title: "Project name",
  client: "Client name",
  pillar: "Quality",        // the pillar this piece communicates
  year: "2026",
  blurb: "One line on what it had to do.",
  thumb: "assets/img/w7.jpg",
  embed: "https://www.youtube.com/embed/VIDEO_ID"   // video only
}
```

Filters and counts on `/work` update automatically.

### Turning the contact form on

1. Create a free form at [formspree.io](https://formspree.io).
2. Paste the endpoint URL into `SITE.contact.formEndpoint`.

Until then the form validates but shows a demo notice instead of sending.
A honeypot field is already wired for spam.

## Before going live

- [ ] Replace `PILLAR` with the real brand name
- [ ] Replace every `https://example.com` in `<link rel=canonical>`, OG tags, `sitemap.xml`, `robots.txt`
- [ ] Real email, phone, socials
- [ ] Add `assets/img/og.jpg` (1200×630) for link previews
- [ ] Swap placeholder work for real pieces

## Design tokens

All in `assets/css/style.css` under `:root`. Change a hex there, it changes everywhere.
