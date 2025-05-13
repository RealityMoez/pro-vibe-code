Any non-existing needed data, make them up.

[DONE]
Page sections would be:
- Home
- About
- Projects (6 made up projects)
- Skills
- Contact

[DONE]
Remove sections' borders.

We would use `motion-primitives` component/ui library to style the UI animations and feel for the specifications below.

Using @MotionPrimitives Documentation - will be attached to you - (@Docs):
1- We would implement `Animated Tabs Hover` effect on a sticky dock with border, that sticky dock would have the page sections - the dock should have an initial position above everything at the start of the page then would be moving sticky on scrolling - it should also have semi-transparent effect. [DONE]

2- We would implement "Projects" section with the `Animated Card Background` effect and behaviour on hover.  Also integrating in each project the `Dialog` effect of the first example `DialogBasicOne()`, when clicking the project - Having a short heading or a very brief description below each project name and showing more details when expanded on click. (you may notice that `Dialog` example style have an Image placeholder for the section image display; I need you to have that too but when the image placeholder is empty in code, it would appear as there's no image display on the section/project) [DONE]

3- We would implement `In view` effect on sections when loading them at first time (starting from "About" section to "Contact" section), the effect according to documentation would have a slide-to-top effect of opacity-0-to-1 with a little blur. [DONE]


## Animated Card Background example:
```jsx
import AnimatedBackground from '@/components/core/animated-background';

export function AnimatedCardBackgroundHover() {
  const ITEMS = [
    {
      id: 1,
      title: 'Dialog',
      description: 'Enhances modal presentations.',
    },
    {
      id: 2,
      title: 'Popover',
      description: 'For small interactive overlays.',
    },
    {
      id: 3,
      title: 'Accordion',
      description: 'Collapsible sections for more content.',
    },
    {
      id: 4,
      title: 'Collapsible',
      description: 'Collapsible sections for more content.',
    },
    {
      id: 5,
      title: 'Drag to Reorder',
      description: 'Reorder items with drag and drop.',
    },
    {
      id: 6,
      title: 'Swipe to Delete',
      description: 'Delete items with swipe gestures.',
    },
  ];

  return (
    <div className='grid grid-cols-2 p-10 md:grid-cols-3'>
      <AnimatedBackground
        className='rounded-lg bg-zinc-100 dark:bg-zinc-800'
        transition={{
          type: 'spring',
          bounce: 0.2,
          duration: 0.6,
        }}
        enableHover
      >
        {ITEMS.map((item, index) => (
          <div key={index} data-id={`card-${index}`}>
            <div className='flex select-none flex-col space-y-1 p-4'>
              <h3 className='text-base font-medium text-zinc-800 dark:text-zinc-50'>
                {item.title}
              </h3>
              <p className='text-base text-zinc-600 dark:text-zinc-400'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </AnimatedBackground>
    </div>
  );
}
```

## Dialog Example Effect Implementation:

```jsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from '@/components/core/dialog';
import { PlusIcon } from 'lucide-react';

export function DialogBasicOne() {
  return (
    <Dialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: '12px',
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
      >
        <DialogImage
          src='/eb-27-lamp-edouard-wilfrid-buquet.jpg'
          alt='A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood.'
          className='h-48 w-full object-cover'
        />
        <div className='flex flex-grow flex-row items-end justify-between p-2'>
          <div>
            <DialogTitle className='text-zinc-950 dark:text-zinc-50'>
              EB27
            </DialogTitle>
            <DialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
              Edouard Wilfrid Buquet
            </DialogSubtitle>
          </div>
          <button
            type='button'
            className='relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500'
            aria-label='Open dialog'
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: '24px',
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
        >
          <DialogImage
            src='/eb-27-lamp-edouard-wilfrid-buquet.jpg'
            alt='A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood.'
            className='h-full w-full'
          />
          <div className='p-6'>
            <DialogTitle className='text-2xl text-zinc-950 dark:text-zinc-50'>
              EB27
            </DialogTitle>
            <DialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
              Edouard Wilfrid Buquet
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                Little is known about the life of Édouard-Wilfrid Buquet. He was
                born in France in 1866, but the time and place of his death is
                unfortunately a mystery.
              </p>
              <p className='text-zinc-500'>
                Research conducted in the 1970s revealed that he’d designed the
                “EB 27” double-arm desk lamp in 1925, handcrafting it from
                nickel-plated brass, aluminium and varnished wood.
              </p>
              <a
                className='mt-2 inline-flex text-zinc-500 underline'
                href='https://www.are.na/block/12759029'
                target='_blank'
                rel='noopener noreferrer'
              >
                Are.na block
              </a>
            </DialogDescription>
          </div>
          <DialogClose className='text-zinc-50' />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
```

## In view Example Effect Implementation (adjust animation setting accordingly as wanted above):
```jsx
import { InView } from '@/components/core/in-view';

export function InViewBasic() {
  return (
    <div className='h-[350px] w-full overflow-auto'>
      <div className='py-12 text-center text-sm'>Scroll down</div>
      <div className='flex h-[500px] items-end justify-center px-4 pb-24'>
        <InView
          variants={{
            hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
          }}
          viewOptions={{ margin: '0px 0px -200px 0px' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='max-w-96'>
            <p className=''>
              <strong className='font-medium'>
                Craft beautiful animated components with Motion-Primitives.
              </strong>{' '}
              Designed for developers and designers. The library leverages the
              power of Framer Motion, with intuitive APIs that simplifies
              creating complex animations for any project. Start building more
              dynamic interfaces today.
            </p>
          </div>
        </InView>
      </div>
    </div>
  );
}
```

## Apply this background style of the page [ALREADY APPLIED]:

```jsx
<div class="relative h-full w-full bg-black">
    <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
    </div>
    <div class="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
    </div>
</div>
```

# Button glowing effect in CSS (for a new tailwind class to be added)
```css
.glowing-border {
    position: relative;
    overflow: hidden;
}

.glowing-border::before,
.glowing-border::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(250deg, transparent, rgba(0, 0, 0, 0.3), transparent);
    background-size: 300% 100%;
    z-index: -1;
    opacity: 1;
    animation: glowingBorder 3s linear infinite;
    transition: all 0.2s ease-in-out, opacity 0.3s ease;
}

.glowing-border::after {
    filter: blur(0px);
}

.glowing-border:hover::after {
    background-color: rgba(255, 255, 255, 0.2);
}

@keyframes glowingBorder {
    0% {
        background-position: 0% 0%;
    }
    100% {
        background-position: 300% 0%;
    }
}
```
