import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useRef, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/cn';
import { easeArchitectural } from '@/lib/motion';

export type SheetSide = 'top' | 'right' | 'full';

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  side?: SheetSide;
  /** Id of the element that names the dialog (usually its heading). */
  labelledBy: string;
  id?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  className?: string;
  children: ReactNode;
}

const transition = { duration: 0.7, ease: easeArchitectural };

const panelVariants: Record<SheetSide, Variants> = {
  top: {
    hidden: { y: '-100%', transition },
    visible: { y: 0, transition },
  },
  right: {
    hidden: { x: '100%', transition },
    visible: { x: 0, transition },
  },
  full: {
    hidden: { opacity: 0, transition: { duration: 0.4 } },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  },
};

const panelClasses: Record<SheetSide, string> = {
  top: 'inset-x-0 top-0 max-h-svh overflow-y-auto border-b border-line',
  right: 'inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line',
  full: 'inset-0 flex flex-col overflow-y-auto',
};

/**
 * Accessible modal panel: portal, backdrop, focus trap, Escape to close,
 * scroll lock and focus restoration.
 */
export function Sheet({
  open,
  onClose,
  side = 'right',
  labelledBy,
  id,
  initialFocusRef,
  className,
  children,
}: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(open);
  useFocusTrap(panelRef, open, { onEscape: onClose, initialFocusRef });

  return createPortal(
    <AnimatePresence>
      {open && (
        <div key="sheet" className="fixed inset-0 z-50">
          {side !== 'full' && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-navy/45 backdrop-blur-[2px]"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={cn('absolute bg-ivory text-ink focus:outline-none', panelClasses[side], className)}
            variants={panelVariants[side]}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
