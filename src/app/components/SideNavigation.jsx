// components/SideNavigation.jsx
"use client";

import Link from "next/link";
import logo from "./../public/Abadis-raw-white.png";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-config";
import Image from "next/image";

function SideNavigation({ role, badges = {} }) {
    const pathName = usePathname();
    const links = navItems.filter((item) => item.roles.includes(role));

    const isActive = (item) =>
        item.exact
            ? pathName === item.href
            : pathName === item.href || pathName.startsWith(item.href + "/");

    return (
        <nav className="py-4 px-6 bg-white dark:bg-night-900 shadow-sm min-h-[calc(100vh-0rem)] border-l border-cream-200 dark:border-night-700">
            <ul className="flex flex-col gap-4 h-full text-[1rem]">
                <Link
                    href="/"
                    className="flex items-center"
                >
                    <Image
                        alt="dahsboard logo"
                        src={logo}
                        className="w-24 mx-auto my-4"
                    />
                </Link>
                {links.map((item) => {
                    const Icon = item.icon;
                    const count = item.badgeKey
                        ? badges[item.badgeKey] ?? 0
                        : 0;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`px-4 hover:text-night-700 dark:hover:text-cream-50 transition-colors flex items-center gap-2 ${
                                    isActive(item)
                                        ? "text-night-700 dark:text-cream-50 font-semibold"
                                        : "text-night-700/70 dark:text-cream-50/50"
                                }`}
                            >
                                <Icon className="h-5 w-5 text-primary-600" />
                                <span>{item.name}</span>
                                {count > 0 && (
                                    <span className="mr-auto min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        {count > 99 ? "99+" : count}
                                    </span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default SideNavigation;
