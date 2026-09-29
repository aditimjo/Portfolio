import { useEffect, useState } from "react"

import developerToolsImage from "@/assets/work-developer-tools.jpg"
import enterpriseAiImage from "@/assets/work-enterprise-ai.jpg"
import productResearchImage from "@/assets/work-product-research.jpg"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Footerdemo } from "@/components/ui/footer-section"
import GlowCursor from "@/components/ui/glow-cursor"
import ModalCards, { type CardData } from "@/components/ui/modal-cards"
import { Timeline } from "@/components/ui/timeline"
import MarqueeAlongSvgPath from "@/components/ui/marquee-along-svg-path"
import anatomyIllustration from "@/assets/inspiration/anatomy-illustration.jpg"
import dataCheetah from "@/assets/inspiration/data-cheetah.jpg"
import floatingRooftops from "@/assets/inspiration/floating-rooftops.jpg"
import generativeBlossom from "@/assets/inspiration/generative-blossom.jpg"
import horseLionCube from "@/assets/inspiration/horse-lion-cube.jpg"
import miyazakiQuote from "@/assets/inspiration/miyazaki-quote.jpg"
import vanGoghIrises from "@/assets/inspiration/van-gogh-irises.jpg"
import glitchMushrooms from "@/assets/inspiration/glitch-mushrooms.jpg"
import lasManosHand from "@/assets/inspiration/las-manos-hand.jpg"
import mechanicalButterfly from "@/assets/inspiration/mechanical-butterfly.jpg"
import phoneHandoff from "@/assets/inspiration/phone-handoff.jpg"
import threadTheory from "@/assets/inspiration/thread-theory.jpg"

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

const marqueePath =
  "M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5"

// Inspiration board images, moving along the marquee path.
const marqueeImages = [
  { src: anatomyIllustration, alt: "Colourful anatomical illustration of a torso with a heart monitor" },
  { src: floatingRooftops, alt: "Poster of traditional Chinese rooftops floating among glass slabs" },
  { src: miyazakiQuote, alt: "Hayao Miyazaki with the quote \"Always believe in yourself\"" },
  { src: generativeBlossom, alt: "Collage of cherry blossom photography and generative dot patterns" },
  { src: dataCheetah, alt: "Running cheetah overlaid with glowing data points" },
  { src: vanGoghIrises, alt: "Irises by Vincent van Gogh" },
  { src: horseLionCube, alt: "Stippled engraving of a horse and lion sliced into an isometric cube" },
  { src: phoneHandoff, alt: "Illustration of a hand passing a glowing phone to a silhouetted person" },
  { src: threadTheory, alt: "Thread Theory: An Index of Mind poster linking a figure to hand-lettered notes" },
  { src: lasManosHand, alt: "Las Manos poster of a hand assembled from mixed-material grid tiles" },
  { src: mechanicalButterfly, alt: "Butterfly built from disassembled electronic parts" },
  { src: glitchMushrooms, alt: "Tree mushrooms merged with blue-screen error text" },
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

        <section className="photo-marquee" aria-label="Photo gallery">
          <h2>Things that inspire me</h2>
          <MarqueeAlongSvgPath
            path={marqueePath}
            viewBox="0 0 996 330"
            baseVelocity={8}
            slowdownOnHover
            draggable
            repeat={2}
            dragSensitivity={0.1}
            className="photo-marquee-track"
            responsive
            grabCursor
          >
            {marqueeImages.map((image) => (
              <div
                key={image.src}
                className="h-24 w-16 overflow-hidden rounded-md shadow-sm transition-transform duration-300 ease-in-out hover:scale-150"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </section>
      </main>
        <Footerdemo isDarkMode={isDarkMode} onDarkModeChange={setIsDarkMode} />
      </GlowCursor>
    </div>
  )
}
