import localFont from 'next/font/local'
import { clsx } from 'clsx';

const gillSansNova = localFont({
  src: '../../../public/gill-sans-nova-medium.woff2',
})

export default function BesafetyLogo({ className = "h-12" }: { className?: string }) {
  return (
    // Centered Logo
    <div className={clsx(className, gillSansNova.className)}>
      <span className="text-blue-600">be</span>
      <span className="text-gray-500 dark:text-gray-400">safety</span>
    </div>
  );
}
