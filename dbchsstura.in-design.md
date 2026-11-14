---
version: alpha
name: Don Bosco College Tura
description: A formal academic website system with deep navy foundations, gold accents, and strong institutional typography.
colors:
  primary: "#1e3a5f"
  secondary: "#c01944"
  tertiary: "#f2b705"
  neutral: "#f5f7fb"
  surface: "#ffffff"
  on-surface: "#1a1a1a"
  error: "#b42318"
  primary-80: "#35547a"
  primary-60: "#5f7693"
  primary-20: "#d8e1ec"
  secondary-80: "#d14b70"
  tertiary-80: "#f5c84a"
  border: "#1e3a5f1f"
typography:
  headline-display:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: 700
    lineHeight: 38px
    letterSpacing: 0px
  headline-lg:
    fontFamily: Oswald
    fontSize: 27px
    fontWeight: 700
    lineHeight: 33px
    letterSpacing: -0.528px
  headline-md:
    fontFamily: Georgia
    fontSize: 23px
    fontWeight: 700
    lineHeight: 24px
    letterSpacing: 2.688px
  headline-sm:
    fontFamily: system-ui
    fontSize: 19px
    fontWeight: 700
    lineHeight: 19.0464px
    letterSpacing: -0.1488px
  body-lg:
    fontFamily: system-ui
    fontSize: 16.32px
    fontWeight: 400
    lineHeight: 27.744px
    letterSpacing: 0px
  body-md:
    fontFamily: system-ui
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body-sm:
    fontFamily: system-ui
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  label-lg:
    fontFamily: Oswald
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.04em
  label-md:
    fontFamily: Oswald
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.08em
  label-sm:
    fontFamily: system-ui
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0.02em
  nav-item:
    fontFamily: Oswald
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
  tag-sm:
    fontFamily: system-ui
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.08em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 14px
  xl: 18px
  full: 9999px
spacing:
  xs: 2px
  sm: 10px
  md: 18px
  lg: 32px
  xl: 64px
  gutter: 16px
  section: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 13.6px 32px 13.6px 29.6px
    size: 188px
    height: 49px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 13.6px 32px 13.6px 29.6px
    size: 188px
    height: 49px
  button-link:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: 11.2px 13.6px 11.2px 16px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 12px 16px
  chip:
    backgroundColor: "{colors.primary-20}"
    textColor: "{colors.primary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: 8px 14px
  topbar-announcement:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.none}"
    height: 52px
  hero-carousel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.none}"
    height: 720px
---

# Don Bosco College Tura

## Overview
The site presents a formal, institution-first personality: authoritative, calm, and traditional, with a touch of celebratory warmth through gold and red accents. It targets students, parents, and faculty audiences who need trust, clarity, and easy access to admissions and college information. The overall tone is dense in information but visually organized, with strong hierarchy and a polished academic feel.

