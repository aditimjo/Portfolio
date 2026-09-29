import { useEffect, useState } from "react"

import developerToolsImage from "@/assets/work-developer-tools.jpg"
import enterpriseAiImage from "@/assets/work-enterprise-ai.jpg"
import productResearchImage from "@/assets/work-product-research.jpg"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Footerdemo } from "@/components/ui/footer-section"
import GlowCursor from "@/components/ui/glow-cursor"
import ModalCards, { type CardData } from "@/components/ui/modal-cards"
import { Timeline } from "@/components/ui/timeline"
import StickerCluster, { type Sticker } from "@/components/ui/sticker-cluster"
import ToolFolder, { type FloatingTool, type Tool } from "@/components/ui/tool-folder"
import { AntigravityLogo, GeminiLogo, SimpleIconLogo } from "@/components/ui/tool-logos"
import { siClaude, siClaudecode, siFigma, siGooglecolab, siMiro, siNotion } from "simple-icons"

const selectedWork: CardData[] = [
  {
    id: 1,
    title: "Designing Trust into Enterprise AI",
    description: "A research-led design system for transparent AI decision-making in enterprise platforms.",
    imageUrl: enterpriseAiImage,
    gradientColor: "#7C3AED",
  },
  {
    id: 2,
    title: "Developer Tools Redesign",
    description: "Rethinking the developer experience for a complex SaaS platform used by 300k+ users.",
    imageUrl: developerToolsImage,
    gradientColor: "#2563EB",
  },
  {
    id: 3,
    title: "Product Research Framework",
    description: "Building a scalable research ops practice from scratch across three product verticals.",
    imageUrl: productResearchImage,
    gradientColor: "#059669",
  },
]

const navigation = [
  {
    label: "Home",
    href: "#home",
    path: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5M9 21v-7h6v7",
  },
  {
    label: "About Me",
    href: "#about",
    path: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  },
  {
    label: "Work",
    href: "#work",
    path: "M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 8h18v12H3V8Zm0 5h18M10 13v2h4v-2",
  },
  {
    label: "Resume",
    href: "#resume",
    path: "M6 3h9l3 3v15H6V3Zm9 0v4h4M9 11h6M9 15h6M9 7h2",
  },
]

const skills: Sticker[] = [
  { label: "user research", color: "#FFC83D", ink: "#4D3300", rotate: -4 },
  { label: "interaction design", color: "#FF8B3D", ink: "#4A1F00", rotate: 3 },
  { label: "prototyping", color: "#FF5B36", ink: "#420F00", rotate: -7 },
  { label: "usability testing", color: "#FFB0A8", ink: "#4F161B", rotate: 5 },
  { label: "design systems", color: "#FFD6A0", ink: "#4D2A00", rotate: -2 },
  { label: "accessibility", color: "#FF9E8A", ink: "#4A1308", rotate: 6 },
  { label: "information architecture", color: "#FFE07A", ink: "#473600", rotate: -3 },
]

const domains: Sticker[] = [
  { label: "fintech", color: "#3D7BFF", ink: "#0A1D4A", rotate: 4 },
  { label: "human-centred AI", color: "#39C6F2", ink: "#05324A", rotate: -5 },
  { label: "logistics", color: "#A48BFF", ink: "#26115C", rotate: 2 },
  { label: "education", color: "#5CD49E", ink: "#08392A", rotate: -6 },
  { label: "enterprise SaaS", color: "#7FA6FF", ink: "#0E2257", rotate: 5 },
  { label: "tourism", color: "#8DE3F5", ink: "#0A3A47", rotate: -3 },
  { label: "AR/VR", color: "#C7B5FF", ink: "#2C1666", rotate: 7 },
]

const floatingTools: FloatingTool[] = [
  { name: "Antigravity", logo: <AntigravityLogo />, x: 18, y: 22, rotate: -6 },
  { name: "Gemini", logo: <GeminiLogo />, x: 50, y: 10, rotate: 4 },
  { name: "Claude", logo: <SimpleIconLogo icon={siClaude} />, x: 82, y: 20, rotate: 8 },
  { name: "Claude Code", logo: <SimpleIconLogo icon={siClaudecode} />, x: 28, y: 45, rotate: -4 },
  { name: "Colab", logo: <SimpleIconLogo icon={siGooglecolab} />, x: 73, y: 44, rotate: 6 },
]

// Figma, Miro and Notion are placeholders; swap in the tools you actually use.
const tuckedTools: Tool[] = [
  { name: "Miro", logo: <SimpleIconLogo icon={siMiro} /> },
  { name: "Figma", logo: <SimpleIconLogo icon={siFigma} /> },
  { name: "Notion", logo: <SimpleIconLogo icon={siNotion} /> },
]

