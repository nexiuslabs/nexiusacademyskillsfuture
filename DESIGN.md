---
name: Nexius Academy
description: A composed monochrome cohort prospectus for practical learning.
colors:
  ink: "#111111"
  paper: "#ffffff"
  canvas: "#f6f6f4"
  line: "#e5e5e1"
  secondary-ink: "#525252"
  strong-line: "#d6d6d1"
  hover-ink: "#333333"
  inset-ink: "#262626"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px,3.7vw,56px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.025em"
  course-display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(36px,4.1vw,60px)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-.035em"
  reading-display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(34px,3.5vw,52px)"
  reading-body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
  editorial-display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px,4.2vw,60px)"
    lineHeight: 1.08
    letterSpacing: "-.03em"
  editorial-intro:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    lineHeight: 1.75
  headline:
    fontSize: "40px"
    fontWeight: 650
    lineHeight: 1.16
    letterSpacing: "-.025em"
  title:
    fontSize: "29px"
    lineHeight: 1.16
    letterSpacing: "-.025em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  intro:
    fontSize: "17px"
    lineHeight: 1.7
  action:
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.4
  small:
    fontSize: "12px"
    lineHeight: 1.7
rounded:
  control: "6px"
  surface: "10px"
  home-photo: "14px"
spacing:
  compact: "12px"
  control-gap: "16px"
  content: "24px"
  group: "32px"
  section-intro: "48px"
  column: "64px"
  section: "88px"
  home-section: "112px"
  home-section-mobile: "72px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.action}"
    rounded: "{rounded.control}"
    padding: "13px 22px"
  button-primary-hover:
    backgroundColor: "{colors.hover-ink}"
  button-inverse:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.action}"
  registration-dossier:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.surface}"
    padding: "28px"
  newsletter-input:
    backgroundColor: "{colors.inset-ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Nexius Academy

## Overview

**Creative North Star: "The Cohort Prospectus"**

A cohort prospectus makes practical learning and course choice tangible through real evidence and clear comparison. Ink/Paper/Canvas neutrals, Inter, photographic evidence, restrained control radii and open structured sections establish a composed professional atmosphere.

This extracted system applies across the Academy site: the approved homepage and Advanced route, remaining programme and workshop pages, About, journal and articles, reports, assessments and admin, including shared modal, footer and advisor treatments. The owner approved this extension as the same visual family, with course facts and registration journeys preserved. The intact Sculpted Loop master is paired with separate Academy lettering; original collaborator identities and editorial illustrations remain intact. On 3 October 2026 the owner authorized final review followed by merge to main and deployment if checks pass; that release authority is recorded in PRODUCT.md.

**Key Characteristics:**

- Composed monochrome typography
- Real photographic evidence
- Open structured information
- Restrained controls and tonal depth

## Colors

The palette is neutral and deliberate; the frontmatter owns exact values.

### Primary

Ink anchors headings, primary actions and the dark footer. Hover Ink supplies the primary action hover state.

### Neutral

Paper holds homepage skills, reading surfaces and the registration dossier. Canvas groups the homepage welcome hero, audience and latest insights, following the company website’s Paper/Canvas rhythm, as well as the Advanced hero and supporting information. Secondary Ink carries descriptions and notes. Line and Strong Line organize factual rows. Inset Ink supports selection and footer fields. Partner assets retain their original colors.

**The Neutral Hierarchy Rule.** Use Ink for authority and action, Secondary Ink for supporting information, Paper for readable surfaces and Canvas for tonal grouping.

**The Paired Surface Rule.** Use Ink or Secondary Ink on Paper and Canvas, and Paper on Ink and Inset Ink. A background change must carry its foreground and control states with it; retained utility colors are not independent brand roles. Nested surfaces reset the pair explicitly: dark panels inside light sections use Paper headings and labels; opaque light panels inside dark sections restore Ink headings and labels. Neutral programme heroes and navigation retain Ink text; primary controls retain Paper lettering, and inverse controls retain Ink lettering.

## Typography

Inter uses the sans-serif fallback stack in the frontmatter. Display is the homepage headline; Course Display is shared by the Advanced and Foundation hero titles. Headline marks section headings; Title marks course choices. Intro supports major headings, Body carries continuous reading, Action labels controls, and Small carries fee qualifications.

