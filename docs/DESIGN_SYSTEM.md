# Design System Documentation

## Overview

Brain Dump 2.0 features a theatrical, kinetic design system that brings AI agents to life through color, motion, and typography. The design emphasizes personality, clarity, and delight—making AI processing feel like a performance rather than a loading screen.

---

## 🎨 Color Palette

### Background Colors

The app uses a dark, rich gradient background to create depth and focus attention on the colorful agents.

```css
/* Primary Background Gradient */
background: linear-gradient(135deg, #1a0033 0%, #0a0015 100%);

/* Overlay Colors */
--bg-dark: #0a0015;        /* Deep purple-black */
--bg-medium: #1a0033;      /* Rich purple */
--bg-overlay: rgba(10, 0, 21, 0.8);  /* Semi-transparent dark */
```

### Agent Colors

Each agent has a distinct color identity with primary and highlight variants:

#### Listie (The Listener)
```css
--listie-primary: #FF3366;     /* Vibrant Red-Pink */
--listie-highlight: #FF6B8A;   /* Lighter Pink */
```
**Usage:** Extraction phase, ambiguity checks, HITL interactions  
**Emotion:** Energetic, attentive, warm

#### Linky (The Connector)
```css
--linky-primary: #00E5B8;      /* Bright Teal */
--linky-highlight: #4DEBB8;    /* Lighter Teal */
```
**Usage:** Relationship mapping, connection visualization  
**Emotion:** Curious, analytical, cool

#### Wordy (The Translator)
```css
--wordy-primary: #FFD426;      /* Golden Yellow */
--wordy-highlight: #FFE566;    /* Light Yellow */
```
**Usage:** Clarification, simplification, translation  
**Emotion:** Scholarly, helpful, clear

#### Sparky (The Challenger)
```css
--sparky-primary: #FF6B2C;     /* Fiery Orange */
--sparky-highlight: #FF8F5A;   /* Lighter Orange */
```
**Usage:** Critical analysis, question prompts, challenge states  
**Emotion:** Bold, provocative, intense

#### Blendy (The Synthesizer)
```css
--blendy-primary: #7B5CFF;     /* Royal Purple */
--blendy-highlight: #9F85FF;   /* Lighter Purple */
```
**Usage:** Final synthesis, result display, integration  
**Emotion:** Wise, balanced, authoritative

### Text Colors

```css
--text-primary: #FFFFFF;       /* Pure white - Main headings */
--text-secondary: #E0E0E0;     /* Light gray - Body text */
--text-muted: #A0A0A0;         /* Medium gray - Subtitles */
--text-dim: #606060;           /* Dark gray - Disabled states */
```

### Accent Colors

```css
--accent-success: #00FF88;     /* Success green */
--accent-error: #FF3366;       /* Error red (matches Listie) */
--accent-warning: #FFD426;     /* Warning yellow (matches Wordy) */
--accent-info: #00E5B8;        /* Info teal (matches Linky) */
```

### Interactive States

```css
/* Button States */
--btn-hover: rgba(255, 255, 255, 0.1);
--btn-active: rgba(255, 255, 255, 0.2);
--btn-focus: rgba(255, 255, 255, 0.3);

/* Input States */
--input-border: #3a2060;
--input-focus: #7B5CFF;        /* Blendy's color */
--input-error: #FF3366;        /* Listie's color */
```

---

## 📝 Typography

### Font Families

The app uses two distinct fonts to create hierarchy and personality:

```css
/* Display Font - Used for headlines, logos, CTAs */
font-family: 'Bowlby One', system-ui, sans-serif;
/* 
  Characteristics: Bold, rounded, playful
  Usage: Hero text, section headings, agent names
  Weight: 400 (only weight available)
*/

/* Body Font - Used for content, UI text */
font-family: 'Space Grotesk', system-ui, sans-serif;
/*
  Characteristics: Modern, geometric, readable
  Usage: Paragraphs, input fields, buttons, metadata
  Weights: 300, 400, 500, 600, 700
*/
```

### Font Loading

Fonts are loaded via Google Fonts in `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bowlby+One&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

```css
/* Heading Sizes (Bowlby One) */
--text-hero: 96px;           /* Hero/Logo text */
--text-h1: 64px;             /* Page titles */
--text-h2: 48px;             /* Section headings */
--text-h3: 36px;             /* Subsection headings */
--text-h4: 28px;             /* Agent names */

/* Body Sizes (Space Grotesk) */
--text-xl: 24px;             /* Large body, intro text */
--text-lg: 20px;             /* Emphasized body text */
--text-base: 18px;           /* Default body text */
--text-sm: 16px;             /* Small text, metadata */
--text-xs: 14px;             /* Captions, labels */

