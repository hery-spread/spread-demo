"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChartBarIcon,
  ListBulletIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartBarIcon },
  { name: "Mes Listes", href: "/lists", icon: ListBulletIcon },
  { name: "Mon Compte", href: "/account", icon: UserIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-sm h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-purple-600">Spread</h1>
        <p className="text-sm text-gray-500 mt-1">Influence Marketing</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-purple-50 text-purple-700 border-l-4 border-purple-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <div className="mb-2">Version 2.0</div>
          <div>© 2024 Spread</div>
        </div>
      </div>
    </div>
  );
}
