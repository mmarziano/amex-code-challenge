import type { ReactElement } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { Accordion, type AccordionPanel } from './Accordion'

const testPanels: AccordionPanel[] = [
  {
    id: 'panel-one',
    title: 'Panel One',
    content: 'Content for panel one',
  },
  {
    id: 'panel-two',
    title: 'Panel Two',
    content: 'Content for panel two',
  },
  {
    id: 'panel-three',
    title: 'Panel Three',
    content: 'Content for panel three',
  },
]

function renderWithUser(ui: ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  }
}

describe('Accordion', () => {
  test('renders accordion with multiple panels', () => {
    render(<Accordion panels={testPanels} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
    expect(screen.queryByText('Content for panel one')).toBeNull()
    expect(screen.queryByText('Content for panel two')).toBeNull()
    expect(screen.queryByText('Content for panel three')).toBeNull()
  })

  test('shows content for the clicked panel and hides the rest', async () => {
    const { user } = renderWithUser(<Accordion panels={testPanels} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])
    expect(screen.getByText('Content for panel two')).toBeVisible()
    expect(screen.queryByText('Content for panel one')).toBeNull()
    expect(screen.queryByText('Content for panel three')).toBeNull()
  })

  test('hides content when an expanded panel is clicked again', async () => {
    const { user } = renderWithUser(<Accordion panels={testPanels} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[2])
    expect(screen.getByText('Content for panel three')).toBeVisible()
    await user.click(buttons[2])
    expect(screen.queryByText('Content for panel three')).toBeNull()
  })

  test('can expand multiple panels at the same time by default', async () => {
    const { user } = renderWithUser(<Accordion panels={testPanels} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    await user.click(buttons[2])
    expect(screen.getByText('Content for panel one')).toBeVisible()
    expect(screen.queryByText('Content for panel two')).toBeNull()
    expect(screen.getByText('Content for panel three')).toBeVisible()
  })

  describe('when shouldAllowMultipleExpanded is false', () => {
    test('only one panel is visible at a time', async () => {
      const { user } = renderWithUser(
        <Accordion panels={testPanels} shouldAllowMultipleExpanded={false} />
      )
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      expect(screen.getByText('Content for panel one')).toBeVisible()
      await user.click(buttons[2])
      expect(screen.getByText('Content for panel three')).toBeVisible()
      expect(screen.queryByText('Content for panel one')).toBeNull()
    })

    test('collapses all panels when multiple mode is disabled', async () => {
      const { user, rerender } = renderWithUser(
        <Accordion panels={testPanels} shouldAllowMultipleExpanded />
      )
      const buttons = screen.getAllByRole('button')
      await user.click(buttons[0])
      await user.click(buttons[2])
      expect(screen.getByText('Content for panel one')).toBeVisible()
      expect(screen.getByText('Content for panel three')).toBeVisible()

      rerender(
        <Accordion panels={testPanels} shouldAllowMultipleExpanded={false} />
      )

      await waitFor(() => {
        expect(screen.queryByText('Content for panel one')).toBeNull()
        expect(screen.queryByText('Content for panel two')).toBeNull()
        expect(screen.queryByText('Content for panel three')).toBeNull()
      })
    })
  })

  describe('accessibility', () => {
    test('each button has aria-controls pointing to an existing region when expanded', async () => {
      const { user } = renderWithUser(<Accordion panels={testPanels} />)
      const buttons = screen.getAllByRole('button')
      for (const button of buttons) {
        await user.click(button)
        const controlsId = button.getAttribute('aria-controls')
        expect(controlsId).toBeTruthy()
        expect(document.getElementById(controlsId!)).toBeInTheDocument()
      }
    })

    test('content regions have aria-labelledby pointing back to their header', async () => {
      const { user } = renderWithUser(<Accordion panels={testPanels} />)
      const buttons = screen.getAllByRole('button')
      for (const button of buttons) {
        await user.click(button)
      }

      const regions = screen.getAllByRole('region')
      regions.forEach((region) => {
        const labelledBy = region.getAttribute('aria-labelledby')
        expect(labelledBy).toBeTruthy()
        expect(document.getElementById(labelledBy!)).toBeInTheDocument()
      })
    })
  })
})
