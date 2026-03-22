import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  title?: string;
  badgeCount?: number;
}

export default function Layout({ title = 'Dashboard', badgeCount }: LayoutProps) {
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />

      <div className="ml-[250px] flex flex-1 flex-col">
        <Header title={title} badgeCount={badgeCount} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