Homepage display uses the Display token on desktop, then tablet (46px) and mobile (38px); the welcome paragraph uses 18px with 1.75 line height, reducing to 17px on mobile. Homepage section headings use 38px at weight 600, reducing to 32px on mobile. Advanced display adapts to a tablet clamp (36px, 5.6vw, 48px) and mobile (36px). Section headings become smaller on mobile (32px). Descriptions use a comfortable measure (60ch). Fee numerals use tabular figures. The wordmark places Nexius above Academy, with distinct weights (750 and 500) and tracking (-.04em and .07em).

Extension page titles use a responsive ramp, reaching 40px at tablet and 34px at mobile; Foundation uses the shared Course Display desktop ramp. Article titles use a reading display clamp (34px, 3.5vw, 52px), then 32px on mobile. Article body text and list items use 17px with a maximum measure of 72ch; article section headings use 28px. These are family-specific roles, not replacements for the approved homepage or Advanced ramp.

**The One Family Rule.** Use Inter throughout the Academy site; separate roles through size, weight and spacing.

About and journal openings share Editorial Display and Editorial Intro. Their headings tighten to 44px at tablet and 38px at mobile, with a desktop measure of 19ch and tablet measure of 22ch. Intro text uses a 48ch maximum measure and reduces to 17px on mobile. This shared editorial ramp leaves the homepage, Advanced and article reading roles intact.

## Layout

The reading container caps at 1280px, with desktop side padding (40px), tablet (24px) and mobile (20px). Broad two-column sections stack at 850px; homepage course comparisons become two columns at 850px and one column at 600px. Advanced section spacing tightens from the Section token to 56px on mobile. Homepage course comparison and practice use the Home Section tokens; supporting sections use 96px on desktop and 72px on mobile. The Advanced header is sticky with an 84px minimum height; its course links become an expandable menu at 850px. Controls provide a minimum target height (44px); primary actions use 48px. Preserve semantic reading order when stacking.

The homepage welcome hero pairs a message on the left with a real classroom photograph on the right, on Canvas. Equal columns use an 80px gap; the photo is 448px high. The gap becomes 40px at 1000px, and the layout stacks at 850px with the message first. The homepage evidence section places its heading on the left and a single column of evidence on the right, stacking at 850px. This composition is specific to the approved homepage revision, rather than a requirement for Advanced.

Homepage course choices are two open horizontal rows, each separating the course story, logistics and fee/action. Desktop columns use 1.45fr / 1fr / .85fr with a 56px gap and 48px vertical padding. At 1000px the columns become 1.25fr / 1fr / 1fr with a 32px gap; at 850px the story spans both columns above logistics and the decision. At 600px the row becomes one column with a 28px gap and 36px vertical padding. This course-section composition does not alter the homepage hero or Advanced layout.

Programme pages retain factual sections and actions within open evidence structures. Foundation sections use the Section rhythm and tighten to 56px on mobile. Article reading surfaces cap at 880px with internal side padding of 32px, 24px at tablet and 20px at mobile; the shared navigation and footer frame the article. Assessment and admin screens retain their task order and controls rather than inheriting a marketing-page composition.

About and journal openings use Canvas and a message-first two-column structure that stacks at 850px with a 40px gap. A fine Strong Line divider separates supporting evidence from the opening: classroom photography on About and the latest existing article on the journal. These family patterns preserve their page-specific subjects; neither is a mandatory hero composition for other routes.

## Elevation & Depth

Paper against Canvas and one-pixel dividers carry the depth. Strong comparison boundaries use two-pixel Ink rules. The Academy system removes retained utility shadows; component shape and hierarchy provide distinction. The retained classroom-image pattern has a restrained clip animation (600ms ease-out) only from 900px; the revised homepage welcome photograph is static. Reduced-motion preference removes animation and transitions. Primary action color transitions take 160ms ease-out.

**The Flat Surface Rule.** Use tonal surfaces and fine dividers for depth; Academy content and navigation carry no ambient shadows.

## Shapes

Controls use the Control radius; homepage welcome and practice photographs use Home Photo corners. Other photographs, tonal callouts and the dossier use the Surface radius. Course comparisons, curriculum, reviews and fee rows remain open, square-edged structures defined by dividers. The logo image is contained rather than cropped, with desktop bounds (48px by 42px) and mobile bounds (42px by 36px).

