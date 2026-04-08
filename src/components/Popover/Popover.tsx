import { useState, useRef, useEffect } from 'react';
import type { PopoverProps } from './Popover.types';
import './Popover.css';

export const Popover = ({ triggerLabel, id, children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentId = `${id}-content`;

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  };

  // focus on first interactive element in popover when it opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      const focusable = contentRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      focusable?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={isOpen}
        aria-controls={contentId}
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