import AnimatedBackground from '@/components/motion-primitives/animated-background';
import Link from 'next/link';

export default function StickyDock() {
  const TABS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <AnimatedBackground
      defaultValue=""
      className="rounded-full bg-zinc-400/20 dark:bg-zinc-100/50 px-4 py-2"
      transition={{
        type: 'spring',
        bounce: 0.2,
        duration: 0.2,
      }}
      enableHover
    >
      {TABS.map((tab, index) => (
        <Link
          key={index}
          href={tab.href}
          data-id={tab.label}
          className="px-3 py-1 text-zinc-50 transition-colors duration-300 hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          {tab.label}
        </Link>
      ))}
    </AnimatedBackground>
  );
}