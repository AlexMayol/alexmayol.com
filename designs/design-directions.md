# alexmayol.com — 4 design directions
#
# Brand constants (all four directions keep these):
#   paper #FAF8F5 · ink #1C1B1A · accent #C2410C
#   Fraunces Variable (display) · system sans (body)
#   light, editorial, generous whitespace
#
# Each direction is a coherent system: one signature device, applied to
# every page. Pages: Home · Experience · Freelancing · Log (+post) · Contact.

═══════════════════════════════════════════════════════════════════════
DIRECTION A — "LOGBOOK"
An engineer's field log. The whole site borrows the ledger conceit the
blog already hints at (Log/Bitácora): a single terracotta margin rule
runs down every page, and all content hangs off it like dated entries.
═══════════════════════════════════════════════════════════════════════

Signature device: the RED MARGIN — a 2px #C2410C vertical rule, fixed at
a consistent x-position on every page. Dates, entry numbers, and section
labels sit in the margin (small caps, ink/50); content sits to the right.
The rule is the site's spine — nav slide transitions make content pass
"through" it while it stays put (own view-transition group, like header).

  HOME                              EXPERIENCE
  ┌─────┬──────────────────────┐    ┌─────┬──────────────────────┐
  │     │                      │    │     │                      │
  │  ☰  │  Alejandro Mayol     │    │2025 │ Magnific            │
  │     │  Senior Product Eng. │    │  ●──┤ Senior Product Eng. │
  │ 001 │ Experience     →     │    │     │ built the editor…   │
  │ 002 │ Freelancing    →     │    │2022 │ Job&Talent          │
  │ 003 │ Log            →     │    │  ●──┤ …                   │
  │ 004 │ Contact        →     │    │     │                      │
  └─────┴──────────────────────┘    └─────┴──────────────────────┘
  Cards become numbered index       Timeline dots sit ON the margin
  entries hanging off the rule.     rule; years live in the margin.

  LOG (listing + post)              CONTACT
  ┌─────┬──────────────────────┐    ┌─────┬──────────────────────┐
  │AUG15│ De SWE a Product Eng │    │     │ Hablemos.            │
  │1 MIN│ desc… #tags   [thumb]│    │ GH  │ @AlexMayol      →    │
  │─────┼──────────────────────│    │ IN  │ Alejandro Mayol →    │
  │AUG04│ next entry…          │    │ @   │ alexmayolc@…    →    │
  └─────┴──────────────────────┘    └─────┴──────────────────────┘
  Date/reading-time move INTO       Channel initials in the margin;
  the margin. Post pages: TOC       rows, not cards. The giant @
  anchors appear in the margin.     stays, aligned to the rule.

Why it stands out: one uncompromising structural device instead of
decoration; the margin doubles as functional metadata space.
Build notes: margin = CSS grid col 1 (5rem), rule via border-right;
`transition:name="spine"` + z-index to keep it static during slides.
Risk: mobile — margin collapses to a top strip per entry.

═══════════════════════════════════════════════════════════════════════
DIRECTION B — "GLYPH"
Systematize what the contact page already does with its giant @: every
page gets one enormous cropped Fraunces glyph as a watermark landmark,
bleeding off the canvas at 7% accent opacity.
═══════════════════════════════════════════════════════════════════════

Signature device: PAGE GLYPHS — Experience "E", Freelancing "&",
Log "¶", Contact "@", Home uses "AM" monogram. 16–24rem, font-weight
600, text-accent/[0.07], each anchored to a different corner so
consecutive pages feel like turning around a sculpture. Glyphs float
(existing [data-float] keyframes) and are their own view-transition
group — during slides they cross-fade in place, a fixed constellation.

  HOME                              FREELANCING
  ┌──────────────────────────┐      ┌──────────────────────────┐
  │ ,ggg.                    │      │            Freelancing   │
  │ AM(large, cropped top-L) │      │  Cliener ────────── ↗    │
  │      Alejandro Mayol     │      │  Bluemation ──────  ↗    │
  │      Senior Product Eng. │      │        .oPYo.            │
  │   [4 cards, unchanged]   │      │        & (huge, bot-R)   │
  └──────────────────────────┘      └──────────────────────────┘

Secondary moves that keep it coherent:
- Card corners tighten (rounded-xl) so the round glyphs own all softness.
- H1s pick up a single accent-colored period: "Experience." — the glyph
  system in miniature.
- Post covers get a duotone-free treatment; the ¶ glyph watermarks the
  listing only, never the post body (reading stays clean).

