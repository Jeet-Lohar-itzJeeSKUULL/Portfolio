export interface Project {
  id: string;
  title: string;
  impactStatement: string; // The bold one-liner impact
  shortDescription: string; // The quick tagline (2-3 lines max)
  solutionSummary: string; // The new FAANG-level 'What I built' summary
  description: string; // The comprehensive overview
  techStack: string[];
  features: string[];
  metrics: string[]; // Added per FAANG spec
  image: string;
  githubUrl: string;
  liveUrl: string;
  categories: string[];
  problemStatement?: string;
  solutionApproach?: string; // Could be same as solutionSummary, but keeping for deeper detail
  architecture?: string; // Description of architecture
  tradeOffs?: string[];
  challenges?: string[];
  performanceImprovements?: string[]; // Added per FAANG spec
  keyLearnings?: string[]; // Added per FAANG spec
  screenshots?: string[];
}

export const projectsData: Project[] = [
  {
    id: "event-manager-app",
    title: "Event Management Platform",
    impactStatement: "Scalable event system designed for real-time coordination",
    shortDescription: "Designing a scalable, event-driven platform enabling real-time event discovery, ticketing, and organizer analytics across web and mobile ecosystems.",
    solutionSummary: "Focused on building a production-grade architecture capable of handling concurrent users, live updates, and seamless cross-platform experiences.",
    description: "Built with Next.js and Firebase, this application allows users to create, manage, and discover events. It eliminates fragmented tools by providing a single platform for registration, ticketing, and communications.",
    techStack: [
      "Next.js", "React", "TypeScript", "Tailwind CSS",
      "Firebase Auth", "Firestore", "Realtime DB",
      "WebSockets", "REST APIs", "Zustand", "Context API",
      "Event-Driven Sync", "RBAC Auth"
    ],
    features: [
      "Real-time Event Updates Engine",
      "Scalable Ticket Booking System",
      "QR-based Ticket Validation",
      "Organizer Analytics Dashboard",
      "Notification & Alert System"
    ],
    metrics: [
      "Handles 1000+ active users with real-time sync",
      "Reduced manual coordination overhead by 40%",
      "Improved ticket processing time by 30%"
    ],
    image: "/images/event.jpg", // placeholders
    githubUrl: "https://github.com/Jeet-Lohar-itzJeeSKUULL/Vintage-Studio",
    liveUrl: "https://event-manager-demo.com",
    categories: ["Full Stack", "App Development"],
    problemStatement: "Event organizers struggle with fragmented tools for registration, ticketing, and communications, leading to massive manual coordination overhead.",
    solutionApproach: "Developed a single-pane-of-glass application standardizing event lifecycles with real-time web socket communication.",
    architecture: "Client-severless architecture utilizing Firebase for real-time NoSQL document storage and authentication. Next.js App Router for dynamic SSR routing and SEO optimization.",
    challenges: [
      "Handling real-time updates efficiently across thousands of clients without overwhelming the database connection pool.",
      "Managing complex optimistic UI state sequences for robust offline support."
    ],
    tradeOffs: [
      "Used Firebase for rapid market deployment vs a custom backend that would give more granular control.",
      "Prioritized server-side rendering for critical paths over full SPA speed to ensure maximum SEO viability."
    ],
    performanceImprovements: [
      "Implemented SSR for event listing, dropping initial load time to <0.8s",
      "Utilized Next/Image optimizing assets by ~60%"
    ],
    keyLearnings: [
      "Handling real-time distributed state management is incredibly nuanced and requires robust optimistic UI updates.",
      "Firebase listener optimization is crucial to prevent memory leaks in large single-page applications."
    ]
  },
  {
    id: "stock-market-dashboard",
    title: "Stock Market Dashboard",
    impactStatement: "Real-time data processing with AI-powered market insights",
    shortDescription: "Developed a high-frequency trading interface that visualizes complex market trends and provides AI predictive insights, enabling traders to make split-second decisions.",
    solutionSummary: "Developed a high-frequency trading dashboard rendering thousands of live data points using deep canvas optimizations.",
    description: "An advanced dashboard for traders with real-time websocket data, interactive charting, and AI-driven predictive insights on market trends.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Recharts", "WebSockets"],
    features: ["Live Tickers", "Advanced Charting", "Portfolio Tracking", "AI Insights"],
    metrics: [
      "Processes 10,000+ data points per second with zero UI lag",
      "Achieved 95+ Lighthouse performance score",
      "Reduced render calculation times by 50% via React.memo"
    ],
    image: "/images/stocks.jpg",
    githubUrl: "https://github.com/Jeet-Lohar-itzJeeSKUULL/Stock-Market-Predictor-Analysis-Dashboard",
    liveUrl: "https://stock-dashboard-demo.com",
    categories: ["Data Science", "Frontend"],
    problemStatement: "Traders need lightning-fast, highly visual data to make split-second decisions without browser locking or lag.",
    solutionApproach: "Implemented highly optimized Canvas/SVG charts via Recharts coupled with strict component rendering boundaries.",
    architecture: "Pure React frontend leveraging custom hooks to manage raw WebSocket streams into a localized Zustand store, preventing global re-renders.",
    challenges: [
      "Avoiding severe UI lag and browser lock-ups when visualizing massive datasets instantaneously.",
      "Ensuring accurate historical synchronization when WebSocket connections sporadically dropped."
    ],
    tradeOffs: [
      "Sacrificed some DOM accessibility integrations to utilize Canvas for pure rendering horsepower.",
      "Implemented heavy client-side calculations rather than server-side, trading initial load payload size for zero-latency interactions."
    ],
    performanceImprovements: [
      "Moved heavy chart calculations off the main thread to Web Workers",
      "Throttled DOM updates using requestAnimationFrame"
    ],
    keyLearnings: [
      "DOM nodes are expensive; utilizing canvas for high-frequency updates is the only way to achieve 60fps data streams."
    ]
  },
  {
    id: "fleetpulse",
    title: "FleetPulse (Live Map)",
    impactStatement: "Live vehicle tracking with optimized real-time performance",
    shortDescription: "An Android application designed to give fleet managers instantaneous visibility into vehicle positions and telemetry data for optimized routing and logistics.",
    solutionSummary: "Engineered an Android application providing real-time coordinate plotting of transport vehicles with high accuracy.",
    description: "An Android application interface showcasing real-time coordinate plotting of transport vehicles with high accuracy using Google Maps APIs. Built following strict MVVM architecture.",
    techStack: ["Kotlin", "Android", "Jetpack Compose", "Google Maps API", "MVVM"],
    features: ["Live Vehicle Tracking", "Route Optimization", "Geo-fencing", "Telemetry Data"],
    metrics: [
      "Tracks 500+ simultaneous vehicles without frame drops",
      "Optimized battery usage for background service by 25%",
      "Achieved 99.9% crash-free sessions"
    ],
    image: "/images/gps.png",
    githubUrl: "https://github.com/Jeet-Lohar-itzJeeSKUULL/FleetPulse",
    liveUrl: "https://fleetpulse-demo.com",
    categories: ["App Development", "Full Stack"],
    problemStatement: "Fleet managers lacked real-time visibility into vehicle positions and telemetry, resulting in inefficient routing and delays.",
    solutionApproach: "Integrated Google Maps SDK with a highly responsive declarative UI utilizing Jetpack Compose and Kotlin Coroutines.",
    architecture: "Strict MVVM architecture utilizing Kotlin Flow to stream background location data deterministically to the UI layer.",
    challenges: [
      "Bridging legacy Google Maps SDK fragment lifecycles tightly into Jetpack Compose without memory leaks.",
      "Conserving device battery life while maintaining high-accuracy background location polling telemetry."
    ],
    tradeOffs: [
      "Chose native Kotlin over cross-platform (React Native/Flutter) specifically for granular background service control.",
      "Throttled GPS updates to every 5 seconds vs 1 second to dramatically preserve battery span at the cost of slight latency."
    ],
    performanceImprovements: [
      "Debounced map marker updates to prevent excessive rendering",
      "Utilized custom map styles to reduce tile loading overhead"
    ],
    keyLearnings: [
      "Managing Google Map lifecycle within Compose requires careful memory management and referencing."
    ]
  },
  {
    id: "mangaquiz",
    title: "MangaQuiz – Interactive Quiz Platform",
    impactStatement: "Role-based assessment platform with automated evaluation",
    shortDescription: "Built a high-performance interactive quiz platform delivering real-time feedback, dynamic question flows, and smooth UI transitions.",
    solutionSummary: "Built a high-performance interactive quiz platform delivering real-time feedback, dynamic question flows, and smooth UI transitions, optimized for responsiveness and engaging user experience.",
    description: "Built a high-performance interactive quiz platform delivering real-time feedback, dynamic question flows, and smooth UI transitions, optimized for responsiveness and engaging user experience.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Zustand", "Context API"],
    features: [
      "Real-time Quiz State Engine",
      "Dynamic Question Flow System",
      "Score Calculation & Feedback Engine",
      "UI Interaction & Animation System"
    ],
    metrics: [
      "Reduced UI response delay by ~40% through optimized state updates",
      "Achieved near-instant feedback (<100ms interaction latency)",
      "Improved user engagement through dynamic UI feedback loops",
      "Maintained consistent performance across rapid interactions"
    ],
    performanceImprovements: [
      "Minimized unnecessary re-renders using state isolation techniques",
      "Optimized component updates for high-frequency interactions",
      "Lightweight UI architecture ensuring fast load and execution",
      "Efficient handling of dynamic content rendering"
    ],
    keyLearnings: [
      "Fine-grained state management is critical for interactive applications",
      "UI performance depends heavily on rendering control strategies",
      "Small optimizations significantly improve perceived responsiveness",
      "Designing for user interaction patterns improves overall UX quality"
    ],
    image: "/images/quiz.webp",
    githubUrl: "https://github.com/Jeet-Lohar-itzJeeSKUULL/MangaQuiz",
    liveUrl: "https://mangaquiz-demo.com",
    categories: ["Full Stack"],
  },
  {
    id: "venturehub",
    title: "VentureHub – Startup Collaboration Platform",
    impactStatement: "Startup collaboration platform with structured user workflows",
    shortDescription: "Built a full-stack platform enabling founders to showcase ideas, connect with collaborators, and manage early-stage ventures.",
    solutionSummary: "Built a full-stack platform enabling founders to showcase ideas, connect with collaborators, and manage early-stage ventures through a structured, scalable system.",
    description: "Built a full-stack platform enabling founders to showcase ideas, connect with collaborators, and manage early-stage ventures through a structured, scalable system.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Firebase", "REST APIs"],
    features: [
      "Idea Showcase & Discovery Engine",
      "User Collaboration & Networking System",
      "Role-based Access Control",
      "Venture Management Dashboard",
      "Real-time Interaction & Updates"
    ],
    metrics: [
      "Improved idea discovery with structured feed",
      "Reduced collaboration friction via streamlined workflows"
    ],
    image: "/images/hub.webp",
    githubUrl: "https://github.com/Jeet-Lohar-itzJeeSKUULL/VentureHub",
    liveUrl: "https://venturehub-demo.com",
    categories: ["Full Stack"]
  }
];