const experience = [
  {
    date: "2024-10-01",
    company: "WONGDOODY",
    role: "Lead Experience Designer",
    dates: "August 2022 – October 2024",
    duration: "2 years 3 months",
    location: "Pune District",
    domains: ["Fintech", "Education", "Logistics"],
  },
  {
    date: "2024-09-30",
    company: "Infosys",
    role: "Lead Experience Designer",
    dates: "August 2022 – October 2024",
    duration: "2 years 3 months",
    domains: ["Fintech", "Education", "Logistics"],
  },
  {
    date: "2022-06-01",
    company: "Tata Consultancy Services",
    role: "User Experience Designer",
    dates: "January 2022 – June 2022",
    duration: "6 months",
    location: "Mumbai",
    domains: ["Tourism", "AR/VR"],
  },
  {
    date: "2021-11-01",
    company: "INITIA",
    role: "User Experience Designer",
    dates: "August 2021 – November 2021",
    duration: "4 months",
    domains: ["Automobile", "HMI"],
  },
  {
    date: "2021-08-01",
    company: "IVL | InfoVision Labs",
    role: "UX Designer",
    dates: "May 2021 – August 2021",
    duration: "4 months",
    domains: ["Healthcare"],
  },
]

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme")
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light"
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("portfolio-theme", theme)
  }, [isDarkMode])

  return (
    <div className={`portfolio-page${isDarkMode ? " portfolio-page--dark" : ""}`}>
      <GlowCursor
        color="#7C3AED"
        secondaryColor="#A78BFA"
        trailLength={22}
        trailWidth={8}
        trailTaper={0.8}
        followSpeed={0.16}
        glowIntensity={1.9}
        glowSpread={1.2}
        hotspot={0.65}
        brightness={1.25}
        opacity={1}
        pulseSpeed={1.1}
        noiseStrength={0.035}
        idleFade
        idleTimeout={700}
        fadeDuration={900}
        blendMode="plus-lighter"
      >
        <header className="site-header">
        <nav aria-label="Main navigation">
          <Dock className="portfolio-dock !mt-0" direction="middle">
            {navigation.map((item) => (
              <DockIcon className="dock-nav-icon" key={item.label}>
                <a href={item.href} aria-label={item.label}>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={item.path} />
                  </svg>
                  <span className="dock-label">{item.label}</span>
                </a>
              </DockIcon>
            ))}
          </Dock>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="intro">Nice to meet you</p>
            <h1>Hi, I'm Aditi Joshi</h1>
            <p className="role">Product Designer · HCI Researcher</p>
            <p className="tagline">Turning complexity into clarity</p>
          </div>
        </section>

        <section className="about-section" id="about">
          <h2>A little about me</h2>
          <div className="about-copy">
            <p className="about-lead">
              I&apos;m obsessed with one thing: people. AI just happens to be the newest
              playground.
            </p>
            <p>
              I explore how humans and technology can work better together. For 5+ years
              that&apos;s meant enterprise products in fintech, logistics and education,
              including platforms used by 300,000+ people. More recently it meant an MSc in
              Human-Computer Interaction at University College Dublin, focused on
              human-centred AI and accessibility.
            </p>
            <p>
              The problems I like best are the messy ones: dense data, lots of user roles,
              rules that can&apos;t be broken. I ask the inconvenient questions early, so the
              final design doesn&apos;t need a manual.
            </p>
          </div>
        </section>

        <section className="selected-work" id="work">
          <h2>Case study</h2>
          <ModalCards
            cards={selectedWork}
            gradientColor="#7C3AED"
            animationVariant="scale"
            animationSpeed="normal"
          />
        </section>

        <section className="toolkit-section" id="toolkit">
          <h2>Skills, tools &amp; domains</h2>
          <div className="toolkit-grid">
            <div className="toolkit-group toolkit-group--skills">
              <h3>Skills</h3>
              <StickerCluster stickers={skills} aria-label="Skills" />
            </div>
            <div className="toolkit-group toolkit-group--tools">
              <h3>Tools</h3>
              <ToolFolder floating={floatingTools} tucked={tuckedTools} label="Tools I use" />
              <p className="toolkit-hint">Drag the cards around</p>
            </div>
            <div className="toolkit-group toolkit-group--domains">
              <h3>Domains</h3>
              <StickerCluster stickers={domains} aria-label="Domains" />
            </div>
          </div>
        </section>

        <section className="work-history" id="resume">
          <h2>Experience</h2>
          <Timeline
            className="mx-auto max-w-3xl"
            items={experience.map((job) => ({
              date: job.date,
              dateLabel: job.dates,
              title: job.company,
              description: job.role,
              metadata: [job.duration, job.location].filter(Boolean).join(" · "),
              tags: job.domains,
            }))}
            initialCount={3}
            showMoreText="View earlier roles"
            showLessText="Show fewer roles"
          />
        </section>
      </main>
        <Footerdemo isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
      </GlowCursor>
    </div>
  )
}