/* Line Heights */
--leading-tight: 1.1;        /* For display text */
--leading-normal: 1.5;       /* For body text */
--leading-relaxed: 1.8;      /* For long-form content */
```

### Font Weight Scale

```css
/* Space Grotesk Weights */
--font-light: 300;           /* Subtle text */
--font-normal: 400;          /* Default body */
--font-medium: 500;          /* Emphasized text */
--font-semibold: 600;        /* Headings, strong emphasis */
--font-bold: 700;            /* High emphasis */
```

---

## 📐 Spacing System

The app uses a consistent 8px-based spacing scale:

```css
/* Spacing Scale (8px base unit) */
--space-1: 8px;
--space-2: 16px;
--space-3: 24px;
--space-4: 32px;
--space-5: 40px;
--space-6: 48px;
--space-8: 64px;
--space-10: 80px;
--space-12: 96px;
--space-16: 128px;
--space-20: 160px;
--space-24: 192px;
```

### Component Spacing Patterns

```css
/* Common Patterns */
--content-padding: 32px;         /* Standard padding */
--section-gap: 80px;             /* Between major sections */
--component-gap: 24px;           /* Between related components */
--element-gap: 16px;             /* Between small elements */
--tight-gap: 8px;                /* Very related items */
```

### Container Widths

```css
--container-xs: 480px;           /* Modals, small forms */
--container-sm: 640px;           /* Input sections */
--container-md: 768px;           /* Content blocks */
--container-lg: 1024px;          /* Main content area */
--container-xl: 1280px;          /* Wide layouts */
--container-full: 100%;          /* Full width */
```

---

## 🎭 Animation Tokens

### Duration

```css
/* Animation Durations */
--duration-instant: 0.1s;        /* Immediate feedback */
--duration-fast: 0.2s;           /* Quick transitions */
--duration-normal: 0.3s;         /* Standard animations */
--duration-slow: 0.5s;           /* Deliberate animations */
--duration-slower: 0.8s;         /* Theatrical entrances */
--duration-slowest: 1.2s;        /* Dramatic effects */
```

### Easing Functions

```css
/* Easing Curves */
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Custom Easings */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

### Framer Motion Variants

Common animation patterns used throughout the app:

#### Fade In
```typescript
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};
```

#### Slide Up
```typescript
const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, ease: 'easeOut' }
};
```

#### Scale Pop
```typescript
const scalePop = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: 'easeOut' }
};
```

#### Bounce In
```typescript
const bounceIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { 
    type: 'spring', 
    stiffness: 260, 
    damping: 20 
  }
};
```

---

## 🎯 Component Patterns

### Buttons

#### Primary Button (Magnetic)
```tsx
<MagneticButton>
  style={{
    background: 'linear-gradient(135deg, #7B5CFF, #9F85FF)',
    color: '#FFFFFF',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 600,
    fontFamily: 'Space Grotesk, sans-serif',
    border: 'none',
    cursor: 'pointer'
  }}
</MagneticButton>
```

#### Agent-Colored Button
```tsx
style={{
  background: agentColor,  // e.g., #FF3366 for Listie
  color: '#FFFFFF',
  padding: '12px 24px',
  borderRadius: '8px'
}}
```

### Cards

```tsx
style={{
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: '32px'
}}
```

### Input Fields

```tsx
<textarea
  style={{
    background: 'rgba(255, 255, 255, 0.05)',
    border: '2px solid #3a2060',
    borderRadius: '12px',
    padding: '16px',
    color: '#FFFFFF',
    fontSize: '18px',
    fontFamily: 'Space Grotesk, sans-serif',
    resize: 'vertical'
  }}
/>
```

### Agent Display

```tsx
<div style={{
  border: `3px solid ${agent.color}`,
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(circle, ${agent.highlight}40, transparent)`
}}>
  <span style={{
    fontSize: '48px',
    color: agent.color
  }}>
    {agent.icon}
  </span>
</div>
```

---

## 🎪 Special Effects

### Parallax Scrolling

Used in the hero section for the logo and tagline:

```typescript
const yLogo = useTransform(scrollY, [0, 500], [0, 200]);
const yTagline = useTransform(scrollY, [0, 400], [0, 150]);
const opacityTagline = useTransform(scrollY, [0, 300], [1, 0]);
```

### Kinetic Logo

The logo has multiple animated states:

```typescript
// Bounce animation
animate={{
  y: [0, -10, 0],
  rotate: [0, 2, -2, 0]
}}
transition={{
  duration: 2,
  repeat: Infinity,
  ease: 'easeInOut'
}}

// Pulse glow
animate={{
  scale: [1, 1.05, 1],
  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
}}
```

### Typewriter Effect

```typescript
// Character-by-character reveal
const [displayedText, setDisplayedText] = useState('');
const [index, setIndex] = useState(0);

