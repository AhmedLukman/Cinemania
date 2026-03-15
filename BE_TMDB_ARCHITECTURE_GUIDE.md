# Data Architecture Guide: Scaling Cinemania

This document outlines the architectural strategies for handling large-scale movie data efficiently, moving from direct API fetching to a robust database-backed system.

## 1. The Core Challenge: Direct API Fetching
Currently, Cinemania fetches data directly from the TMDB API. While simple, this has limitations at scale:
*   **Latency:** Every request must travel to TMDB and back.
*   **Rate Limiting:** TMDB limits how many requests you can make per second.
*   **Redundancy:** Fetching the same movie logo 100 times for 100 different users is wasteful.

## 2. The Solution: The Database Layer (Prisma)
Adding a database (e.g., PostgreSQL) with an ORM like **Prisma** transforms the app from a "pass-through" to a "data owner."

### Benefits:
*   **Speed:** Fetching from a local DB is ~10-50x faster than an external API.
*   **Stability:** If TMDB goes down, your site stays up using cached data.
*   **Enrichment:** You can store data TMDB doesn't have (User favorites, comments, custom lists).

---

## 3. Data Synchronization Strategies

### Strategy A: Stale-While-Revalidate (SWR) - "The Reactive Approach"
Used for "Cold Data" (Obscure movies, old actor profiles).

1.  **Request:** User asks for Movie ID 123.
2.  **Serve:** Server immediately sends whatever is in the DB (even if old).
3.  **Validate:** In the background, the server checks if the data is older than the threshold (e.g., 7 days).
4.  **Update:** If old, the server fetches fresh data from TMDB and updates the DB for the *next* user.

**Best for:** Saving resources on content that isn't visited frequently.

### Strategy B: Cron Jobs - "The Proactive Approach"
Used for "Hot Data" (Trending, Popular, Now Playing).

1.  **Schedule:** A background script runs every day at 3 AM.
2.  **Check Changes:** The script calls TMDB's `/movie/changes` endpoint.
3.  **Bulk Update:** The script re-fetches only the movies that TMDB identifies as changed and updates the DB.

**Best for:** Ensuring your homepage is 100% accurate and instant for every visitor.

### Strategy C: The "Active-Only" Cron (Elite Scaling)
To scale without hitting API limits, you can combine these approaches:
1.  **Track Activity:** Add a `lastViewedAt` field to the movie record.
2.  **Touch on Visit:** Every time a user views a movie, update the `lastViewedAt` date.
3.  **Smart Sync:** Set the Cron job to only re-fetch movies viewed within the last 30 days. This keeps relevant content fresh while ignoring unused records.

---

## 4. How the System Tracks Time (Revalidation Logic)

To implement SWR or Cron logic, the system must know exactly how "old" the data is.

### Scenario 1: Using a Database (Prisma/PostgreSQL)
You store a timestamp column (e.g., `updatedAt`) directly in your movie table.
*   **Storage:** `updatedAt DateTime @updatedAt`
*   **The Check:** When a request arrives, the server compares `now()` with `updatedAt`. If the difference exceeds your threshold (e.g., 7 days), it triggers the background revalidation.

### Scenario 2: Using HTTP/CDN Caching (Next.js/Vercel)
Next.js manages the clock internally using a global cache store.
*   **Storage:** The response is stored in Next.js's internal cache along with its fetch timestamp.
*   **The Config:** You define the duration in seconds: `revalidate: 604800` (7 days).
*   **The Logic:** Next.js automatically compares its internal record of the fetch time with the current time. If it's "expired," it serves the stale data but silently fetches a fresh version for the next visitor.

---

## 5. Professional Data Refresh Principles

When revalidating data, follow these best practices for data integrity:

### Atomic Updates (Sync Everything)
Never refresh just one property. When a record is stale, fetch the **entire movie object**.
*   **Consistency:** Prevents "mismatched" data (e.g., an old teaser poster paired with a new release date).
*   **Efficiency:** One API call to `/movie/{id}` returns all metadata. It costs the same amount of time to fetch one field as it does fifty.
*   **Integrity:** Captures typo fixes in overviews or updates to cast/crew lists automatically.

