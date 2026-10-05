# Product Explorer: Interview Build Plan

A single **Vite + React** app that you build yourself, one task at a time.
Every phase shows off one skill an interviewer will ask about: performance,
memoization, virtualization, Web Vitals and Lighthouse. GSAP animation comes after.

**The app:** a product explorer that shows **10,000 products** in a searchable,
filterable and sortable list, with a detail panel, a cart and a stats page.
The list is big on purpose, so the performance work is visible and measurable.

> Rules for yourself
> - Do the tasks in order. Commit after each one (`git commit -m "T1.2 ..."`).
> - Each task has a **Done when** check. Don't move on until it passes.
> - **Say it in the interview** gives the one or two lines to explain the task.
> - Measure **before** and **after** each optimization. Numbers beat claims.

---

## Progress (updated Oct 5, 2026)

| Phase | Status | Notes |
|---|---|---|
| 0 Setup | Done | Vite + React 19 + TypeScript + Tailwind |
| 1 Features | Done | Routing, list, search, filters, sort, cart, detail page, stats |
| 2 Baseline | Mostly done | Lighthouse baseline recorded and `web-vitals` logging added. Still open: INP value, re-render count while typing |
| 3 Memoization | Partly done | T3.1, T3.2 and T3.4 done. Still open: T3.3 (`useMemo` for filter/sort and stats) and T3.5 (debounce) |
| 4 Virtualization | Partly done | T4.2 done with `react-window`. Still open: T4.1 (hand-built list) and T4.3 (infinite scroll) |
| 5 Load performance | Not started | The build is one 648 kB chunk (195 kB gzip) that includes `recharts` |
| 6 Data fetching | Not started | |
| 7 Quality | Partly done | Fixes for the failing accessibility and SEO audits are in; scores not re-measured yet. No tests yet |
| 8 GSAP | Not started | |

### What was done

**Memoization (Phase 3)**
- `ProductRow` and `Header` are wrapped in `React.memo`.
- `CartContext` and `ProductContext` are each split into a state context and an actions context. The actions are wrapped in `useCallback` and the actions object in `useMemo`, so components that only call actions don't re-render when the data changes.
- Result: adding to the cart re-renders only `NavBar`, and a filter change re-renders no existing card.

**Virtualization (Phase 4)**
- The product list uses `List` from `react-window` v2. Each virtual row holds 3, 2 or 1 cards, chosen from the list's width (`onResize`).
- Result: about 7 rows (21 cards) are in the DOM instead of 10,000, and the page has 113 DOM elements in total.

**SEO**
- Added a meta description to `index.html`.
- Added `public/robots.txt` (allows all crawlers) and `public/llms.txt`.

**Accessibility (Phase 7)**
- `aria-label` on every input and select.
- Virtual rows spread `ariaAttributes` from `react-window`, so the list has valid `listitem` children.
- Landmarks: `<main>` around the routes, `<header>` and `<nav>` in `NavBar`, and the site title is an `<h1>`.
- Darker text for the product id and rating to meet the 4.5:1 contrast minimum.

### Known gaps

- Navigation uses `onClick` on the site title and the card body. These should be `<Link>` so they work with the keyboard and crawlers can follow them.
- The page title is still `interview-prep`.

---

## Phase 0: Setup (≈30 min)

