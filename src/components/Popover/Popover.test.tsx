import { render, screen } from '@testing-library/react';  
import userEvent from '@testing-library/user-event';  
import { describe, test, expect, vi } from 'vitest';  
import { Popover } from './Popover';  
  
function renderWithUser(ui: React.ReactElement) {  
  const user = userEvent.setup();  
  return { user, ...render(ui) };  
}  
  
describe('Popover', () => {  
  test('renders the trigger as a button', () => {  
    render(  
      <Popover triggerLabel="Options" id="test-popover">  
        <p>Content</p>  
      </Popover>  
    );  
    expect(screen.getByRole('button', { name: 'Options' })).toBeInTheDocument();  
  });  
  
  test('content is not visible by default', () => {  
    render(  
      <Popover triggerLabel="Options" id="test-popover">  
        <p>Popover content</p>  
      </Popover>  
    );  
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();  
  });  
  
  test('shows content when trigger is clicked', async () => {  
    const { user } = renderWithUser(  
      <Popover triggerLabel="Options" id="test-popover">  
        <p>Popover content</p>  
      </Popover>  
    );  
    await user.click(screen.getByRole('button', { name: 'Options' }));  
    expect(screen.getByText('Popover content')).toBeVisible();  
  });  
  
  test('hides content when trigger is clicked again', async () => {  
    const { user } = renderWithUser(  
      <Popover triggerLabel="Options" id="test-popover">  
        <p>Popover content</p>  
      </Popover>  
    );  
    await user.click(screen.getByRole('button', { name: 'Options' }));  
    await user.click(screen.getByRole('button', { name: 'Options' }));  
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();  
  });  
  
  test('closes when Escape key is pressed', async () => {  
    const { user } = renderWithUser(  
      <Popover triggerLabel="Options" id="test-popover">  
        <p>Popover content</p>  
      </Popover>  
    );  
    await user.click(screen.getByRole('button', { name: 'Options' }));  
    await user.keyboard('{Escape}');  
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();  
  });  
  
  test('closes when clicking outside', async () => {  
    const { user } = renderWithUser(  
      <div>  
        <Popover triggerLabel="Options" id="test-popover">  
          <p>Popover content</p>  
        </Popover>  
        <button>Outside</button>  
      </div>  
    );  
    await user.click(screen.getByRole('button', { name: 'Options' }));  
    expect(screen.getByText('Popover content')).toBeVisible();  
    await user.click(screen.getByRole('button', { name: 'Outside' }));  
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();  
  }); 
  
  describe('accessibility', () => {  
    test('trigger has aria-expanded reflecting open state', async () => {  
      const { user } = renderWithUser(  
        <Popover triggerLabel="Options" id="test-popover">  
          <p>Content</p>  
        </Popover>  
      );  
      const trigger = screen.getByRole('button', { name: 'Options' });  
      expect(trigger).toHaveAttribute('aria-expanded', 'false');  
      await user.click(trigger);  
      expect(trigger).toHaveAttribute('aria-expanded', 'true');  
    });  
  
    test('trigger has aria-controls pointing to the content panel', async () => {  
      const { user } = renderWithUser(  
        <Popover triggerLabel="Options" id="test-popover">  
          <p>Content</p>  
        </Popover>  
      );  
      const trigger = screen.getByRole('button', { name: 'Options' });  
      await user.click(trigger);  
      const controlsId = trigger.getAttribute('aria-controls');  
      expect(controlsId).toBeTruthy();  
      expect(document.getElementById(controlsId!)).toBeInTheDocument();  
    });  
  
    test('focus moves to first interactive element when opened', async () => {  
      const { user } = renderWithUser(  
        <Popover triggerLabel="Options" id="test-popover">  
          <button>First action</button>  
          <button>Second action</button>  
        </Popover>  
      );  
      await user.click(screen.getByRole('button', { name: 'Options' }));  
      expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus();  
    });  
  
    test('focus returns to trigger when closed via Escape', async () => {  
      const { user } = renderWithUser(  
        <Popover triggerLabel="Options" id="test-popover">  
          <button>First action</button>  
        </Popover>  
      );  
      const trigger = screen.getByRole('button', { name: 'Options' });  
      await user.click(trigger);  
      await user.keyboard('{Escape}');  
      expect(trigger).toHaveFocus();  
    });  
  });  
});