# Design System Tokens & Style Guide (`design.md`)

Dokumen ini berisi spesifikasi Design Tokens dan Style Guide resmi untuk aplikasi dan antarmuka produk. Dokumen ini dirancang untuk memastikan konsistensi visual antara tim Desain (Figma/Design System) dan tim Engineering (Frontend Development).

---

## 1. Typography System

### 1.1 Font Family
* **Primary Font:** `Plus Jakarta Sans`, sans-serif
* **Fallback Stack:** `Plus Jakarta Sans`, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

### 1.2 Font Weights
* **Extrabold:** `800`
* **Bold:** `700`
* **Semibold:** `600`
* **Medium:** `500`
* **Regular:** `400`

### 1.3 Typography Scale & Tokens

| Token Name | Font Size | Font Weight | Line Height | CSS Class / Property Example |
| :--- | :--- | :--- | :--- | :--- |
| **Hero** | 72px (4.5rem) | Extrabold (800) | 110% (1.1) | `font-size: 72px; font-weight: 800; line-height: 1.1;` |
| **Display** | 48px (3rem) | Bold (700) | 115% (1.15) | `font-size: 48px; font-weight: 700; line-height: 1.15;` |
| **Heading 1** | 40px (2.5rem) | Bold (700) | 120% (1.2) | `font-size: 40px; font-weight: 700; line-height: 1.2;` |
| **Heading 2** | 32px (2rem) | Bold (700) | 125% (1.25) | `font-size: 32px; font-weight: 700; line-height: 1.25;` |
| **Heading 3** | 24px (1.5rem) | Semibold (600) | 130% (1.3) | `font-size: 24px; font-weight: 600; line-height: 1.3;` |
| **Heading 4** | 20px (1.25rem) | Semibold (600) | 140% (1.4) | `font-size: 20px; font-weight: 600; line-height: 1.4;` |
| **Heading 5** | 18px (1.125rem) | Semibold (600) | 140% (1.4) | `font-size: 18px; font-weight: 600; line-height: 1.4;` |
| **Heading 6** | 16px (1rem) | Semibold (600) | 145% (1.45) | `font-size: 16px; font-weight: 600; line-height: 1.45;` |
| **Body XL** | 18px (1.125rem) | Regular (400) | 140% (1.4) | `font-size: 18px; font-weight: 400; line-height: 1.4;` |
| **Body L** | 16px (1rem) | Regular (400) | 140% (1.4) | `font-size: 16px; font-weight: 400; line-height: 1.4;` |
| **Body M** | 14px (0.875rem) | Regular (400) | 155% (1.55) | `font-size: 14px; font-weight: 400; line-height: 1.55;` |
| **Body S** | 12px (0.75rem) | Regular (400) | 150% (1.5) | `font-size: 12px; font-weight: 400; line-height: 1.5;` |
| **Label XL** | 16px (1rem) | Semibold (600) | 145% (1.45) | `font-size: 16px; font-weight: 600; line-height: 1.45;` |
| **Label L** | 14px (0.875rem) | Semibold (600) | 145% (1.45) | `font-size: 14px; font-weight: 600; line-height: 1.45;` |
| **Label M** | 12px (0.75rem) | Medium (500) | 145% (1.45) | `font-size: 12px; font-weight: 500; line-height: 1.45;` |
| **Label S** | 11px (0.6875rem) | Medium (500) | 140% (1.4) | `font-size: 11px; font-weight: 500; line-height: 1.4;` |

---

## 2. Color System & Palette

### 2.1 Brand Colors

| Token Name | Hex Code | RGB | Sample Use Case |
| :--- | :--- | :--- | :--- |
| **Color Primary** | `#33B550` | `rgb(51, 181, 80)` | Main brand actions, primary buttons, active tabs, highlights |
| **Color Secondary** | `#F38524` | `rgb(243, 133, 36)` | Secondary CTA, promotional badges, attention highlights |
| **Color Tertiary** | `#137FC3` | `rgb(19, 127, 195)` | Information elements, links, accent details, interactive focus states |

### 2.2 Text Colors

| Token Name | Hex Code | Usage Guidance |
| :--- | :--- | :--- |
| **Text Primary** | `#0A0A0A` | Utama untuk judul, headline, body text utama (High Contrast) |
| **Text Secondary** | `#4A4A4A` | Digunakan untuk deskripsi, sub-heading, metadata, label pendukung |
| **Text Tertiary** | `#9A9A9A` | Placeholder, disabled text, caption, timestamp |
| **Text Inverted** | `#FFFFFF` | Teks di atas latar belakang gelap / Primary button text |

### 2.3 Extended Palette & Tints (Derived)

| Scale | Primary (`#33B550`) | Secondary (`#F38524`) | Tertiary (`#137FC3`) | Neutral / Surface |
| :--- | :--- | :--- | :--- | :--- |
| **50 (Light Tint)** | `#EBF8EE` | `#FEF3E9` | `#E7F2F9` | `#FAFAFA` (Background) |
| **100** | `#C2EBCB` | `#FCDAB8` | `#B7D9EE` | `#F5F5F5` (Surface Muted) |
| **500 (Base)** | `#33B550` | `#F38524` | `#137FC3` | `#E5E5E5` (Border Default) |
| **700 (Hover/Dark)**| `#289140` | `#D66D13` | `#0E6197` | `#4A4A4A` (Text Secondary) |
| **900 (Deep Dark)** | `#1A5E2A` | `#8C4305` | `#083B5E` | `#0A0A0A` (Text Primary) |

