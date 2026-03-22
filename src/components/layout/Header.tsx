import { Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title: string;
  badgeCount?: number;
}

export default function Header({ title, badgeCount }: HeaderProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-9 w-56 rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <Bell className="h-5 w-5" />
          {badgeCount != null && badgeCount > 0 && (
            <span
              className={cn(
                'absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white'
              )}
            >
              {badgeCount > 99 ? '99+' : badgeCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
