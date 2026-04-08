import { useState, useRef, useEffect } from 'react';
import type { PopoverProps } from './Popover.types';
import './Popover.css';

// We have created a new Popover component, but there are a few bugs. Please solve in the following order:
// 1. Popover does not close when clicking outside of it
// 2. Popover does not close when the escape key is pressed
// 3. Popover does not focus on the first interactive element when it opens
// 4. Unit tests for accessibility are failing
// 5. Popover content should have a background color of #D3D3D3

export const Popover = ({ triggerLabel, id, children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentId = `${id}-content`;

  const open = () => {
    setIsOpen(true);
  };

  const handleTriggerClick = () => {
    if (!isOpen) {
      open();
    }
  };

  // focus on first interactive element in popover when it opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusable = contentRef.current.querySelector<HTMLElement>(
        '[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        // user has clicked outside the popover trigger and content
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <>
      <button
        ref={triggerRef}
        onClick={handleTriggerClick}
        className="popover-trigger"
      >
        {triggerLabel}
      </button>
      {isOpen && (
        <div ref={contentRef} id={contentId} className="popover">
          {children}
        </div>
      )}
    </>
  );
};