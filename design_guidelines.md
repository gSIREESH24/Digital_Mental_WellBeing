# MindEase Campus - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from leading mental health and wellness platforms (Calm, Headspace, BetterHelp) combined with modern healthcare interfaces. The design prioritizes emotional safety, trust-building, and accessibility while maintaining a contemporary, student-friendly aesthetic.

**Core Principles**: 
- Empathetic minimalism with breathing room
- Psychological safety through soft, non-threatening visuals
- Immediate clarity on privacy and confidentiality
- Gentle engagement without overwhelming users in distress

---

## Typography

**Primary Font**: Inter (Google Fonts) - clean, highly readable, modern
**Accent Font**: Quicksand (Google Fonts) - friendly, rounded, approachable

**Hierarchy**:
- Hero Headlines: Quicksand Bold, 48-56px (mobile: 32-36px)
- Section Headers: Quicksand SemiBold, 32-40px (mobile: 24-28px)
- Subheadings: Inter SemiBold, 20-24px
- Body Text: Inter Regular, 16-18px, line-height 1.6
- Small Text/Labels: Inter Medium, 14px
- Button Text: Inter SemiBold, 16px

---

## Layout System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20
- Micro spacing (within components): p-2, p-4
- Component spacing: p-6, p-8, gap-6
- Section padding: py-12, py-16, py-20
- Large breathing room: py-24, py-32

**Container Strategy**:
- Full-width sections: w-full with max-w-7xl inner
- Content sections: max-w-6xl
- Reading content: max-w-3xl
- Dashboard cards: Grid with gap-6 to gap-8

---

## Component Library

### Navigation
**Header**: Fixed top, semi-transparent backdrop blur, subtle shadow
- Logo left (illustration-based, not text-only)
- Navigation center: Home, Resources, Support, Book Counselling, About
- Right side: Theme toggle icon, User avatar/Login button
- Mobile: Hamburger menu with slide-in drawer

**Footer**: Three-column layout (desktop), stacked (mobile)
- Column 1: Brand logo, tagline "Your Mental Health, Our Priority", social links
- Column 2: Quick links (Privacy Policy, Terms, FAQ, Crisis Resources)
- Column 3: Contact information, helpline numbers
- Bottom bar: Crisis hotline prominently displayed, copyright

### Hero Section
**Layout**: Asymmetric split - 60% left content, 40% right illustration
- Left: Large headline "Your Mental Health, Our Priority"
- Subheadline: "AI-guided help, just when you need it. Anonymous. Secure. Stigma-free."
- Two CTAs: Primary "Start Chat Now", Secondary "Explore Resources"
- Trust indicators below CTAs: "✓ 100% Confidential  ✓ Available 24/7  ✓ Peer-Reviewed Content"
- Right: Custom illustration showing diverse students in supportive environment (soft, pastel style)

