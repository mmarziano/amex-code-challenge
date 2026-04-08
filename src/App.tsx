import { useState } from 'react'
import { Accordion, type AccordionPanel } from './components/Accordion'
import './App.css'
import { FormControlLabel, Switch } from '@mui/material'
import { Popover } from './components/Popover/Popover'

function App() {
  const [allowMultipleExpanded, setAllowMultipleExpanded] = useState(false)
  const allowMultipleExpandedSwitchId = 'allow-multiple-expanded'

  const accordionPanels: AccordionPanel[] = [
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

  return (
    <main className="app">
      <h1>Accordion</h1>
      <div className="controls-row">
        <FormControlLabel
          label="Enable multiple panel expansion"
          control={
            <Switch
              checked={allowMultipleExpanded}
              onChange={(_, checked) => setAllowMultipleExpanded(checked)}
              slotProps={{ input: { id: allowMultipleExpandedSwitchId } }}
            />
          }
          htmlFor={allowMultipleExpandedSwitchId}
        />
      </div>
      <Accordion
        // Re-mount when switching modes so state doesn't leak between toggling panel behavior.
        key={allowMultipleExpanded ? 'accordion-multi' : 'accordion-single'}
        panels={accordionPanels}
        shouldAllowMultipleExpanded={allowMultipleExpanded}
      />
      <hr />
      <h1>Popover</h1>
      <Popover triggerLabel="Popover Trigger" id="test-popover">  
        <p>Popover Content</p>  
        <br />
        <button>Button in Popover Content</button>
        <br />
        <a href="/">Link in Popover Content</a>
      </Popover> 
    </main>
  )
}

export default App
