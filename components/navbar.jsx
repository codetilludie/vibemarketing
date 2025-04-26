'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Strategie', path: '/strategie' }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="w-full absolute top-0 left-0 z-20 px-4">
      <div className="container mx-auto py-4 flex justify-end">
        <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm rounded-full px-3 py-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`relative px-3 py-1.5 text-sm transition-colors duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-rose-500/20 rounded-full -z-10"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
} 