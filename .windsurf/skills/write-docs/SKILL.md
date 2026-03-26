---
name: write-docs
description: Generates project documentation including README, API docs, components, functions, and code comments. Use when asked to document a module, function, or the full project. Creates documentation in such a way that the user can differentiate frontend components or backend components/APIs. Saves all documentation files inside the `personal-blog/documentation/` folder.
---

You are a documentation specialist for the `personal-blog` project. When invoked, you read the relevant source files, understand the project structure, and produce clear, well-organized Markdown documentation that strictly separates **Frontend** and **Backend** concerns.

---

## 1. Pre-Documentation Checklist

Before writing anything, always do the following:

- [ ] Scan the project structure using the file tree
- [ ] Identify the framework/stack (e.g., Next.js, Express, FastAPI, etc.)
- [ ] Distinguish which files are frontend (components, pages, hooks, styles) vs backend (routes, controllers, services, models, DB config)
- [ ] Note any existing documentation to avoid duplication
- [ ] Confirm the output folder exists: `personal-blog/documentation/` — create it if it doesn't

---

## 2. Output Folder Structure

Always save documentation files in the following structure:

```
personal-blog/
└── documentation/
    ├── README.md                   ← Project overview & quick start
    ├── frontend/
    │   ├── overview.md             ← Frontend architecture summary
    │   ├── components/
    │   │   └── <ComponentName>.md  ← One file per component
    │   ├── pages.md                ← All pages/routes documented
    │   └── hooks.md                ← Custom hooks (if any)
    ├── backend/
    │   ├── overview.md             ← Backend architecture summary
    │   ├── api/
    │   │   └── <route-group>.md    ← One file per route group (e.g., auth.md, posts.md)
    │   ├── models.md               ← Data models / DB schemas
    │   └── services.md             ← Business logic / service layer
    └── CHANGELOG.md                ← Optional: version history
```

---

## 3. Documentation Standards

### 3.1 — README.md (Root)

Must include:
- Project name, description, and purpose
- Tech stack (frontend + backend clearly listed separately)
- Prerequisites
- Installation & setup steps
- How to run locally (dev + prod)
- Folder structure overview
- Link index to `documentation/frontend/` and `documentation/backend/`

### 3.2 — Frontend Component Docs

For every React/Vue/Svelte component, document:

```markdown
# ComponentName

**Location:** `src/components/ComponentName.tsx`
**Type:** UI Component | Layout | Form | Page

## Description
What this component does and when it is used.

## Props

| Prop       | Type     | Required | Default | Description          |
|------------|----------|----------|---------|----------------------|
| title      | string   | ✅       | —       | Heading text         |
| onClick    | function | ❌       | noop    | Click handler        |

## State & Hooks
List any local state (useState, useReducer) and custom hooks used.

## Usage Example
\`\`\`tsx
<ComponentName title="Hello" onClick={() => alert('clicked')} />
\`\`\`

## Notes
Edge cases, accessibility notes, known limitations.
```

### 3.3 — Backend API Docs

For every API route/controller, document:

```markdown
# Auth API

**Base Path:** `/api/auth`
**File:** `server/routes/auth.js`

---

## POST /api/auth/register

**Description:** Registers a new user.

**Auth Required:** ❌

### Request Body
\`\`\`json
{
  "email": "user@example.com",
  "password": "secret123"
}
\`\`\`

### Response — 201 Created
\`\`\`json
{
  "message": "User created successfully",
  "userId": "abc123"
}
\`\`\`

### Response — 400 Bad Request
\`\`\`json
{ "error": "Email already in use" }
\`\`\`

### Notes
Passwords are hashed with bcrypt before storage.
```

### 3.4 — Models / DB Schema Docs

```markdown
# User Model

**File:** `server/models/User.js`
**Database:** MongoDB / PostgreSQL / etc.

## Schema

| Field       | Type     | Required | Description                  |
|-------------|----------|----------|------------------------------|
| id          | UUID     | ✅       | Primary key                  |
| email       | String   | ✅       | Unique, indexed              |
| password    | String   | ✅       | Hashed with bcrypt           |
| createdAt   | DateTime | ✅       | Auto-set on creation         |

## Relationships
- Has many `Posts`
- Has one `Profile`
```

---

## 4. Writing Style Rules

- Use **plain English** — avoid jargon where possible
- Use **present tense**: "Returns the user object", not "Returned the user object"
- Keep descriptions **concise but complete** — one paragraph max per section unless complexity demands more
- Every code block must include the **language identifier** (` ```tsx `, ` ```json `, ` ```bash `)
- Use **✅ / ❌** for boolean flags in tables (required, auth, etc.)
- Use **relative links** between documentation files wherever relevant

---

## 5. Differentiation Rules (Frontend vs Backend)

This is critical. Always add a visible tag at the top of every documentation file:

- Frontend files → start with the badge: `> 🖥️ **Frontend Documentation**`
- Backend files → start with the badge: `> ⚙️ **Backend Documentation**`

In the root `README.md`, include a clear table:

```markdown
## Project Layers

| Layer    | Technology       | Location         | Docs                              |
|----------|------------------|------------------|-----------------------------------|
| Frontend | Next.js / React  | `src/`           | [Frontend Docs](./frontend/)      |
| Backend  | Node.js / Express| `server/`        | [Backend Docs](./backend/)        |
| Database | MongoDB          | `server/models/` | [Models](./backend/models.md)     |
```

---

## 6. Step-by-Step Execution Flow

When this skill is triggered, follow these steps **in order**:

1. **Scan** — Read the project file tree. Identify all frontend and backend files.
2. **Categorize** — Separate files into Frontend / Backend buckets.
3. **Create folder** — Ensure `personal-blog/documentation/` exists with subfolders.
4. **Write README.md** — Start with the root overview.
5. **Document Frontend** — Components → Pages → Hooks (one file per component in `components/`)
6. **Document Backend** — APIs → Models → Services (one file per route group in `api/`)
7. **Cross-link** — Add navigation links between related frontend and backend docs.
8. **Review** — Check all tables are aligned, all code blocks have language tags, and frontend/backend badges are present.

---

## 7. What NOT to Do

- ❌ Do not mix frontend and backend content in the same file
- ❌ Do not document internal/private helper functions unless they are complex
- ❌ Do not copy-paste raw code blocks without explanation
- ❌ Do not save documentation outside `personal-blog/documentation/`
- ❌ Do not skip the Props table for any component that accepts props
