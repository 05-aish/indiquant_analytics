# IndiMinds 2026, Tournament Analytics Dashboard

A scalable analytics platform built for the IndiMinds 2026 tournament ecosystem, visualizing contributor performance, engagement trends, operational metrics, and platform activity insights.

**Live Demo:** https://indiquant-analytics.vercel.app/
**Repository:** https://github.com/05-aish/indiquant_analytics
API Base URL: https://indiquantanalytics-production.up.railway.app

---

## What is this?

IndiMinds is an execution-focused tournament run by IndiQuant to identify high-potential builders, researchers, and engineers. As the tournament grows, the IndiQuant team needs a centralized view of how the ecosystem is evolving — who is submitting, which domains are most active, and how contributor performance is trending over time.

This dashboard provides that view. It is a single-page analytics application that ingests contributor and submission data, scores submissions automatically, and visualizes the results in real time — giving the IndiQuant team actionable insight into tournament health at a glance.

---

## Features

| Requirement | Implementation |
|---|---|
| Ecosystem Growth | Line chart tracking total contributor growth day by day |
| Engagement Trends | Line chart showing platform activity (submissions, updates, views) over time |
| Operational Metrics | Stat cards displaying total contributors, submissions, average score, and shortlisted count |
| Contributor Performance | Horizontal bar chart ranking top 10 contributors by evaluation score |
| Platform Activity Insights | Donut chart breaking down contributor distribution across domains |

### Additional Features
- **Submission Pipeline** - REST API endpoint accepting new project submissions, auto-scoring them, and persisting to database
- **Contributors Table** - Toggleable detailed table view with rank, domain, college, score, and color-coded status
- **Dynamic Color Generation** - Pie chart colors auto-adapt to any number of domains without hardcoding
- **Real-time Refetch** - Dashboard updates immediately after a new submission without page reload

---

## Tech Stack

| Technology | Purpose | Why |
|---|---|---|
| React + Vite | Frontend SPA | Fast dev experience, component-based architecture |
| Tailwind CSS | Styling | Utility-first, consistent dark theme across components |
| Recharts | Data visualization | Composable chart library built for React |
| Supabase | Database + Auth | PostgreSQL with instant REST API, scales horizontally |
| Express.js | Backend API | Lightweight Node server for submission ingestion pipeline |
| Zod | Input validation | Schema-based validation, type-safe request handling |
| Vercel | Frontend deployment | Zero-config deployment for Vite apps |
| Railway | Backend deployment | Simple Node.js hosting with environment variable support |

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                   React Frontend                │
│  (Vercel) — Dashboard, Charts, Submission Form  │
└───────────────┬─────────────────┬───────────────┘
                │                 │
        Direct  │          POST   │  /api/submissions
        fetch   │                 │
                ▼                 ▼
┌───────────────────┐   ┌─────────────────────────┐
│     Supabase      │   │    Express.js Backend   │
│   (PostgreSQL)    │◄──│       (Railway)         │
│                   │   │  Validate → Score →     │
│  contributors     │   │  Insert contributor +   │
│  submissions      │   │  submission + activity  │
│  activity_log     │   └─────────────────────────┘
│  daily_metrics    │
└───────────────────┘
```

**Data Flow:**
1. Dashboard loads → React hooks fetch from Supabase directly
2. New submission → Form hits Express API → Validated with Zod → Scored → Inserted into Supabase → Dashboard refetches

---

## Database Schema

### `contributors`
Stores participant profiles with scoring and ranking data.

### `submissions`
Stores project submissions linked to contributors, with documentation, execution, and thinking scores.

### `activity_log`
Tracks participant actions (submitted, updated, viewed) for engagement trend visualization.

### `daily_metrics`
Pre-aggregated daily snapshots for ecosystem growth tracking.

---

## API Documentation

### POST `/api/submissions`

Accepts a new project submission, validates input, auto-scores it, and persists to the database.

**Request Body:**
```json
{
  "name": "string",
  "college": "string",
  "domain": "Full Stack | Quant Research | Platforms Engineering | Finance | Machine Learning | Data Science | DevOps | Blockchain",
  "project_title": "string"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Submission received and scored",
  "data": {
    "id": "uuid",
    "project_title": "string",
    "evaluation_score": 78,
    "status": "pending",
    "submitted_at": "timestamp"
  }
}
```

**Scoring Logic:**
Submissions are auto-scored across three dimensions — documentation, execution, and thinking — and averaged into a final evaluation score. This simulates an automated evaluation pipeline.

**Validation:**
Input is validated using Zod schema before any database operation. Invalid domain values or missing fields return a structured 400 error.

---

## Scalability Decisions

- **Supabase PostgreSQL** handles horizontal scaling — no changes needed to the application layer as data grows
- **Component architecture** in React means new metric modules can be added without touching existing components
- **Dynamic color generation** in the domain chart uses HSL math to auto-adapt to any number of domains — no hardcoded color arrays
- **Centralized data fetching** in Dashboard.jsx with prop drilling ensures a single source of truth — avoids duplicate API calls across components
- **Modular Express backend** follows MVC pattern — controllers, routes, middleware, and utils are fully separated for maintainability

---

## Known Limitations & Future Scope

| Limitation | Future Solution |
|---|---|
| `daily_metrics` table is not auto-updated on new submissions | Add a database trigger or scheduled function to recompute daily aggregates |
| Scoring is randomized within a range | Implement ML-based scoring using submission content analysis |
| Backend runs as a separate service | Could be migrated to Supabase Edge Functions for a fully serverless architecture |
| No authentication | Add Supabase Auth with role-based access (admin vs contributor view) |
| No real-time updates | Leverage Supabase's real-time subscriptions for live dashboard updates without polling |

---

## Local Setup

### Prerequisites
- Node.js 18+
- Supabase account
- npm

### Frontend
```bash
git clone https://github.com/05-aish/indiquant_analytics
cd indiquant_analytics
npm install
```

Create `.env` in root:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

```bash
npm run dev
```

### Backend
```bash
cd server
npm install
```

Create `.env` in server/:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
PORT=3001
```

```bash
node server.js
```

---

## Author

Built for IndiMinds 2026 by Aishwarya Mandal