### Volatility-Based Scheduling
Adjust your sync frequency based on the movie's "age" or status:
*   **Upcoming/New Releases (< 1 month old):** Sync every **24 hours**. Data (dates, ratings, posters) changes rapidly.
*   **Recent Releases (1-12 months old):** Sync every **7 days**. Ratings begin to stabilize.
*   **Classics (> 1 year old):** Sync every **30 days**. Data rarely changes; updates usually only catch high-res artwork additions.

---

## 6. Image Caching & Management

Next.js can handle thousands of images, but efficient scaling requires a strategic approach:

### The "Smart" Storage Approach
For a movie app, avoid caching actual high-res image files on your own server.
*   **Store Strings:** Only store the image URL (e.g., `/path/to/logo.png`) in your database.
*   **Use TMDB's CDN:** Let the user's browser download images directly from TMDB's world-class infrastructure. This keeps your server lightweight and avoids high storage costs.
*   **Local Optimization:** Use the Next.js `<Image />` component for on-the-fly resizing and WebP conversion for the specific images currently on the user's screen.

---

## 7. The "Gold Standard": The Hybrid Model

For a production-grade app, we use both:

| Feature | Strategy | Why? |
| :--- | :--- | :--- |
| **Home Page Sliders** | **Cron Job** | Must be perfect and instant for all users. |
| **Movie Search** | **Direct API** | Too many possibilities to cache everything. |
| **Movie Details** | **Active-Only Cron** | Balance of freshness and speed for deep-links. |

## 8. Implementation Roadmap
1.  **Setup Prisma:** Define models for `Movie`, `TVShow`, and `Celebrity`.
2.  **Update Services:** Modify `serverService.ts` to check DB before calling `apiClient`.
3.  **Next.js ISR:** Utilize Next.js `revalidate` tags for easy "SWR-lite" implementation.
4.  **Background Workers:** Deploy a simple CRON task (via GitHub Actions or Vercel Cron) for daily syncs.

---

## 9. Supplemental Scaling Notes (Appended)

### 9.1 The Read-Through Flow (How Storage Starts)
*   **First Visitor:** Server checks DB $\rightarrow$ Missing $\rightarrow$ Fetches from TMDB $\rightarrow$ Saves to DB $\rightarrow$ Sends to User.
*   **Subsequent Visitors:** Server checks DB $\rightarrow$ Found $\rightarrow$ Sends to User instantly. TMDB is never touched.

### 9.2 The Latency Trap: Avoid Synchronous Revalidation
Making a user wait for a DB update during their request is a mistake. 
*   **The Professional Fix:** Always serve "stale" data immediately and perform the TMDB fetch in the background. Speed is the priority.

### 9.3 Scale Warning: Why Blanket Cron Jobs Fail
Attempting to update your entire database of 50k+ movies every night will hit TMDB rate limits and waste server resources on "static" classics.
*   **The Professional Fix:** Use Strategy C (Active-Only Cron) to only refresh movies that users have actually looked at recently.

### 9.4 Image Caching Strategy
Do not store binary image files in your database. 
*   **Best Practice:** Store the image URLs as strings and rely on TMDB's world-class CDN to serve the actual files to the user's browser. Use `next/image` for client-side optimization.

---

## 10. Summary: The "Golden Strategy" for Cinemania

To maximize performance while staying within API limits, the final architectural goal is:

1.  **Home Page Excellence:** Use a fixed Cron Job (every few hours or daily) to proactively revalidate the most demanded lists (Popular, Trending, Upcoming). This guarantees the home page is 100% instant and accurate for every visitor.
2.  **Smart Growth:** Store every movie that users actually access in the database. Only fetch from the DB if it exists. This ensures you don't waste storage on millions of unvisited movies while still "owning" your active catalog.
3.  **Maximum Speed & Safety:** This combination provides a near-instant user experience for the majority of traffic while keeping the application safely within TMDB's API rate limits.

## 11. Master Class: Managing Data at Scale (100k+ Records)

As your database grows to 100,000+ movies, you must transition from "simple" revalidation to "intelligent" revalidation to avoid API bans and server waste.

