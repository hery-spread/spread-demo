"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { usePathname } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();

  // Marketing/landing layout without app chrome
  if (pathname === "/") {
    return <main className="min-h-screen">{children}</main>;
  }

  // Default app layout with sidebar + header
  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
