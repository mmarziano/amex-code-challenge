import type { ReactNode } from 'react'

export type AccordionPanelId = string

export type AccordionExpansionMode = 'single' | 'multiple'

export interface AccordionPanel {
  id: AccordionPanelId
  title: string
  content: ReactNode
}

export interface AccordionProps {
  panels: ReadonlyArray<AccordionPanel>
  shouldAllowMultipleExpanded?: boolean
}
