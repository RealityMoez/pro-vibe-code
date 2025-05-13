'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  Transition,
  Variant,
} from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import useClickOutside from '@/hooks/useClickOutside';
import { XIcon } from 'lucide-react';

// Define the shape of the DialogContext
interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement>;
}

// Create a context for the Dialog
const DialogContext = React.createContext<DialogContextType | null>(null);

// Custom hook to use the DialogContext
function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

// Props for the DialogProvider component
type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

// DialogProvider component to manage the dialog state
function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

// Props for the Dialog component
type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

// Main Dialog component
function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogProvider>
  );
}

// Props for the DialogTrigger component
type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  triggerRef?: React.RefObject<HTMLDivElement>;
};

// DialogTrigger component to open the dialog
function DialogTrigger({
  children,
  className,
  style,
  triggerRef,
}: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role='button'
      aria-haspopup='dialog'
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 1, scale: 1 }}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// Props for the DialogContent component
type DialogContent = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// DialogContent component to render the dialog content
function DialogContent({ children, className, style }: DialogContent) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  // Handle keyboard navigation within the dialog
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  // Manage focus when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
    } else {
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  // Close dialog when clicking outside
  useClickOutside(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      className={cn('overflow-hidden max-w-[95vw] max-h-[95vh]', className)}
      style={style}
      role='dialog'
      aria-modal='true'
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {children}
    </motion.div>
  );
}

// Props for the DialogContainer component
type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// DialogContainer component to render the dialog and its backdrop
function DialogContainer({ children }: DialogContainerProps) {
  const { isOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence initial={false} mode='sync'>
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className='fixed inset-0 h-full w-full bg-white/40 backdrop-blur-sm dark:bg-black/40'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Props for the DialogTitle component
type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// DialogTitle component to render the dialog title
function DialogTitle({ children, className, style }: DialogTitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {/* Wrap the content in a non-animated div to keep it visible during layout transitions */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Props for the DialogSubtitle component
type DialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// DialogSubtitle component to render the dialog subtitle
function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {/* Wrap the content in a non-animated div to keep it visible during layout transitions */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Props for the DialogDescription component
type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

// DialogDescription component to render the dialog description
function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial='initial'
      animate='animate'
      exit='exit'
      id={`dialog-description-${uniqueId}`}
    >
      {/* Wrap the content in a non-animated div to keep it visible during layout transitions */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Props for the DialogImage component
type DialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

// DialogImage component to render an image within the dialog
function DialogImage({ src, alt, className, style }: DialogImageProps) {
  const { uniqueId } = useDialog();

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

// Props for the DialogClose component
type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

// DialogClose component to render a close button for the dialog
function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type='button'
      aria-label='Close dialog'
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6', className)}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

// Export all dialog components
export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
};