Why it stands out: turns the existing @ from a one-off into the brand's
alphabet; recognizable at a glance in a tab strip of screenshots.
Build notes: one `<PageGlyph char corner>` component; ~20 lines. Zero
new deps. prefers-reduced-motion already handled by float keyframes.

═══════════════════════════════════════════════════════════════════════
DIRECTION C — "MISPRINT"
Print-shop warmth: everything imagey gets a two-ink treatment (ink +
terracotta duotone) inside frames that are deliberately mis-registered,
like a letterpress pass that slipped 4px.
═══════════════════════════════════════════════════════════════════════

Signature device: OFFSET FRAMES — media and cards get a 1px ink border
plus a solid accent rectangle shifted 6px down-right behind them (no
blur; hard offset, print not drop-shadow). Hover nudges content onto
its accent plate (translate 2px) — tactile, replaces lift.

  LOG LISTING                       EXPERIENCE
  ┌──────────────────────────┐      ┌──────────────────────────┐
  │ date · 1 min             │      │ Magnific    ┌────────┐▄  │
  │ Post title      ┌──────┐ │      │ 2024–now    │ product │▌ │
  │ description…    │duotone│▌│     │ blurb…      │ shot    │▌ │
  │ #tags           └──────┘▀│      │             └────────┘▀  │
  └──────────────────────────┘      └──────────────────────────┘
  Cover thumbs → duotone with       Each role may carry one small
  offset accent plate.              artifact image, same treatment.

  CONTACT: the three cards become "stamps" — perforated (dashed) inner
  border, offset plates, the @ watermark unchanged. Fits the postal
  metaphor of contacting someone.

Why it stands out: gives the site a physical, hand-set quality no
gradient-SaaS site has; the duotone makes ANY future image in-brand
automatically (solves the "random cover colors" problem forever).
Build notes: duotone = CSS `filter: grayscale + sepia + hue-rotate` or
SVG feComponentTransfer (exact two-ink); offset plate = ::before, 4 lines
of CSS. Applies to lite-youtube poster frames too.

═══════════════════════════════════════════════════════════════════════
DIRECTION D — "LIVING TYPE"
Nearly-bare pages where Fraunces itself is the interface. We already
ship the variable font — use its weight axis. Type is the only
ornament, and it's alive.
═══════════════════════════════════════════════════════════════════════

Signature device: WEIGHT BREATHING — headings animate font-weight
(wght 400→650) — a slow 6s "breath" on the page H1, and on hover for
links/cards (text swells instead of changing color). Because it's a
variable font this is one CSS animation, no layout shift if
font-variation-settings is used with fixed-size headings.

  HOME (the boldest move: no cards)  EXPERIENCE
  ┌──────────────────────────┐      ┌──────────────────────────┐
  │                          │      │ Experience               │
  │   Alejandro Mayol        │      │                          │
  │   Senior Product Eng.    │      │ Magnific        2024—    │
  │                          │      │ Job&Talent      2022—24  │
  │   Experience, Freelance, │      │ devaway_        2021—22  │
  │   Log, and Contact —     │      │ …               …        │
  │   as one flowing         │      │ (rows swell on hover;    │
  │   sentence of links.     │      │  details expand inline)  │
  └──────────────────────────┘      └──────────────────────────┘
  Nav-as-prose: a paragraph          A type-specimen table.
  where each link breathes
  on hover.

  LOG: listing entries are just title + date, huge; covers appear only
  inside posts. CONTACT: three lines of enormous text (GitHub /
  LinkedIn / Email), each breathing on hover; the @ glyph remains as
  the only non-text element on the site.

Why it stands out: radical restraint — the rarest look in 2026; and the
motion is in the letterforms, which no static screenshot can fake.
Build notes: `@keyframes breathe { font-variation-settings: 'wght' … }`;
hover via transition on font-variation-settings. Guard with
prefers-reduced-motion. Risk: font-weight animation costs relayout —
keep it to headings, test on mobile.

═══════════════════════════════════════════════════════════════════════
RECOMMENDATION
═══════════════════════════════════════════════════════════════════════
B (GLYPH) is the safest high-impact evolution — it grows an element the
site already owns and touches every page cheaply. A (LOGBOOK) is the
most distinctive full redesign and matches the "Log" identity best.
C works best if future posts will be image-heavy. D is the boldest
statement but the least forgiving to execute.

Pairings that stay coherent: B+C (glyphs + misprint frames) compose
well; A+D compose (margin + breathing headings); avoid A+B (two
competing structural devices).
