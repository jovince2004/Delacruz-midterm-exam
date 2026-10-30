
# Barrido’s Puto and Pinasugbo

Live site: https://jovince2004.github.io/Delacruz-midterm-exam/

## About
A small-business website for a Manapla food stall selling puto and pinasugbo. It is for customers who want to see the products, read the news and visit the store or buy pasalubong.

## Design System

### Palette (60-30-10)
| Role | Share | Color | Used for |
|---|---|---|---|
| Dominant | 60% | #ECE3D6 (light) / #221A15 (dark) | Page background |
| Secondary | 30% | #DDCFBA (light) / #2E241D (dark) | Cards, navigation, form panels |
| Accent | 10% | #B5560A (light) / #F2994A (dark) | Buttons, headings highlights, progress bar |

### Visual style
Style chosen: neumorphism (soft raised and pressed shapes made with light and dark shadows).

Why I chose it: the soft, rounded look fits a friendly food business and keeps the page calm and readable.

### Contrast check
Body text color vs. background color: #3E2714 on #ECE3D6
Contrast ratio: 10.98 : 1 (needs to be at least 4.5 : 1)
Tool used: WCAG luminance formula (script); re-check with the WebAIM Contrast Checker before submitting.

Other pairs checked: white on accent button 4.88 : 1; dark mode text #F1E4D2 on #221A15 13.67 : 1.

## Features
- Mobile-first responsive layout
- Dark mode toggle
- Page-load intro animation (GSAP timeline)
- Scroll reveals on every section below the hero (ScrollTrigger)
- Scroll progress bar (scrub)
- Reduced-motion support

## Built With
HTML, Tailwind CSS, JavaScript, GSAP, ScrollTrigger