**T0.1 Create the project**
- `npm create vite@latest product-explorer -- --template react` (or `react-ts` if you're comfortable with TypeScript)
- Add ESLint + Prettier, then run `npm run dev`
- **Done when:** the app runs, lint passes, and the first commit is in.

**T0.2 Folder structure**
```
src/
  components/   # reusable UI (Button, Input, Modal)
  features/     # products/, cart/, stats/
  hooks/        # custom hooks
  utils/        # pure helpers (formatPrice, generateData)
  pages/        # route-level components
```
- **Say it in the interview:** "I organize by feature, so related code sits together and a feature can be lazy-loaded as one chunk."

**T0.3 Generate the data**
- Write `utils/generateProducts(count)`. It returns `{ id, name, category, price, rating, stock, createdAt }`.
- Generate 10,000 products once and keep them in a module, not in state.
- **Done when:** `console.log(products.length)` prints 10000.

---

## Phase 1: Build the features without optimizing (≈1.5 h)

Build it the plain way first, so you have a slow baseline to measure later.

**T1.1 Routing.** Add `react-router-dom` with the pages `/` (Products), `/product/:id`, `/cart` and `/stats`.

**T1.2 Product list.** Render all 10,000 rows with `.map()`. Each row is a `<ProductRow />` component.

**T1.3 Search box.** It filters by name on every keystroke. Use a controlled input.

**T1.4 Filters + sort.** Add a category dropdown, a price range, and sort by price, rating or name.

**T1.5 Cart with Context.** Create `CartContext` with add, remove and quantity. Show the cart count in the header.

**T1.6 Product detail page.** Read `:id` from the URL and show the product with an "Add to cart" button.

**T1.7 Stats page.** Show average price per category and the top 10 rated products, using a chart library (`recharts`).

- **Done when:** everything works, even if typing in search feels laggy.
  The lag is intentional: it's your baseline.

---

## Phase 2: Measure the baseline (≈30 min)

**T2.1 Lighthouse.** Run `npm run build && npm run preview`, then Chrome DevTools → Lighthouse → Mobile → Performance.
Write the **Performance score, LCP, TBT and CLS** in a table at the bottom of this README.
- Always measure the **production build**. Dev mode is slower and gives misleading numbers.

**T2.2 React Profiler.** Install React DevTools → Profiler → record yourself typing in search.
Note how many components re-render and how long one commit takes.

**T2.3 Web Vitals in code**
- `npm i web-vitals`, then call `onLCP`, `onINP`, `onCLS`, `onFCP` and `onTTFB` in `main.jsx` and log the results.
- Bonus: send them with `navigator.sendBeacon('/analytics', ...)`. Explain that this is how real-user monitoring works.
- **Say it in the interview:** "Lighthouse is lab data. web-vitals in production is field data. **INP** replaced FID in 2024."

| Metric | Good threshold |
|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5 s |
| INP (Interaction to Next Paint) | ≤ 200 ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 |

**T2.4 Debugging tools.** Learn the tools you'll use to find and prove every later fix.
- **`<StrictMode>`:** wrap the app in `main.tsx`. In dev it runs renders and effects twice to expose state changed in place (for example `.sort()` or `.push()` on state) and effects that don't clean up. Turn it off while recording timings.
- **React DevTools → Components:** inspect and edit live props, state and hooks. Use `useDebugValue` to label your custom hooks (for example `useCart`).
- **React DevTools → Profiler settings:** turn on **"Record why each component rendered"** and **"Highlight updates when components render"**. Use the Flamegraph and Ranked views to find the slowest components.
- **`<Profiler id onRender>`:** wrap the product list and log `actualDuration` per commit, so you get timings without opening DevTools.
- **`console.time` / `console.count`:** time filter + sort, and count renders of `Home` or `Header` (not `ProductRow`, since 10,000 logs would freeze the console). This tells you whether the slow part is **calculating** (fix it with `useMemo`) or **rendering** (fix it with `memo` or virtualization).
- **Chrome Performance tab:** record while typing. Yellow "Long Task" bars over 50 ms are the lag.
- **Done when:** you can say, with numbers, how long one keystroke takes, how much of it is filtering vs rendering, and which components re-render and why.
- **Say it in the interview:** "I don't guess. I profile first, find out whether the cost is computation or rendering, and pick the fix based on that."

---

## Phase 3: Memoization (≈1 h)

**T3.1 `React.memo` on `ProductRow`**
- Profile again. Rows still re-render? Find out why (a new function or object prop on every render).

**T3.2 `useCallback`** for `onAddToCart` and the other handlers passed to rows.
- **Say it in the interview:** "memo compares props by reference, so a new function on each render defeats it. useCallback keeps the same reference."

**T3.3 `useMemo`** for the filter, search and sort result, and for the stats calculations.
- Dependencies are `[query, category, sortBy]`.
- **Say it in the interview:** "I memoize expensive derived data, not everything. Memoizing has its own cost."

**T3.4 Split the Context**
- Split `CartContext` into a `CartStateContext` and a `CartActionsContext`, and `useMemo` the value object.
- **Done when:** adding to the cart no longer re-renders components that only use the actions.

**T3.5 Debounce search**
- Write your own `useDebounce(value, 300)` hook. Don't use a library.
- Then try `useDeferredValue` / `useTransition` from React 18 and compare the two.
- **Say it in the interview:** "Debounce delays the work. useTransition marks it as low priority, so the input stays responsive."

- **Done when:** Profiler shows far fewer re-renders. Record the before and after numbers.

---

## Phase 4: Virtualization (≈45 min)

**T4.1 Build a basic virtual list yourself (once, to understand it)**
- A fixed-height container with `onScroll` and rows of known height.
- Calculate `startIndex = Math.floor(scrollTop / rowHeight)` and `endIndex`, and render only those rows plus a few overscan rows.
- Use a spacer div with `height = total * rowHeight` so the scrollbar is correct.
- **Say it in the interview:** "Only about 20 DOM nodes exist instead of 10,000. The DOM size is the bottleneck, not React."

**T4.2 Replace it with a library**
- `@tanstack/react-virtual` (or `react-window`).
- Handle variable row heights with `measureElement`.

**T4.3 Infinite scroll (bonus)**
- Load 50 products at a time. Use `IntersectionObserver` on a sentinel element at the end of the list.

- **Done when:** DevTools → Elements shows fewer than 50 rows in the DOM, and scrolling stays at 60fps (Performance tab).

---

## Phase 5: Load performance (≈1 h)

**T5.1 Route-level code splitting.** Load each page with `React.lazy` + `<Suspense fallback>`.
The Stats page (with the chart library) should become its own chunk.

**T5.2 Bundle analysis**
- `npm i -D rollup-plugin-visualizer`, add it to `vite.config.js`, run a build and open `stats.html`.
- Find the biggest dependency and either lazy-load it or replace it.
- Configure `build.rollupOptions.output.manualChunks` to put `react` / `react-dom` in a `vendor` chunk.

**T5.3 Images**
- Product images get `loading="lazy"`, plus a fixed `width` / `height` (or `aspect-ratio`) to prevent CLS.
- The hero / LCP image gets `fetchpriority="high"` and **no** lazy loading.
- Use WebP/AVIF with `<picture>`.

**T5.4 Fonts & preload.** Use `font-display: swap`, and `<link rel="preconnect">` for any external font or API origins.

**T5.5 Prefetch on hover.** Start importing the detail page chunk when a row is hovered.

**T5.6 Error boundary.** Wrap lazy routes in an error boundary, so a failed chunk load shows a retry button.

- **Done when:** the initial JS bundle is noticeably smaller (write down the KB) and Lighthouse has gone up.

---

## Phase 6: Data fetching & state (≈45 min, optional but asked often)

**T6.1** Move the products to a fake API (`json-server`, or `fetch` with a delay).

**T6.2** Use **TanStack Query** for caching, `staleTime`, loading and error states, and prefetching.

**T6.3** Abort stale requests with `AbortController` when the search changes.
- **Say it in the interview:** "This prevents race conditions where an old response overwrites a newer one."

**T6.4** Persist the cart to `localStorage` with a custom `useLocalStorage` hook.

---

## Phase 7: Quality (≈45 min)

**T7.1 Accessibility.** Use semantic HTML, labels on inputs, keyboard navigation in the list, and visible focus.
Aim for a Lighthouse Accessibility score of 95+.

**T7.2 Tests.** Use Vitest + React Testing Library to test `useDebounce`, the filter/sort util and one component.

**T7.3 Re-measure.** Run Lighthouse again and fill in the **After** column below.

| Metric | Before | After |
|---|---|---|
| Lighthouse Performance | 68 | 97 |
| LCP | 2.1 s | 1.9 s |
| TBT | 3,070 ms | 150 ms |
| CLS | 0 | 0 |
| FCP | | 1.9 s |
| Speed Index | | 1.9 s |
| INP (web-vitals) | | |
| Initial JS (KB, gzip) | | 189 |
| Re-renders while typing (Profiler) | | |
| Lighthouse Accessibility | | 69 |
| Lighthouse Best Practices | | 100 |
| Lighthouse SEO | | 82 |

After values: Lighthouse 13.4.1, mobile (Moto G Power, Slow 4G), production build, Oct 5, 2026.

This table is the strongest thing you can show in the interview.

---

## Phase 8: GSAP animation (after the above is done)

**T8.1 Setup.** `npm i gsap @gsap/react`, then register `useGSAP` and use its `scope` so cleanup is automatic.

**T8.2 Page intro.** A timeline that staggers in the header, filters and first rows (`gsap.timeline()`, `stagger`).

**T8.3 Hover micro-interactions** on cards and buttons. Animate only `transform` and `opacity`.
- **Say it in the interview:** "Transform and opacity run on the compositor, with no layout or paint, so they don't hurt INP or CLS."

**T8.4 ScrollTrigger.** Stats cards and chart animate in as you scroll. Try `scrub` and `pin` on one section.

**T8.5 Add-to-cart animation.** The product thumbnail flies to the cart icon. Use the **FLIP** plugin, or calculate the positions yourself.

**T8.6 Route transitions.** Fade or slide between pages.

**T8.7 Respect `prefers-reduced-motion`.** Use `gsap.matchMedia()` to turn animations off or reduce them.

**T8.8 Check performance again.** Make sure animations don't add CLS, and that ScrollTriggers are killed on unmount.

---

## Interview cheat sheet (be ready to explain)

- **Reconciliation & keys:** why `key={index}` is bad for lists that get reordered or filtered.
- **When NOT to memoize:** cheap components, props that change on every render anyway.
- **Virtualization trade-offs:** Ctrl+F in the browser doesn't find rows that aren't rendered, it needs extra accessibility care, and variable heights are harder.
- **Code splitting vs prefetching:** a smaller first load, but you pay for it later in navigation unless you prefetch.
- **The Critical Rendering Path**, and what blocks rendering (CSS, synchronous JS).
- **LCP / INP / CLS:** what each one measures and one fix for each.
- **React 18 concurrency:** `useTransition`, `useDeferredValue`, automatic batching.
- **Vite vs CRA/Webpack:** native ESM dev server, esbuild for pre-bundling, Rollup for production builds.
