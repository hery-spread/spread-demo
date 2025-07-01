"use client";

import { useUserAccount } from "@/hooks/useUserAccount";
import { usePathname } from "next/navigation";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/lists":
      return "Mes Listes";
    case "/account":
      return "Mon Compte";
    case "/search":
      return "Recherche d'Influenceurs";
    default:
      return "Spread";
  }
};

export default function Header() {
  const { account, loading } = useUserAccount();
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  if (loading) {
    return (
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
          </div>
          <div className="flex items-center space-x-6">
            <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-12 rounded"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{pageTitle}</h2>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Recherches:</span>{" "}
              <span className="text-green-600 font-semibold">
                {account?.plan.limits.searches === "unlimited"
                  ? "∞"
                  : account?.plan.limits.searches}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Profils:</span>{" "}
              <span
                className={`font-semibold ${
                  account &&
                  account.plan.limits.profiles.used /
                    account.plan.limits.profiles.total >
                    0.8
                    ? "text-red-600"
                    : account &&
                        account.plan.limits.profiles.used /
                          account.plan.limits.profiles.total >
                          0.6
                      ? "text-orange-600"
                      : "text-green-600"
                }`}
              >
                {account?.plan.limits.profiles.used}/
                {account?.plan.limits.profiles.total}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-medium">Users:</span>{" "}
              <span className="text-blue-600 font-semibold">
                {account?.plan.limits.users.used}/
                {account?.plan.limits.users.total}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
              {account?.plan.name}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
