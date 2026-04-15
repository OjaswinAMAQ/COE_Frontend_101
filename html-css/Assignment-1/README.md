# 🌐 Accessible Responsive Website (Light/Dark Theme)

This project is a **responsive, accessible website** built using **semantic HTML and modern CSS**.  
It demonstrates best practices for **layout, theming, accessibility (a11y)**, and **responsive design** without using JavaScript for theming.

---

## ✨ Features

### 🎨 Theme System
- Light and Dark mode toggle
- Implemented using **CSS variables**
- No JavaScript required for theme switching
- Smooth color transitions
- Consistent theming across components (navbar, cards, tables, forms)

### 📊 Zebra-Striped Tables
- Clear row separation for readability
- Separate color variables for:
  - Odd rows
  - Even rows
  - Hover state
- High-contrast dark mode stripes for accessibility

### ♿ Accessibility (WCAG-friendly)
- Semantic HTML elements:
  - `header`, `nav`, `main`, `section`, `aside`, `footer`
- Proper heading hierarchy
- Keyboard navigation support
- Visible focus indicators using `:focus-visible`
- Accessible forms with labels
- Screen-reader friendly tables (`thead`, `tbody`, `scope`)
- Reduced motion support (`prefers-reduced-motion`)
- Dark mode contrast suitable for low-vision users

### 📱 Responsive Design
- Mobile-friendly layout
- Flexbox and Grid used where appropriate
- Scales correctly up to **200% zoom**
- Media queries for smaller screens

---

## 🧱 Tech Stack

- **HTML5** (semantic markup)
- **CSS3**
  - CSS Variables
  - Flexbox
  - Grid
  - Media Queries
  - `:has()` selector
- No external libraries
- No JavaScript for theming

---

## 🗂️ Project Structure

```text
.
├── index.html
├── styles.css
└── README.md