### 11.1 The Activity Filter (How to handle 100k records)
Never attempt to revalidate 100k records daily or even yearly in a single batch.
*   **The Strategy:** Only include a movie in your Cron job if it is **"Active"**.
*   **Definition of Active:** Any movie that has been viewed by at least one user in the last 30 days (tracked via `lastViewedAt`).
*   **The Benefit:** Out of 100k movies, you might only have 500-1,000 active ones. Updating 1,000 movies takes seconds and stays safely within rate limits. The other 99,000 remain archived until someone clicks them (triggering a single background SWR update).

### 11.2 The TMDB Changes API (The "Cheat Sheet")
Instead of checking every active movie to see if it's stale, ask TMDB for the official list of updates.
*   **Endpoint:** `GET /movie/changes`
*   **Workflow:** Every night, fetch the list of IDs that were modified on TMDB's end in the last 24 hours.
*   **Logic:** Compare TMDB's "Changed IDs" list with your "Active IDs" list. 
*   **The Pro Move:** You **only** re-fetch the movies that appear on both lists. This reduces thousands of unnecessary API calls to just a handful of precision updates.

### 11.3 The Difference Between "Edits" and "Rankings"
While the Changes API is the ultimate tool for metadata, it has one important limitation:
*   **What it tracks:** Content edits (New logos, title changes, cast updates). Use this to keep your "Warehouse" (Individual movie details) perfectly in sync without manual timers.
*   **What it ignores:** Dynamic rankings and scores. The Changes API does **not** trigger for small rating fluctuations or changes in popularity rank.
*   **The Strategy:** You still need a periodic Cron Job for your **Lists** (Popular, Trending). The home page lists must be refreshed on a fixed schedule (e.g., every 6–24 hours) because their "freshness" depends on relative ranking, not just individual content edits.

---

**Architectural Recommendation:** 
Start with **Strategy A (SWR)** for everything. As traffic grows, add **Strategy B (Cron)** for the homepage lists. Finally, implement the **Changes API** for surgical background updates to your entire stored catalog to ensure perfect data integrity at any scale.

---

## 12. Final Summary: Where, What, and When

This is the definitive guide for a professional implementation.

### 1. The Home Page Sliders (Popular / Trending)
*   **Where:** Your Database (Prisma) + a **Cron Job**.
*   **When:** Every **6 to 12 hours**.
*   **What:** Proactively fetch the Top 100 movies from TMDB and save them to your DB.
*   **Why:** This ensures the "Front Window" of your site is 100% instant and perfectly ranked for every single visitor.

### 2. Individual Movie Pages (Details / Cast / Logos)
*   **Where:** Your Database (Prisma) + **SWR (Stale-While-Revalidate)**.
*   **When:** On the **First User Click**.
*   **What:** If the movie isn't in your DB, fetch it from TMDB and save it. If it *is* in your DB, show it instantly.
*   **Why:** You don't want to waste space storing millions of movies no one watches. You only "own" the data for movies your users actually care about.

Also, you should not do it for every click, only for when the data is actually old (check upatedAt field or date of release).

### 3. Maintaining Your Library (The "Warehouse")
*   **Where:** Your Database (Prisma) + **TMDB Changes API**.
*   **When:** Every **24 hours** (usually at night).
*   **What:** Ask TMDB `GET /movie/changes` for a list of what was edited today. Cross-reference that with your "Active" movies (viewed in the last 30 days) and update only those specific records.
*   **Why:** This keeps your metadata (logos, descriptions, cast) perfectly in sync without wasting thousands of API calls on data that hasn't changed.

---

### Final Implementation Checklist:

| Priority | Feature | Strategy |
| :--- | :--- | :--- |
| **High** | **Home Page** | **Cron Job** (Fixed schedule) |
| **High** | **Movie Details** | **SWR** (On-demand + Background update) |
| **Medium** | **Search** | **Direct API** (Too many variables to cache) |
| **Scale** | **Data Integrity** | **Changes API** (Surgical daily sync) |

so the thing is to store all movies users accessed in DB, and to fetch only from db if stored, and to revalidate most demanded movies (popular, trending, upcoming etc.) on a fixed short cron job like few hours/ a day