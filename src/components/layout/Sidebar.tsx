import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Kanban,
  Users,
  Settings,
  Building2,
  GraduationCap,
  Briefcase,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const pipelineSubItems = [
  { label: 'Business', path: '/pipeline/business', icon: Building2 },
  { label: 'Skills', path: '/pipeline/skills', icon: Briefcase },
  { label: 'Academy', path: '/pipeline/academy', icon: GraduationCap },
];

export default function Sidebar() {
  const [pipelinesOpen, setPipelinesOpen] = useState(true);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[250px] flex-col bg-slate-900 text-white">
      {/* Brand */}
      <div className="flex h-14 items-center gap-2 border-b border-slate-700 px-5">
        <Kanban className="h-6 w-6 text-indigo-400" />
        <span className="text-lg font-bold tracking-tight">IAplicada</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 text-sm">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />

        {/* Pipelines section */}
        <button
          onClick={() => setPipelinesOpen((prev) => !prev)}
          className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
        >
          <Kanban className="h-4 w-4" />
          <span className="flex-1 text-left">Pipelines</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 transition-transform',
              pipelinesOpen && 'rotate-180'
            )}
          />
        </button>

        {pipelinesOpen && (
          <div className="ml-4 mt-1 flex flex-col gap-0.5">
            {pipelineSubItems.map((item) => (
              <NavItem
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </div>
        )}

        <NavItem to="/contacts" icon={Users} label="Contatos" />
        <NavItem to="/settings" icon={Settings} label="Configurações" />
      </nav>
    </aside>
  );
}

function NavItem({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'mt-1 flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
          isActive
            ? 'bg-indigo-600 text-white'
            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
        )
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
}
