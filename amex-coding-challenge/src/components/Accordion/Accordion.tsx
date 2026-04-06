import { useId, useState } from 'react'
import MuiAccordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import type {
  AccordionExpansionMode,
  AccordionPanelId,
  AccordionProps,
} from './types'
export type { AccordionPanel, AccordionProps } from './types'

export function Accordion({
  panels,
  shouldAllowMultipleExpanded = true,
}: AccordionProps) {
  const expansionMode: AccordionExpansionMode = shouldAllowMultipleExpanded
    ? 'multiple'
    : 'single'

  // Keep separate state shapes so each interaction mode remains straightforward.
  const [expandedPanelIds, setExpandedPanelIds] = useState<AccordionPanelId[]>(
    []
  )
  const [singleExpandedPanelId, setSingleExpandedPanelId] =
    useState<AccordionPanelId | null>(null)
  const accordionId = useId()

  const handlePanelChange = (
    panelId: AccordionPanelId,
    nextExpanded: boolean
  ) => {
    if (expansionMode === 'single') {
      setSingleExpandedPanelId(nextExpanded ? panelId : null)
      return
    }

    setExpandedPanelIds((currentExpandedPanelIds) => {
      if (!nextExpanded) {
        return currentExpandedPanelIds.filter((id) => id !== panelId)
      }

      if (currentExpandedPanelIds.includes(panelId)) {
        return currentExpandedPanelIds
      }

      return [...currentExpandedPanelIds, panelId]
    })
  }

  return (
    <div>
      {panels.map((panel) => {
        // Stable ID pairs drive explicit button <-> region accessibility linkage.
        const regionId = `${accordionId}-region-${panel.id}`
        const buttonId = `${accordionId}-button-${panel.id}`
        const isExpanded =
          expansionMode === 'multiple'
            ? expandedPanelIds.includes(panel.id)
            : singleExpandedPanelId === panel.id

        return (
          <MuiAccordion
            key={panel.id}
            expanded={isExpanded}
            disableGutters
            square
            onChange={(_, nextExpanded) =>
              handlePanelChange(panel.id, nextExpanded)
            }
            slotProps={{ transition: { unmountOnExit: true } }}
            sx={{
              border: '1px solid var(--color-border)',
              borderTop: 'none',
              borderRadius: 0,
              background: 'var(--color-background)',
              boxShadow: 'none',
              '&:first-of-type': {
                borderTop: '1px solid var(--color-border)',
                borderTopLeftRadius: 'var(--radius-md)',
                borderTopRightRadius: 'var(--radius-md)',
              },
              '&:last-of-type': {
                borderBottomLeftRadius: 'var(--radius-md)',
                borderBottomRightRadius: 'var(--radius-md)',
              },
              '&::before': {
                display: 'none',
              },
            }}
          >
            <AccordionSummary
              id={buttonId}
              aria-controls={regionId}
              expandIcon={isExpanded ? <RemoveIcon /> : <AddIcon />}
              sx={{
                minHeight: 'auto',
                padding: 'var(--space-lg)',
                color: isExpanded ? '#ffffff' : 'var(--color-text)',
                background: isExpanded
                  ? 'var(--color-interactive)'
                  : 'transparent',
                transition: 'background-color var(--motion-fast) ease',
                '&:hover': {
                  background: isExpanded
                    ? 'var(--color-interactive)'
                    : 'var(--color-interactive-hover)',
                },
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                  fontFamily: 'var(--font-family-base)',
                  fontSize: 'var(--font-size-md)',
                  lineHeight: 'var(--line-height-md)',
                  fontWeight: 'var(--font-weight-semibold)',
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  color: isExpanded ? '#ffffff' : 'var(--color-interactive)',
                  transition: 'transform var(--motion-normal) ease',
                },
                '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                  transform: 'rotate(180deg)',
                },
                '&.Mui-focusVisible': {
                  outline: '3px solid var(--color-focus-ring)',
                  outlineOffset: '-3px',
                },
                '@media (prefers-reduced-motion: reduce)': {
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'none',
                  },
                },
              }}
            >
              {panel.title}
            </AccordionSummary>
            <AccordionDetails
              id={regionId}
              sx={{
                padding: 'var(--space-lg)',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-family-base)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-sm)',
                animation: 'accordionReveal var(--motion-normal) ease',
                '@media (prefers-reduced-motion: reduce)': {
                  animation: 'none',
                },
                '@keyframes accordionReveal': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-4px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              {panel.content}
            </AccordionDetails>
          </MuiAccordion>
        )
      })}
    </div>
  )
}
