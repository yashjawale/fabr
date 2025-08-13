---
title: Style Guide
description: Fabr brand colors, typography, and design system implementation.
---

import StyleDemo from '../../components/StyleDemo.astro';

# Style Guide

This page demonstrates the implementation of the Fabr style guide with proper colors, typography, and theming.

## Brand Colors

Our color palette consists of warm orange tones and neutral backgrounds that work in both light and dark themes:

- **Primary Orange**: `#C94402` (light) / `#EC8856` (dark)
- **Cream Background**: `#FCFAEE` 
- **Dark Background**: `#242424`
- **Light Text**: `#F1F1F1`

## Typography

- **Headings**: Use `.font-title` class to apply Amaranth font
- **Body**: System Sans-serif (default)

By default, all text uses system fonts. Apply the `.font-title` class when you want to use the brand font for headings or special text.

## Live Demo

<StyleDemo />

## Usage

### CSS Variables

All colors are available as CSS variables:

```css
:root {
  --color-fabr-orange: #C94402;
  --color-fabr-cream: #FCFAEE;
  --color-fabr-dark: #242424;
  --color-fabr-orange-dark: #EC8856;
  --color-fabr-light: #F1F1F1;
  --color-fabr-bg-dark: #242424;
}
```

### Tailwind Classes

Use the following Tailwind utility classes:

```html
<!-- Text colors -->
<h1 class="text-fabr-orange">Orange text</h1>
<p class="text-fabr-dark">Dark text</p>

<!-- Background colors -->
<div class="bg-fabr-orange">Orange background</div>
<div class="bg-fabr-cream">Cream background</div>
<div class="bg-fabr-dark">Dark background</div>

<!-- Typography -->
<h1 class="font-title">Heading with Amaranth font</h1>
<p>Body text with system font (default)</p>
```

### Direct Color Classes

These classes use the theme-aware colors directly:

- `.text-fabr-orange` - Brand orange color (adapts to theme)
- `.bg-fabr-orange` - Orange background
- `.text-fabr-dark` - Dark text color
- `.bg-fabr-cream` - Cream background
- `.bg-fabr-dark` - Dark background
