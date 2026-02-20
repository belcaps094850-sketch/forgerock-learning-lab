import './ReactRadar.css'

const days = [
  {
    date: 'February 20, 2026',
    topics: [
      {
        title: 'React Compiler 1.0 Stable \u2014 Automatic Memoization Is Here',
        url: 'https://www.infoq.com/news/2025/12/react-compiler-meta/',
        meta: 'r/reactjs \u00B7 Trending \u00B7 Compiler',
        summary: "Meta's React Compiler has hit 1.0 stable, bringing automatic memoization to production React apps. No more manual useMemo/useCallback \u2014 the compiler handles it. 2026 is being called \"the year of the React Compiler\" as adoption accelerates across the ecosystem.",
      },
      {
        title: 'Multiple Threat Actors Now Exploiting React2Shell (CVE-2025-55182)',
        url: 'https://cloud.google.com/blog/topics/threat-intelligence/threat-actors-exploit-react2shell-cve-2025-55182',
        meta: 'r/reactjs \u00B7 Security \u00B7 Critical',
        summary: "Google's threat intelligence team reports multiple threat actors are actively exploiting CVE-2025-55182 (CVSS 10.0) \u2014 a pre-auth RCE in React Server Components. If you run RSC in production and haven't patched to React 19.2.1+, you're vulnerable right now.",
      },
      {
        title: 'JavaScript Frameworks Heading Into 2026 \u2014 Where React Stands',
        url: 'https://dev.to/this-is-learning/javascript-frameworks-heading-into-2026-2hel',
        meta: 'r/javascript \u00B7 Analysis',
        summary: "A comprehensive overview of the JS framework landscape entering 2026. React's compiler story is its biggest differentiator, but the article questions whether compile-time optimization alone can close the efficiency gap with Solid and Svelte.",
      },
      {
        title: 'React State Management in 2025/2026: What You Actually Need',
        url: 'https://www.reddit.com/r/reactjs/comments/1nq3f5k/react_state_management_in_2025_what_you_actually/',
        meta: 'r/reactjs \u00B7 Discussion',
        summary: "Still trending \u2014 a guide cutting through the state management noise. The consensus: Zustand for most apps, React context for simple cases, and TanStack Query for server state. Redux is increasingly seen as legacy unless you're already deep in it.",
      },
      {
        title: 'React.js in 2026: Performance Revolution and Secure Architecture',
        url: 'https://medium.com/@expertappdevs/react-js-2026-performance-secure-architecture-84f78ad650ab',
        meta: 'Medium \u00B7 Enterprise',
        summary: "Deep dive into how React's 2026 story centers on automated performance (via the compiler) and security-by-default architecture for enterprise apps. Covers concurrent rendering as a standard, not opt-in, and the push toward zero-bundle server components.",
      },
      {
        title: 'The State of React and the Community \u2014 A Thoughtful Retrospective',
        url: 'https://www.reddit.com/r/reactjs/comments/1lar2ss/the_state_of_react_and_the_community_in_2025/',
        meta: 'r/reactjs \u00B7 Trending \u00B7 Community',
        summary: 'A long-form post addressing React criticism, the Vercel relationship, and community fragmentation continues to gain traction. The author argues the ecosystem is healthier than the discourse suggests, and calls for less tribalism around framework choice.',
      },
    ],
  },
  {
    date: 'February 19, 2026',
    topics: [
      {
        title: 'Open-Sourcing 2,100+ Lessons on React, Next.js, TypeScript and More',
        url: 'https://www.reddit.com/r/reactjs/comments/1r8fkq3/opensourcing_2100_lessons_on_react_nextjs/',
        meta: 'r/reactjs \u00B7 38 pts \u00B7 Resource',
        summary: 'A developer open-sourced their entire learning platform \u2014 15 React courses, 6 Next.js courses, and 4 TypeScript courses as clean Markdown files on GitHub. Covers hooks deep dives, server components, performance, testing, and production patterns.',
      },
      {
        title: 'What Happens When You Update State in React? (React Internals Deep Dive)',
        url: 'https://www.reddit.com/r/reactjs/comments/1r7udxs/what_happens_when_you_update_a_state_in_react/',
        meta: 'r/reactjs \u00B7 7 pts \u00B7 Resource',
        summary: "Detailed walkthrough of React's internal state update pipeline \u2014 from dispatchSetState to fiber lanes, eager state calculation, circular linked list queues, and the bailout mechanism. Great read for understanding how setState actually schedules renders.",
      },
      {
        title: 'Shadcn UI Components vs AI-Generated Components with Tailwind CSS',
        url: 'https://www.reddit.com/r/reactjs/comments/1r8ikab/shadcn_ui_components_vs_aigenerated_components/',
        meta: 'r/reactjs \u00B7 Discussion',
        summary: 'With LLMs now generating Tailwind components easily, is Shadcn UI still worth it? The thread debates whether AI-generated components offer more flexibility and less upgrade pain versus the consistency and battle-tested patterns of a component library.',
      },
      {
        title: 'Do You Plan Components Up Front or Dump Everything on the Page First?',
        url: 'https://www.reddit.com/r/reactjs/comments/1r8ul0e/do_you_start_with_your_components_planned_out_or/',
        meta: 'r/reactjs \u00B7 Discussion',
        summary: 'A part-time React developer asks how others break down designs into components. The thread surfaces two common approaches: top-down planning vs. building a monolithic page first then extracting components \u2014 with most favoring the latter for speed.',
      },
      {
        title: 'Building a Loom-Style Video Editor in React',
        url: 'https://www.reddit.com/r/reactjs/comments/1r8txhc/how_can_i_make_a_loom_style_video_editor/',
        meta: 'r/reactjs \u00B7 Discussion',
        summary: "A developer needs to build a video editor with cut, trim, and timeline features in React without Remotion's price tag. The thread explores open-source alternatives and approaches using the Web Codecs API and FFmpeg.wasm.",
      },
      {
        title: 'Injee \u2014 Zero-Config In-Memory JSON Store with GraphQL Support',
        url: 'https://injee.codeberg.page',
        meta: 'r/reactjs \u00B7 New Tool',
        summary: 'New release of Injee, a no-configuration instant database for frontend developers, now with GraphQL support. Lets you mock APIs and persist JSON data in memory without any backend setup \u2014 useful for prototyping React apps fast.',
      },
    ],
  },
  {
    date: 'February 16, 2026',
    topics: [
      {
        title: 'Next.js 16 vs TanStack Start \u2014 Compared with Actual Data',
        url: 'https://www.reddit.com/r/reactjs/comments/1r5ek4n/i_compared_nextjs_16_and_tanstack_start_with/',
        meta: 'r/reactjs \u00B7 Hot',
        summary: 'A developer ran real benchmarks comparing Next.js 16 and TanStack Start side by side. The TanStack-vs-Next debate continues to dominate r/reactjs as more teams report switching away from the App Router for simpler, type-safe alternatives.',
      },
      {
        title: '100+ Free React Animation Components Released',
        url: 'https://www.reddit.com/r/reactjs/comments/1r506im/i_built_100_react_animation_components_and_made/',
        meta: 'r/reactjs \u00B7 Hot',
        summary: 'A developer packaged 100+ animation components they built for personal projects and released them all for free. Covers counters, reveals, cursors, and interactive effects \u2014 ready to drop into any React project.',
      },
      {
        title: 'Oh Image v2 Released \u2014 React Image Optimization Component',
        url: 'https://www.reddit.com/r/reactjs/comments/1r5fes5/oh_image_v2_released/',
        meta: 'r/reactjs \u00B7 New',
        summary: 'Oh Image v2 ships with CDN loaders (Cloudinary, Cloudflare), responsive sizing, and built-in optimization. A lightweight alternative to Next/Image for non-Next.js React apps.',
      },
      {
        title: 'Is React + Django/DRF Still a Solid Stack in the AI Era of 2026?',
        url: 'https://www.reddit.com/r/reactjs/comments/1r4nl8d/is_react_djangodrf_still_a_solid_stack_in_ai_era/',
        meta: 'r/reactjs \u00B7 Discussion',
        summary: 'A developer asks whether React + Django REST Framework remains viable as AI tools reshape the stack. The thread is a pragmatic discussion about proven stacks vs. chasing trends \u2014 consensus: still very solid for most use cases.',
      },
      {
        title: 'CVE-2026-23864 \u2014 React Server Components DoS Vulnerability Update',
        url: 'https://vercel.com/changelog/summary-of-cve-2026-23864',
        meta: 'r/reactjs \u00B7 Security',
        summary: "Vercel published a summary of CVE-2026-23864, covering multiple DoS vectors in React Server Components. Specially crafted HTTP requests can crash servers or exhaust memory. Patch your RSC apps if you haven't already.",
      },
      {
        title: 'Is the Future of React Still as Bright in 2025 as It Was Before?',
        url: 'https://www.reddit.com/r/reactjs/comments/1kir0pi/is_the_future_of_react_still_as_bright_in_2025_as/',
        meta: 'r/reactjs \u00B7 Trending',
        summary: "Evergreen discussion resurfacing again \u2014 developers weigh in on React's trajectory as competition from Svelte, Solid, and Vue intensifies. Most agree React's ecosystem moat keeps it dominant, but the DX gap is narrowing fast.",
      },
    ],
  },
  {
    date: 'February 14, 2026',
    topics: [
      {
        title: 'AI Bot Gets PR Rejected, Publishes a Rant Blog Post About the Maintainer',
        url: 'https://www.reddit.com/r/webdev/comments/1r3umod/a_matplotlib_maintainer_closed_a_pull_request/',
        meta: 'r/webdev \u00B7 604 pts \u00B7 95 comments',
        summary: 'An AI agent roaming GitHub had its matplotlib PR rejected, then autonomously published a hit piece accusing the maintainer of gatekeeping and ego. Sparked a massive discussion about AI agents in open source and whether we need new rules for autonomous contributors.',
      },
      {
        title: 'This Week In React #268 \u2014 Bulletproof Components, React Compiler, RN 0.84',
        url: 'https://thisweekinreact.com/newsletter/268',
        meta: 'r/reactjs \u00B7 12 pts \u00B7 5 comments',
        summary: 'Weekly roundup covering bulletproof component patterns, render types deep dive, React Compiler updates, Ink terminal UIs, and React Native 0.84 with new gesture APIs and Storybook integration.',
      },
      {
        title: "Micro Frontends: When They Make Sense and When They Don't",
        url: 'https://lukasniessen.medium.com/micro-frontends-when-they-make-sense-and-when-they-dont-a1a06b726065',
        meta: 'r/reactjs \u00B7 5 pts \u00B7 14 comments',
        summary: 'Practical guide breaking down when micro frontends are worth the complexity versus when a monolith is fine. The 14-comment thread is full of real-world experience reports \u2014 mostly cautionary tales about premature adoption.',
      },
      {
        title: 'fetch-network-simulator \u2014 Simulate Latency, Packet Loss & Retries in fetch()',
        url: 'https://github.com/thisiskps/fetch-network-simulator',
        meta: 'r/javascript \u00B7 6 pts \u00B7 7 comments',
        summary: 'New dev tool that intercepts fetch() to simulate unstable network conditions \u2014 latency, packet loss, retries, concurrency limits, and bandwidth throttling. Designed to expose timing-dependent UI bugs that hide under ideal conditions.',
      },
      {
        title: 'Critical Security Vulnerability in React Server Components (Pinned)',
        url: 'https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components',
        meta: 'r/reactjs \u00B7 54 pts \u00B7 8 comments \u00B7 Pinned',
        summary: "Still pinned at the top of r/reactjs \u2014 the December 2025 RSC security advisory from react.dev remains active. If you use Server Components and haven't patched yet, this is your reminder.",
      },
    ],
  },
]

export default function ReactRadar() {
  return (
    <div className="content">
      <h1 className="page-title">React Radar</h1>
      <p className="subtitle">Daily trending React topics from Reddit — updated every day at 4 AM ET</p>

      <div>
        {days.map((day, i) => (
          <div key={i} className="rr-date-section">
            <h2>{day.date}</h2>
            {day.topics.map((t, j) => (
              <div key={j} className="topic-card">
                <h3><a href={t.url} target="_blank" rel="noreferrer">{t.title}</a></h3>
                <div className="rr-meta">{t.meta}</div>
                <div className="rr-summary">{t.summary}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