**The Intact Symbol Rule.** Use the supplied black or white Sculpted Loop SVG intact, alongside the separate Academy wordmark.

## Components

### Buttons and links

Primary buttons are compact Ink controls with Paper lettering and the Action type role. Hover changes the background to Hover Ink. Inverse controls pair a Paper background with Ink lettering on dark surfaces. Text links remain open and underline on hover. Keyboard focus uses a two-pixel Secondary Ink outline offset by five pixels; the shared registration dialog uses Ink with a three-pixel offset.

### Cards / Containers

The registration dossier is a Paper surface on Canvas, with the Surface radius and desktop padding (28px), reduced to 24px on mobile. Homepage comparison articles use continuous fine dividers, an open story/logistics/decision structure and one primary exploration action per course. Course titles use 26px type at weight 600 and line height 1.25 (25px on mobile); supporting descriptions use 15px with line height 1.7, and fee numerals use 30px tabular figures. The homepage private-class prompt is a quiet text link below the rows, with a 32px top margin; it stacks on mobile. The retained private-class callout elsewhere uses Canvas and the Surface radius.

### Editorial images and article action

Homepage insights preserve the full original article artwork in native 16:9 Paper frames using `object-fit: contain`; these affected images bypass CDN optimization to keep the original asset intact. The View All Articles control has a transparent background, Ink lettering and a one-pixel Ink border; hover and visible focus pair an Ink background with Paper lettering, including the arrow.

About opening photography uses intrinsic height and containment. The mission collage preserves native 4:3 photographs in a 440px desktop stage, with each image at 70% width and restrained Surface corners; its overlapping second image has a six-pixel Paper border. The mobile mission image uses full width and intrinsic height. The affected collage and mobile images bypass CDN optimization rather than cropping their source assets. These are image-specific treatments, not a new photography rule for every route.

### Inputs / Fields

Extension task fields use Paper with Ink text, a neutral border, and Ink caret and selection accent. Headings, diagnostic labels, field labels and placeholders remain visible against their actual rendered surface. Do not hide meaningful diagnostic or task labels when removing decorative badges. Light fields use Secondary Ink placeholders; the inverse newsletter retains a light placeholder on Inset Ink. Selects and textareas keep their original task behavior. The newsletter remains the inverse field on the dark footer.

The newsletter email field uses Inset Ink with Paper lettering, a Secondary Ink border and Control corners. Padding is recorded in the component tokens. Disabled submission fields retain the inherited opacity treatment (50%). Modal fields preserve their form behavior and use the neutral focus treatment. Retained blue and teal dialog surfaces become Canvas, with supporting text in Secondary Ink.

### Navigation

The Academy brand shell extends to programme and reading pages. Existing navigation destinations and task controls are preserved. Article pages receive the shared navigation and footer; the approved course header retains its own menu treatment.

Course navigation is a compact row of 13px, weight-500 links with 44px minimum targets, underline hover and visible focus. Its mobile menu is a Paper panel below the header with a bottom Line divider. The wordmark links home and carries an accessible Academy name.

### Advisor and factual rows

The advisor uses Ink with no badge or pulse; at 850px and below its trigger enters document flow and the panel uses 16px side insets. Factual rows use fine dividers, small secondary labels and legible values. FAQ summaries have 44px minimum targets with plus/minus disclosure marks. These disclosure marks describe interaction, not decorative glyph iconography.

## Do's and Don'ts

### Do:

- Do preserve the shared Sculpted Loop master and separate Academy lettering.
- Do use real learning photographs with meaningful alternative text.
- Do keep eligibility notes adjacent to fees and enquiries distinct from confirmed registration.
- Do preserve visible keyboard focus and reduced-motion behavior.
- Do pair every nested light or dark surface with explicit readable headings, diagnostic labels and action lettering.
- Do preserve complete article artwork and the affected About photographs with their native proportions.

### Don't:

- Don't introduce decorative gradients, AI spectacle or floating badges into these Academy surfaces.
- Don't turn course comparisons into generic piles of decorated cards.
- Don't change facts, schedules, eligibility or the registration journey as part of a visual refresh; release authority remains recorded in PRODUCT.md.
- Don't promote existing editorial illustrations or page-specific layouts into mandatory brand motifs.