useEffect(() => {
  if (index < text.length) {
    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + text[index]);
      setIndex(index + 1);
    }, 30); // 30ms per character
    return () => clearTimeout(timeout);
  }
}, [index, text]);
```

### Custom Cursor

```typescript
// Follows mouse position
const [position, setPosition] = useState({ x: 0, y: 0 });

useEffect(() => {
  const updatePosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  window.addEventListener('mousemove', updatePosition);
  return () => window.removeEventListener('mousemove', updatePosition);
}, []);

// Magnetic attraction to buttons
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < magneticRadius) {
  targetX += dx * magneticStrength;
  targetY += dy * magneticStrength;
}
```

### Confetti

```typescript
// Random particles with physics
particles.forEach(particle => {
  particle.x += particle.velocityX;
  particle.y += particle.velocityY;
  particle.velocityY += gravity;
  particle.rotation += particle.rotationSpeed;
  particle.opacity -= fadeSpeed;
});
```

---

## 🎬 Processing Theater Background

### Animated Gradient Orbs

```typescript
// Multiple colored orbs that move independently
<motion.div
  animate={{
    x: [0, 100, 0],
    y: [0, 50, 0],
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3]
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut'
  }}
  style={{
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${agentColor}60, transparent)`,
    filter: 'blur(80px)'
  }}
/>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;      /* Small tablets */
--breakpoint-md: 768px;      /* Tablets */
--breakpoint-lg: 1024px;     /* Laptops */
--breakpoint-xl: 1280px;     /* Desktops */
--breakpoint-2xl: 1536px;    /* Large desktops */
```

### Responsive Patterns

#### Text Scaling
```css
/* Desktop */
font-size: 48px;

/* Tablet */
@media (max-width: 1024px) {
  font-size: 36px;
}

/* Mobile */
@media (max-width: 640px) {
  font-size: 28px;
}
```

#### Container Padding
```css
/* Desktop */
padding: 80px 40px;

/* Tablet */
@media (max-width: 1024px) {
  padding: 60px 32px;
}

/* Mobile */
@media (max-width: 640px) {
  padding: 40px 20px;
}
```

---

## 🎨 Design Principles

### 1. **Theatricality**
Every interaction is a performance. Agents appear with fanfare, results are revealed dramatically, and success is celebrated with confetti.

### 2. **Personality Through Color**
Each agent's color isn't just decoration—it's their identity. Users learn to associate colors with agent roles.

### 3. **Motion with Purpose**
Animations aren't arbitrary. They guide attention, indicate state changes, and create anticipation.

### 4. **Clarity in Complexity**
Despite the theatrical nature, the UI remains clear. Information hierarchy is maintained through typography and spacing.

### 5. **Delight at Every Step**
From the custom cursor to magnetic buttons to kinetic typography—every detail adds to the experience.

---

## 🔧 Implementation Guidelines

### Using Agent Colors

```typescript
import { AGENTS } from './constants';

// Access agent colors
const listieColor = AGENTS.listie.color;        // #FF3366
const listieHighlight = AGENTS.listie.highlight; // #FF6B8A

// Dynamic styling
<div style={{ 
  borderColor: AGENTS[currentAgent].color,
  background: `${AGENTS[currentAgent].highlight}20`  // 20% opacity
}} />
```

### Animation Best Practices

```typescript
// ✅ Good: Use Framer Motion for declarative animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
/>

// ❌ Avoid: Manual setTimeout-based animations
// (except for typewriter effects where character timing is needed)
```

### Responsive Implementation

```typescript
// ✅ Use conditional rendering or inline media queries
const isMobile = window.innerWidth < 640;

<div style={{
  fontSize: isMobile ? '24px' : '48px',
  padding: isMobile ? '16px' : '32px'
}} />
```

---

## 📦 Assets & Resources

### Font Files
- **Bowlby One**: Google Fonts (loaded via CDN)
- **Space Grotesk**: Google Fonts (loaded via CDN)

### Icons
- **Library**: Lucide React
- **Usage**: Minimal, used for UI controls (arrows, close buttons, etc.)
- **Style**: Outline style, consistent with modern design

### Images
- Banner image hosted on GitHub user attachments
- No local image assets required

---

## 🚀 Future Design Enhancements

1. **Dark/Light Mode Toggle**: Add light theme support
2. **Custom Themes**: Allow users to customize agent colors
3. **Agent Avatars**: Add illustrated character designs
4. **Sound Design**: Add subtle audio feedback for interactions
5. **3D Effects**: Introduce depth with Three.js or similar
6. **Accessibility**: Add reduced motion preferences
7. **Mobile Optimization**: Enhanced touch interactions

---

For technical implementation details, see [ARCHITECTURE.md](./ARCHITECTURE.md).  
For agent personality details, see [AGENTS.md](./AGENTS.md).
