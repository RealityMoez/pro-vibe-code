'use client';
import { cn } from '@/lib/utils';
import { AnimatePresence, Transition, motion } from 'framer-motion';
import {
  Children,
  cloneElement,
  ReactElement,
  useEffect,
  useState,
  useId,
} from 'react';

// Define the props for the AnimatedBackground component
type AnimatedBackgroundProps = {
  children:
    | ReactElement<{ 'data-id': string }>[]
    | ReactElement<{ 'data-id': string }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

// AnimatedBackground component: Creates an animated background effect for child elements
export default function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  // State to keep track of the currently active child element
  const [activeId, setActiveId] = useState<string | null>(null);
  // Generate a unique ID for this instance of AnimatedBackground
  const uniqueId = useId();

  // Function to handle setting the active ID and calling the onValueChange callback
  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);

    if (onValueChange) {
      onValueChange(id);
    }
  };

  // Effect to set the default active ID when the component mounts or defaultValue changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setActiveId(defaultValue);
    }
  }, [defaultValue]);

  // Map over the children and clone them with additional props
  return Children.map(children, (child: any, index) => {
    const id = child.props['data-id'];

    // Determine interaction props based on whether hover is enabled
    const interactionProps = enableHover
      ? {
          onMouseEnter: () => handleSetActiveId(id),
          onMouseLeave: () => handleSetActiveId(null),
        }
      : {
          onClick: () => handleSetActiveId(id),
        };

    // Clone the child element with additional props
    return cloneElement(
      child,
      {
        key: index,
        className: cn('relative inline-flex', child.props.className),
        'aria-selected': activeId === id,
        'data-checked': activeId === id ? 'true' : 'false',
        ...interactionProps,
      },
      <>
        {/* Animated background element */}
        <AnimatePresence initial={false}>
          {activeId === id && (
            <motion.div
              layoutId={`background-${uniqueId}`}
              className={cn('absolute inset-0', className)}
              transition={transition}
              initial={{ opacity: defaultValue ? 1 : 0 }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />
          )}
        </AnimatePresence>
        {/* Wrap the child's content in a span for proper layering */}
        <span className='w-full h-full z-10'>{child.props.children}</span>
      </>
    );
  });
}