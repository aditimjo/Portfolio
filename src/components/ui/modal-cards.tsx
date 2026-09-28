import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

export interface CardData {
  id: string | number
  imageUrl: string
  title: string
  description?: string
  gradientColor?: string
}

interface ModalCardsProps {
  cards: CardData[]
  className?: string
  gradientColor?: string
  animationVariant?: "scale" | "fade" | "slide"
  animationSpeed?: "slow" | "normal" | "fast" | "none"
  springStiffness?: number
  springDamping?: number
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  ariaLabel?: string
  backdropGradientPosition?: string
  modalClassName?: string
  backdropClassName?: string
}

const DURATION: Record<string, number> = {
  slow: 0.55,
  normal: 0.38,
  fast: 0.22,
  none: 0,
}

export default function ModalCards({
  cards,
  className,
  gradientColor = "#6366f1",
  animationVariant = "scale",
  animationSpeed = "normal",
  springStiffness,
  springDamping,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  ariaLabel = "Card details modal",
  backdropGradientPosition = "50% 10%",
  modalClassName,
  backdropClassName,
}: ModalCardsProps) {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const activeCard = cards.find((c) => c.id === activeId) ?? null

  useEffect(() => {
    if (!closeOnEscape) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [closeOnEscape])

  useEffect(() => {
    if (activeId !== null) {
      document.body.style.overflow = "hidden"
      setTimeout(() => closeRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeId])

  const duration = DURATION[animationSpeed] ?? DURATION.normal
  const spring = springStiffness
    ? { type: "spring" as const, stiffness: springStiffness, damping: springDamping ?? 30 }
    : { type: "tween" as const, duration }

  const variants = {
    scale: {
      initial: { opacity: 0, scale: 0.82 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.82 },
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, y: 48 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 48 },
    },
  }[animationVariant]

  const cardGradient = (card: CardData) => card.gradientColor ?? gradientColor

  return (
    <>
      <div
        role="list"
        className={cn(
          "modal-cards-grid",
          className,
        )}
      >
        {cards.map((card) => (
          <motion.article
            key={card.id}
            layoutId={animationVariant === "scale" ? `modal-card-${card.id}` : undefined}
            role="listitem"
            tabIndex={0}
            aria-label={card.title}
            className="modal-card"
            onClick={() => setActiveId(card.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveId(card.id)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={card.imageUrl}
              alt=""
              aria-hidden="true"
              className="modal-card-image"
              style={{
                background: `linear-gradient(135deg, ${cardGradient(card)}33, ${cardGradient(card)}11)`,
              }}
            />
            <div
              className="modal-card-gradient"
              style={{
                background: `linear-gradient(to top, ${cardGradient(card)}cc 0%, transparent 55%)`,
              }}
            />
            <div className="modal-card-content">
              <h3 className="modal-card-title">{card.title}</h3>
              {card.description && (
                <p className="modal-card-description">{card.description}</p>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {activeCard && (
          <>
            {/* Backdrop */}
            <motion.div
              key="modal-backdrop"
              className={cn("modal-cards-backdrop", backdropClassName)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duration * 0.8 }}
              style={{
                background: `radial-gradient(ellipse at ${backdropGradientPosition}, ${cardGradient(activeCard)}55 0%, rgba(0,0,0,0.78) 70%)`,
              }}
              onClick={closeOnBackdropClick ? () => setActiveId(null) : undefined}
            />

            {/* Modal */}
            <motion.div
              key={`modal-${activeCard.id}`}
              layoutId={animationVariant === "scale" ? `modal-card-${activeCard.id}` : undefined}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              className={cn("modal-cards-modal", modalClassName)}
              initial={animationVariant !== "scale" ? variants.initial : undefined}
              animate={animationVariant !== "scale" ? variants.animate : undefined}
              exit={animationVariant !== "scale" ? variants.exit : undefined}
              transition={spring}
            >
              <img
                src={activeCard.imageUrl}
                alt={activeCard.title}
                className="modal-cards-modal-image"
              />
              <div
                className="modal-cards-modal-gradient"
                style={{
                  background: `linear-gradient(to top, ${cardGradient(activeCard)}ee 0%, transparent 60%)`,
                }}
              />
              <div className="modal-cards-modal-content">
                <h2 className="modal-cards-modal-title">{activeCard.title}</h2>
                {activeCard.description && (
                  <p className="modal-cards-modal-description">{activeCard.description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  ref={closeRef}
                  className="modal-cards-close"
                  aria-label="Close modal"
                  onClick={() => setActiveId(null)}
                >
                  ×
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