---

## 3. Spacing, Elevation & Border Radius Tokens

### 3.1 Border Radius Tokens
* **Radius Small (`--radius-sm`):** `4px` (Tags, Small Badges)
* **Radius Medium (`--radius-md`):** `8px` (Buttons, Form Inputs, Dropdowns)
* **Radius Large (`--radius-lg`):** `12px` (Cards, Modals)
* **Radius Extra Large (`--radius-xl`):** `16px` (Large Feature Containers)
* **Radius Full (`--radius-full`):** `9999px` (Pills, Avatars)

### 3.2 Shadow / Elevation Tokens
* **Shadow Low (`--shadow-sm`):** `0px 1px 2px rgba(0, 0, 0, 0.05)`
* **Shadow Medium (`--shadow-md`):** `0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)`
* **Shadow High (`--shadow-lg`):** `0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)`

---

## 4. Implementation Code Snippets

### 4.1 CSS Custom Properties (`variables.css`)

```css
:root {
  /* Font Family */
  --font-primary: 'Plus Jakarta Sans', sans-serif;

  /* Typography Scale */
  --text-hero-size: 72px;
  --text-hero-weight: 800;
  --text-hero-leading: 1.1;

  --text-display-size: 48px;
  --text-display-weight: 700;
  --text-display-leading: 1.15;

  --text-h1-size: 40px;
  --text-h1-weight: 700;
  --text-h1-leading: 1.2;

  --text-h2-size: 32px;
  --text-h2-weight: 700;
  --text-h2-leading: 1.25;

  --text-h3-size: 24px;
  --text-h3-weight: 600;
  --text-h3-leading: 1.3;

  --text-h4-size: 20px;
  --text-h4-weight: 600;
  --text-h4-leading: 1.4;

  --text-h5-size: 18px;
  --text-h5-weight: 600;
  --text-h5-leading: 1.4;

  --text-h6-size: 16px;
  --text-h6-weight: 600;
  --text-h6-leading: 1.45;

  --text-body-xl-size: 18px;
  --text-body-xl-weight: 400;
  --text-body-xl-leading: 1.4;

  --text-body-l-size: 16px;
  --text-body-l-weight: 400;
  --text-body-l-leading: 1.4;

  --text-body-m-size: 14px;
  --text-body-m-weight: 400;
  --text-body-m-leading: 1.55;

  --text-body-s-size: 12px;
  --text-body-s-weight: 400;
  --text-body-s-leading: 1.5;

  --text-label-xl-size: 16px;
  --text-label-xl-weight: 600;
  --text-label-xl-leading: 1.45;

  --text-label-l-size: 14px;
  --text-label-l-weight: 600;
  --text-label-l-leading: 1.45;

  --text-label-m-size: 12px;
  --text-label-m-weight: 500;
  --text-label-m-leading: 1.45;

  --text-label-s-size: 11px;
  --text-label-s-weight: 500;
  --text-label-s-leading: 1.4;

  /* Color Tokens */
  --color-primary: #33B550;
  --color-secondary: #F38524;
  --color-tertiary: #137FC3;

  --color-text-primary: #0A0A0A;
  --color-text-secondary: #4A4A4A;
  --color-text-tertiary: #9A9A9A;
  --color-text-inverted: #FFFFFF;
}
```

### 4.2 Tailwind CSS Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#33B550',
          50: '#EBF8EE',
          500: '#33B550',
          700: '#289140',
        },
        secondary: {
          DEFAULT: '#F38524',
          50: '#FEF3E9',
          500: '#F38524',
          700: '#D66D13',
        },
        tertiary: {
          DEFAULT: '#137FC3',
          50: '#E7F2F9',
          500: '#137FC3',
          700: '#0E6197',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#4A4A4A',
          tertiary: '#9A9A9A',
        },
      },
      fontSize: {
        'hero': ['72px', { lineHeight: '110%', fontWeight: '800' }],
        'display': ['48px', { lineHeight: '115%', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '120%', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '125%', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '130%', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '140%', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '140%', fontWeight: '600' }],
        'h6': ['16px', { lineHeight: '145%', fontWeight: '600' }],
        'body-xl': ['18px', { lineHeight: '140%', fontWeight: '400' }],
        'body-l': ['16px', { lineHeight: '140%', fontWeight: '400' }],
        'body-m': ['14px', { lineHeight: '155%', fontWeight: '400' }],
        'body-s': ['12px', { lineHeight: '150%', fontWeight: '400' }],
        'label-xl': ['16px', { lineHeight: '145%', fontWeight: '600' }],
        'label-l': ['14px', { lineHeight: '145%', fontWeight: '600' }],
        'label-m': ['12px', { lineHeight: '145%', fontWeight: '500' }],
        'label-s': ['11px', { lineHeight: '140%', fontWeight: '500' }],
      },
    },
  },
};
```

---
*Dokumen Design Tokens ini dibuat secara otomatis untuk referensi tim UI/UX Design dan Frontend Engineering.*
