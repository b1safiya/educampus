# Design Brief

## Direction
EduCampus — Smart Notice Board — Professional productivity interface designed as a trusted university portal with vibrant accent accents signaling academic innovation.

## Tone
Refined minimalism executed with confidence; deep, trustworthy darks paired with saturated teal accents convey authority and modernity without excess decoration.

## Differentiation
Active sidebar states use primary teal accent with smooth hover transitions; notice cards elevated above background with semantic category badge colors; all interactive elements feature choreographed animations creating premium, intentional feel.

## Color Palette

| Token           | OKLCH (Light)        | OKLCH (Dark)         | Role                        |
| --------------- | -------------------- | -------------------- | --------------------------- |
| background      | 0.98 0.005 260       | 0.12 0.01 260        | Main canvas                 |
| foreground      | 0.15 0.01 260        | 0.95 0.01 260        | Text & primary content      |
| card            | 0.99 0.005 260       | 0.16 0.02 260        | Elevated notice cards       |
| primary         | 0.55 0.2 265 (indigo)| 0.72 0.18 195 (teal) | Active states, CTAs, accent |
| accent          | 0.65 0.2 50 (warm)   | 0.70 0.18 65 (amber) | Alerts, badges, importance  |
| muted           | 0.95 0.01 260        | 0.22 0.02 260        | Subtle backgrounds          |
| destructive     | 0.55 0.22 25         | 0.55 0.2 25          | Delete/error actions        |

## Typography
- Display: Space Grotesk — geometric, modern tech aesthetic for headings and hero text
- Body: DM Sans — neutral, clean, highly readable for content and UI labels
- Scale: h1 `text-4xl md:text-5xl font-bold`, h2 `text-2xl md:text-3xl font-bold`, label `text-xs md:text-sm font-semibold uppercase tracking-wide`, body `text-base`

## Elevation & Depth
Cards use subtle elevated shadows (`shadow-card` 0.12px blur) on light backgrounds, slightly more prominent on dark (`shadow-elevated` 1px 3px). No gradients; layering through background color changes and shadow hierarchy only.

## Structural Zones

| Zone       | Background              | Border                    | Notes                                           |
| ---------- | ----------------------- | ------------------------- | ----------------------------------------------- |
| Header     | `bg-card` / `bg-sidebar`| `border-b border-border`  | Logo, search, theme toggle, user menu           |
| Sidebar    | `bg-sidebar` (distinct) | `border-r border-sidebar` | Nav links, active state uses teal primary color |
| Content    | `bg-background`         | —                         | Main notice list, alternating subtle sections   |
| Notice     | `bg-card`               | `border border-border`    | Elevated above background, hover lifts slightly |
| Footer     | `bg-muted` with opacity | `border-t border-border`  | Metadata, copyright; faded secondary text       |

## Spacing & Rhythm
Grid-based 4px increment spacing; sections separated by 2rem vertically; cards maintain 1rem internal padding; sidebar nav items spaced 0.5rem apart for compact density; notice cards use 1.5rem gap between title and metadata.

## Component Patterns
- Buttons: `rounded-md`, teal primary/muted secondary, hover adds `shadow-elevated` + slight scale, white-on-teal foreground
- Cards: `rounded-lg`, `bg-card` with `border-border`, hover adds `shadow-elevated` + `scale-105` via `.card-hover` utility
- Badges: `.badge` utility — `rounded-full px-2.5 py-0.5`, semantic colors per category (Announcement=primary, Event=accent, Assignment=secondary, Alert=destructive)

## Motion
- Entrance: cards fade in (`animate-fade-in` 0.4s on load), sidebar slides in (`animate-slide-in-from-left` 0.3s)
- Hover: all interactive elements use `.transition-smooth` (0.3s cubic-bezier); buttons/cards lift with shadow + scale on hover
- Decorative: none; all motion serves functional feedback

## Constraints
- Never use raw color literals or hex codes; use semantic tokens only (`text-primary`, `bg-accent`)
- Never use default Tailwind shadows; use `shadow-card` or `shadow-elevated` only
- No full-page gradients or decorative elements; maintain focus on notice content
- Dark mode is primary visual system; light mode is secondary accessibility option

## Signature Detail
Sidebar navigation with animated teal accent line that tracks active link state, creating visual momentum and clear hierarchy in a typically static UI zone — differentiates from flat admin panels.