## Colors
- **Primary (#1e3a5f):** A deep navy used for the main header, key UI chrome, navigation, and primary action surfaces. It gives the site its institutional backbone and provides the strongest contrast for white text.
- **Secondary (#c01944):** A rich crimson used for urgent or conversion-oriented actions like the admission button and announcement accents. It adds energy without breaking the academic tone.
- **Tertiary (#f2b705):** A warm gold used as a prestige accent in separators, emblems, and highlight details. It reinforces the ceremonial, merit-focused identity of the college.
- **Neutral (#f5f7fb):** A very light cool background tone used for page surfaces and cards. It keeps the interface airy while preserving the formal mood.
- **Surface (#ffffff):** Clean white used for buttons, content panels, and high-contrast inset areas. It helps separate layered UI against the navy and light backgrounds.
- **On-surface (#1a1a1a):** Primary text color for readable body copy and dark labels. It is neutral and understated rather than stark black.
- **Border (#1e3a5f1f):** A soft translucent navy border used for cards, pills, and input outlines. It adds definition without heavy visual weight.
- **Primary scale variants (#35547a, #5f7693, #d8e1ec):** Used to create hover states, muted navigation states, and pale interactive backgrounds while staying within the same family.
- **Secondary/Tertiary variants (#d14b70, #f5c84a):** Supporting tints for hover or emphasis moments when slightly lighter tones are needed.

## Typography
The system combines Oswald, Georgia, and system-ui to create a mix of institutional formality and practical readability. Oswald is the most distinctive voice: it drives navigation, labels, and punchy headings with condensed uppercase energy. Georgia is reserved for select editorial-style emphasis, especially where a serif voice feels ceremonial or academic.

Headlines are bold and compact, with the larger display sizes using strong vertical rhythm and tight spacing. Labels and navigation use uppercase or near-uppercase styling with noticeable letter spacing, which matches the screenshot’s menu and announcement treatment. Body text relies on system-ui for clarity, with comfortable line height and medium sizing for scan-friendly reading.

## Layout
The page uses a fixed-width, full-bleed structure with stacked horizontal bands: announcement strip, masthead, navigation bar, and a large hero area. Content is centered with generous side margins, while the navigation and top utility areas stretch across the viewport for a formal banner-like presentation.

Spacing follows a restrained institutional rhythm based on 2px, 10px, 18px, 32px, and 64px increments. Sections breathe through substantial vertical padding, but internal content remains compact and efficient. Cards and pills use moderate padding so the interface feels structured rather than loose.

## Elevation & Depth
Depth is subtle but important. The interface uses soft borders and restrained shadows rather than dramatic elevation, preserving a professional campus-site look. Most surfaces sit in gentle layered planes with slightly raised cards, pill buttons, and inset-feeling header sections.

Shadows are cool-toned and low-opacity, helping elements lift from the background without looking flashy. The hero and navigation bars rely more on tonal separation and contrast than on heavy material-style shadows. Borders are used frequently to define containers, especially around utility links and rounded buttons.

## Shapes
The shape language is rounded and approachable, but not playful. Large pill buttons and badge-like controls dominate the interactive system, while cards use a modest 14px radius for a softer academic UI. The result is a blend of ceremonial formality and accessible friendliness.

Use `rounded.full` for prominent CTAs, nav pills, and chips. Use `rounded.lg` for cards and soft containers. Keep structural panels, bars, and layout bands largely square to maintain the page’s architectural stability.

## Components
Buttons are highly rounded and compact in height, with clear hierarchy between primary and secondary actions. Use `button-primary` for the main conversion action; it should stay deep navy with white text, bold Oswald/system labels, and a strong pill shape. Use `button-secondary` for lighter alternatives with a white surface and navy outline. Use `button-link` for simple text actions in dense navigation areas.

Primary buttons should maintain the observed proportions: around 188px minimum width, 49px height, and generous horizontal padding. Hover states should deepen the navy or slightly brighten the border, never introducing new hues. Secondary buttons should remain visibly lighter but still substantial enough to read as important actions.

Cards should use the `card` token: light neutral background, soft border, moderate radius, and restrained shadow. Keep card content compact and aligned with the site’s tidy information architecture. Avoid overly large internal spacing unless the card is a major content feature.

Inputs should follow the same rounded, outline-based language as buttons, with white surfaces and subdued borders. They should feel clean and administrative rather than trendy. Focus states should be visible through border color and shadow, not heavy fill changes.

Navigation items should use uppercase or near-uppercase styling with wider letter spacing, reflecting the academic header treatment. Chips and badges should be pill-shaped, compact, and used sparingly for status or highlighted categories. Topbars and announcement strips should use strong color blocks with high contrast text for immediate visibility.

## Do's and Don'ts
- Do keep the UI formal, structured, and institutionally credible.
- Do use deep navy as the dominant interface color and gold as a restrained accent.
- Do favor pill-shaped CTAs and compact uppercase navigation labels.
- Do preserve soft borders and subtle shadows instead of heavy, dramatic elevation.
- Don't introduce bright neon colors or trendy gradients that weaken the academic tone.
- Don't use sharp corners on key interactive elements like primary buttons or chips.
- Don't make typography overly decorative; keep headings bold, legible, and disciplined.
- Don't crowd content into dense blocks without clear spacing bands and visual separation.