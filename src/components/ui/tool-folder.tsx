import type { CSSProperties, ReactNode } from "react"
import { EllipsisVertical, Settings } from "lucide-react"

import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card"
import { cn } from "@/lib/utils"

export type Tool = {
  name: string
  /** logo mark, rendered inside a square box */
  logo: ReactNode
}

type ToolFolderProps = {
  /** logo cards stacked in the folder, back row first; each can be dragged out */
  tools: Tool[]
  label: string
  /** smaller line under the label */
  subtitle?: string
  className?: string
}

// Tilts cycled across the stack so the cards look filed by hand.
const TILTS = [-7, 4, -3, 8, -5, 3, -8, 6]

// Splits the tools into two staggered rows: the back row sits higher so its
// logos peek over the front row, and both tuck behind the folder's front panel.
function stackPosition(index: number, total: number) {
  const backCount = Math.ceil(total / 2)
  const isBack = index < backCount
  const rowIndex = isBack ? index : index - backCount
  const rowSize = isBack ? backCount : total - backCount
  const spread = 72
  const start = (100 - spread) / 2
  const step = rowSize > 1 ? spread / (rowSize - 1) : 0
  const offset = isBack ? 0 : step / 2

  return {
    left: `${Math.min(start + offset + rowIndex * step, 100 - start)}%`,
    bottom: isBack ? "92%" : "76%",
    rotate: `${TILTS[index % TILTS.length]}deg`,
    zIndex: isBack ? 1 : 2,
  } satisfies CSSProperties
}

export default function ToolFolder({ tools, label, subtitle, className }: ToolFolderProps) {
  return (
    <DraggableCardContainer className={cn("tool-stage", className)}>
      <div className="tool-folder">
        <div className="tool-folder-back" aria-hidden="true" />

        {tools.map((tool, index) => (
          <div key={tool.name} className="tool-card-anchor" style={stackPosition(index, tools.length)}>
            <DraggableCardBody className="tool-card">
              <span className="tool-card-logo">{tool.logo}</span>
              <span className="sr-only">{tool.name}</span>
            </DraggableCardBody>
          </div>
        ))}

        <div className="tool-folder-front" aria-hidden="true">
          <div className="tool-folder-heading">
            <span className="tool-folder-label">{label}</span>
            {subtitle && <span className="tool-folder-subtitle">{subtitle}</span>}
          </div>
          <div className="tool-folder-actions">
            <EllipsisVertical />
            <Settings />
          </div>
          <span className="tool-folder-count">{tools.length} tools</span>
        </div>
      </div>
    </DraggableCardContainer>
  )
}
