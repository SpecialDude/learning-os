import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Target,
  CalendarDays,
  Timer,
  Network,
  LineChart,
  BookOpen,
  BrainCircuit,
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Planner', href: '/planner', icon: CalendarDays },
  { name: 'Timer', href: '/timer', icon: Timer },
  { name: 'Knowledge Graph', href: '/graph', icon: Network },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Journal', href: '/journal', icon: BookOpen },
];

export default function Layout() {
  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-zinc-800 bg-zinc-900/50 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <BrainCircuit className="w-6 h-6 text-emerald-500 mr-3" />
          <span className="font-semibold text-lg tracking-tight">Learning OS</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100'
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4 border-t border-zinc-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-400">
              L
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-zinc-200">Learner</p>
              <p className="text-xs text-zinc-500">Command Center</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-zinc-950">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
