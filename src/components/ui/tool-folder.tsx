import type { ReactNode } from "react"
import { EllipsisVertical, Settings } from "lucide-react"

import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"
import { cn } from "@/lib/utils"

export type Tool = {
  name: string
  /** logo mark, rendered inside a square box */
  logo: ReactNode
}

export type FloatingTool = Tool & {
  /** card centre, as a percentage of the stage */
  x: number
  y: number
  /** tilt in degrees */
  rotate: number
}

type ToolFolderProps = {
  /** logo cards that burst out of the folder and can be dragged */
  floating: FloatingTool[]
  /** up to three cards tucked into the folder, back to front */
  tucked: Tool[]
  label: string
  /** smaller line under the label */
  subtitle?: string
  className?: string
}

// Where the connecting threads leave the folder, in stage percentages.
const THREAD_ORIGIN = { x: 50, y: 62 }

export default function ToolFolder({
  floating,
  tucked,
  label,
  subtitle,
  className,
}: ToolFolderProps) {
  const toolCount = floating.length + tucked.length

  return (
    <DraggableCardContainer className={cn("tool-stage", className)}>
      <svg
        className="tool-threads"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {floating.map((tool) => (
          <path
            key={tool.name}
            d={`M${THREAD_ORIGIN.x} ${THREAD_ORIGIN.y} C${THREAD_ORIGIN.x} ${
              (THREAD_ORIGIN.y + tool.y) / 2
            } ${tool.x} ${(THREAD_ORIGIN.y + tool.y) / 2 + 8} ${tool.x} ${tool.y}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="tool-folder" aria-hidden="true">
        <div className="tool-folder-back" />
        <div className="tool-folder-tucked">
          {tucked.slice(0, 3).map((tool, index) => (
            <div key={tool.name} className={`tool-tucked-card tool-tucked-card--${index}`}>
              <span className="tool-tucked-logo">{tool.logo}</span>
            </div>
          ))}
        </div>
        <div className="tool-folder-front">
          <div className="tool-folder-heading">
            <span className="tool-folder-label">{label}</span>
            {subtitle && <span className="tool-folder-subtitle">{subtitle}</span>}
          </div>
          <div className="tool-folder-actions">
            <EllipsisVertical />
            <Settings />
          </div>
          <span className="tool-folder-count">{toolCount} tools</span>
        </div>
      </div>

      {floating.map((tool) => (
        <div
          key={tool.name}
          className="tool-card-anchor"
          style={{ left: `${tool.x}%`, top: `${tool.y}%`, rotate: `${tool.rotate}deg` }}
        >
          <DraggableCardBody className="tool-card">
            <span className="tool-card-logo">{tool.logo}</span>
            <span className="tool-card-name">{tool.name}</span>
          </DraggableCardBody>
        </div>
      ))}

      <ul className="sr-only">
        {[...tucked, ...floating].map((tool) => (
          <li key={tool.name}>{tool.name}</li>
        ))}
      </ul>
    </DraggableCardContainer>
  )
}
