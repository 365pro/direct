# NSRSN - Nordic Smart Road Stud Network

## Original Problem Statement
Create a modern, responsive website for NSRSN – Nordic Smart Road Stud Network, a deep-tech B2B startup building smart subsurface road studs for winter-proof autonomous driving on Nordic motorways.

## User Choices
- Color scheme: Dark blue/grey backgrounds with warm amber accent
- Contact form: Both functional form + mailto link
- Images: Placeholder/stock images
- Team names: Placeholders
- Site structure: Single-page with smooth scroll sections

## Target Audience
- Government & road authorities (Trafikverket, Nordic ministries)
- OEMs and Tier-1s working on ADAS/AV
- Infra/climate/deep-tech investors
- Mobility platforms (robotaxi, freight)

## Core Requirements
1. Hero section with strong headline and CTAs
2. Problem section explaining winter road challenges
3. Solution section explaining smart road studs
4. Benefits section for stakeholders
5. How it works - architecture diagram
6. Roadmap/deployment phases
7. Partners & ecosystem section
8. About & team section
9. Contact form with database storage
10. Footer with navigation

## What's Been Implemented (December 2025)

### Frontend (React + Tailwind + Framer Motion)
- Single-page scrolling website with 10 sections
- Dark Nordic theme (background #050A14, amber #F59E0B accents)
- Manrope + DM Sans typography
- Glassmorphism card components
- Smooth scroll navigation
- Mobile responsive with hamburger menu
- Animated components using framer-motion
- Hero with background image and CTAs
- Problem section with 3 challenge cards
- Solution section with 4 feature cards (bento grid)
- Benefits section for 3 stakeholder types
- Technology/architecture diagram section
- Roadmap timeline with 4 phases
- Partners placeholder section
- Team placeholder section
- Functional contact form
- Footer with links

### Executive Pitch Deck (/pitch)
- 8-slide interactive presentation for Silicon Valley VCs
- Full-screen slides with keyboard navigation (Arrow keys, Space)
- Click navigation via dots and prev/next buttons
- Progress bar showing presentation completion
- Slide counter (01/08 format)
- Animated transitions between slides
- Interactive demo slide with map simulation:
  - Animated highway with NSRSN studs
  - "Simulate Temperature Drop" button triggers ice detection
  - Real-time polygon pulse effect showing danger zone
  - Mock API response overlay
- Comparison matrix with animated bars
- Revenue model tiers visualization
- "Back to site" link for easy navigation

### Backend (FastAPI + MongoDB)
- Contact form submission endpoint (POST /api/contact)
- Contact submissions retrieval (GET /api/contact)
- MongoDB storage for contact data
- Email validation with Pydantic

## Architecture
```
/app/
├── backend/
│   ├── server.py          # FastAPI server with contact endpoints
│   └── .env               # MongoDB config
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component with all sections
│   │   ├── App.css        # Animations and custom styles
│   │   ├── index.css      # Tailwind + theme variables
│   │   └── components/ui/ # Shadcn components
│   └── .env               # Backend URL
```

## Prioritized Backlog

### P0 - Complete
- [x] Hero section
- [x] Navigation
- [x] All content sections
- [x] Contact form functionality
- [x] Mobile responsiveness

### P1 - Next Up
- [ ] Add actual prospectus PDF download
- [ ] Replace placeholder team photos/names
- [ ] Add real partner logos when available
- [ ] SEO meta tags and Open Graph

### P2 - Future
- [ ] Blog/news section
- [ ] Case studies page
- [ ] Multi-language support (Swedish, Norwegian)
- [ ] Admin panel for contact submissions
- [ ] Email notifications on form submission
- [ ] Analytics integration

## Next Action Items
1. Add real team member names, photos, and bios
2. Upload and link investment prospectus PDF
3. Add partner logos as partnerships form
4. Configure SEO meta tags for better discoverability