### Feature Cards (Homepage)
**Grid**: 3 columns desktop, 2 tablet, 1 mobile (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

Each card includes:
- Illustration icon (200x200px, pastel-colored)
- Feature title (Quicksand SemiBold, 24px)
- Description (Inter Regular, 16px, 3-4 lines)
- "Learn More →" link

Features to showcase:
1. AI Chatbot - "Instant Support, Anytime"
2. Counselling Booking - "Connect with Professionals"
3. Resource Library - "Self-Help at Your Pace"
4. Peer Forum - "Share, Support, Grow Together"
5. Mood Tracking - "Understand Your Journey"
6. Daily Tools - "Sleep Monitor, Planner, Doodle Pad"

### Chatbot Interface
**Design**: Bottom-right floating bubble (desktop), full-screen modal (mobile)
- Rounded chat window with soft shadow
- User messages: Right-aligned, rounded pill shape
- Bot messages: Left-aligned, rounded pill shape with bot avatar
- Input field: Rounded, with send button and emoji picker
- Quick reply chips above input for common concerns
- Typing indicator with animated dots

### Dashboard (Student View)
**Layout**: Sidebar navigation + main content area

**Sidebar** (w-64, fixed):
- Profile section at top: Avatar, name, current mood indicator
- Navigation items: Dashboard, Mood Log, My Bookings, Resources, Forum, Settings
- Panic Button at bottom (prominent, red outline)

**Main Content Area**:
- Welcome banner with personalized greeting and daily affirmation
- Stats cards (4-column grid): Sessions completed, Current streak, Resources viewed, Forum posts
- Mood tracker chart (line graph showing 7-day trend)
- Upcoming appointments card with calendar preview
- Recommended resources carousel
- Recent forum activity feed

### Admin Dashboard
**Layout**: Full-width with metric cards

**Top Row** (4 cards): Total users, Active sessions today, Bookings this week, Resources accessed
**Charts Section** (2-column):
- Left: Mood trends over time (area chart)
- Right: Popular resource categories (donut chart)
**Tables Section**:
- Most accessed resources table
- Booking patterns by day/time heatmap
- Anonymous user engagement metrics

### Booking System
**Calendar View**: Month view with available slots highlighted
- Time slot selection with 30-min increments
- Counsellor profiles: Photo, name, specialization, availability
- Booking form: Student details (pre-filled), concern category, preferred communication method
- Confirmation modal with calendar export option

### Resource Hub
**Filter Sidebar**: Categories, content type (video/audio/article), language, duration
**Grid Layout**: 2-3 columns with resource cards
- Thumbnail/icon (16:9 ratio for videos, square for audio)
- Title, duration, category tag
- Description preview (2 lines)
- "View" or "Listen" button

### Peer Forum
**Thread List**: Card-based layout with:
- Anonymous avatar (randomly generated, consistent per user session)
- Thread title, preview text (2 lines)
- Metadata: Timestamp, reply count, anonymous upvotes
- Category tag (Stress, Anxiety, Relationships, etc.)

**Thread View**: 
- Original post at top with full content
- Nested replies with threading lines
- Reply input at bottom
- Report/flag buttons for moderation

### Daily Tools Section
**Mood Logger**: 
- Emoji-based mood selector (5 options: Great, Good, Okay, Low, Very Low)
- Optional note input
- Calendar view showing mood history with colored dots

**Sleep Monitor**:
- Time picker for sleep/wake times
- Sleep quality rating
- Weekly sleep pattern chart

**Doodle Pad**:
- Canvas with drawing tools: Pen, eraser, colors (pastel palette)
- Save/share options

**Daily Planner**:
- Time-blocked schedule view
- Add task/event button
- Completion checkboxes

### Forms & Inputs
All forms use consistent styling:
- Labels: Inter Medium, 14px, above input
- Input fields: Rounded-lg, p-3, subtle border
- Focus state: Gentle glow (soft blue/lavender)
- Error state: Soft red border with helper text
- Success state: Soft green border with checkmark

### Buttons
**Primary**: Rounded-full, px-8, py-3, medium shadow
**Secondary**: Rounded-full, px-8, py-3, outline style
**Tertiary**: Text-only with arrow icon
**Panic Button**: Rounded-lg, px-6, py-4, distinctive with icon

---

## Images

**Hero Section**: Custom illustration (not photo) showing:
- 3-4 diverse students in supportive poses (sitting together, one offering comfort)
- Soft pastel background with abstract shapes (clouds, gentle curves)
- Warm, inclusive, non-clinical aesthetic
- Style: Flat illustration with subtle gradients, rounded shapes
- Placement: Right side of hero, 40% width

**Feature Section Icons**: Custom illustrated icons (200x200px each):
- Chat bubble with heart for AI Chatbot
- Calendar with checkmark for Booking
- Open book with stars for Resources
- Connected people for Peer Forum
- Heart rate line with upward trend for Mood Tracking
- Moon/sun with planner for Daily Tools

**Resource Hub Thumbnails**: 
- Illustrative thumbnails for each resource (not stock photos)
- Consistent style with pastel colors
- 16:9 ratio for videos, 1:1 for audio content

**About/Team Section**: 
- Friendly, approachable photos of counsellors (if real photos used)
- Otherwise, illustrated avatars matching overall style
- Background: Soft gradients or subtle patterns

**Background Treatments**:
- Subtle gradient overlays (light blue to lavender) on section backgrounds
- Soft blob shapes as decorative elements
- Never harsh or high-contrast backgrounds

**Accessibility**: All images include meaningful alt text describing their supportive, inclusive nature

---

## Visual Enhancements

**Card Shadows**: Soft, multi-layered shadows (shadow-lg) for depth without harshness

**Rounded Corners**: Consistent use of rounded-2xl for cards, rounded-full for buttons/avatars

**Hover States**: Subtle lift effect (translate-y-1) with shadow increase, gentle transitions (300ms)

**Loading States**: Skeleton screens with gentle pulse animation in pastel shades

**Empty States**: Friendly illustrations with encouraging messages, never stark or clinical

**Theme Toggle**: Smooth transition between light/dark modes, maintaining pastel aesthetic in dark mode with deeper tones

**Micro-interactions**: Gentle scale on button press, smooth accordion expansions, fade-in animations for content