// components/SideNavigation.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-config";
import Logo from "./Logo";
import Theme from "./Theme";
import PersianNumber from "./PersianNumber";
import { useEffect, useRef, useState } from "react";
import LogoutButton from "./LogoutButton";

function SideNavigation({ role, badges = {} }) {
    const pathName = usePathname();
    const links = navItems.filter((item) => item.roles.includes(role));

    const isActive = (item) =>
        item.exact
            ? pathName === item.href
            : pathName === item.href || pathName.startsWith(item.href + "/");

    const activeIndex = links.findIndex((item) => isActive(item));

    // برای انیمیشن حباب (Bubble) در موبایل
    const navContainerRef = useRef(null);
    const itemRefs = useRef([]);
    const [bubbleStyle, setBubbleStyle] = useState({ left: 0, opacity: 0 });

    useEffect(() => {
        if (
            activeIndex !== -1 &&
            itemRefs.current[activeIndex] &&
            navContainerRef.current
        ) {
            const activeEl = itemRefs.current[activeIndex];
            const container = navContainerRef.current;

            // محاسبه‌ی فاصله‌ی مرکز آیتم فعال از مرکز کانتینر
            const activeCenter = activeEl.offsetLeft + activeEl.offsetWidth / 2;
            const containerCenter = container.offsetWidth / 2;

            setBubbleStyle({
                left: activeCenter - containerCenter, // حرکت نسبت به مرکز
                opacity: 1,
            });
        }
    }, [activeIndex]);

    return (
        <>
            {/* ── سایدبار دسکتاپ ───────────────────────── */}
            <nav className="hidden md:flex flex-col py-4 px-6 sticky top-0 h-screen bg-cream-50 dark:bg-night-800 shadow-sm border-l border-cream-200 dark:border-night-700">
                <div className="flex items-center gap-2 mb-6">
                    <Logo />
                    <Link href="/">
                        <p>صفحه اصلی</p>
                    </Link>
                    <Theme />
                </div>

                <ul className="flex flex-col gap-1 text-[1rem]">
                    {links.map((item) => {
                        const active = isActive(item);
                        const Icon = active
                            ? item.iconActive || item.icon
                            : item.icon;
                        const count = item.badgeKey
                            ? badges[item.badgeKey] ?? 0
                            : 0;

                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`px-4 py-2 rounded-sm transition-colors flex items-center gap-2 ${
                                        active
                                            ? "text-cream-50 dark:text-night-700 bg-night-700 dark:bg-cream-50 hover:bg-night-800 hover:dark:bg-cream-100"
                                            : "text-night-700/70 dark:text-cream-50/50 hover:text-night-700 dark:hover:text-cream-50 hover:bg-night-700/5 dark:hover:bg-cream-50/5"
                                    }`}
                                >
                                    <Icon
                                        className={`h-5 w-5 ${
                                            active
                                                ? "text-current"
                                                : "text-primary-600"
                                        }`}
                                    />
                                    <span>{item.name}</span>
                                    {count > 0 && (
                                        <span className="mr-auto min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                            <PersianNumber
                                                value={
                                                    count > 99 ? "99+" : count
                                                }
                                            />
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                    <LogoutButton />
                </ul>
            </nav>

            {/* ── نوار پایین موبایل/تبلت ───────────────── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-3 pb-3 pt-0 pointer-events-none">
                <div className="relative  rounded-sm pointer-events-auto">
                    <div
                        ref={navContainerRef}
                        className="relative flex items-center justify-around px-2 h-16"
                    >
                        {/* ── حباب متحرک (Movable Bubble) ── */}
                        <div
                            className="absolute -top-5 w-14 h-14 bg-cream-50 dark:bg-night-950 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
                            style={{
                                left: "50%",
                                transform: `translateX(calc(-50% + ${bubbleStyle.left}px))`,
                                opacity: bubbleStyle.opacity,
                            }}
                        >
                            <div className="w-12 h-12 bg-amber-500 dark:bg-amber-700 shadow-lg rounded-full flex items-center justify-center">
                                {activeIndex !== -1 &&
                                    (() => {
                                        // استفاده از iconActive در حباب
                                        const ActiveIcon =
                                            links[activeIndex].iconActive ||
                                            links[activeIndex].icon;
                                        return (
                                            <ActiveIcon className="w-7 h-7 text-white" />
                                        );
                                    })()}
                            </div>
                        </div>

                        {/* ── آیتم‌های منو ── */}
                        {links.map((item, index) => {
                            const active = isActive(item);
                            const Icon = item.icon;
                            const count = item.badgeKey
                                ? badges[item.badgeKey] ?? 0
                                : 0;

                            return (
                                <div
                                    key={item.href}
                                    ref={(el) => (itemRefs.current[index] = el)}
                                    className="relative flex-1 flex justify-center h-full"
                                >
                                    <Link
                                        href={item.href}
                                        className="relative z-10 w-full h-full flex items-center justify-center text-white hover:text-white transition-colors duration-300"
                                        aria-label={item.name}
                                    >
                                        {/* آیکون‌های غیرفعال */}
                                        {!active && (
                                            <div className="relative">
                                                <Icon className="w-7 h-7 transition-transform duration-300 hover:scale-110 text-black dark:text-white" />
                                                {count > 0 && (
                                                    <span className="absolute -top-1.5 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold border border-red-700">
                                                        <PersianNumber
                                                            value={
                                                                count > 99
                                                                    ? "99+"
                                                                    : count
                                                            }
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* نشانگر ریز (نقطه) زیر آیتم فعال */}
                                        <span
                                            className={`absolute bottom-1.5 w-2 h-2 rounded-full bg-amber-500 transition-all duration-300 ${
                                                active
                                                    ? "opacity-100 scale-100"
                                                    : "opacity-0 scale-0"
                                            }`}
                                        />
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default SideNavigation;
